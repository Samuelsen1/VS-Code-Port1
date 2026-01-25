"""
Web server for the AI assistant. Serves the static UI and /api/chat.
"""

from flask import Flask, request, jsonify, send_from_directory
from pathlib import Path

from brain import think
from general import get_status

app = Flask(__name__, static_folder="static")
BASE = Path(__file__).parent


@app.route("/")
def index():
    return send_from_directory(BASE / "static", "index.html")


@app.route("/api/status", methods=["GET"])
def status():
    return jsonify(get_status()), 200


@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(BASE / "static", path)


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    message = (data.get("message") or "").strip()
    if not message:
        return jsonify({"reply": "Please type something."}), 200
    history = data.get("history") or []
    # Keep last 10 turns (5 user + 5 AI) for context
    history = history[-10:] if isinstance(history, list) else []
    reply = think(message, history=history)
    return jsonify({"reply": reply}), 200


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
