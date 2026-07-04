import { useState, useRef, useEffect } from 'react'
import { LM_CONFIG } from '../config.js'

const GREETING = "Afternoon. I'm the Butcher — ask me where to find a raffle, how a paddlewheel works, or anything meat-raffle-adjacent. What can I get ya?"
const DEMO_REPLY = "I'm not wired up to my brain yet (demo mode) — but soon I'll help you find raffles and swap stories. Check the directory below in the meantime."
const ERROR_REPLY = "Can't reach the back room right now — try again in a minute."

export default function Butcher() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ role: 'assistant', content: GREETING }])
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, thinking])

  async function send() {
    const text = input.trim()
    if (!text || thinking) return
    setInput('')
    const history = [...msgs, { role: 'user', content: text }]
    setMsgs(history)

    if (!LM_CONFIG.CONCIERGE_URL) {
      setMsgs([...history, { role: 'assistant', content: DEMO_REPLY }])
      return
    }

    setThinking(true)
    try {
      const r = await fetch(LM_CONFIG.CONCIERGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await r.json()
      setMsgs([...history, { role: 'assistant', content: data.reply || ERROR_REPLY }])
    } catch {
      setMsgs([...history, { role: 'assistant', content: ERROR_REPLY }])
    } finally {
      setThinking(false)
    }
  }

  return (
    <>
      <button id="butcher-fab" aria-label="Open Ask the Butcher chat" title="Ask the Butcher" onClick={() => setOpen(o => !o)}>
        🥩
      </button>
      <div id="butcher-panel" className={open ? 'open' : ''} role="dialog" aria-label="Ask the Butcher chat">
        <div className="butcher-head">
          Ask the Butcher
          <button aria-label="Close chat" onClick={() => setOpen(false)}>✕</button>
        </div>
        <div id="butcher-msgs" ref={scrollRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`bmsg ${m.role === 'user' ? 'user' : 'bot'}`}>{m.content}</div>
          ))}
          {thinking && <div className="bmsg bot typing">The Butcher is thinking…</div>}
        </div>
        <div className="butcher-inrow">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Where's a raffle near Brainerd?"
            aria-label="Message the Butcher"
          />
          <button onClick={send}>Send</button>
        </div>
      </div>
    </>
  )
}
