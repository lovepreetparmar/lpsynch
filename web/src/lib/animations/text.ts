import gsap from 'gsap'
import { motion } from '@/lib/animations/tokens'

export function revealWords(wordElements: HTMLElement[]) {
  gsap.set(wordElements, { yPercent: 110, opacity: 0 })
  return gsap.to(wordElements, {
    yPercent: 0,
    opacity: 1,
    duration: motion.duration.slow,
    stagger: motion.stagger.normal,
    ease: motion.ease.cinematic,
  })
}

export function revealChars(charElements: HTMLElement[]) {
  gsap.set(charElements, { yPercent: 100, opacity: 0 })
  return gsap.to(charElements, {
    yPercent: 0,
    opacity: 1,
    duration: motion.duration.normal,
    stagger: motion.stagger.small,
    ease: motion.ease.smooth,
  })
}
