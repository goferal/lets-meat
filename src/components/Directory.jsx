import { useState } from 'react'
import MeatWheel from './MeatWheel.jsx'

// Sample data (fictional placeholders). When the backend is live, replace this
// with a fetch of verified rows from Supabase — see README "Live directory".
const SAMPLE_RAFFLES = [
  { bar: 'Northside VFW Post', tag: 'VFW', city: 'Maple Grove, MN', state: 'MN', day: 'Friday', time: 'Fri · 5:30 PM', cost: '$1/spin', prizes: 'Bacon bundles, ribeyes, pork chop packs', benefits: 'Youth Hockey' },
  { bar: 'Iron Range Tavern', tag: null, city: 'Hibbing, MN', state: 'MN', day: 'Saturday', time: 'Sat · 3:00 PM', cost: '$1/spin', prizes: 'Venison sticks, roasts, brat 10-packs', benefits: 'Fire Relief' },
  { bar: 'Legion Post 44', tag: 'Legion', city: 'Eau Claire, WI', state: 'WI', day: 'Friday', time: 'Fri · 6:00 PM', cost: '$2/spin', prizes: 'Full meat packs, cheese curd bonus round', benefits: 'Honor Guard' },
  { bar: 'Lakeshore Supper Club', tag: null, city: 'Green Bay, WI', state: 'WI', day: 'Sunday', time: 'Sun · 1:00 PM (in-season)', cost: '$1/spin', prizes: 'Brats, summer sausage, whole chickens', benefits: 'Food Shelf' },
  { bar: 'Prairie Eagles Club', tag: 'Eagles', city: 'Fargo, ND', state: 'ND', day: 'Thursday', time: 'Thu · 7:00 PM', cost: '$1/spin', prizes: 'Steak night packs, ground beef bundles', benefits: 'Scholarships' },
  { bar: 'Riverbend Bar & Grill', tag: null, city: 'St. Cloud, MN', state: 'MN', day: 'Sunday', time: 'Sun · 2:00 PM', cost: '$1/spin', prizes: 'Pork loins, bacon, holiday ham specials', benefits: 'Little League' },
]

export default function Directory() {
  const [state, setState] = useState('')
  const [day, setDay] = useState('')
  const [q, setQ] = useState('')

  const rows = SAMPLE_RAFFLES.filter(r =>
    (!state || r.state === state) &&
    (!day || r.day === day) &&
    (!q || `${r.bar} ${r.city} ${r.prizes} ${r.benefits}`.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <section id="directory">
      <div className="sec-head">
        <span className="eyebrow">Chapter three</span>
        <h2>The Directory</h2>
        <p>The board below is styled like the butcher's price list it deserves to be. Filter by state or day — and when this goes live, every row comes from a community submission. First, take a practice spin.</p>
      </div>
      <MeatWheel />
      <div className="directory-tools">
        <select value={state} onChange={e => setState(e.target.value)} aria-label="Filter by state">
          <option value="">All states</option>
          <option>MN</option><option>WI</option><option>ND</option><option>SD</option><option>IA</option>
        </select>
        <select value={day} onChange={e => setDay(e.target.value)} aria-label="Filter by day">
          <option value="">All days</option>
          <option>Friday</option><option>Saturday</option><option>Sunday</option><option>Thursday</option>
        </select>
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Search city or bar…" aria-label="Search directory" />
      </div>
      <div className="board">
        <table>
          <thead>
            <tr><th>Establishment</th><th>City / State</th><th>Day &amp; Time</th><th>Cost</th><th>On the wheel</th><th>Benefits</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.bar}>
                <td className="bar">{r.bar}{r.tag && <span className="tag">{r.tag}</span>}</td>
                <td>{r.city}</td>
                <td>{r.time}</td>
                <td>{r.cost}</td>
                <td>{r.prizes}</td>
                <td><span className="tag charity">{r.benefits}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="sample-note">⚠ Sample listings for prototype purposes — fictional venues shown as placeholders. Live version pulls from verified submissions and MN Gambling Control Board license data. Always call ahead; raffle schedules change seasonally.</p>
    </section>
  )
}
