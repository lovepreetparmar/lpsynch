import { useEffect, useRef } from 'react'
import { technologiesContent } from '@/data/technologies'
import { getTechnologyState } from '@/components/system/systemStates'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type TechnologyRailProps = {
  activeId: string
  onSelect: (id: string) => void
  boot: number
}

export function TechnologyRail({ activeId, onSelect, boot }: TechnologyRailProps) {
  const reduced = useReducedMotion()
  const railRef = useRef<HTMLDivElement>(null)
  const activeNode = technologiesContent.nodes.find((n) => n.id === activeId)

  useEffect(() => {
    if (reduced || !railRef.current || boot < 0.5) return
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      gsap.from(railRef.current!.querySelectorAll('[data-rail-item]'), {
        opacity: 0,
        y: 12,
        duration: motion.duration.fast,
        stagger: 0.04,
        delay: 0.2,
        ease: motion.ease.cinematic,
      })
    }, railRef)
    return () => ctx.revert()
  }, [reduced, boot])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = technologiesContent.nodes[Math.min(technologiesContent.nodes.length - 1, index + 1)]
      if (next) onSelect(next.id)
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = technologiesContent.nodes[Math.max(0, index - 1)]
      if (prev) onSelect(prev.id)
    }
  }

  return (
    <div ref={railRef} className="mt-8">
      <p className="mb-3 font-mono text-[10px] tracking-widest text-ink-subtle uppercase">Control rail</p>
      <div className="hidden gap-0 border-t border-border md:flex md:flex-wrap" role="listbox" aria-label="Technologies">
        {technologiesContent.nodes.map((tech, index) => {
          const active = tech.id === activeId
          const related = !!activeNode?.connections.includes(tech.id)
          const num = String(index + 1).padStart(2, '0')
          return (
            <button
              key={tech.id}
              type="button"
              role="option"
              aria-selected={active}
              data-rail-item
              id={`system-tech-${tech.id}`}
              className={`group flex min-w-[140px] flex-1 flex-col border-r border-border px-4 py-4 text-left transition-all duration-500 ${
                active
                  ? 'bg-surface text-ink'
                  : related
                    ? 'text-ink-muted opacity-90'
                    : 'text-ink-subtle opacity-70 hover:text-ink-muted'
              }`}
              onClick={() => onSelect(tech.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span className="font-mono text-[10px] tabular-nums">{num}</span>
              <span className="mt-1 text-sm font-semibold uppercase tracking-tight md:text-base">{tech.label}</span>
              {active ? (
                <span className="mt-2 flex items-center gap-2 font-mono text-[9px] tracking-widest text-accent uppercase">
                  Active <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 md:hidden">
        {technologiesContent.nodes.map((tech) => {
          const active = tech.id === activeId
          return (
            <button
              key={tech.id}
              type="button"
              className={`shrink-0 border px-3 py-2 font-mono text-[10px] tracking-widest uppercase ${
                active ? 'border-accent text-accent' : 'border-border text-ink-muted'
              }`}
              onClick={() => onSelect(tech.id)}
            >
              {tech.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function TechnologyRailDetail({ activeId }: { activeId: string }) {
  const tech = technologiesContent.nodes.find((n) => n.id === activeId)
  const state = getTechnologyState(activeId)
  if (!tech) return null

  return (
    <div className="mt-6 grid gap-4 border-t border-border pt-6 md:grid-cols-2">
      <div>
        <p className="font-mono text-[10px] tracking-widest text-ink-subtle uppercase">Selected module</p>
        <p className="mt-2 text-2xl font-semibold uppercase tracking-tight">{tech.label}</p>
        <p className="mt-1 font-mono text-xs tracking-widest text-accent uppercase">{state.layer}</p>
        <p className="mt-3 max-w-md text-sm text-ink-muted">{tech.detail}</p>
      </div>
      <div>
        <p className="font-mono text-[10px] tracking-widest text-ink-subtle uppercase">Signal</p>
        <ul className="mt-2 space-y-1">
          {state.emphasis.map((line) => (
            <li key={line} className="font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase">
              {line}
            </li>
          ))}
        </ul>
        <pre className="mt-4 overflow-x-auto border border-border/60 bg-surface-muted/40 p-3 font-mono text-[9px] leading-relaxed text-ink-subtle normal-case">
          {`const system = {\n  focus: "${tech.id}",\n  layer: "${state.layer}"\n};`}
        </pre>
        <p className="mt-2 text-[9px] text-ink-subtle">Visual texture only — not production code.</p>
      </div>
    </div>
  )
}
