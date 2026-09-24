// Eyebrow + heading + optional intro paragraph for section headers.
export default function SectionHeading({ eyebrow, title, intro, center = false }) {
  return (
    <div className={`section-head${center ? ' section-head--center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}
