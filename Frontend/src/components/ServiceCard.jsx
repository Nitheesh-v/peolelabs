import Icon from './Icon.jsx'

// Compact expertise card for the homepage — icon, title, summary, module chips.
export default function ServiceCard({ service }) {
  return (
    <article className="card card--hover service-card">
      <div className="service-card__head">
        <span className="icon-tile icon-tile--sm">
          <Icon name={service.icon} size={22} />
        </span>
        <h3>{service.title}</h3>
      </div>
      <p className="card__text">{service.summary}</p>
      <ul className="tag-list">
        {service.items.slice(0, 5).map((item) => (
          <li key={item} className="tag">
            {item}
          </li>
        ))}
        {service.items.length > 5 && (
          <li className="tag">+{service.items.length - 5} more</li>
        )}
      </ul>
    </article>
  )
}
