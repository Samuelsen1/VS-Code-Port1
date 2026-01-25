# Environment variables (Vercel)

Set in **Vercel → Your project → Settings → Environment Variables**, then **Redeploy**.

---

## No key (always on)

- **Wikipedia** — general search
- **Open-Meteo** — weather (e.g. "weather in Berlin")
- **Free Dictionary API** — definitions (e.g. "define photosynthesis", "explain serendipity")
- **Datamuse** — word definitions and spelling (no key)
- **Wiktionary** — en.wiktionary.org extracts (no key)

---

## Web search (use one)

| Variable | Service | Where to get it |
|----------|---------|------------------|
| `GOOGLE_API_KEY` | Google Custom Search | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → API key; enable **Custom Search API** |
| `GOOGLE_CSE_ID` | Google CSE | [Programmable Search](https://programmablesearch.google.com/) → create engine → **Search the entire web** → copy **Search engine ID** |
| `SERPER_API_KEY` | Serper (Google) | [serper.dev](https://serper.dev) → API key |
| `BRAVE_API_KEY` | Brave Search | [Brave Search API](https://brave.com/search/api/) → Subscription token |
| `TAVILY_API_KEY` | Tavily | [tavily.com](https://tavily.com) → API key |

**Priority:** Google CSE → Serper → Brave → Tavily (first configured is used).

---

## News

| Variable | Service | Where to get it |
|----------|---------|------------------|
| `NEWS_API_KEY` | NewsAPI | [newsapi.org](https://newsapi.org/register) → API key (free: top-headlines) |

Used when the query contains: *news*, *latest*, *headlines*, *current*, *recent*.

---

## Dictionary (optional extra)

| Variable | Service | Where to get it |
|----------|---------|------------------|
| `MERRIAM_WEBSTER_API_KEY` or `DICTIONARY_API_KEY` | Merriam-Webster Collegiate | [dictionaryapi.com](https://dictionaryapi.com/) — free tier: 1,000 requests/day |

When set, definitions also include Merriam-Webster. Without it, the AI still uses Free Dictionary, Datamuse, and Wiktionary for **define**, **explain**, **meaning of**, and short phrases (e.g. "serendipity", "piece of cake").

---

## LLM (synthesis + open-ended)

| Variable | Service | Where to get it |
|----------|---------|------------------|
| `OPENAI_API_KEY` | OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| `ANTHROPIC_API_KEY` | Anthropic | [console.anthropic.com](https://console.anthropic.com/) |

For **Ollama** (local): no key; run `ollama run llama3.2` and set `AI_PROVIDER=ollama` or leave `auto`.

---

## Persist teach on Vercel (Vercel KV or Upstash Redis)

So **teach: question -> answer** is saved on Vercel (the serverless filesystem is read‑only otherwise).

**Option A — Vercel KV**

1. **Vercel** → your project → **Storage** → **Create Database** → **KV** (or **KV v2**).
2. Connect it to the project. Vercel will add `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `KV_REST_API_READ_ONLY_TOKEN` / write token — use the **read‑write** token for the env we need).
3. In **Settings → Environment Variables**, ensure `KV_REST_API_URL` and `KV_REST_API_TOKEN` exist (they may be auto‑injected; if not, copy from the KV store).
4. **Redeploy.**

**Option B — Upstash Redis**

1. [Upstash Console](https://console.upstash.com/) → create a Redis database.
2. Copy **REST URL** and **REST Token**.
3. In **Vercel → Settings → Environment Variables**, add:
   - `UPSTASH_REDIS_REST_URL` = REST URL  
   - `UPSTASH_REDIS_REST_TOKEN` = REST Token  
4. **Redeploy.**

| Variable | Purpose |
|----------|---------|
| `KV_REST_API_URL` | Vercel KV REST URL (or `UPSTASH_REDIS_REST_URL` for Upstash) |
| `KV_REST_API_TOKEN` | Vercel KV token (or `UPSTASH_REDIS_REST_TOKEN` for Upstash) |

If neither is set, **teach** works only for the current request on Vercel; locally it writes to `learned.json`.

---

## Optional

| Variable | Purpose |
|----------|---------|
| `AI_PROVIDER` | `auto` \| `openai` \| `anthropic` \| `ollama` \| `brain` |
| `OLLAMA_URL` | Default `http://localhost:11434` |
| `OLLAMA_MODEL` | Default `llama3.2` |
| `OPENAI_MODEL` | Default `gpt-4o-mini` |
| `ANTHROPIC_MODEL` | Default `claude-3-haiku-20240307` |

---

All keys are optional. General-AI always uses Wikipedia, weather, and dictionary when the query fits.
