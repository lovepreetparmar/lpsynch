import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { technologiesContent } from '@/data/technologies'
import { Container } from '@/components/Container/Container'
import { SystemStatus } from '@/components/system/SystemStatus'
import { TechnologyRail, TechnologyRailDetail } from '@/components/system/TechnologyRail'
import { TechnologyInspector } from '@/components/system/TechnologyInspector'
import { SystemModuleStrip } from '@/components/system/SystemModule'
import { bootMessages } from '@/components/system/systemStates'
import type { SystemLayer } from '@/components/system/systemStates'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIntersectionVisible } from '@/hooks/useIntersectionVisible'

const SystemScene = lazy(() =>
  import('@/components/system/SystemScene').then((m) => ({ default: m.SystemScene })),
)

export function LPSynchSystem() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const machineRef = useRef<HTMLDivElement>(null)
  const visible = useIntersectionVisible(sectionRef, '120px')
  const [activeId, setActiveId] = useState(technologiesContent.nodes[0]?.id ?? 'react')
  const [inspectMode, setInspectMode] = useState(false)
  const [inspectLayer, setInspectLayer] = useState<SystemLayer | null>(null)
  const [boot, setBoot] = useState(reduced ? 1 : 0)
  const [bootLabel, setBootLabel] = useState(reduced ? 'System online' : 'System offline')
  const bootStarted = useRef(false)

  useEffect(() => {
    if (!visible || bootStarted.current) return
    bootStarted.current = true
    if (reduced) {
      setBoot(1)
      setBootLabel('System online')
      return
    }

    const duration = 1.55
    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      setBoot(t)
      const msgIndex = Math.min(bootMessages.length - 1, Math.floor(t * bootMessages.length))
      setBootLabel(bootMessages[msgIndex] ?? 'System online')
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, reduced])

  useEffect(() => {
    if (reduced || !headerRef.current) return
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 20,
        duration: motion.duration.normal,
        ease: motion.ease.cinematic,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
      if (machineRef.current) {
        gsap.from(machineRef.current, {
          opacity: 0,
          scale: 0.97,
          duration: 0.9,
          delay: 0.15,
          ease: motion.ease.cinematic,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  const online = boot >= 0.95

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="border-b border-border-subtle bg-surface-muted py-16 md:py-24"
    >
      <Container>
        <div ref={headerRef} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.35em] text-ink-subtle uppercase">{technologiesContent.eyebrow}</p>
            <h2 className="mt-3 text-4xl font-semibold uppercase leading-[0.92] tracking-tight md:text-6xl lg:text-7xl">
              {technologiesContent.heading}
            </h2>
            <p className="mt-3 max-w-lg text-sm text-ink-muted md:text-base">{technologiesContent.subheading}</p>
          </div>
          <p
            className={`font-mono text-xs tracking-[0.25em] uppercase md:text-sm ${
              online ? 'text-accent' : 'text-ink-subtle'
            }`}
            aria-live="polite"
          >
            {bootLabel}
          </p>
        </div>

        <div className="relative mt-10 lg:mt-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="flex flex-col gap-4 lg:col-span-3 lg:sticky lg:top-28 lg:self-start">
              <SystemStatus boot={boot} bootLabel={bootLabel} activeId={activeId} inspectMode={inspectMode} />
              <SystemModuleStrip />
              <TechnologyInspector
                inspectMode={inspectMode}
                inspectLayer={inspectLayer}
                onToggleInspect={() => {
                  setInspectMode((v) => !v)
                  if (inspectMode) setInspectLayer(null)
                }}
                onSelectLayer={setInspectLayer}
              />
            </div>

            <div className="lg:col-span-9">
              <div
                ref={machineRef}
                className="relative overflow-hidden border border-border bg-surface/30"
                style={{ opacity: 0.4 + boot * 0.6 }}
              >
                <Suspense
                  fallback={
                    <div className="flex min-h-[300px] items-center justify-center text-sm text-ink-muted md:min-h-[440px]">
                      Initializing system…
                    </div>
                  }
                >
                  <SystemScene
                    activeId={activeId}
                    inspectMode={inspectMode}
                    inspectLayer={inspectLayer}
                    boot={boot}
                    className="min-h-[300px] w-full md:min-h-[440px]"
                  />
                </Suspense>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-muted to-transparent" />
              </div>

              <TechnologyRail activeId={activeId} onSelect={setActiveId} boot={boot} />
              <TechnologyRailDetail activeId={activeId} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
