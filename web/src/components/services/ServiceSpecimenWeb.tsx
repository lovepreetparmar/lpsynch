import { useEffect, useRef, useState } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import type { SpecimenProps } from '@/components/services/specimenShared'
import { fill, stroke } from '@/components/services/specimenShared'
import { transitionOffset } from '@/components/services/serviceVisuals'

export function ServiceSpecimenWeb({ direction, reduced, active }: SpecimenProps) {
  const root = useRef<SVGSVGElement>(null)
  const [hoverBlock, setHoverBlock] = useState<number | null>(null)

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
      gsap.from('[data-web-part]', {
        opacity: 0,
        scale: 0.96,
        stagger: 0.07,
        duration: 0.55,
        delay: 0.1,
        ease: 'power2.out',
        transformOrigin: '50% 50%',
      })
    }, root)
    return () => ctx.revert()
  }, [active, direction, reduced])

  return (
    <svg ref={root} viewBox="0 0 400 300" className="h-full w-full text-accent/85" aria-hidden>
      <g data-web-part>
        <rect x="32" y="28" width="336" height="244" rx="2" fill="none" stroke={stroke} strokeWidth="0.85" />
        <line x1="32" y1="56" x2="368" y2="56" stroke={stroke} strokeWidth="0.5" opacity="0.45" />
        <text x="48" y="48" className="fill-ink-subtle text-[8px] font-mono uppercase tracking-widest">
          Frame
        </text>
        <text x="300" y="48" className="fill-ink-muted text-[8px] font-mono uppercase">
          Nav
        </text>
      </g>
      <g data-web-part>
        <text x="200" y="92" textAnchor="middle" className="fill-ink-muted text-[9px] font-mono uppercase tracking-[0.25em]">
          Headline
        </text>
      </g>
      {[0, 1].map((i) => (
        <g
          key={i}
          data-web-part
          onMouseEnter={() => setHoverBlock(i)}
          onMouseLeave={() => setHoverBlock(null)}
          className="cursor-default"
          opacity={hoverBlock === null || hoverBlock === i ? 1 : 0.45}
        >
          <rect x={56 + i * 148} y="110" width="128" height="88" fill={fill} stroke={stroke} strokeWidth={hoverBlock === i ? 1 : 0.65} />
          <text x={120 + i * 148} y="160" textAnchor="middle" className="fill-ink-subtle text-[8px] font-mono uppercase">
            Block
          </text>
        </g>
      ))}
      <g data-web-part>
        <line x1="56" y1="220" x2="344" y2="220" stroke={stroke} strokeWidth="0.4" opacity="0.35" />
        <rect x="56" y="232" width="80" height="12" fill={fill} stroke={stroke} strokeWidth="0.4" />
        <rect x="148" y="232" width="120" height="12" fill="none" stroke={stroke} strokeWidth="0.4" opacity="0.5" />
      </g>
    </svg>
  )
}
