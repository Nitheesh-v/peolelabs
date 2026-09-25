import { createContext, useContext } from 'react'

export const IntroContext = createContext(true)

export function useIntroDone() {
  return useContext(IntroContext)
}

const STORAGE_KEY = 'pl-intro-seen'

export function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return false
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Storage can be unavailable (private mode); the intro simply plays again next visit.
  }
}
