import Icon from './Icon.jsx'
import { expertiseGroups } from '../data/content.js'
import { FadeUp, StaggerGroup, StaggerItem } from './motion/MotionPrimitives.jsx'
import { motion, useReducedMotion } from 'motion/react'
import RevealWords from './fx/RevealWords.jsx'
import TiltCard from './fx/TiltCard.jsx'

export default function ExpertiseSection() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="expertise" className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="expertise-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="eyebrow-line mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Our capabilities</p>
          <RevealWords as="h2" id="expertise-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl" text="Our Expertise & Offerings" />
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            PeopleLabs provides Oracle and PeopleSoft expertise across enterprise finance, human capital management, higher education, and reporting.
          </p>
        </FadeUp>
        <StaggerGroup className="grid gap-5 lg:grid-cols-2 lg:gap-6" stagger={0.1}>
          {expertiseGroups.map((group) => (
            <StaggerItem as="div" key={group.id} className="h-full">
              <TiltCard as="article" max={4} className="expertise-card group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 ease-out hover:border-sky-100 hover:shadow-2xl hover:shadow-sky-500/10 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="expertise-icon tilt-pop flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 text-sky-600 transition-[color,box-shadow] duration-300 group-hover:from-sky-500 group-hover:to-sky-600 group-hover:text-white group-hover:shadow-[0_10px_24px_-6px_rgba(14,165,233,0.6)]" aria-hidden="true">
                  <Icon name={group.icon} size={24} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">{group.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{group.description}</p>
                </div>
              </div>
              <ul className={`mt-6 grid gap-x-5 gap-y-3 border-t border-slate-100 pt-5 ${group.items.length > 5 ? 'sm:grid-cols-2' : 'sm:grid-cols-2'}`}>
                {group.items.map((item, itemIndex) => (
                  <motion.li
                    key={item}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                    transition={{ duration: 0.45, delay: 0.15 + itemIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-2.5 text-sm leading-5 text-slate-700"
                  >
                    <span className="mt-0.5 shrink-0 text-slate-400 transition-colors duration-200 group-hover:text-sky-600" aria-hidden="true">
                      <Icon name="check" size={16} strokeWidth={2.2} />
                    </span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
