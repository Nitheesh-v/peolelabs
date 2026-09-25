import Icon from './Icon.jsx'
import { sectors } from '../data/content.js'

// Client sector cards — white, light border, sky-blue icon, subtle hover lift.
export default function ClientSectors() {
  return (
    <div className="grid grid--3">
      {sectors.map((sector) => (
        <article key={sector.title} className="card card--hover sector-card">
          <span className="icon-tile">
            <Icon name={sector.icon} size={24} />
          </span>
          <h3 className="card__title">{sector.title}</h3>
          <p className="card__text">{sector.text}</p>
        </article>
      ))}
    </div>
  )
}
