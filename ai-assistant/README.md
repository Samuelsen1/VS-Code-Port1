# General-AI

**General-AI** answers using Wikipedia, web search, weather, definitions, news, and OpenAI—plus a local **brain** (pattern matching, learning, time/date/math, follow-ups) and optional **Ollama**, **Anthropic**, and **embeddings**. All legal, documented APIs.

## What it does

- **Chats** using built-in patterns (greetings, thanks, help, feelings, etc.)
- **Remembers context**: handles follow-ups like “and you?”, “what about you?”, “good”, “fine” after it asks how you are
- **Time & date**: “what time is it”, “what’s the date”
- **Simple math**: “what is 2+2”, “10 * 5”
- **Learns** new Q&A when you type:  
  `teach: your question -> the answer`
- **Clarifies** when it’s unsure: suggests likely intents and invites you to rephrase or teach
- **Better matching**: contractions (e.g. “what’s” → “what is”), Dice coefficient for similarity
- **Optional LLM**: OpenAI, Anthropic, or Ollama for open-ended questions (falls back to pattern + learned)
- **Optional embeddings**: semantic matching for learned Q&A via `sentence-transformers` (see below)
- **General-style sources**: Wikipedia, weather, dictionary, web search, news — free sources always on; web/news need keys (see [ENV.md](ENV.md))
- Saves learned pairs in `learned.json` (and `learned_embeddings.npy` when using embeddings)

## Run it

```bash
git clone https://github.com/Samuelsen1/General-AI.git
cd General-AI
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open **http://127.0.0.1:5000**.

**Deploy to Vercel:** [DEPLOY.md](DEPLOY.md). **Env vars:** [ENV.md](ENV.md).

## Try

- `hello` / `hi` / `how are you` → then `and you?` or `good`
- `who are you` / `how does this work` / `help`
- `what time is it` / `what is the date`
- `what is 15+27` / `3 * 7`
- `teach: what is the capital of France -> Paris`
- **General-AI:** `weather in Berlin`, `define photosynthesis`, `what is photosynthesis` (Wikipedia), `news` (needs `NEWS_API_KEY`)

## Tech

- **Backend**: Flask, `brain.py`, `llm.py`, `general.py` (pattern, Dice + embeddings, General-AI: Wikipedia/weather/dict/web/news, time/date/math, learned Q&A, OpenAI/Anthropic/Ollama)
- **Frontend**: HTML, CSS, JS (sends last 10 messages as `history` for context)

---

## 1. Local LLM (Ollama)

For fully local, smarter replies without any API keys:

1. Install [Ollama](https://ollama.com) and run a model:
   ```bash
   ollama run llama3.2
   ```
2. Leave Ollama running. The app will try it in **auto** mode after cloud (if no keys, Ollama is tried before falling back to pattern matching).

**Env (optional):**

| Variable      | Default              |
|---------------|----------------------|
| `OLLAMA_URL`  | `http://localhost:11434` |
| `OLLAMA_MODEL`| `llama3.2`           |
| `OLLAMA_TIMEOUT` | `15`              |

---

## 2. Cloud API (OpenAI, Anthropic)

For best quality when you have an API key:

**OpenAI**

```bash
export OPENAI_API_KEY=sk-...
# optional: OPENAI_MODEL=gpt-4o-mini  (default)
```

**Anthropic**

```bash
export ANTHROPIC_API_KEY=sk-ant-...
# optional: ANTHROPIC_MODEL=claude-3-haiku-20240307  (default)
```

Install deps: `pip install -r requirements.txt` (includes `openai`, `anthropic`).

**Provider order (when `AI_PROVIDER=auto`, default):**  
OpenAI (if key) → Anthropic (if key) → Ollama (if reachable) → pattern matching + learned.

Set vars in your environment (e.g. `export OPENAI_API_KEY=sk-...`) or via a `.env` loader (see `.env.example`).

**Force a provider:**

```bash
export AI_PROVIDER=openai    # only OpenAI, then brain
export AI_PROVIDER=anthropic # only Anthropic, then brain
export AI_PROVIDER=ollama    # only Ollama, then brain
export AI_PROVIDER=brain     # skip all LLMs, use only pattern + learned
```

---

## 3. Better learning (embeddings)

**Semantic match** for learned Q&A: e.g. “capital of France” matches “What is the capital of France?” by meaning, not just words.

1. Install (first run downloads ~100MB model):

   ```bash
   pip install -r requirements-optional.txt
   ```

2. Restart the app. Learned entries are embedded and cached in `learned_embeddings.npy`.  
   On `teach: ... -> ...`, the cache is cleared and rebuilt so new facts are included.

If `sentence-transformers` is not installed, the app falls back to Dice + substring for learned Q&A (still works, less semantic).

---

## 4. General-AI (Wikipedia, weather, dictionary, web, news)

[General-AI](https://github.com/Samuelsen1/General-AI) is infused into the assistant: **Wikipedia**, **weather** (Open-Meteo), and **dictionary** (Free Dictionary API) run with **no keys**. Set keys for web search and news to unlock more.

| Source       | Env vars | Notes |
|-------------|----------|-------|
| **Wikipedia** | — | Always on |
| **Weather**   | — | e.g. “weather in Berlin” |
| **Dictionary**| — | e.g. “define photosynthesis” |
| **Web search** | `GOOGLE_API_KEY`+`GOOGLE_CSE_ID`, or `SERPER_API_KEY`, or `BRAVE_API_KEY`, or `TAVILY_API_KEY` | One of. [Google CSE](https://programmablesearch.google.com/) \| [Serper](https://serper.dev) \| [Brave](https://brave.com/search/api/) \| [Tavily](https://tavily.com) |
| **News**      | `NEWS_API_KEY` | [newsapi.org](https://newsapi.org/register). Queries with “news”, “latest”, “headlines” |
| **OpenAI**    | `OPENAI_API_KEY` | Synthesizes from the fetched context (General-style) |

**Check what’s on:** `GET /api/status` returns `{ wikipedia, weather, dictionary, web, news, openai }`.

See [ENV.md](ENV.md) for how to get each key.
