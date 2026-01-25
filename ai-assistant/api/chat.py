# Vercel serverless: POST /api/chat
from http.server import BaseHTTPRequestHandler
import json
import sys
from pathlib import Path

# Project root on Vercel is the cwd
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


class handler(BaseHTTPRequestHandler):
    def _send(self, status: int, body: dict, extra_headers: dict = None):
        self.send_response(status)
        for k, v in {**CORS, "Content-Type": "application/json", **(extra_headers or {})}.items():
            self.send_header(k, str(v))
        self.end_headers()
        self.wfile.write(json.dumps(body).encode("utf-8"))

    def do_OPTIONS(self):
        self.send_response(204)
        for k, v in CORS.items():
            self.send_header(k, str(v))
        self.end_headers()

    def do_POST(self):
        try:
            n = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(n).decode("utf-8") if n else "{}"
        except Exception:
            raw = "{}"
        try:
            data = json.loads(raw)
        except Exception:
            self._send(400, {"reply": "Invalid JSON.", "error": "bad body"})
            return
        message = (data.get("message") or "").strip()
        if not message:
            self._send(200, {"reply": "Please type something."})
            return
        history = data.get("history")
        if not isinstance(history, list):
            history = []
        history = history[-10:]

        try:
            from brain import think

            reply = think(message, history=history)
        except Exception as e:
            self._send(200, {"reply": f"Error: {e!s}", "error": "think"})
            return
        self._send(200, {"reply": reply or "No response."})
