"""
AgentLoop — real agentic loop with optional HITL (human-in-the-loop) support.

Basic usage:
    agent = AgentLoop(system_prompt=..., tools=[...])
    text   = agent.analyze(data, question)      # single turn, no tools
    result = agent.run(question, context=data)  # full loop with tools

HITL pre-action (Anthropic best practice):
    Pause BEFORE executing critical tools and wait for approval.

    def my_gate(tool_name, tool_input) -> bool:
        # Notify via WhatsApp/email and wait for response
        # Return True if approved, False if rejected
        ...

    agent = AgentLoop(
        ...,
        hitl_tools={"dangerous_tool"},
        hitl_gate=my_gate,
    )

Tools are defined as standard Anthropic dicts:
    {"name": "...", "description": "...", "input_schema": {...}}
Handlers as a dict {name: callable}.
"""
import json
import logging
import os
from typing import Any, Callable

import anthropic
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

_DEFAULT_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-6")

HITL_REQUESTED = "__hitl_requested__"


class AgentLoop:
    """
    Real agentic loop: Claude calls tools, receives results, iterates.
    Stops when stop_reason == "end_turn" or max_iterations is reached.

    hitl_tools: set of tool names requiring human approval before execution.
    hitl_gate:  callable(tool_name, tool_input) -> bool
                Should notify the human (WhatsApp/email) and return True/False.
                If False, the tool is not executed and Claude receives a rejection.
    """

    def __init__(
        self,
        system_prompt: str,
        tools: list[dict] | None = None,
        tool_handlers: dict[str, Callable] | None = None,
        model: str | None = None,
        max_tokens: int = 2000,
        max_iterations: int = 10,
        hitl_tools: set[str] | None = None,
        hitl_gate: Callable[[str, dict], bool] | None = None,
    ):
        self.system_prompt = system_prompt
        self.tools = tools or []
        self.tool_handlers = tool_handlers or {}
        self.model = model or _DEFAULT_MODEL
        self.max_tokens = max_tokens
        self.max_iterations = max_iterations
        self.hitl_tools = hitl_tools or set()
        self.hitl_gate = hitl_gate
        self._client = anthropic.Anthropic()

    def run(self, question: str, context: dict | None = None) -> dict:
        """
        Run the full agentic loop.
        Returns: {"text": str, "tool_calls": list, "hitl_proposals": list}
        """
        user_content = question
        if context:
            user_content += f"\n\nCONTEXT:\n{json.dumps(context, indent=2, ensure_ascii=False)}"

        messages = [{"role": "user", "content": user_content}]
        tool_calls_log: list[dict] = []
        hitl_proposals: list[dict] = []

        for _ in range(self.max_iterations):
            kwargs: dict[str, Any] = dict(
                model=self.model,
                max_tokens=self.max_tokens,
                system=self.system_prompt,
                messages=messages,
            )
            if self.tools:
                kwargs["tools"] = self.tools

            response = self._client.messages.create(**kwargs)
            messages.append({"role": "assistant", "content": response.content})

            if response.stop_reason != "tool_use":
                text = next((b.text for b in response.content if hasattr(b, "text")), "")
                return {"text": text, "tool_calls": tool_calls_log, "hitl_proposals": hitl_proposals}

            tool_results = []
            for block in response.content:
                if block.type != "tool_use":
                    continue

                tool_name = block.name
                tool_input = block.input
                logger.info("[AgentLoop] tool_use: %s(%s)", tool_name, list(tool_input.keys()))
                tool_calls_log.append({"tool": tool_name, "input": tool_input})

                if tool_name in self.hitl_tools and self.hitl_gate:
                    approved = self.hitl_gate(tool_name, tool_input)
                    if not approved:
                        logger.info("[AgentLoop] HITL rejected: %s", tool_name)
                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": json.dumps({"status": "rejected", "reason": "Rejected by human"}),
                            "is_error": True,
                        })
                        continue

                handler = self.tool_handlers.get(tool_name)
                if handler is None:
                    result: dict = {"error": f"Tool '{tool_name}' has no registered handler"}
                    is_error = True
                else:
                    try:
                        raw = handler(**tool_input)
                        if isinstance(raw, dict) and raw.get("__type") == HITL_REQUESTED:
                            hitl_proposals.append(raw)
                            result = {"status": "hitl_created", "id": raw.get("id", "")}
                        else:
                            result = raw if isinstance(raw, dict) else {"result": raw}
                        is_error = False
                    except Exception as exc:
                        logger.warning("[AgentLoop] tool error %s: %s", tool_name, exc)
                        result = {"error": str(exc)}
                        is_error = True

                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result, ensure_ascii=False, default=str),
                    **({"is_error": True} if is_error else {}),
                })

            messages.append({"role": "user", "content": tool_results})

        logger.warning("[AgentLoop] max_iterations (%d) reached", self.max_iterations)
        return {"text": "max_iterations reached", "tool_calls": tool_calls_log, "hitl_proposals": hitl_proposals}

    def analyze(self, data: dict, question: str) -> str:
        """Single turn without tools — quick analysis."""
        response = self._client.messages.create(
            model=self.model,
            max_tokens=self.max_tokens,
            system=self.system_prompt,
            messages=[{
                "role": "user",
                "content": f"{question}\n\nDATA:\n{json.dumps(data, indent=2, ensure_ascii=False)}",
            }],
        )
        return response.content[0].text
