// Original hand-styled map of the Indian Ocean region
// Sri Lanka · Maldives · Thailand — recognizable geography in olive line work
// Three style variants exposed via the `style` prop: 'topo' | 'silhouette' | 'blueprint'

function ReachMap({ style = "topo", animate = true }) {
  // Coordinates are stylized but geographically faithful (lat/lng visually preserved)
  // Viewbox covers ~70°E–105°E, 0°N–22°N

  const PATHS = {
    // Sri Lanka — teardrop south of India
    sriLanka:
      "M 358 218 C 348 210 344 222 346 234 C 348 248 352 262 360 274 C 368 286 380 292 388 286 C 396 280 398 266 396 252 C 394 240 388 228 380 222 C 372 216 364 214 358 218 Z",
    // Indian subcontinent edge (peninsula tip + Bay of Bengal coast — for context)
    india:
      "M 240 60 L 260 80 L 290 110 L 310 140 L 330 170 L 348 198 C 350 204 354 208 360 210 L 372 212 L 358 218 L 346 234 L 340 240 L 320 230 L 300 215 L 280 200 L 260 180 L 240 158 L 224 130 L 220 100 L 230 75 Z",
    // Mainland Southeast Asia — Thailand + neighbors silhouette
    seAsia:
      "M 660 100 L 690 90 L 720 95 L 745 110 L 760 130 L 775 155 L 785 180 L 790 210 L 786 240 L 776 268 L 762 290 L 750 305 L 740 318 L 728 330 L 720 345 L 716 360 L 720 376 L 728 390 L 720 396 L 706 386 L 696 368 L 690 348 L 686 328 L 684 308 L 680 290 L 672 272 L 666 254 L 660 232 L 656 208 L 652 184 L 650 160 L 654 130 Z",
    // Andaman/Nicobar dots
  };

  // Maldives atoll chain — vertical scatter of small ovals (north-south chain)
  const MALDIVES = [
    [442, 240, 6, 3], [438, 250, 7, 4], [444, 262, 5, 3], [440, 274, 8, 4],
    [436, 286, 6, 3], [442, 296, 7, 4], [438, 308, 5, 3], [444, 320, 6, 4],
    [440, 332, 4, 3], [442, 344, 6, 4], [438, 356, 5, 3], [444, 368, 7, 4],
    [440, 380, 5, 3], [438, 392, 4, 2],
  ];

  // Andaman/Nicobar small islands
  const ANDAMAN = [
    [598, 220, 3, 8], [596, 234, 3, 6], [600, 250, 3, 10],
    [602, 268, 2, 5], [600, 280, 3, 7],
  ];

  // City markers
  const CITIES = [
    { x: 388, y: 250, name: "Colombo", role: "Origin · QA", country: "Sri Lanka", emphasis: false },
    { x: 442, y: 312, name: "Malé", role: "HQ · Distribution · Logistics · Media", country: "Maldives", emphasis: true },
    { x: 740, y: 212, name: "Bangkok", role: "Sourcing · Trade Hub", country: "Thailand", emphasis: false },
  ];

  // Style-dependent colors
  const stroke = "currentColor";

  return (
    <div className={`map map--${style}`}>
      <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Map showing Roba presence in Sri Lanka, Maldives, and Thailand">
        <defs>
          {/* Topographic concentric rings around HQ */}
          <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <pattern id="seaTexture" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="currentColor" opacity="0.18" />
          </pattern>
          <pattern id="seaLines" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
            <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="0.4" opacity="0.18" />
          </pattern>
        </defs>

        {/* Sea background */}
        <rect width="1000" height="500" fill={style === "blueprint" ? "url(#seaLines)" : "url(#seaTexture)"} />

        {/* Coordinate grid */}
        {[100, 200, 300, 400].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} stroke={stroke} strokeWidth="0.4" opacity="0.12" strokeDasharray="2 8" />
        ))}
        {[200, 400, 600, 800].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" stroke={stroke} strokeWidth="0.4" opacity="0.12" strokeDasharray="2 8" />
        ))}

        {/* Lat/lng labels */}
        <g fontFamily="'JetBrains Mono', monospace" fontSize="9" fill={stroke} opacity="0.4">
          <text x="6" y="104">10°N</text>
          <text x="6" y="204">5°N</text>
          <text x="200" y="494" textAnchor="middle">75°E</text>
          <text x="600" y="494" textAnchor="middle">90°E</text>
        </g>

        {/* Equator line */}
        <line x1="0" y1="404" x2="1000" y2="404" stroke={stroke} strokeWidth="0.6" opacity="0.25" strokeDasharray="6 4" />
        <text x="990" y="400" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill={stroke} opacity="0.45" textAnchor="end">EQUATOR</text>

        {/* India context (faint) */}
        <path d={PATHS.india} fill={stroke} fillOpacity={style === "silhouette" ? 0.08 : 0.04} stroke={stroke} strokeWidth="0.6" strokeOpacity="0.35" />
        <text x="280" y="120" fontFamily="'Instrument Serif', serif" fontSize="14" fill={stroke} opacity="0.35" fontStyle="italic">India</text>

        {/* SE Asia context (faint, Thailand highlighted within) */}
        <path d={PATHS.seAsia} fill={stroke} fillOpacity={style === "silhouette" ? 0.08 : 0.04} stroke={stroke} strokeWidth="0.6" strokeOpacity="0.35" />

        {/* Andaman islands */}
        {ANDAMAN.map(([cx, cy, rx, ry], i) => (
          <ellipse key={`a${i}`} cx={cx} cy={cy} rx={rx} ry={ry} fill={stroke} fillOpacity="0.12" stroke={stroke} strokeWidth="0.5" strokeOpacity="0.4" />
        ))}

        {/* ─── Sri Lanka ─── */}
        <g>
          {/* Topo rings */}
          {style === "topo" && [3, 6, 9].map((r) => (
            <path key={r} d={PATHS.sriLanka} fill="none" stroke={stroke} strokeWidth="0.4" opacity="0.18" transform={`translate(${-r * 0.3} ${-r * 0.4}) scale(${1 + r * 0.04})`} style={{ transformOrigin: "370px 250px" }} />
          ))}
          <path d={PATHS.sriLanka} fill={stroke} fillOpacity={style === "blueprint" ? 0 : 0.25} stroke={stroke} strokeWidth={style === "blueprint" ? 1.2 : 0.8} />
          {/* Hatching */}
          {style !== "blueprint" && [0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={350 + i * 8} y1={222 + i * 3} x2={358 + i * 8} y2={250 + i * 3} stroke={stroke} strokeWidth="0.5" opacity="0.4" />
          ))}
        </g>

        {/* ─── Maldives atoll chain ─── */}
        <g>
          {/* Connecting dashed line down the chain */}
          <path d={`M 442 240 Q 438 290 441 340 T 438 392`} fill="none" stroke={stroke} strokeWidth="0.6" strokeDasharray="2 3" opacity="0.4" />
          {MALDIVES.map(([cx, cy, rx, ry], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
              fill={stroke}
              fillOpacity={style === "blueprint" ? 0 : 0.5}
              stroke={stroke}
              strokeWidth={style === "blueprint" ? 1 : 0.4}
            />
          ))}
        </g>

        {/* ─── Trade route arcs (HQ Maldives ↔ Sri Lanka, ↔ Thailand) ─── */}
        <g>
          <path d="M 442 312 Q 410 270 388 250" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.5">
            {animate && <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="3s" repeatCount="indefinite" />}
          </path>
          <path d="M 442 312 Q 600 240 740 212" fill="none" stroke={stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.5">
            {animate && <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="3.5s" repeatCount="indefinite" />}
          </path>
          <path d="M 388 250 Q 560 210 740 212" fill="none" stroke={stroke} strokeWidth="0.7" strokeDasharray="2 6" opacity="0.3" />
        </g>

        {/* ─── City markers ─── */}
        {CITIES.map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y})`}>
            {c.emphasis && (
              <>
                <circle r="36" fill="url(#hqGlow)" />
                <circle r="22" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.4">
                  {animate && <animate attributeName="r" from="22" to="32" dur="3s" repeatCount="indefinite" />}
                  {animate && <animate attributeName="opacity" from="0.5" to="0" dur="3s" repeatCount="indefinite" />}
                </circle>
                <circle r="14" fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.5" />
              </>
            )}
            <circle r={c.emphasis ? 5 : 3.5} fill={stroke} />
            {c.emphasis && <circle r="2" fill="var(--cream)" />}

            {/* Label tag */}
            <g transform={`translate(${c.x > 600 ? -8 : 14} ${c.emphasis ? -22 : -14})`}>
              <text textAnchor={c.x > 600 ? "end" : "start"} fontFamily="'Instrument Serif', serif" fontSize={c.emphasis ? 18 : 14} fill={stroke} fontWeight="400" fontStyle={c.emphasis ? "normal" : "italic"}>
                {c.name}
              </text>
              <text y="14" textAnchor={c.x > 600 ? "end" : "start"} fontFamily="'JetBrains Mono', monospace" fontSize="8" fill={stroke} opacity="0.6" letterSpacing="0.5">
                {c.role.toUpperCase()}
              </text>
              {c.emphasis && (
                <text y="-14" textAnchor={c.x > 600 ? "end" : "start"} fontFamily="'JetBrains Mono', monospace" fontSize="8" fill={stroke} opacity="0.7" letterSpacing="1">
                  ◆ HEADQUARTERS
                </text>
              )}
            </g>
          </g>
        ))}

        {/* Compass rose */}
        <g transform="translate(60 440)" opacity="0.55">
          <circle r="22" fill="none" stroke={stroke} strokeWidth="0.5" />
          <circle r="14" fill="none" stroke={stroke} strokeWidth="0.3" />
          <line x1="0" y1="-22" x2="0" y2="22" stroke={stroke} strokeWidth="0.5" />
          <line x1="-22" y1="0" x2="22" y2="0" stroke={stroke} strokeWidth="0.5" />
          <polygon points="0,-22 -3,-12 0,-15 3,-12" fill={stroke} />
          <text x="0" y="-26" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill={stroke}>N</text>
        </g>

        {/* Scale bar */}
        <g transform="translate(880 460)" opacity="0.55">
          <line x1="0" y1="0" x2="80" y2="0" stroke={stroke} strokeWidth="0.7" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke={stroke} strokeWidth="0.7" />
          <line x1="40" y1="-2" x2="40" y2="2" stroke={stroke} strokeWidth="0.5" />
          <line x1="80" y1="-3" x2="80" y2="3" stroke={stroke} strokeWidth="0.7" />
          <text x="40" y="-6" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill={stroke}>1000 KM</text>
        </g>

        {/* Cartouche / title */}
        <g transform="translate(60 50)">
          <text fontFamily="'Instrument Serif', serif" fontSize="22" fontStyle="italic" fill={stroke} opacity="0.85">The Roba Corridor</text>
          <text y="20" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill={stroke} opacity="0.55" letterSpacing="2">SRI LANKA · MALDIVES · THAILAND</text>
        </g>
      </svg>
    </div>
  );
}

window.ReachMap = ReachMap;
