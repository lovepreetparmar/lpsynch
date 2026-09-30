import { useEffect, useRef, useState } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import type { SpecimenProps } from '@/components/services/specimenShared'
import { fill, stroke } from '@/components/services/specimenShared'
import { transitionOffset } from '@/components/services/serviceVisuals'

export function ServiceSpecimenAPI({ direction, reduced, active }: SpecimenProps) {
  const root = useRef<SVGSVGElement>(null)
  const [hover, setHover] = useState<'api' | null>(null)

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
      gsap.from('[data-api]', { opacity: 0, y: 14, stagger: 0.09, duration: 0.5, delay: 0.1, ease: 'power2.out' })
      gsap.fromTo(
        '[data-pulse]',
        { strokeDashoffset: 24 },
        { strokeDashoffset: 0, duration: 0.8, delay: 0.45, ease: 'power2.inOut', repeat: reduced ? 0 : 1 },
      )
    }, root)
    return () => ctx.revert()
  }, [active, direction, reduced])

  return (
    <svg ref={root} viewBox="0 0 360 300" className="h-full w-full text-accent/85" aria-hidden>
      <g data-api>
        <rect x="120" y="32" width="120" height="40" fill={fill} stroke={stroke} strokeWidth="0.75" />
        <text x="180" y="58" textAnchor="middle" className="fill-ink-muted text-[8px] font-mono uppercase">
          Application
        </text>
      </g>
      <path
        data-pulse
        d="M 180 72 L 180 108"
        fill="none"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="8 8"
        opacity={hover === 'api' ? 1 : 0.6}
      />
      <g
        data-api
        onMouseEnter={() => setHover('api')}
        onMouseLeave={() => setHover(null)}
      >
        <rect x="130" y="108" width="100" height="36" fill={fill} stroke={stroke} strokeWidth={hover === 'api' ? 1 : 0.7} />
        <text x="180" y="130" textAnchor="middle" className="fill-ink-subtle text-[8px] font-mono uppercase">
          API
        </text>
      </g>
      <g data-api>
        <line x1="180" y1="144" x2="180" y2="168" stroke={stroke} strokeWidth="0.75" />
        <line x1="180" y1="168" x2="100" y2="200" stroke={stroke} strokeWidth="0.6" />
        <line x1="180" y1="168" x2="260" y2="200" stroke={stroke} strokeWidth="0.6" />
        <rect x="52" y="200" width="96" height="36" fill="none" stroke={stroke} strokeWidth="0.6" />
        <text x="100" y="222" textAnchor="middle" className="fill-ink-subtle text-[7px] font-mono uppercase">
          Data
        </text>
        <rect x="212" y="200" width="96" height="36" fill="none" stroke={stroke} strokeWidth="0.6" />
        <text x="260" y="222" textAnchor="middle" className="fill-ink-subtle text-[7px] font-mono uppercase">
          Service
        </text>
      </g>
    </svg>
  )
}
