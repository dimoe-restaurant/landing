"""
Generic Notion client.

Reads DB IDs from env vars using the pattern NOTION_{NAME}_DB_ID.
All writes respect NOTION_DRY_RUN=1 for safe local testing.

Usage:
    # .env
    NOTION_TOKEN=secret_xxx
    NOTION_TASKS_DB_ID=abc123...

    from agents.core.notion import NotionDB
    db = NotionDB("tasks")
    rows = db.query({"filter": {"property": "status", "select": {"equals": "open"}}})
    db.create({"title": "New task", "status": "open"})
"""
import json
import logging
import os
import time
from typing import Any

import httpx
from notion_client import Client

logger = logging.getLogger(__name__)

_DRY_RUN = os.environ.get("NOTION_DRY_RUN", "0") == "1"
_client: Client | None = None
_http: httpx.Client | None = None


def _get_token() -> str:
    token = os.environ.get("NOTION_TOKEN", "").strip()
    if not token:
        raise EnvironmentError("NOTION_TOKEN not set in environment")
    return token


def get_client() -> Client:
    global _client
    if _client is None:
        _client = Client(auth=_get_token())
    return _client


def _http_client() -> httpx.Client:
    global _http
    if _http is None:
        _http = httpx.Client(
            base_url="https://api.notion.com/v1/",
            headers={
                "Authorization": f"Bearer {_get_token()}",
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
            },
            timeout=15,
        )
    return _http


def _resolve_db_id(name: str) -> str:
    var = f"NOTION_{name.upper()}_DB_ID"
    raw = os.environ.get(var, "").strip()
    if not raw:
        raise EnvironmentError(f"{var} not configured")
    if "-" not in raw and len(raw) == 32:
        raw = f"{raw[:8]}-{raw[8:12]}-{raw[12:16]}-{raw[16:20]}-{raw[20:]}"
    return raw


def _extract(pages: list) -> list[dict]:
    """Flatten Notion page properties into plain dicts."""
    out = []
    for page in pages:
        props = page.get("properties", {})
        row: dict[str, Any] = {"id": page["id"]}
        for key, val in props.items():
            t = val.get("type")
            if t == "title":
                row[key] = "".join(r["text"]["content"] for r in val["title"])
            elif t == "select":
                row[key] = val["select"]["name"] if val["select"] else None
            elif t == "multi_select":
                row[key] = [o["name"] for o in val["multi_select"]]
            elif t == "rich_text":
                row[key] = "".join(r["text"]["content"] for r in val["rich_text"])
            elif t == "number":
                row[key] = val["number"]
            elif t == "date":
                row[key] = val["date"]["start"] if val["date"] else None
            elif t == "checkbox":
                row[key] = val["checkbox"]
            elif t == "url":
                row[key] = val["url"]
            elif t == "email":
                row[key] = val["email"]
        out.append(row)
    return out


class NotionDB:
    """
    Thin wrapper around a single Notion database.

    db = NotionDB("tasks")   # reads NOTION_TASKS_DB_ID from env
    rows = db.query({...})
    page = db.create({"name": "...", "status": "open"})
    db.update(page_id, {"status": "done"})
    """

    def __init__(self, name: str):
        self.name = name
        self._db_id = _resolve_db_id(name)

    def query(self, body: dict | None = None, *, retries: int = 3) -> list[dict]:
        if _DRY_RUN:
            return []
        body = body or {}
        last_exc: Exception | None = None
        for attempt in range(retries):
            try:
                r = _http_client().post(f"databases/{self._db_id}/query", json=body)
                r.raise_for_status()
                return _extract(r.json().get("results", []))
            except Exception as exc:
                last_exc = exc
                if attempt < retries - 1:
                    time.sleep(1.5 * (attempt + 1))
        raise last_exc  # type: ignore[misc]

    def create(self, properties: dict) -> dict:
        """
        Create a page. properties should be pre-formatted Notion API objects.
        For simple use, call build_props() first.
        """
        if _DRY_RUN:
            logger.info("[DRY_RUN] notion.create %s: %s", self.name, list(properties.keys()))
            return {"id": "dry-run", "dry_run": True}
        return get_client().pages.create(
            parent={"database_id": self._db_id},
            properties=properties,
        )

    def update(self, page_id: str, properties: dict) -> dict:
        if _DRY_RUN:
            logger.info("[DRY_RUN] notion.update %s: %s", page_id, list(properties.keys()))
            return {"id": page_id, "dry_run": True}
        return get_client().pages.update(page_id=page_id, properties=properties)


# ---------------------------------------------------------------------------
# Property builders — helpers to construct Notion API property objects
# ---------------------------------------------------------------------------

def title(text: str) -> dict:
    return {"title": [{"text": {"content": text}}]}

def rich_text(text: str, max_chars: int = 2000) -> dict:
    return {"rich_text": [{"text": {"content": text[:max_chars]}}]}

def select(name: str) -> dict:
    return {"select": {"name": name}}

def multi_select(names: list[str]) -> dict:
    return {"multi_select": [{"name": n} for n in names]}

def number(value: float | int) -> dict:
    return {"number": value}

def date(iso_str: str) -> dict:
    return {"date": {"start": iso_str}}

def checkbox(checked: bool) -> dict:
    return {"checkbox": checked}

def url(link: str) -> dict:
    return {"url": link}

def json_field(data: dict | list, max_chars: int = 2000) -> dict:
    return rich_text(json.dumps(data, ensure_ascii=False, default=str), max_chars)
