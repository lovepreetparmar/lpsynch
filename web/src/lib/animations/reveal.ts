import gsap from 'gsap'
import { motion } from '@/lib/animations/tokens'

type RevealOptions = {
  y?: number
  opacity?: number
  duration?: number
  delay?: number
  stagger?: number
}

export function revealUp(
  targets: gsap.TweenTarget,
  options: RevealOptions = {},
) {
  const { y = 48, opacity = 0, duration = motion.duration.normal, delay = 0, stagger = 0 } = options
  return gsap.from(targets, {
    y,
    opacity,
    duration,
    delay,
    stagger,
    ease: motion.ease.cinematic,
    scrollTrigger: {
      trigger: targets as Element,
      start: 'top 85%',
      once: true,
    },
  })
}
