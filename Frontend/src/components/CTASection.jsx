import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// Sky-blue call-to-action band. Simple, spacious, professional.
export default function CTASection({
  title = 'Ready to strengthen your Oracle and PeopleSoft environment?',
  text = 'Tell us where you are today and where you want to be. Our team will help you get there — with deep Oracle expertise and service you can rely on.',
}) {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="cta__actions">
          <Link to="/contact" className="btn btn--white btn--lg">
            Contact our team
            <Icon name="arrow-right" size={18} className="icon--arrow" />
          </Link>
          <Link to="/services" className="btn btn--ghost-light btn--lg">
            Explore services
          </Link>
        </div>
      </div>
    </section>
  )
}
