import { useState } from 'react'

export default function HeatMap() {
  const [showIncome, setShowIncome] = useState(false)
  return (
    <section id="map">
      <div className="sec-head">
        <span className="eyebrow">Chapter four</span>
        <h2>The Heat Map</h2>
        <p>Where do meat raffles cluster — and does it track with income? Toggle the overlay to compare raffle density against median household income by area.</p>
      </div>
      <div className="map-panel">
        <div>
          <svg viewBox="0 0 520 420" role="img" aria-label="Stylized map of the Upper Midwest showing meat raffle density">
        {/* stylized upper midwest: ND/SD/MN/WI/IA outlines (simplified) */}
        <g fill="#EFE6D2" stroke="#2A1E16" strokeWidth="2.5">
          <rect x="20"  y="30"  width="150" height="110" rx="4"/>  {/* ND */}
          <rect x="20"  y="150" width="150" height="110" rx="4"/>  {/* SD */}
          <path d="M180 30 h150 l20 60 -25 45 15 55 -35 60 h-125 z"/> {/* MN */}
          <path d="M360 95 l95 25 20 90 -30 95 -95 10 -15 -80 35 -60 z"/> {/* WI */}
          <rect x="180" y="262" width="160" height="120" rx="4"/> {/* IA */}
        </g>
        <g fontFamily="Oswald,sans-serif" fontSize="13" fill="#6b5a49" letterSpacing="2">
          <text x="80" y="90">ND</text>
          <text x="80" y="210">SD</text>
          <text x="245" y="120">MN</text>
          <text x="400" y="190">WI</text>
          <text x="250" y="330">IA</text>
        </g>
        {/* raffle density dots */}
        <g>
          <circle cx="262" cy="188" r="17" fill="#A61B1B" opacity=".78"/> {/* Twin Cities metro */}
          <circle cx="243" cy="170" r="10" fill="#A61B1B" opacity=".7"/>  {/* St. Cloud */}
          <circle cx="285" cy="95"  r="9"  fill="#A61B1B" opacity=".7"/>  {/* Iron Range/Duluth */}
          <circle cx="228" cy="228" r="7"  fill="#A61B1B" opacity=".65"/> {/* Mankato */}
          <circle cx="390" cy="160" r="9"  fill="#A61B1B" opacity=".7"/>  {/* Eau Claire/Chippewa */}
          <circle cx="428" cy="215" r="11" fill="#A61B1B" opacity=".72"/> {/* Fox Valley/Green Bay */}
          <circle cx="410" cy="280" r="12" fill="#A61B1B" opacity=".72"/> {/* Milwaukee ring */}
          <circle cx="95"  cy="70"  r="6"  fill="#A61B1B" opacity=".6"/>  {/* Fargo */}
          <circle cx="90"  cy="215" r="5"  fill="#A61B1B" opacity=".55"/> {/* Sioux Falls */}
          <circle cx="255" cy="310" r="5"  fill="#A61B1B" opacity=".5"/>  {/* N. Iowa */}
        </g>
        {/* income overlay (hidden by default) */}
        <g opacity={showIncome ? 1 : 0} style={{ transition: "opacity .4s" }}>
          <circle cx="262" cy="188" r="30" fill="#4A3C7A" opacity=".28"/>
          <circle cx="428" cy="215" r="20" fill="#4A3C7A" opacity=".25"/>
          <circle cx="410" cy="280" r="24" fill="#4A3C7A" opacity=".25"/>
          <circle cx="95"  cy="70"  r="14" fill="#4A3C7A" opacity=".22"/>
          <circle cx="90"  cy="215" r="14" fill="#4A3C7A" opacity=".22"/>
        </g>
      </svg>
        </div>
        <div className="map-side">
          <h3>Reading the board</h3>
          <div className="legend">
            <div className="row"><span className="dotkey" style={{ background: '#A61B1B' }} /> Raffle density (sample data — dot size = weekly raffles)</div>
            <div className="row"><span className="dotkey" style={{ background: '#4A3C7A', opacity: .45 }} /> Median household income overlay (higher = larger)</div>
          </div>
          <div className="toggle-row">
            <input type="checkbox" id="income-toggle" checked={showIncome} onChange={e => setShowIncome(e.target.checked)} />
            <label htmlFor="income-toggle">Show income overlay</label>
          </div>
          <p className="method"><strong>Working hypothesis:</strong> raffle density tracks fraternal-hall density (VFW, Legion, Eagles) more than income itself — clustering in working- and middle-class inner-ring suburbs, mill towns, and county seats rather than at either income extreme.</p>
          <p className="method" style={{ marginTop: '.75rem' }}><strong>Real data plan:</strong> Minnesota Gambling Control Board publishes licensed raffle organizations; Wisconsin DOJ licenses raffles similarly. Geocode license addresses, join to Census ACS tract-level median income, and render as a true choropleth. The map above is illustrative sample data.</p>
        </div>
      </div>
    </section>
  )
}
