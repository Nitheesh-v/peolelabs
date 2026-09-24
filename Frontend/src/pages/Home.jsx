import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import HeroVisual from '../components/HeroVisual.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ClientSectors from '../components/ClientSectors.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ValueCard from '../components/ValueCard.jsx'
import CTASection from '../components/CTASection.jsx'
import { services, values } from '../data/content.js'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="eyebrow">Oracle &amp; PeopleSoft Consulting</span>
            <h1 className="hero__title">
              <span className="accent">Oracle &amp; PeopleSoft</span> Expertise
              That Moves Your Business Forward
            </h1>
            <p className="hero__lead">
              PeopleLabs Consulting helps organizations across Canada get more
              from their Oracle estate — PeopleSoft FSCM, HCM and Campus
              Solutions, reporting, and Oracle Cloud — backed by deep functional
              and technical expertise.
            </p>
            <div className="hero__actions">
              <Link to="/services" className="btn btn--primary btn--lg">
                Explore Our Services
                <Icon name="arrow-right" size={18} className="icon--arrow" />
              </Link>
              <Link to="/contact" className="btn btn--secondary btn--lg">
                Contact Us
              </Link>
            </div>
            <div className="hero__cred">
              <span className="badge">
                <Icon name="calendar" size={16} />
                Delivering Oracle expertise since 2016
              </span>
            </div>
          </div>
          <div className="hero__visual">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Client sectors */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Industries we serve"
            title="Experience across the sectors that run on PeopleSoft"
            intro="Our team has proven delivery experience across a range of industries — each with its own processes, controls and pace."
            center
          />
          <ClientSectors />
        </div>
      </section>

      {/* Expertise */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="Our expertise"
            title="Oracle & PeopleSoft, end to end"
            intro="From core financials to campus solutions and the cloud — a focused set of capabilities delivered by specialists."
            center
          />
          <div className="grid grid--3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="link-arrow">
              Explore all services
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why PeopleLabs */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Why PeopleLabs"
            title="Expertise you can build on"
            intro="A focused Oracle practice, invested in long-term partnerships and real results."
            center
          />
          <div className="grid grid--3">
            {values.slice(0, 3).map((value) => (
              <ValueCard key={value.title} value={value} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/about" className="link-arrow">
              More about us
              <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
