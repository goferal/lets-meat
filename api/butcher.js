export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const messages = (Array.isArray(req.body?.messages) ? req.body.messages : [])
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map(m => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Send at least one user message' });
  }

  const raffles = await fetchRaffles();

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 600,
        system: butcherSystemPrompt(raffles),
        messages,
      }),
    });

    if (!r.ok) {
      console.error('Anthropic API error', r.status, await r.text());
      return res.status(200).json({ reply: OFFLINE_REPLY });
    }

    const data = await r.json();
    const reply = (data.content || [])
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n')
      .trim() || OFFLINE_REPLY;

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Function error', err);
    return res.status(200).json({ reply: OFFLINE_REPLY });
  }
}

const OFFLINE_REPLY =
  'The Butcher stepped out back for a smoke — try again in a minute, or browse the directory below.';

async function fetchRaffles() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) return [];
  try {
    const url =
      `${process.env.SUPABASE_URL}/rest/v1/raffles` +
      `?verified=eq.true&select=bar,city,state,day,time_slot,cost,prizes,benefits&limit=100`;
    const r = await fetch(url, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
    });
    return r.ok ? await r.json() : [];
  } catch {
    return [];
  }
}

function butcherSystemPrompt(raffles) {
  const directory = raffles.length ? JSON.stringify(raffles) : '[] (directory is empty right now)';
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
