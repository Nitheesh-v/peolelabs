import Icon from './Icon.jsx'
import { expertiseGroups } from '../data/content.js'

export default function ExpertiseSection() {
  return (
    <section id="expertise" className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="expertise-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Our capabilities</p>
          <h2 id="expertise-title" className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Our Expertise &amp; Offerings</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            PeopleLabs provides Oracle and PeopleSoft expertise across enterprise finance, human capital management, higher education, and reporting.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          {expertiseGroups.map((group) => (
            <article key={group.id} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600" aria-hidden="true">
                  <Icon name={group.icon} size={24} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">{group.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{group.description}</p>
                </div>
              </div>
              <ul className={`mt-6 grid gap-x-5 gap-y-3 border-t border-slate-100 pt-5 ${group.items.length > 5 ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-5 text-slate-700">
                    <span className="mt-0.5 shrink-0 text-sky-600" aria-hidden="true">
                      <Icon name="check" size={16} strokeWidth={2.2} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
