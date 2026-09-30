import { useEffect, useRef, useState } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import type { SpecimenProps } from '@/components/services/specimenShared'
import { fill, stroke } from '@/components/services/specimenShared'
import { transitionOffset } from '@/components/services/serviceVisuals'

const layers = [
  { label: 'Deploy', y: 36 },
  { label: 'Application', y: 96 },
  { label: 'Server', y: 156 },
  { label: 'Storage', y: 216 },
]

export function ServiceSpecimenCloud({ direction, reduced, active }: SpecimenProps) {
  const root = useRef<SVGSVGElement>(null)
  const [hoverLayer, setHoverLayer] = useState<number | null>(null)

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
      gsap.from('[data-layer]', {
        opacity: 0,
        scale: 0.92,
        stagger: 0.1,
        duration: 0.55,
        delay: 0.12,
        ease: 'power2.out',
        transformOrigin: '50% 50%',
      })
    }, root)
    return () => ctx.revert()
  }, [active, direction, reduced])

  return (
    <svg ref={root} viewBox="0 0 320 300" className="mx-auto h-full max-w-sm text-accent/85" aria-hidden>
      <text x="160" y="24" textAnchor="middle" className="fill-ink-subtle text-[8px] font-mono uppercase tracking-[0.3em]">
        Build · Deploy · Run
      </text>
      {layers.map(({ label, y }, i) => (
        <g key={label}>
          {i > 0 ? (
            <line
              x1="160"
              y1={y - 20}
              x2="160"
              y2={y - 4}
              stroke={stroke}
              strokeWidth="0.75"
              opacity={hoverLayer === null || hoverLayer === i ? 0.7 : 0.25}
            />
          ) : null}
          <g
            data-layer
            onMouseEnter={() => setHoverLayer(i)}
            onMouseLeave={() => setHoverLayer(null)}
            opacity={hoverLayer === null || hoverLayer === i ? 1 : 0.45}
          >
            <rect x="80" y={y} width="160" height="40" fill={fill} stroke={stroke} strokeWidth={hoverLayer === i ? 1 : 0.65} />
            <text x="160" y={y + 24} textAnchor="middle" className="fill-ink-muted text-[8px] font-mono uppercase tracking-widest">
              {label}
            </text>
          </g>
        </g>
      ))}
    </svg>
  )
}
