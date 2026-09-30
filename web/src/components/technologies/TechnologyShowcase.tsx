import { useEffect, useRef, useState } from 'react'
import { technologiesContent } from '@/data/technologies'
import { Container } from '@/components/Container/Container'
import { TechnologyList } from '@/components/technologies/TechnologyList'
import { TechnologySpecimen } from '@/components/technologies/TechnologySpecimen'
import { TechnologyBackground } from '@/components/technologies/TechnologyBackground'
import type { HoverDirection } from '@/components/technologies/TechnologyItem'
import { getTechnologyVisual } from '@/components/technologies/technologyVisuals'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function TechnologyShowcase() {
  const reduced = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const defaultId = technologiesContent.nodes[0]?.id ?? 'react'

  const [lockedId, setLockedId] = useState<string | null>(defaultId)
  const [previewId, setPreviewId] = useState<string | null>(null)
  const [hoverDir, setHoverDir] = useState<HoverDirection>(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [entered, setEntered] = useState(reduced)

  const activeId = previewId ?? lockedId ?? defaultId
  const activeTech = technologiesContent.nodes.find((n) => n.id === activeId)
  const visual = getTechnologyVisual(activeId)

  const enterDirection = (() => {
    if (reduced) return visual.enterDirection
    if (hoverDir === 'left') return 'left'
    if (hoverDir === 'right') return 'right'
    if (hoverDir === 'top') return 'up'
    if (hoverDir === 'bottom') return 'down'
    return visual.enterDirection
  })()

  useEffect(() => {
    if (reduced) {
      setEntered(true)
      return
    }
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        onComplete: () => setEntered(true),
      })
      tl.from(headerRef.current?.children ?? [], {
        opacity: 0,
        y: 16,
        stagger: 0.08,
        duration: motion.duration.fast,
        ease: motion.ease.cinematic,
      })
      if (stageRef.current) {
        tl.from(
          stageRef.current,
          { opacity: 0, duration: motion.duration.normal, ease: motion.ease.cinematic },
          '-=0.2',
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  useEffect(() => {
    if (isMobile || reduced || !stageRef.current) return
    const el = stageRef.current
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setPointer({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      })
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => el.removeEventListener('mousemove', onMove)
  }, [isMobile, reduced])

  const handlePreview = (id: string | null, dir: HoverDirection) => {
    if (isMobile) return
    setPreviewId(id)
    setHoverDir(dir)
  }

  const handleClearPreview = () => {
    if (isMobile) return
    setPreviewId(null)
    setHoverDir(null)
  }

  return (
    <section
      ref={sectionRef}
      id="technologies"
      className="border-b border-border-subtle bg-surface-muted py-16 md:py-24"
    >
      <Container>
        <div ref={headerRef} className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.35em] text-ink-subtle uppercase">{technologiesContent.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-[5.5rem]">
            {technologiesContent.heading}
          </h2>
          <p className="mt-4 max-w-xl text-ink-muted">{technologiesContent.subheading}</p>
        </div>

        <div ref={stageRef} className="relative mt-12 md:mt-16">
          <TechnologyBackground specimen={visual.specimen} active={entered} />

          {isMobile && activeTech ? (
            <div className="mb-6 text-center md:hidden">
              <p className="text-[clamp(2.5rem,13vw,4rem)] font-semibold uppercase leading-[0.9] tracking-tight">
                {activeTech.label}
              </p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.35em] text-accent uppercase">
                {String(technologiesContent.nodes.findIndex((n) => n.id === activeId) + 1).padStart(2, '0')} /{' '}
                {activeTech.category.split('/')[0]?.trim()}
              </p>
            </div>
          ) : null}

          <div className="pointer-events-none relative z-[1] flex min-h-[240px] items-center justify-center py-4 md:absolute md:inset-0 md:min-h-0 md:py-0">
            <TechnologySpecimen
              key={activeId}
              type={visual.specimen}
              enterDirection={enterDirection}
              pointerOffset={pointer}
              visible={entered}
            />
          </div>

          <div className="relative z-[2] mt-4 md:mt-0">
            <TechnologyList
              activeId={activeId}
              lockedId={lockedId}
              onLock={(id) => {
                setLockedId(id)
                setPreviewId(null)
              }}
              onPreview={(id, dir) => {
                if (id) handlePreview(id, dir)
                else handleClearPreview()
              }}
            />
          </div>

          {activeTech ? (
            <div className="relative z-[3] mt-10 max-w-lg md:absolute md:bottom-6 md:left-0 md:mt-0">
              <p className="font-mono text-[10px] tracking-[0.35em] text-ink-subtle uppercase md:hidden">
                {String(technologiesContent.nodes.findIndex((n) => n.id === activeId) + 1).padStart(2, '0')} /{' '}
                {activeTech.category.split('/')[0]?.trim()}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted md:mt-0">{activeTech.detail}</p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
