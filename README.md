# Let's Meat 🥩

Stories from the meat raffles of the Upper Midwest. The raffle is the setting.
The people are the story. Live at [lets-meat.com](https://lets-meat.com).

## Stack

- **Vite + React** frontend, deployed to GitHub Pages via Actions
- **Supabase** — stories & raffle directory database (`backend/schema.sql`)
- **Cloudflare Worker** — "The Butcher" concierge agent, proxying the Claude API
  (`backend/worker.js`)

## Develop locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Deploy (automatic)

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app
and publishes `dist/` to GitHub Pages. One-time setup after pushing this repo:
**Settings → Pages → Source: GitHub Actions**.

`public/CNAME` keeps the custom domain (lets-meat.com) attached. If previewing
at `goferal.github.io/lets-meat` without the custom domain, set
`base: '/lets-meat/'` in `vite.config.js`.

## Connect the backend

Follow `BACKEND-SETUP.md` (Supabase → Cloudflare Worker → Claude API key),
then fill in `src/config.js`:

```js
export const LM_CONFIG = {
  CONCIERGE_URL: "https://butcher.YOURNAME.workers.dev",
  SUPABASE_URL: "https://YOURPROJECT.supabase.co",
  SUPABASE_ANON_KEY: "eyJ..."
}
```

Everything runs in demo mode until these are filled. NEVER put the Anthropic
API key in this repo — it lives only in the Worker's secrets.

## Project map

```
src/
  App.jsx               section order lives here
  config.js             backend endpoints (safe-to-expose values only)
  index.css             the whole butcher-paper design system
  components/
    Hero.jsx BedScene.jsx     the steaks. in bed.
    Stories.jsx               Faces of the Freezer (chapter one)
    History.jsx Directory.jsx MeatWheel.jsx
    HeatMap.jsx Submit.jsx    story form → Supabase
    Butcher.jsx               🥩 chat widget → Worker → Claude
backend/
  worker.js schema.sql
```

## Roadmap

- Fetch approved stories from Supabase into Faces of the Freezer
- Live directory from verified Supabase rows
- Real heat map: MN Gambling Control Board licenses + Census ACS income data
- The Scout (raffle-finding agent) & The Editor (story-polishing agent)
