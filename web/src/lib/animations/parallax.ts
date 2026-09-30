import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/animations/gsap'

export function bindParallax(
  target: Element,
  amount: number,
  trigger?: Element,
) {
  return gsap.to(target, {
    y: amount,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? target,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

export function bindMouseParallax(
  target: Element,
  depth: number,
  wrap: HTMLElement,
) {
  const onMove = (e: MouseEvent) => {
    const rect = wrap.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(target, {
      x: x * depth,
      y: y * depth,
      duration: 0.8,
      ease: 'power2.out',
    })
  }
  wrap.addEventListener('mousemove', onMove)
  return () => wrap.removeEventListener('mousemove', onMove)
}

export { ScrollTrigger }
