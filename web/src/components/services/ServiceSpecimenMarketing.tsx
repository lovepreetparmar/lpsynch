import { useEffect, useRef } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import type { SpecimenProps } from '@/components/services/specimenShared'
import { fill, stroke } from '@/components/services/specimenShared'
import { transitionOffset } from '@/components/services/serviceVisuals'

export function ServiceSpecimenMarketing({ direction, reduced, active }: SpecimenProps) {
  const root = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!root.current || !active) return
    if (reduced) {
      gsap.set(root.current, { opacity: 1 })
      return
    }
    ensureGsapPlugins()
    const off = transitionOffset[direction]
    const el = root.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: off.x, y: off.y },
        { opacity: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.out' },
      )
      gsap.from(el.querySelectorAll('[data-stage]'), {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: 0.5,
        delay: 0.12,
        ease: 'power2.out',
      })
    }, root)
    return () => ctx.revert()
  }, [active, direction, reduced])

  return (
    <svg ref={root} viewBox="0 0 360 280" className="h-full w-full text-accent/90" aria-hidden>
      <rect x="20" y="24" width="320" height="232" fill="none" stroke={stroke} strokeWidth="0.75" opacity="0.35" />
      <g data-stage>
        <text x="36" y="52" className="fill-ink-muted text-[9px] font-mono uppercase tracking-[0.2em]">
          Content
        </text>
        <rect x="36" y="62" width="120" height="48" fill={fill} stroke={stroke} strokeWidth="0.75" />
        <rect x="168" y="62" width="156" height="22" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
        <rect x="168" y="92" width="100" height="18" fill={fill} stroke={stroke} strokeWidth="0.5" />
      </g>
      <g data-stage>
        <line x1="96" y1="118" x2="96" y2="138" stroke={stroke} strokeWidth="1" opacity="0.5" />
        <polygon points="96,142 92,134 100,134" fill={stroke} opacity="0.5" />
        <text x="36" y="168" className="fill-ink-subtle text-[8px] font-mono uppercase tracking-widest">
          Channels
        </text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={36 + i * 100} y="178" width="80" height="36" fill="none" stroke={stroke} strokeWidth="0.6" opacity="0.7" />
        ))}
      </g>
      <g data-stage>
        <line x1="180" y1="222" x2="180" y2="238" stroke={stroke} strokeWidth="0.75" />
        <rect x="120" y="238" width="120" height="28" fill={fill} stroke={stroke} strokeWidth="0.75" />
        <text x="180" y="256" textAnchor="middle" className="fill-ink-muted text-[8px] font-mono uppercase">
          Action
        </text>
      </g>
    </svg>
  )
}
