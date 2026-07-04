import { useState } from 'react'
import { LM_CONFIG } from '../config.js'

export default function Submit() {
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({ name: '', city: '', won: '', story: '', raffle_tip: '' })

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!LM_CONFIG.SUPABASE_URL) {
      setStatus('✓ Story received (demo mode — backend not connected yet)')
      setForm({ name: '', city: '', won: '', story: '', raffle_tip: '' })
      return
    }
    setStatus('Sending…')
    try {
      const r = await fetch(`${LM_CONFIG.SUPABASE_URL}/rest/v1/stories`, {
        method: 'POST',
        headers: {
          apikey: LM_CONFIG.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${LM_CONFIG.SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(form),
      })
      if (!r.ok) throw new Error(await r.text())
      setStatus("✓ Story received — we review every one before it goes up. Thanks for feeding Let's Meat.")
      setForm({ name: '', city: '', won: '', story: '', raffle_tip: '' })
    } catch (err) {
      console.error(err)
      setStatus('Something went wrong — try again in a minute.')
    }
  }

  return (
    <section id="submit">
      <div className="submit-panel">
        <div>
          <span className="eyebrow" style={{ color: '#E9D8B4' }}>The whole point</span>
          <h2>Got a meat raffle story?</h2>
          <p>Won big? Lost for six straight years? Met your spouse over a bacon bundle? This site runs on your stories. Tell us yours — and if you know a raffle we're missing, drop that in too.</p>
        </div>
        <form className="submit-form" onSubmit={submit}>
          <input type="text" value={form.name} onChange={set('name')} placeholder="Your name (or nickname)" required aria-label="Your name or nickname" />
          <input type="text" value={form.city} onChange={set('city')} placeholder="City, State" required aria-label="City and state" />
          <input type="text" value={form.won} onChange={set('won')} placeholder="What'd you win? (or gloriously lose)" aria-label="What you won or lost" />
          <textarea
            value={form.story} onChange={set('story')} placeholder="Tell us the story…" rows="4" required aria-label="Your story"
            style={{ fontFamily: 'var(--font-body)', fontSize: '.92rem', padding: '.7rem .85rem', border: '3px solid var(--ink)', background: 'var(--paper)', color: 'var(--ink)', width: '100%', resize: 'vertical' }}
          />
          <input type="text" value={form.raffle_tip} onChange={set('raffle_tip')} placeholder="Raffle tip: bar, city, day/time (optional)" aria-label="Optional raffle tip" />
          <button className="btn" type="submit" style={{ justifySelf: 'start' }}>Send your story</button>
          <div aria-live="polite" style={{ fontFamily: 'var(--font-label)', fontSize: '.8rem', letterSpacing: '.08em', textTransform: 'uppercase' }}>{status}</div>
        </form>
      </div>
    </section>
  )
}
