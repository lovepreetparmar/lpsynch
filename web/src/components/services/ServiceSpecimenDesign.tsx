import { useEffect, useRef, useState } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import type { SpecimenProps } from '@/components/services/specimenShared'
import { fill, stroke } from '@/components/services/specimenShared'
import { transitionOffset } from '@/components/services/serviceVisuals'

export function ServiceSpecimenDesign({ direction, reduced, active }: SpecimenProps) {
  const root = useRef<SVGSVGElement>(null)
  const [showGuides, setShowGuides] = useState(true)

  useEffect(() => {
    if (!root.current || !active) return
    if (reduced) {
      gsap.set(root.current, { opacity: 1 })
      setShowGuides(false)
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
      gsap.from('[data-design]', {
        opacity: 0,
        y: 12,
        stagger: 0.06,
        duration: 0.5,
        delay: 0.15,
        ease: 'power2.out',
      })
      gsap.to('[data-guide]', { opacity: 0, duration: 0.4, delay: 1.1, ease: 'power1.out', onComplete: () => setShowGuides(false) })
    }, root)
    return () => ctx.revert()
  }, [active, direction, reduced])

  return (
    <svg
      ref={root}
      viewBox="0 0 380 280"
      className="h-full w-full text-accent/90"
      aria-hidden
      onMouseEnter={() => setShowGuides(true)}
      onMouseLeave={() => !reduced && setShowGuides(false)}
    >
      {showGuides ? (
        <g data-guide opacity="0.35">
          {[8, 16, 32].map((n, i) => (
            <text key={n} x={280 + i * 28} y="240" className="fill-ink-subtle text-[7px] font-mono">
              {n}px
            </text>
          ))}
          <line x1="40" y1="200" x2="340" y2="200" stroke={stroke} strokeWidth="0.35" strokeDasharray="4 4" />
        </g>
      ) : null}
      <g data-design>
        <line x1="60" y1="48" x2="320" y2="48" stroke={stroke} strokeWidth="0.5" />
        <text x="190" y="42" textAnchor="middle" className="fill-ink-muted text-[10px] font-mono uppercase tracking-[0.3em]">
          Title
        </text>
      </g>
      <g data-design>
        <rect x="72" y="88" width="96" height="32" fill={fill} stroke={stroke} strokeWidth="0.65" />
        <text x="120" y="108" textAnchor="middle" className="fill-ink-subtle text-[8px] font-mono uppercase">
          Button
        </text>
        <rect x="212" y="88" width="96" height="32" fill="none" stroke={stroke} strokeWidth="0.65" />
        <text x="260" y="108" textAnchor="middle" className="fill-ink-subtle text-[8px] font-mono uppercase">
          Button
        </text>
      </g>
      <g data-design>
        <rect x="60" y="148" width="260" height="72" fill="none" stroke={stroke} strokeWidth="0.45" opacity="0.5" />
        <line x1="60" y1="184" x2="320" y2="184" stroke={stroke} strokeWidth="0.35" opacity="0.3" />
      </g>
    </svg>
  )
}
