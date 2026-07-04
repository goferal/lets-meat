/**
 * LET'S MEAT — The Concierge ("Ask the Butcher")
 * Cloudflare Worker: safely proxies chat between lets-meat.com and the Claude API,
 * grounding answers in the live raffle directory from Supabase.
 *
 * Secrets to set in the Cloudflare dashboard (Worker → Settings → Variables):
 *   ANTHROPIC_API_KEY   — from console.anthropic.com (never put this in website code)
 *   SUPABASE_URL        — e.g. https://abcdefg.supabase.co (optional until DB exists)
 *   SUPABASE_ANON_KEY   — Supabase anon/public key (optional until DB exists)
 */

const ALLOWED_ORIGINS = [
  "https://lets-meat.com",
  "https://www.lets-meat.com",
  "https://goferal.github.io",
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "POST only" }, 405, cors);

    // --- Parse & sanitize the incoming chat ---
    let body;
    try { body = await request.json(); } catch { return json({ error: "Bad JSON" }, 400, cors); }

    const messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-12)                                    // keep conversations short & cheap
      .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));

    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return json({ error: "Send at least one user message" }, 400, cors);
    }

    // --- Ground the Butcher in real directory data ---
    const raffles = await fetchRaffles(env);

    // --- Call Claude ---
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5",
          max_tokens: 600,
          system: butcherSystemPrompt(raffles),
          messages,
        }),
      });

      if (!resp.ok) {
        console.error("Anthropic API error", resp.status, await resp.text());
        return json({ reply: OFFLINE_REPLY }, 200, cors);
      }

      const data = await resp.json();
      const reply = (data.content || [])
        .filter(b => b.type === "text")
        .map(b => b.text)
        .join("\n")
        .trim() || OFFLINE_REPLY;

      return json({ reply }, 200, cors);
    } catch (err) {
      console.error("Worker error", err);
      return json({ reply: OFFLINE_REPLY }, 200, cors);
    }
  },
};

const OFFLINE_REPLY =
  "The Butcher stepped out back for a smoke — try again in a minute, or browse the directory below.";

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

async function fetchRaffles(env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return [];
  try {
    const url =
      `${env.SUPABASE_URL}/rest/v1/raffles` +
      `?verified=eq.true&select=bar,city,state,day,time_slot,cost,prizes,benefits&limit=100`;
    const r = await fetch(url, {
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      },
    });
    if (!r.ok) return [];
    return await r.json();
  } catch {
    return [];
  }
}

function butcherSystemPrompt(raffles) {
  const directory = raffles.length
    ? JSON.stringify(raffles)
    : "[] (directory is empty right now)";

  return `You are "The Butcher," the concierge for lets-meat.com — a website about meat raffle culture in the Upper Midwest and the people who love it.

PERSONALITY: Warm, dryly funny, unmistakably Upper Midwest. Think a friendly guy behind the meat counter who's seen it all. Keep replies SHORT — 1-3 sentences usually, never more than a short paragraph. You may use one "ope," "you betcha," or similar per conversation, max. Don't overdo the accent.

YOUR JOBS:
1. Help visitors find meat raffles using ONLY the verified directory below. Never invent a raffle, bar, time, or town that isn't in the data. If nothing matches, say the directory doesn't have one there yet and invite them to submit one they know about via the "Share Your Story" form.
2. Answer questions about meat raffle culture, history, and etiquette (paddlewheel spins, charitable gambling basics, what a bacon bundle is).
3. Encourage people to share their meat raffle stories via the form on the page — stories are the heart of the site.

VERIFIED RAFFLE DIRECTORY (JSON):
${directory}

RULES:
- Recommend only from the directory. Always remind people to call ahead since schedules change.
- No gambling strategy or encouragement to spend beyond fun; raffles here are charity fundraisers.
- If asked something unrelated to meat raffles, bars, or the site, politely steer back with humor.
- If someone shares a story in chat, react warmly and point them to the story form so it can be published.`;
}
