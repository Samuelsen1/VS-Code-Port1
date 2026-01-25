# Deploy: Replace General-AI on GitHub + Vercel

Replace [github.com/Samuelsen1/General-AI](https://github.com/Samuelsen1/General-AI) with this codebase and deploy on Vercel.

---

## 1. Replace the General-AI repo on GitHub

In Terminal, from **this project folder** (e.g. `~/Desktop/ai-assistant` or your clone):

```bash
git init
git add .
git commit -m "General-AI: brain, General sources, LLM, embeddings, Vercel Python"

git remote add origin https://github.com/Samuelsen1/General-AI.git
git branch -M main
git push -u origin main --force
```

**⚠️ `--force` overwrites the existing General-AI repo.** The old Node/JS `api/chat.js` and `api/status.js` are replaced by Python `api/chat.py` and `api/status.py`.

---

## 2. Deploy on Vercel

1. Go to **[vercel.com](https://vercel.com)** → **Add New…** → **Project**.
2. **Import** `Samuelsen1/General-AI` (or reconnect if it was already imported).
3. **Deploy**. Vercel will use the new `api/*.py` and root `index.html`, `app.js`, `styles.css`.

Your site: **https://general-ai-xxx.vercel.app** (or your project URL).

---

## 3. Environment variables (Vercel)

**Vercel → Project → Settings → Environment Variables.** Add any you need (see [ENV.md](ENV.md)):

- `OPENAI_API_KEY`
- `GOOGLE_API_KEY`, `GOOGLE_CSE_ID` — or `SERPER_API_KEY`, `BRAVE_API_KEY`, `TAVILY_API_KEY`
- `NEWS_API_KEY`
- `ANTHROPIC_API_KEY` (optional)
- **Persist teach:** `KV_REST_API_URL` + `KV_REST_API_TOKEN` (from **Vercel → Storage → Create KV**), or `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` from [Upstash](https://console.upstash.com/). Without these, **teach** only works for the current request on Vercel.

Then **Redeploy**.

---

## 4. Check it works

- **/** — static UI
- **POST /api/chat** — chat (`{"message":"…", "history":[]}`)
- **GET /api/status** — `{ wikipedia, weather, dictionary, web, news, openai }`

---

## Run locally

```bash
python app.py
# → http://127.0.0.1:5000
```
