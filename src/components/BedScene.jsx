export default function BedScene() {
  return (
    <svg className="bed-scene" viewBox="0 0 560 340" role="img" aria-label="Cartoon of two contented steaks tucked into bed together, sharing cigarettes after a good night">
      {/* framed picture of the wheel above the bed */}
      <g>
        <rect x="222" y="14" width="86" height="64" fill="#FBF6EC" stroke="#2A1E16" strokeWidth="3"/>
        <circle cx="265" cy="46" r="20" fill="none" stroke="#A61B1B" strokeWidth="3"/>
        <line x1="265" y1="26" x2="265" y2="66" stroke="#A61B1B" strokeWidth="2"/>
        <line x1="245" y1="46" x2="285" y2="46" stroke="#A61B1B" strokeWidth="2"/>
      </g>
      {/* headboard */}
      <rect x="70" y="85" width="380" height="115" rx="16" fill="#5A3A24" stroke="#2A1E16" strokeWidth="3"/>
      {/* pillows */}
      <rect x="103" y="148" width="124" height="54" rx="26" fill="#FBF6EC" stroke="#2A1E16" strokeWidth="3"/>
      <rect x="293" y="148" width="124" height="54" rx="26" fill="#FBF6EC" stroke="#2A1E16" strokeWidth="3"/>
      {/* lamp glow */}
      <circle cx="512" cy="172" r="36" fill="#F4D06F" opacity=".28"/>
      {/* LEFT STEAK: ribeye */}
      <g>
        <path d="M120,165 C118,133 141,116 168,118 C201,120 216,140 213,168 C210,197 186,212 160,208 C134,204 122,192 120,165 Z"
              fill="#B23A2E" stroke="#2A1E16" strokeWidth="3"/>
        <path d="M126,146 C142,118 196,113 210,150" fill="none" stroke="#F2E6C9" strokeWidth="9" strokeLinecap="round"/>
        <path d="M140,178 q8,-6 16,0" fill="none" stroke="#F2E6C9" strokeWidth="3" strokeLinecap="round"/>
        <path d="M158,192 q10,-5 18,2" fill="none" stroke="#F2E6C9" strokeWidth="3" strokeLinecap="round"/>
        {/* content closed eyes + blush */}
        <path d="M148,160 q6,7 12,0" fill="none" stroke="#2A1E16" strokeWidth="3" strokeLinecap="round"/>
        <path d="M172,160 q6,7 12,0" fill="none" stroke="#2A1E16" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="146" cy="174" r="5" fill="#E58A7A" opacity=".55"/>
        <circle cx="186" cy="174" r="5" fill="#E58A7A" opacity=".55"/>
        <path d="M158,180 q8,6 16,0" fill="none" stroke="#2A1E16" strokeWidth="3" strokeLinecap="round"/>
        {/* cigarette */}
        <g transform="rotate(-22 190 182)">
          <rect x="190" y="178" width="34" height="7" rx="2.5" fill="#FBF6EC" stroke="#2A1E16" strokeWidth="1.8"/>
          <rect x="190" y="178" width="9" height="7" rx="2.5" fill="#D9915B" stroke="#2A1E16" strokeWidth="1.8"/>
          <circle cx="226" cy="181.5" r="3" fill="#E86A2B"/>
        </g>
        <path className="smoke" d="M222,158 q6,-8 -1,-15 q-6,-7 1,-14" fill="none" stroke="#8a8a8a" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
      {/* RIGHT STEAK: t-bone */}
      <g>
        <path d="M300,168 C298,136 322,117 350,119 C382,121 398,141 395,169 C392,198 368,213 342,209 C316,205 302,195 300,168 Z"
              fill="#A64530" stroke="#2A1E16" strokeWidth="3"/>
        <path d="M342,132 h10 v20 h13 v10 h-13 v18 h-10 v-18 h-13 v-10 h13 z"
              fill="#F2E6C9" stroke="#2A1E16" strokeWidth="2"/>
        {/* one content eye, one wink */}
        <path d="M326,162 q6,7 12,0" fill="none" stroke="#2A1E16" strokeWidth="3" strokeLinecap="round"/>
        <path d="M360,164 q6,-6 12,0" fill="none" stroke="#2A1E16" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="324" cy="176" r="5" fill="#E58A7A" opacity=".55"/>
        <circle cx="368" cy="176" r="5" fill="#E58A7A" opacity=".55"/>
        <path d="M338,184 q9,6 18,0" fill="none" stroke="#2A1E16" strokeWidth="3" strokeLinecap="round"/>
        {/* cigarette (angled the other way) */}
        <g transform="rotate(22 336 186)">
          <rect x="302" y="182" width="34" height="7" rx="2.5" fill="#FBF6EC" stroke="#2A1E16" strokeWidth="1.8"/>
          <rect x="327" y="182" width="9" height="7" rx="2.5" fill="#D9915B" stroke="#2A1E16" strokeWidth="1.8"/>
          <circle cx="300" cy="185.5" r="3" fill="#E86A2B"/>
        </g>
        <path className="smoke s2" d="M300,164 q-6,-8 1,-15 q6,-7 -1,-14" fill="none" stroke="#8a8a8a" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
      {/* tiny floating heart between them */}
      <path className="floaty" d="M258,118 c-3,-6 -12,-4 -12,3 c0,5 7,9 12,13 c5,-4 12,-8 12,-13 c0,-7 -9,-9 -12,-3 z" fill="#A61B1B" opacity=".75"/>
      {/* mattress */}
      <rect x="60" y="196" width="400" height="84" fill="#FBF6EC" stroke="#2A1E16" strokeWidth="3"/>
      {/* quilt tucking them in */}
      <path d="M60,208 Q92,194 124,208 T188,208 T252,208 T316,208 T380,208 T444,208 L460,208 L460,280 L60,280 Z"
            fill="#A61B1B" stroke="#2A1E16" strokeWidth="3"/>
      <path d="M70,232 H452 M70,256 H452" stroke="#7E1212" strokeWidth="2" strokeDasharray="7 6" fill="none"/>
      {/* bed legs */}
      <rect x="72" y="280" width="15" height="22" fill="#5A3A24" stroke="#2A1E16" strokeWidth="2.5"/>
      <rect x="433" y="280" width="15" height="22" fill="#5A3A24" stroke="#2A1E16" strokeWidth="2.5"/>
      {/* nightstand + lamp + ashtray */}
      <rect x="474" y="216" width="76" height="64" fill="#5A3A24" stroke="#2A1E16" strokeWidth="3"/>
      <rect x="480" y="280" width="10" height="20" fill="#5A3A24" stroke="#2A1E16" strokeWidth="2.5"/>
      <rect x="534" y="280" width="10" height="20" fill="#5A3A24" stroke="#2A1E16" strokeWidth="2.5"/>
      <polygon points="494,152 530,152 540,186 484,186" fill="#4A3C7A" stroke="#2A1E16" strokeWidth="2.5"/>
      <rect x="508" y="186" width="7" height="24" fill="#2A1E16"/>
      <ellipse cx="512" cy="212" rx="16" ry="5" fill="#2A1E16"/>
      <ellipse cx="498" cy="222" rx="13" ry="4.5" fill="#8a8a8a" stroke="#2A1E16" strokeWidth="2"/>
    </svg>
  )
}
