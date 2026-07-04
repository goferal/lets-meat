# Let's Meat — Backend & Meat Agent Setup

Three pieces, in order. Total time: ~45 minutes. All free tiers except the
Claude API, which is pay-as-you-go (a site chatbot on Haiku costs pennies).

The site works fine before any of this is done — the form and chat run in
"demo mode" until you fill in the config.

---

## Piece 1 — Supabase (the database) · ~15 min

1. Sign up free at supabase.com → **New project** (name it `lets-meat`,
   pick a region near Minneapolis, set a strong DB password and save it).
2. Once it spins up, open **SQL Editor** → New query → paste the entire
   contents of `backend/schema.sql` → **Run**.
   This creates the `raffles` and `stories` tables with security rules:
   anyone can *submit*, but only rows you've approved are publicly readable.
3. Go to **Project Settings → API** and copy two values:
   - **Project URL** (looks like `https://abcdefg.supabase.co`)
   - **anon public key** (long string — this one is safe to put in website code)

**Moderating submissions:** In Supabase → **Table Editor**, open `stories`
or `raffles`. New submissions arrive with `approved`/`verified` = false.
Flip the box to true to publish. That's your whole admin panel for now.

## Piece 2 — The Concierge Worker (the agent's brain) · ~20 min

1. Get a Claude API key: go to console.anthropic.com → sign up → add a
   payment method → **Settings → API keys → Create key**. Copy it
   immediately (it's shown once) and treat it like a bank password.
   Set a low monthly spend limit in the console (e.g. $5) while testing.
2. Sign up free at dash.cloudflare.com → **Workers & Pages → Create →
   Create Worker**. Name it `butcher`. Deploy the default, then click
   **Edit code**, delete everything, paste the contents of
   `backend/worker.js`, and **Deploy**.
3. In the Worker's **Settings → Variables and Secrets**, add three secrets
   (type: Secret):
   - `ANTHROPIC_API_KEY` — from step 1
   - `SUPABASE_URL` — from Piece 1
   - `SUPABASE_ANON_KEY` — from Piece 1
4. Copy your Worker URL (like `https://butcher.yourname.workers.dev`).

Why the Worker exists: your Claude API key must NEVER appear in website
code — anyone could view-source and steal it, and you'd pay for their
usage. The Worker keeps the key server-side and only exposes a chat
endpoint locked to your site's domains.

## Piece 3 — Connect the site · ~5 min

1. Open `index.html` and find the `LM_CONFIG` block near the bottom:

   ```js
   const LM_CONFIG = {
     CONCIERGE_URL: "",      // ← Worker URL from Piece 2
     SUPABASE_URL: "",       // ← from Piece 1
     SUPABASE_ANON_KEY: ""   // ← from Piece 1 (anon key ONLY, never service_role)
   };
   ```

2. Fill in the three values, save, and commit the updated `index.html`
   to the GitHub repo (edit it right on github.com or re-upload).
3. GitHub Pages redeploys in about a minute. Open the site, click the 🥩
   button, and ask the Butcher where to find a raffle.

---

## How it all flows

```
Visitor ──▶ lets-meat.com (GitHub Pages, static)
   │  story form  ──────────────▶ Supabase (pending until you approve)
   │  🥩 chat ──▶ Cloudflare Worker ──▶ Claude API (Haiku)
   │                    │
   │                    └──▶ Supabase (reads verified raffles
   │                          so the Butcher only cites real ones)
```

## Costs at your scale

- GitHub Pages, Supabase, Cloudflare Workers: $0
- Claude API: Haiku 4.5 runs about $1 per million input tokens / $5 per
  million output. A typical Butcher exchange is ~2,000 tokens — you could
  handle thousands of chats for a few dollars. Set a console spend limit
  anyway. Current pricing: https://docs.claude.com/en/docs/about-claude/pricing

## Later upgrades (when you're ready)

- **Publish approved stories live:** fetch approved rows from Supabase and
  render them into Faces of the Freezer instead of the placeholders.
- **Live directory:** same for the raffle board — the table becomes a
  Supabase query instead of hard-coded rows.
- **The Scout & The Editor:** the other two agents plug into this same
  Worker pattern — new endpoints, same secrets.
- **Rate limiting:** if the Butcher gets popular (or spammed), add
  Cloudflare rate limiting rules to the Worker (free tier includes basics).
