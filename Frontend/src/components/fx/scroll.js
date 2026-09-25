// Shared scrolling helpers. When Lenis smooth scrolling is active, programmatic
// scrolls go through it so native and eased scrolling never fight each other.
let lenisInstance = null

export function setLenis(instance) {
  lenisInstance = instance
}

export function getLenis() {
  return lenisInstance
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate, force: true })
    return
  }
  window.scrollTo({ top: 0, left: 0, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function scrollToElement(element, { immediate = false } = {}) {
  if (!element) return
  if (lenisInstance) {
    // Lenis applies the element's scroll-margin and the root scroll-padding, like native anchors.
    lenisInstance.scrollTo(element, { immediate, force: true, duration: 1.1 })
    return
  }
  element.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
}
