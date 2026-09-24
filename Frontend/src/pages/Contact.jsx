import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { company } from '../data/content.js'
import { FadeUp } from '../components/motion/MotionPrimitives.jsx'

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s talk">
        Have a question about your Oracle or PeopleSoft environment? Drop us a
        line and we&apos;ll get back to you.
      </PageHero>

      <section className="section section--white ambient-bg">
        <div className="container contact-layout">
          <FadeUp as="div">
            <span className="eyebrow">Get in touch</span>
            <h2 className="mb-6">We&apos;d love to hear from you</h2>

            <FadeUp as="div" className="contact-info" delay={0.08}>
              <div className="info-item">
                <span className="icon-tile icon-tile--sm">
                  <Icon name="map-pin" size={20} />
                </span>
                <div>
                  <h3>Office</h3>
                  <p>
                    {company.name}
                    <br />
                    {company.address[0]}
                    <br />
                    {company.address[1]}
                    <br />
                    {company.address[2]}
                  </p>
                </div>
              </div>

              <div className="info-item">
                <span className="icon-tile icon-tile--sm">
                  <Icon name="phone" size={20} />
                </span>
                <div>
                  <h3>Phone</h3>
                  <p>
                    <a href={company.phoneHref}>{company.phone}</a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <span className="icon-tile icon-tile--sm">
                  <Icon name="mail" size={20} />
                </span>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href={company.emailHref}>{company.email}</a>
                  </p>
                </div>
              </div>

              <div className="info-item">
                <span className="icon-tile icon-tile--sm">
                  <Icon name="clock" size={20} />
                </span>
                <div>
                  <h3>Business hours</h3>
                  <p>{company.hours}</p>
                </div>
              </div>
            </FadeUp>
          </FadeUp>

          <FadeUp as="div" delay={0.12}>
            <h2 className="mb-6">Send us a message</h2>
            <ContactForm />
          </FadeUp>
        </div>
      </section>
    </>
  )
}
