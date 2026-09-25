import { useRef } from 'react'
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import Icon from './Icon.jsx'

const ease = [0.16, 1, 0.3, 1]

// Image-led client sector card with layered 3D depth:
// entrance = 3D rise + clip-path image wipe; hover = tilt, image parallax, zoom and light sweep.
export default function SectorCard({
  sector,
  index = 0,
  compact = false,
  small = false,
  className = '',
  imageClassName = 'aspect-[4/3]',
  sizes = '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw',
}) {
  const wrapperRef = useRef(null)
  const cardRef = useRef(null)
  const inView = useInView(wrapperRef, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18, mass: 0.5 }
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-11, 11]), spring)
  const imageX = useSpring(useTransform(px, [0, 1], [14, -14]), spring)
  const imageY = useSpring(useTransform(py, [0, 1], [10, -10]), spring)
  const shown = reduceMotion || inView
  const delay = index * 0.12

  function handlePointerMove(event) {
    const card = cardRef.current
    if (!card) return
    const bounds = card.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    card.style.setProperty('--mx', `${x * 100}%`)
    card.style.setProperty('--my', `${y * 100}%`)
    if (reduceMotion || event.pointerType !== 'mouse') return
    px.set(x)
    py.set(y)
  }

  function handlePointerLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  const src = `/images/sectors/${sector.image}.webp`
  const srcSm = `/images/sectors/${sector.image}-sm.webp`

  return (
    <motion.div
      ref={wrapperRef}
      className={`h-full ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 70, rotateX: 22, transformPerspective: 1100 }}
      animate={shown ? { opacity: 1, y: 0, rotateX: 0, transformPerspective: 1100 } : undefined}
      transition={{ duration: 1, ease, delay }}
    >
      <motion.article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
        className={`spotlight-card group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-[box-shadow,border-color] duration-500 hover:border-sky-100 hover:shadow-[0_30px_60px_-20px_rgba(14,38,86,0.35)] ${small ? 'p-2 sm:p-2.5' : 'p-2.5 sm:p-3'}`}
      >
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-sky-100 to-sky-50 ${imageClassName}`}>
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.35 }}
            animate={shown ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : undefined}
            transition={{ duration: 1.25, ease, delay: delay + 0.15 }}
          >
            <motion.div className="absolute -inset-5" style={reduceMotion ? undefined : { x: imageX, y: imageY }}>
              <div className="sector-float h-full w-full" style={{ animationDelay: `${index * -1.3}s` }}>
                <img
                  src={src}
                  srcSet={`${srcSm} 520w, ${src} 960w`}
                  sizes={sizes}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width="960"
                  height="717"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
            </motion.div>
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky-950/25 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
          <div className="sector-shine" aria-hidden="true" />
        </div>

        <motion.span
          className={`tilt-pop absolute flex items-center justify-center rounded-xl bg-white/90 text-sky-600 shadow-lg shadow-sky-900/15 ring-1 ring-white backdrop-blur transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white ${compact || small ? 'left-4 top-4 h-9 w-9 sm:left-5 sm:top-5 sm:h-10 sm:w-10' : 'left-5 top-5 h-11 w-11 sm:left-6 sm:top-6'}`}
          aria-hidden="true"
          initial={reduceMotion ? false : { scale: 0, rotate: -30 }}
          animate={shown ? { scale: 1, rotate: 0 } : undefined}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: delay + 0.75 }}
        >
          <Icon name={sector.icon} size={compact || small ? 18 : 22} strokeWidth={1.9} />
        </motion.span>

        <div className={`tilt-pop flex flex-1 flex-col ${compact ? 'px-1.5 pb-1 pt-3.5 text-center' : small ? 'px-1.5 pb-1.5 pt-3' : 'px-2 pb-2 pt-4 sm:px-2.5'}`}>
          <h3 className={`font-bold tracking-tight text-slate-900 ${compact ? 'text-base sm:text-lg' : small ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
            <span className="bg-gradient-to-r from-sky-500 to-lime-500 bg-[length:0%_2px] bg-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
              {sector.title}
            </span>
          </h3>
          {!compact && sector.text && (
            <p className={`${small ? 'mt-1.5 text-xs leading-5' : 'mt-2 text-sm leading-6'} text-slate-600`}>{sector.text}</p>
          )}
        </div>
      </motion.article>
    </motion.div>
  )
}
