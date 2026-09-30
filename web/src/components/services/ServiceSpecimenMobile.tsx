import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import type { SpecimenProps } from '@/components/services/specimenShared'
import { fill, stroke } from '@/components/services/specimenShared'
import { transitionOffset } from '@/components/services/serviceVisuals'

export function ServiceSpecimenMobile({ direction, reduced, active }: SpecimenProps) {
  const root = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!root.current || !active) return
    if (reduced) {
      gsap.set(root.current, { opacity: 1 })
      return
    }
    ensureGsapPlugins()
    const off = transitionOffset[direction]
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { opacity: 0, x: off.x, y: off.y },
        { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out' },
      )
      gsap.from('[data-screen]', {
        opacity: 0,
        y: 24,
        rotate: 4,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.08,
        ease: 'power3.out',
      })
      gsap.to('[data-screen="1"]', { x: 12, duration: 0.8, delay: 0.5, ease: 'power2.inOut' })
      gsap.to('[data-screen="2"]', { x: -8, duration: 0.8, delay: 0.5, ease: 'power2.inOut' })
    }, root)
    return () => ctx.revert()
  }, [active, direction, reduced])

  return (
    <svg ref={root} viewBox="0 0 360 300" className="h-full w-full text-accent/85" aria-hidden>
      <g data-screen="0" transform="translate(130 40)">
        <rect width="100" height="180" rx="6" fill="none" stroke={stroke} strokeWidth="0.85" />
        <rect x="12" y="24" width="76" height="12" fill={fill} stroke={stroke} strokeWidth="0.4" />
        <rect x="12" y="48" width="76" height="56" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
      </g>
      <g data-screen="1" transform="translate(48 72)" opacity="0.85">
        <rect width="88" height="156" rx="5" fill="none" stroke={stroke} strokeWidth="0.65" />
        <rect x="10" y="20" width="68" height="40" fill={fill} stroke={stroke} strokeWidth="0.4" />
      </g>
      <g data-screen="2" transform="translate(224 88)" opacity="0.85">
        <rect width="88" height="156" rx="5" fill="none" stroke={stroke} strokeWidth="0.65" />
        <circle cx="44" cy="48" r="16" fill="none" stroke={stroke} strokeWidth="0.5" />
        <rect x="16" y="80" width="56" height="8" fill={fill} stroke={stroke} strokeWidth="0.35" />
      </g>
    </svg>
  )
}
