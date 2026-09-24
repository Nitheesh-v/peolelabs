import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceBlock from '../components/ServiceBlock.jsx'
import CTASection from '../components/CTASection.jsx'
import { services, delivery } from '../data/content.js'

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Oracle & PeopleSoft services">
        A focused set of capabilities delivered by specialists — from core
        PeopleSoft modules and reporting to Oracle Cloud, managed services and
        training.
      </PageHero>

      {/* Core capabilities */}
      <section className="section section--white">
        <div className="container">
          <SectionHeading
            eyebrow="Core capabilities"
            title="Deep expertise across the Oracle stack"
            intro="Functional and technical coverage across the PeopleSoft modules and Oracle Cloud applications your business runs on."
          />
          <div className="grid grid--2">
            {services.map((service) => (
              <ServiceBlock key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How we deliver */}
      <section className="section section--tint">
        <div className="container">
          <SectionHeading
            eyebrow="How we deliver"
            title="Services that keep your environment running"
            intro="Beyond implementation, we provide the ongoing services that keep PeopleSoft stable, current and well-supported."
            center
          />
          <div className="grid grid--3">
            {delivery.map((item) => (
              <article key={item.title} className="value-card">
                <span className="icon-tile">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure where to start?"
        text="Tell us about your environment and goals, and we'll recommend the right mix of services for your organization."
      />
    </>
  )
}
