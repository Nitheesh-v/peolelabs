import Icon from './Icon.jsx'

// "Why PeopleLabs" pillar card.
export default function ValueCard({ value }) {
  return (
    <article className="value-card">
      <span className="icon-tile">
        <Icon name={value.icon} size={24} />
      </span>
      <h3>{value.title}</h3>
      <p>{value.text}</p>
    </article>
  )
}
