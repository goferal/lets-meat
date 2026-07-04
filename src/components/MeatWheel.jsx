import { useState, useRef } from 'react'

const CUTS = [
  { label: 'Bacon Bundle', color: '#A61B1B' },
  { label: 'Two Ribeyes', color: '#E9D8B4' },
  { label: 'Pork Chop Pack', color: '#4A3C7A' },
  { label: 'Brat 10-Pack', color: '#A61B1B' },
  { label: 'Whole Chicken', color: '#E9D8B4' },
  { label: 'Summer Sausage', color: '#4A3C7A' },
  { label: 'Ground Beef 5lb', color: '#A61B1B' },
  { label: 'Holiday Ham', color: '#E9D8B4' },
]

const CX = 100, CY = 100, R = 95
const N = CUTS.length

function slicePath(i) {
  const a0 = (i / N) * 2 * Math.PI - Math.PI / 2
  const a1 = ((i + 1) / N) * 2 * Math.PI - Math.PI / 2
  const x0 = CX + R * Math.cos(a0), y0 = CY + R * Math.sin(a0)
  const x1 = CX + R * Math.cos(a1), y1 = CY + R * Math.sin(a1)
  return `M${CX},${CY} L${x0},${y0} A${R},${R} 0 0 1 ${x1},${y1} Z`
}

function labelProps(i) {
  const a0 = (i / N) * 2 * Math.PI - Math.PI / 2
  const a1 = ((i + 1) / N) * 2 * Math.PI - Math.PI / 2
  const mid = (a0 + a1) / 2
  const x = CX + R * 0.62 * Math.cos(mid)
  const y = CY + R * 0.62 * Math.sin(mid)
  return { x, y, transform: `rotate(${(mid * 180) / Math.PI + 90} ${x} ${y})` }
}

export default function MeatWheel() {
  const [rot, setRot] = useState(0)
  const [result, setResult] = useState('')
  const spinning = useRef(false)

  function spin() {
    if (spinning.current) return
    spinning.current = true
    setResult('…')
    const winner = Math.floor(Math.random() * N)
    const sliceAngle = 360 / N
    const target = 360 * 5 + (360 - (winner * sliceAngle + sliceAngle / 2))
    setRot(r => r + target)
    setTimeout(() => {
      setResult(`You won: ${CUTS[winner].label}!`)
      spinning.current = false
    }, 4300)
  }

  return (
    <div className="wheel-wrap" style={{ margin: '0 auto 2.5rem' }}>
      <div className="wheel-frame">
        <div className="pointer" aria-hidden="true" />
        <svg
          id="wheel"
          viewBox="0 0 200 200"
          role="img"
          aria-label="Wheel of meat prize spinner"
          style={{ transform: `rotate(${rot}deg)` }}
        >
          <g>
            {CUTS.map((c, i) => (
              <path key={c.label} d={slicePath(i)} fill={c.color} stroke="#2A1E16" strokeWidth="2" />
            ))}
            {CUTS.map((c, i) => {
              const p = labelProps(i)
              return (
                <text
                  key={c.label}
                  x={p.x} y={p.y}
                  textAnchor="middle"
                  fontFamily="Oswald,sans-serif"
                  fontSize="7.5"
                  letterSpacing=".5"
                  fill={c.color === '#E9D8B4' ? '#2A1E16' : '#FBF6EC'}
                  transform={p.transform}
                >
                  {c.label.toUpperCase()}
                </text>
              )
            })}
          </g>
          <circle cx="100" cy="100" r="97" fill="none" stroke="#2A1E16" strokeWidth="5" />
          <circle cx="100" cy="100" r="14" fill="#2A1E16" />
          <circle cx="100" cy="100" r="6" fill="#E9D8B4" />
        </svg>
      </div>
      <button className="btn" type="button" onClick={spin}>Spin the wheel · $1</button>
      <div className="wheel-result" aria-live="polite">{result}</div>
    </div>
  )
}
