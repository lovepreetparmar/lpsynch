import gsap from 'gsap'
import { motion } from '@/lib/animations/tokens'

export function pageEnter(overlay: Element, content: Element) {
  const tl = gsap.timeline()
  tl.set(overlay, { scaleY: 1, transformOrigin: 'top' })
    .to(overlay, {
      scaleY: 0,
      duration: motion.duration.normal,
      ease: motion.ease.inOut,
    })
    .from(
      content,
      {
        opacity: 0,
        y: 24,
        duration: motion.duration.normal,
        ease: motion.ease.cinematic,
      },
      '-=0.35',
    )
  return tl
}

export function pageExit(overlay: Element) {
  return gsap.to(overlay, {
    scaleY: 1,
    duration: motion.duration.fast,
    ease: motion.ease.inOut,
    transformOrigin: 'bottom',
  })
}
