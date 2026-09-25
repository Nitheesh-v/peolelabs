import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

// Headline reveal: each word rises out of a mask with a soft blur-to-sharp focus.
// `segments` lets parts of the heading keep their own styling (e.g. gradient text).
const motionTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, div: motion.div }

export default function RevealWords({
  as = 'h2',
  segments,
  text,
  className = '',
  delay = 0,
  stagger = 0.055,
  start,
  ...props
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const reduceMotion = useReducedMotion()
  const Component = motionTags[as] ?? motion.h2
  const parts = segments ?? [{ text }]
  const shouldShow = reduceMotion || ((start ?? true) && inView)
  const tokens = []
  let wordCount = 0
  parts.forEach((part, partIndex) => {
    if (part.br) {
      tokens.push({ type: 'br', key: `br-${partIndex}`, className: part.className })
      return
    }
    const words = part.text.split(/(\s+)/).filter(Boolean).map((word) => {
      if (/^\s+$/.test(word)) return { space: true }
      wordCount += 1
      return { word, order: wordCount - 1 }
    })
    tokens.push({ type: 'part', key: `part-${partIndex}`, className: part.className, wordClassName: part.wordClassName, words })
  })

  return (
    <Component ref={ref} className={className} {...props}>
      {tokens.map((token) => {
        if (token.type === 'br') return <br key={token.key} className={token.className} />
        return (
          <span key={token.key} className={token.className}>
            {token.words.map((item, index) => {
              if (item.space) return <span key={index}>{' '}</span>
              return (
                <span key={index} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <motion.span
                    className={`inline-block will-change-transform ${token.wordClassName ?? ''}`}
                    initial={reduceMotion ? false : { y: '105%', opacity: 0, filter: 'blur(8px)' }}
                    animate={shouldShow ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : undefined}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: delay + item.order * stagger }}
                  >
                    {item.word}
                  </motion.span>
                </span>
              )
            })}
          </span>
        )
      })}
    </Component>
  )
}
