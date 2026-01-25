"""
LLM providers: OpenAI, Anthropic, Ollama.
Tries in order per AI_PROVIDER; falls back to brain when all fail.
"""

import os
from typing import Dict, List, Optional

# Provider: auto | openai | anthropic | ollama | brain
# auto = try openai (if key) -> anthropic (if key) -> ollama (if reachable) -> None
PROVIDER = os.environ.get("AI_PROVIDER", "auto").lower().strip()
OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434").rstrip("/")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "llama3.2")
OPENAI_MODEL = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
ANTHROPIC_MODEL = os.environ.get("ANTHROPIC_MODEL", "claude-3-haiku-20240307")

# Timeouts (seconds)
OLLAMA_TIMEOUT = int(os.environ.get("OLLAMA_TIMEOUT", "15"))
OPENAI_TIMEOUT = int(os.environ.get("OPENAI_TIMEOUT", "30"))
ANTHROPIC_TIMEOUT = int(os.environ.get("ANTHROPIC_TIMEOUT", "30"))


def _build_messages(history: List[Dict], current: str) -> List[Dict]:
    """Build [{"role":"user"|"assistant","content":"..."}] for APIs. Maps "ai" -> "assistant"."""
    out: List[Dict] = []
    for h in history:
        role = (h.get("role") or "").strip().lower()
        if role == "ai":
            role = "assistant"
        if role in ("user", "assistant"):
            c = (h.get("content") or "").strip()
            if c:
                out.append({"role": role, "content": c})
    out.append({"role": "user", "content": current})
    return out


def _call_openai(messages: List[Dict]) -> Optional[str]:
    key = os.environ.get("OPENAI_API_KEY") or os.environ.get("OPENAI_KEY")
    if not (key or "").strip():
        return None
    try:
        from openai import OpenAI

        client = OpenAI(api_key=key)
        r = client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages,
            max_tokens=1024,
            timeout=OPENAI_TIMEOUT,
        )
        if r.choices and len(r.choices) > 0:
            c = r.choices[0].message
            if c and getattr(c, "content", None):
                return (c.content or "").strip()
    except Exception:
        pass
    return None


def _call_anthropic(messages: List[Dict]) -> Optional[str]:
    key = os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("ANTHROPIC_KEY")
    if not (key or "").strip():
        return None
    try:
        from anthropic import Anthropic

        client = Anthropic(api_key=key)
        # Anthropic requires system to be separate or in first user; messages are user/assistant.
        # Some models need system. We'll send as messages only; if it fails we can add system.
        r = client.messages.create(
            model=ANTHROPIC_MODEL,
            max_tokens=1024,
            messages=messages,
        )
        if r.content and len(r.content) > 0:
            block = r.content[0]
            if hasattr(block, "text") and block.text:
                return (block.text or "").strip()
    except Exception:
        pass
    return None


def _call_ollama(messages: List[Dict]) -> Optional[str]:
    try:
        import urllib.request
        import json as _json

        url = f"{OLLAMA_URL}/api/chat"
        body = {"model": OLLAMA_MODEL, "messages": messages, "stream": False}
        data = _json.dumps(body).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=OLLAMA_TIMEOUT) as resp:
            out = _json.loads(resp.read().decode())
        msg = out.get("message") or {}
        c = msg.get("content") or ""
        return (c or "").strip() or None
    except Exception:
        return None


def get_llm_response(user_message: str, history: Optional[List[Dict]] = None) -> Optional[str]:
    """
    Try cloud/Ollama in order per AI_PROVIDER. Returns None if all fail or are disabled.
    """
    history = history or []
    messages = _build_messages(history, user_message)

    if PROVIDER == "brain":
        return None

    if PROVIDER == "openai":
        return _call_openai(messages)

    if PROVIDER == "anthropic":
        return _call_anthropic(messages)

    if PROVIDER == "ollama":
        return _call_ollama(messages)

    # auto: openai -> anthropic -> ollama
    r = _call_openai(messages)
    if r:
        return r
    r = _call_anthropic(messages)
    if r:
        return r
    return _call_ollama(messages)
