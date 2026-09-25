import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Icon from './Icon.jsx'
import TiltCard from './fx/TiltCard.jsx'
import { serviceOfferings } from '../data/servicesPage.js'

const detailStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
}
const detailItem = {
  hidden: { opacity: 0, y: 24, rotateX: 20, transformPerspective: 900 },
  visible: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 900, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function ServiceTabs({ activeId, onSelect, layout }) {
  const horizontal = layout === 'mobile'
  const reduceMotion = useReducedMotion()

  function handleKeyDown(event, index) {
    const previousKey = horizontal ? 'ArrowLeft' : 'ArrowUp'
    const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown'
    let nextIndex

    if (event.key === previousKey) nextIndex = (index - 1 + serviceOfferings.length) % serviceOfferings.length
    else if (event.key === nextKey) nextIndex = (index + 1) % serviceOfferings.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = serviceOfferings.length - 1
    else return

    event.preventDefault()
    onSelect(serviceOfferings[nextIndex].id)
    event.currentTarget.parentElement
      ?.querySelectorAll('[role="tab"]')
      ?.[nextIndex]
      ?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="PeopleSoft services"
      aria-orientation={horizontal ? 'horizontal' : 'vertical'}
      className={horizontal ? 'flex gap-2 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:thin]' : 'grid gap-2'}
    >
      {serviceOfferings.map((service, index) => {
        const selected = activeId === service.id
        return (
          <motion.button
            key={service.id}
            id={`${layout}-service-tab-${service.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls="service-details"
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(service.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={horizontal
              ? `relative inline-flex min-h-12 min-w-[220px] items-center gap-3 overflow-hidden rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors sm:min-w-[235px] ${selected ? 'border-sky-300 bg-sky-100 text-slate-900 shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800'}`
              : `group relative flex min-h-12 w-full items-center gap-3 rounded-lg border-l-[3px] px-3 py-3 text-left text-sm transition-[background-color,color,border-color,transform] duration-200 hover:translate-x-0.5 motion-reduce:transform-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${selected ? 'border-sky-500 bg-sky-100 font-semibold text-slate-900 shadow-sm' : 'border-transparent bg-transparent font-semibold text-slate-600 hover:bg-sky-50 hover:text-sky-700'}`}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
          >
            {selected && (
              <motion.span
                layoutId={`services-tab-indicator-${layout}`}
                className="absolute bottom-2 left-0 top-2 z-0 w-[3px] rounded-full bg-sky-500"
                transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
                aria-hidden="true"
              />
            )}
            <span className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-white text-sky-700' : horizontal ? 'bg-sky-50 text-sky-700' : 'bg-white text-sky-600 group-hover:bg-sky-50'}`} aria-hidden="true">
              <Icon name={service.icon} size={19} strokeWidth={1.8} />
            </span>
            <span className="relative z-10 min-w-0 flex-1 leading-5">{service.title}</span>
            {selected && <Icon name="arrow-right" size={17} className="relative z-10 shrink-0 text-sky-700" />}
          </motion.button>
        )
      })}
    </div>
  )
}

export default function ServicesExplorer() {
  const [activeId, setActiveId] = useState(serviceOfferings[0].id)
  const activeService = serviceOfferings.find((service) => service.id === activeId) ?? serviceOfferings[0]
  const reduceMotion = useReducedMotion()

  return (
    <section className="ambient-bg bg-slate-50/70 py-12 sm:py-16 lg:py-20" aria-label="Explore PeopleSoft services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden border-r border-slate-200 bg-slate-50 p-5 lg:block xl:p-6">
            <h2 className="mb-5 px-1 text-lg font-bold tracking-tight text-slate-900">PeopleSoft Services</h2>
            <ServiceTabs activeId={activeId} onSelect={setActiveId} layout="desktop" />
          </aside>

          <div className="border-b border-slate-200 bg-slate-50 p-4 sm:p-5 lg:hidden">
            <h2 className="mb-4 text-base font-bold tracking-tight text-slate-900">PeopleSoft Services</h2>
            <ServiceTabs activeId={activeId} onSelect={setActiveId} layout="mobile" />
          </div>

          <div className="min-w-0 p-4 sm:p-6 lg:p-8 xl:p-9">
            <div
              id="service-details"
              role="tabpanel"
              aria-label={`${activeService.title} details`}
              aria-live="polite"
              tabIndex={0}
              className="outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-4"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeService.id}
                  style={{ transformOrigin: '0% 50%' }}
                  initial={reduceMotion ? false : { opacity: 0, rotateY: -18, x: 40, transformPerspective: 1400 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0, transformPerspective: 1400 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotateY: 12, x: -24, transformPerspective: 1400, transition: { duration: 0.18, ease: 'easeIn' } }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <header className="rounded-xl bg-sky-600 p-5 text-white sm:p-7 lg:p-8">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <motion.span
                        initial={reduceMotion ? false : { scale: 0.8, opacity: 0, rotate: -4 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white sm:h-14 sm:w-14"
                      >
                        <Icon name={activeService.icon} size={27} strokeWidth={1.8} />
                      </motion.span>
                      <div className="min-w-0">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-sky-100">PeopleSoft services</p>
                        <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">{activeService.title}</h2>
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/90 sm:text-base sm:leading-7">{activeService.description}</p>
                      </div>
                    </div>
                  </header>

                  <motion.div className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-5" variants={detailStagger} initial={reduceMotion ? false : 'hidden'} animate="visible">
                    {activeService.details.map((detail) => (
                      <motion.div key={detail.title} variants={reduceMotion ? undefined : detailItem} className="h-full">
                      <TiltCard as="article" max={7} className="group flex h-full min-h-36 items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-500/10 sm:p-5">
                        <span className="tilt-pop flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white" aria-hidden="true">
                          <Icon name={detail.icon} size={21} strokeWidth={1.8} />
                        </span>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{detail.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{detail.description}</p>
                        </div>
                      </TiltCard>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
