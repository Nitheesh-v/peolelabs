// Abstract enterprise-architecture visual for the hero.
// Pure SVG: white cards, sky-blue accents, very-light-blue fills.
// Represents connected Oracle/PeopleSoft systems — no fake data or logos.
const modules = [
  {
    x: 36,
    y: 112,
    label: 'FSCM',
    glyph: (
      <>
        <path d="M12 3v18" />
        <path d="M16.5 7H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H7.5" />
      </>
    ),
  },
  {
    x: 384,
    y: 112,
    label: 'HCM',
    glyph: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19.5c0-2.9 2.5-4.4 5.5-4.4s5.5 1.5 5.5 4.4" />
        <circle cx="17" cy="9" r="2.3" />
        <path d="M16.2 15.3c2.5.3 4.3 1.8 4.3 4.2" />
      </>
    ),
  },
  {
    x: 36,
    y: 306,
    label: 'Campus',
    glyph: (
      <>
        <path d="M12 4 3 8.5 12 13l9-4.5L12 4Z" />
        <path d="M7 11.2v4c0 1.5 2.2 2.7 5 2.7s5-1.2 5-2.7v-4" />
      </>
    ),
  },
  {
    x: 384,
    y: 306,
    label: 'Cloud',
    glyph: (
      <path d="M17.5 18.5H7a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9.7a4.3 4.3 0 0 1 .5 8.8Z" />
    ),
  },
]

const connectors = [
  { d: 'M214 206 C180 196 168 168 176 148', dash: false },
  { d: 'M346 206 C380 196 392 168 384 148', dash: true },
  { d: 'M214 274 C180 284 168 312 176 338', dash: true },
  { d: 'M346 274 C380 284 392 312 384 338', dash: false },
]
const nodeDots = [
  [176, 148],
  [384, 148],
  [176, 338],
  [384, 338],
]

export default function HeroVisual() {
  return (
    <svg
      viewBox="0 0 560 480"
      role="img"
      aria-label="Illustration of connected Oracle and PeopleSoft systems forming a unified platform"
    >
      <defs>
        <pattern id="pl-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#38BDF8" opacity="0.28" />
        </pattern>
        <radialGradient id="pl-fade" cx="50%" cy="50%" r="52%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="68%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <mask id="pl-dots-mask">
          <rect width="560" height="480" fill="url(#pl-fade)" />
        </mask>
        <filter id="pl-card" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="11"
            floodColor="#0F172A"
            floodOpacity="0.09"
          />
        </filter>
      </defs>

      {/* Soft backdrop */}
      <circle cx="280" cy="240" r="205" fill="#F0F9FF" />
      <circle
        cx="280"
        cy="240"
        r="205"
        fill="none"
        stroke="#E0F2FE"
        strokeWidth="1.5"
      />
      <circle
        cx="280"
        cy="240"
        r="224"
        fill="none"
        stroke="#BAE6FD"
        strokeWidth="1.5"
        strokeDasharray="3 9"
        opacity="0.7"
      />

      {/* Faint tech texture */}
      <rect
        width="560"
        height="480"
        fill="url(#pl-dots)"
        mask="url(#pl-dots-mask)"
        opacity="0.6"
      />

      {/* Connectors (behind cards) */}
      <g fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" opacity="0.75">
        {connectors.map((c, i) => (
          <path key={i} d={c.d} strokeDasharray={c.dash ? '7 7' : undefined} />
        ))}
      </g>
      <g fill="#0EA5E9">
        {nodeDots.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.6" />
        ))}
      </g>

      {/* Central hub */}
      <g filter="url(#pl-card)">
        <rect
          x="192"
          y="182"
          width="176"
          height="116"
          rx="16"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />
      </g>
      <rect x="260" y="198" width="40" height="40" rx="11" fill="#0EA5E9" />
      <g
        transform="translate(263.2 201.2) scale(1.4)"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
        <path d="M3 12l9 4.5L21 12" />
        <path d="M3 16.5 12 21l9-4.5" />
      </g>
      <text
        x="280"
        y="262"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill="#0F172A"
      >
        PeopleSoft
      </text>
      <text
        x="280"
        y="281"
        textAnchor="middle"
        fontSize="11"
        fontWeight="500"
        fill="#64748B"
      >
        Unified Platform
      </text>

      {/* Module cards */}
      {modules.map((m) => (
        <g key={m.label} filter="url(#pl-card)">
          <rect
            x={m.x}
            y={m.y}
            width="140"
            height="64"
            rx="12"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          <rect
            x={m.x + 14}
            y={m.y + 16}
            width="32"
            height="32"
            rx="9"
            fill="#E0F2FE"
          />
          <g
            transform={`translate(${m.x + 20} ${m.y + 22}) scale(0.833)`}
            fill="none"
            stroke="#0284C7"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {m.glyph}
          </g>
          <text
            x={m.x + 58}
            y={m.y + 39}
            fontSize="14"
            fontWeight="600"
            fill="#0F172A"
          >
            {m.label}
          </text>
        </g>
      ))}

      {/* Cloud accent (top) */}
      <path
        d="M252 94c-9 0-16-7-16-16 0-8 6-15 14-16 2-11 12-19 24-19 10 0 19 6 22 15 9 1 16 8 16 17 0 10-8 18-18 18H252Z"
        fill="#E0F2FE"
        stroke="#38BDF8"
        strokeWidth="2"
      />

      {/* Data-store accent (bottom) */}
      <g fill="none" stroke="#0EA5E9" strokeWidth="1.8">
        <ellipse cx="280" cy="396" rx="24" ry="8" fill="#E0F2FE" />
        <path d="M256 396v13c0 4.4 10.7 8 24 8s24-3.6 24-8v-13" />
        <path d="M256 402.5c0 4.4 10.7 8 24 8s24-3.6 24-8" opacity="0.45" />
      </g>

      {/* Floating accents */}
      <rect
        x="96"
        y="54"
        width="14"
        height="14"
        rx="4"
        fill="#38BDF8"
        opacity="0.85"
        transform="rotate(20 103 61)"
      />
      <rect
        x="470"
        y="198"
        width="12"
        height="12"
        rx="4"
        fill="#BAE6FD"
        transform="rotate(-15 476 204)"
      />
      <g fill="#0EA5E9" opacity="0.5">
        <circle cx="110" cy="408" r="3" />
        <circle cx="126" cy="416" r="3" />
        <circle cx="96" cy="422" r="3" />
      </g>
    </svg>
  )
}
