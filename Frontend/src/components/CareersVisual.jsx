export default function CareersVisual() {
  return (
    <svg
      viewBox="0 0 560 440"
      className="h-auto w-full"
      role="img"
      aria-label="Abstract connected PeopleSoft enterprise applications"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="career-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#38BDF8" opacity="0.34" />
        </pattern>
        <filter id="career-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      <circle cx="280" cy="220" r="187" fill="#F0F9FF" />
      <circle cx="280" cy="220" r="187" fill="url(#career-dots)" opacity="0.52" />
      <circle cx="280" cy="220" r="205" fill="none" stroke="#BAE6FD" strokeWidth="1.5" strokeDasharray="4 10" />

      <g fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round">
        <path d="M177 145c28 14 45 30 61 48" />
        <path d="M383 145c-28 14-45 30-61 48" />
        <path d="M280 280v42" />
      </g>
      <g fill="#0EA5E9">
        <circle cx="177" cy="145" r="4" />
        <circle cx="383" cy="145" r="4" />
        <circle cx="280" cy="322" r="4" />
      </g>

      <g filter="url(#career-shadow)">
        <rect x="43" y="91" width="150" height="78" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
        <rect x="367" y="91" width="150" height="78" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
        <rect x="205" y="322" width="150" height="78" rx="14" fill="#FFFFFF" stroke="#E2E8F0" />
        <rect x="174" y="174" width="212" height="112" rx="22" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2" />
      </g>

      <g>
        <rect x="59" y="108" width="42" height="42" rx="12" fill="#E0F2FE" />
        <path d="M80 117v24M86 123h-9a5 5 0 0 0 0 10h6a5 5 0 0 1 0 10h-9" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        <text x="112" y="134" fill="#0F172A" fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif">FSCM</text>

        <rect x="383" y="108" width="42" height="42" rx="12" fill="#E0F2FE" />
        <circle cx="397" cy="123" r="5" fill="none" stroke="#0284C7" strokeWidth="2" />
        <path d="M388 142c0-8 4-12 9-12s9 4 9 12M410 124a4 4 0 1 0 0-8m0 12c5 1 7 4 7 9" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        <text x="436" y="134" fill="#0F172A" fontSize="15" fontWeight="600" fontFamily="Inter, sans-serif">HCM</text>

        <rect x="221" y="340" width="42" height="42" rx="12" fill="#E0F2FE" />
        <path d="m231 353 11-6 11 6-11 6-11-6Z" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
        <path d="M235 357v8c0 3 3 5 7 5s7-2 7-5v-8" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        <text x="273" y="367" fill="#0F172A" fontSize="14" fontWeight="600" fontFamily="Inter, sans-serif">Campus</text>
      </g>

      <rect x="254" y="193" width="52" height="52" rx="15" fill="#0EA5E9" />
      <g fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="280" cy="211" r="6" />
        <path d="M268 235c1-8 5-12 12-12s11 4 12 12M263 218l-7 5 7 5M297 218l7 5-7 5" />
      </g>
      <text x="280" y="263" textAnchor="middle" fill="#0F172A" fontSize="15" fontWeight="700" fontFamily="Inter, sans-serif">PeopleSoft expertise</text>
      <text x="280" y="280" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">Connected enterprise work</text>
    </svg>
  )
}
