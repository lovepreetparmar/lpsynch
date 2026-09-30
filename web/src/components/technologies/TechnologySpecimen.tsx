import { useEffect, useRef } from 'react'
import type { EnterDirection, SpecimenType } from '@/components/technologies/technologyVisuals'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type TechnologySpecimenProps = {
  type: SpecimenType
  enterDirection: EnterDirection
  pointerOffset: { x: number; y: number }
  visible: boolean
}

function SpecimenArt({ type }: { type: SpecimenType }) {
  const stroke = 'currentColor'
  const fill = 'rgba(241, 172, 47, 0.12)'

  switch (type) {
    case 'interface':
      return (
        <svg viewBox="0 0 200 220" className="h-full w-full text-accent/90" aria-hidden>
          <rect x="24" y="20" width="152" height="100" rx="2" fill={fill} stroke={stroke} strokeWidth="1" opacity="0.9" />
          <text x="36" y="48" className="fill-ink-subtle text-[10px] font-mono uppercase tracking-widest">
            Card
          </text>
          <rect x="36" y="62" width="72" height="20" rx="1" fill="none" stroke={stroke} strokeWidth="1" />
          <rect x="36" y="92" width="48" height="14" rx="1" fill={fill} stroke={stroke} strokeWidth="0.75" />
          <text x="36" y="148" className="fill-ink-muted text-[9px] font-mono uppercase tracking-[0.2em]">
            Component
          </text>
          <rect x="24" y="132" width="152" height="68" rx="2" fill="none" stroke={stroke} strokeWidth="0.75" opacity="0.5" />
        </svg>
      )
    case 'routing':
      return (
        <svg viewBox="0 0 160 240" className="h-full w-full text-accent/80" aria-hidden>
          {['Request', 'Route', 'Logic', 'Response'].map((label, i) => (
            <g key={label}>
              <rect x="40" y={20 + i * 52} width="80" height="32" fill={fill} stroke={stroke} strokeWidth="0.75" />
              <text x="80" y={40 + i * 52} textAnchor="middle" className="fill-ink-muted text-[8px] font-mono uppercase tracking-widest">
                {label}
              </text>
              {i < 3 ? (
                <line x1="80" y1={52 + i * 52} x2="80" y2={68 + i * 52} stroke={stroke} strokeWidth="1" opacity="0.6" />
              ) : null}
            </g>
          ))}
        </svg>
      )
    case 'runtime':
      return (
        <svg viewBox="0 0 200 200" className="h-full w-full text-accent/85" aria-hidden>
          <rect x="30" y="36" width="140" height="28" fill={fill} stroke={stroke} strokeWidth="0.75" />
          <text x="100" y="54" textAnchor="middle" className="fill-ink-muted text-[9px] font-mono uppercase tracking-widest">
            Server
          </text>
          <line x1="40" y1="90" x2="160" y2="90" stroke={stroke} strokeWidth="1" opacity="0.4" />
          <text x="48" y="118" className="fill-ink-subtle text-[8px] font-mono uppercase">
            Request
          </text>
          <text x="48" y="148" className="fill-ink-subtle text-[8px] font-mono uppercase">
            Response
          </text>
          <rect x="40" y="100" width="120" height="16" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
          <rect x="40" y="130" width="120" height="16" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
        </svg>
      )
    case 'data':
      return (
        <svg viewBox="0 0 180 200" className="h-full w-full text-accent/75" aria-hidden>
          {[0, 1, 2, 3, 4].map((row) => (
            <g key={row}>
              <rect x="24" y={28 + row * 32} width="132" height="22" fill={row % 2 === 0 ? fill : 'none'} stroke={stroke} strokeWidth="0.6" opacity="0.85" />
              <line x1="24" y1={39 + row * 32} x2="156" y2={39 + row * 32} stroke={stroke} strokeWidth="0.4" opacity="0.25" />
            </g>
          ))}
          <text x="90" y="210" textAnchor="middle" className="fill-ink-subtle text-[8px] font-mono uppercase tracking-[0.25em]">
            Data
          </text>
        </svg>
      )
    case 'infrastructure':
      return (
        <svg viewBox="0 0 220 220" className="h-full w-full text-accent/80" aria-hidden>
          {[
            { y: 40, w: 100, label: 'Service' },
            { y: 88, w: 130, label: 'Deploy' },
            { y: 136, w: 160, label: 'Deliver' },
          ].map(({ y, w, label }) => (
            <g key={label}>
              <rect x={(220 - w) / 2} y={y} width={w} height="36" fill={fill} stroke={stroke} strokeWidth="0.75" />
              <text x="110" y={y + 22} textAnchor="middle" className="fill-ink-muted text-[8px] font-mono uppercase tracking-widest">
                {label}
              </text>
            </g>
          ))}
        </svg>
      )
    case 'types':
      return (
        <svg viewBox="0 0 200 180" className="h-full w-full text-accent/85" aria-hidden>
          <text x="24" y="40" className="fill-ink-muted font-mono text-[11px]">
            type Module = {'{'}
          </text>
          <text x="36" y="68" className="fill-accent font-mono text-[10px]">
            id: string
          </text>
          <text x="36" y="92" className="fill-ink-subtle font-mono text-[10px]">
            layer: string
          </text>
          <text x="24" y="120" className="fill-ink-muted font-mono text-[11px]">
            {'}'}
          </text>
          <rect x="24" y="132" width="152" height="36" fill={fill} stroke={stroke} strokeWidth="0.75" />
        </svg>
      )
    default:
      return null
  }
}

const directionOffset: Record<EnterDirection, { x: number; y: number; scale: number }> = {
  up: { x: 0, y: 40, scale: 0.94 },
  down: { x: 0, y: -40, scale: 0.94 },
  left: { x: 48, y: 0, scale: 0.96 },
  right: { x: -48, y: 0, scale: 0.96 },
  scale: { x: 0, y: 0, scale: 0.88 },
}

export function TechnologySpecimen({ type, enterDirection, pointerOffset, visible }: TechnologySpecimenProps) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current || !visible) return
    if (reduced) {
      gsap.set(wrapRef.current, { opacity: 1, x: 0, y: 0, scale: 1 })
      return
    }
    ensureGsapPlugins()
    const off = directionOffset[enterDirection]
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapRef.current,
        { opacity: 0, x: off.x, y: off.y, scale: off.scale },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' },
      )
    }, wrapRef)
    return () => ctx.revert()
  }, [type, enterDirection, visible, reduced])

  const parallaxX = reduced ? 0 : pointerOffset.x * 16
  const parallaxY = reduced ? 0 : pointerOffset.y * 12

  return (
    <div
      className={`mx-auto transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transform: `translate(${parallaxX}px, ${parallaxY}px)` }}
    >
      <div
        ref={wrapRef}
        className="relative h-[200px] w-[min(72vw,280px)] md:h-[260px] md:w-[320px]"
        aria-hidden
      >
        <SpecimenArt type={type} />
      </div>
    </div>
  )
}
