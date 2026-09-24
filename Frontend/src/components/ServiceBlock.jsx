import Icon from './Icon.jsx'

// Detailed service block for the Services page — icon, title, summary,
// and a full module / feature list.
export default function ServiceBlock({ service }) {
  return (
    <article className="service-block" id={service.id}>
      <div className="service-block__head">
        <span className="icon-tile">
          <Icon name={service.icon} size={24} />
        </span>
        <h3>{service.title}</h3>
      </div>
      <p>{service.summary}</p>
      <ul className="module-list">
        {service.items.map((item) => (
          <li key={item}>
            <Icon name="check" size={16} strokeWidth={2.4} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
