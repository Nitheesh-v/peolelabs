import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'

const companyLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
]

const serviceLinks = [
  'PeopleSoft FSCM',
  'PeopleSoft HCM',
  'PeopleSoft Campus Solutions',
  'PeopleSoft Reporting',
  'Oracle Cloud',
  'Managed Services',
  'Training',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo size={38} />
            <p className="footer__tagline">
              Oracle and PeopleSoft consulting that moves your business forward.
              Deep functional and technical expertise, delivered with care.
            </p>
            <span className="footer__since">
              <Icon name="calendar" size={18} />
              Delivering Oracle expertise since 2016
            </span>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <ul className="footer__links">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <ul className="footer__links">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link to="/services">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4>Get in touch</h4>
            <ul className="footer__contact">
              <li>
                <Icon name="map-pin" size={18} />
                <span>
                  PeopleLabs Consulting
                  <br />
                  3269 Cherry Crescent SW
                  <br />
                  Edmonton, Alberta T6X 1Y5
                  <br />
                  Canada
                </span>
              </li>
              <li>
                <Icon name="phone" size={18} />
                <a href="tel:+15874003360">+1 587 400 3360</a>
              </li>
              <li>
                <Icon name="mail" size={18} />
                <a href="mailto:kiran.rajan@peoplelabsconsulting.com">
                  kiran.rajan@peoplelabsconsulting.com
                </a>
              </li>
              <li className="footer__hours">
                <Icon name="clock" size={18} />
                <span>
                  <strong>Business Hours</strong>
                  <br />
                  9:00 a.m. – 5:00 p.m.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} PeopleLabs Consulting. All rights reserved.</p>
          <p>Edmonton, Alberta, Canada</p>
        </div>
      </div>
    </footer>
  )
}
