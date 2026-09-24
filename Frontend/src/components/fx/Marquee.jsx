// Infinite, GPU-only ticker. The duplicate track is hidden from assistive tech.
export default function Marquee({ items, renderItem, className = '', speed = 38, reverse = false, label }) {
  const track = (hidden) => (
    <ul className="marquee__track" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <li key={`${hidden ? 'b' : 'a'}-${index}`} className="marquee__item">{renderItem(item)}</li>
      ))}
    </ul>
  )

  return (
    <div
      className={`marquee ${reverse ? 'marquee--reverse' : ''} ${className}`}
      style={{ '--marquee-duration': `${speed}s` }}
      role="region"
      aria-label={label}
    >
      <div className="marquee__inner">
        {track(false)}
        {track(true)}
      </div>
    </div>
  )
}
