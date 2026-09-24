import Icon from '../components/Icon.jsx'
import PageHero from '../components/PageHero.jsx'
import CTASection from '../components/CTASection.jsx'
import { jobs, company } from '../data/content.js'

export default function Careers() {
  return (
    <>
      <PageHero eyebrow="Careers" title="Join our team">
        We&apos;re always looking for talented PeopleSoft professionals to join
        our growing practice. Explore our current openings below — Edmonton-based
        remote, full-time roles.
      </PageHero>

      <section className="section section--white">
        <div className="container">
          <div className="grid">
            {jobs.map((job) => (
              <article key={job.title} className="job-card">
                <div className="job-card__head">
                  <div>
                    <h3>{job.title}</h3>
                    <div className="job-card__meta">
                      {job.meta.map((m) => (
                        <span key={m} className="tag">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    className="btn btn--primary"
                    href={`${company.emailHref}?subject=${encodeURIComponent(
                      `Application: ${job.title}`,
                    )}`}
                  >
                    Apply now
                    <Icon name="arrow-right" size={18} className="icon--arrow" />
                  </a>
                </div>

                <div className="job-card__quals">
                  <h4>About the qualifications</h4>
                  <ul className="check-list">
                    {job.quals.map((qual) => (
                      <li key={qual}>
                        <Icon name="check" size={18} strokeWidth={2.4} />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <p className="form-note mt-8">
            Don&apos;t see the right role? Send your résumé to{' '}
            <a href={company.emailHref}>{company.email}</a> — we&apos;d still
            like to hear from you.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to grow with us?"
        text="Bring your PeopleSoft expertise to a team that values deep Oracle knowledge and long-term client partnerships."
      />
    </>
  )
}
