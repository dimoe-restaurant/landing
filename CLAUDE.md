# CLAUDE.md — dimoe-landing

Proyecto personal. Stack: Python 3.12+ para agentes, web stack TBD para landing.

## Repo

**GitHub:** `dimoe-restaurant/landing`  
**Puerto local:** N/A

## Estructura

```
agents/
  core/
    agent_loop.py   ← AgentLoop genérico con HITL
    notion.py       ← Cliente Notion genérico (NotionDB + property builders)
tests/
.env.example
pyproject.toml
```

## Setup local

```bash
uv venv && uv pip install -e ".[dev]"
cp .env.example .env   # completar CLAUDE_MODEL y NOTION_TOKEN
```

## Convenciones

### Commits

Conventional commits:
```
feat(scope): descripción
fix(scope): descripción
chore(scope): descripción
```

### Branching

| Branch | Rol |
|---|---|
| `main` | Producción |
| `dev` | Integración |
| `feat/*`, `fix/*` | Trabajo efímero |

## Agentes

Ver `.claude/rules/agent-design.md` para el árbol de decisión N8N → Claude → Python.

`AgentLoop` vive en `agents/core/agent_loop.py` y es la primitiva base para todo agente nuevo.
