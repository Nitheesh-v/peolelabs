import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ValueCard from '../components/ValueCard.jsx'
import CTASection from '../components/CTASection.jsx'
import { values } from '../data/content.js'

const capabilities = [
  'PeopleSoft FSCM, HCM & Campus Solutions',
  'PeopleSoft reporting — Kibana & nVision',
  'Oracle Fusion Cloud applications',
  'SLA-based managed application services',
  'Upgrades, cloud migration & virtualization',
  'Training & team enablement',
]

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="A focused Oracle & PeopleSoft practice, since 2016">
        PeopleLabs Consulting delivers high-quality Oracle services to
        organizations across a variety of industries — combining deep application
        knowledge with a genuine commitment to each client&apos;s success.
      </PageHero>

      {/* Story */}
      <section className="section section--white">
        <div className="container split">
          <div>
            <span className="eyebrow">Our story</span>
            <h2>Built on Oracle expertise, driven by results</h2>
            <p className="mt-8">
              PeopleLabs Consulting was started in 2016 to provide high-quality
              IT services to businesses in a variety of industries. Our team of
              experts has years of experience in Oracle technologies — PeopleSoft
              FSCM, PeopleSoft HCM, PeopleSoft Campus Solutions and Oracle Cloud.
            </p>
            <p className="mt-8">
              We understand that every business has unique IT needs, which is why
              we work closely with our clients to develop solutions that meet
              their specific requirements. With deep knowledge of Oracle
              applications, technology, managed services and training, our
              customers know they can count on us for consistent, superior
              service and real ROI.
            </p>
            <div className="mt-8">
              <Link to="/contact" className="btn btn--primary">
                Work with us
                <Icon name="arrow-right" size={18} className="icon--arrow" />
              </Link>
            </div>
          </div>

          <aside className="card">
            <span className="icon-tile icon-tile--solid">
              <Icon name="layers" size={24} />
            </span>
            <h3 className="card__title mb-6">What we do</h3>
            <ul className="check-list">
              {capabilities.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} strokeWidth={2.4} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Values */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Why PeopleLabs"
            title="What sets our practice apart"
            intro="The principles that shape how we work with every client."
            center
          />
          <div className="grid grid--3">
            {values.map((value) => (
              <ValueCard key={value.title} value={value} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's put our Oracle expertise to work for you"
        text="Whether you're planning an upgrade, a migration or ongoing managed support, we'd love to hear about your goals."
      />
    </>
  )
}
