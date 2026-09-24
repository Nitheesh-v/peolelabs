// PeopleLabs brand mark — sky-blue rounded tile with a connected-nodes glyph,
// paired with a dark wordmark and a sky-blue "Consulting" accent.
export default function Logo({ size = 36 }) {
  return (
    <span className="brand">
      <svg
        className="brand__mark"
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="64" height="64" rx="15" fill="#0EA5E9" />
        <path
          d="M32 25 L22 45 M32 25 L42 45"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="32" cy="22" r="4.6" fill="#FFFFFF" />
        <circle cx="22" cy="47" r="4.6" fill="#FFFFFF" />
        <circle cx="42" cy="47" r="4.6" fill="#FFFFFF" />
      </svg>
      <span className="brand__text">
        <span className="brand__name">PeopleLabs</span>
        <span className="brand__sub">Consulting</span>
      </span>
    </span>
  )
}
