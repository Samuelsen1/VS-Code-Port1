# Vercel serverless: GET /api/status
from http.server import BaseHTTPRequestHandler
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

CORS = {"Access-Control-Allow-Origin": "*"}


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            from general import get_status

            body = get_status()
        except Exception:
            body = {"wikipedia": True, "weather": True, "dictionary": True, "web": None, "news": False, "openai": False}
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        for k, v in CORS.items():
            self.send_header(k, str(v))
        self.end_headers()
        self.wfile.write(json.dumps(body).encode("utf-8"))
