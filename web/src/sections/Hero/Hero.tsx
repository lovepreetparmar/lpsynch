import { useRef } from 'react'
import { heroContent } from '@/data/hero'
import { Eyebrow } from '@/components/Eyebrow/Eyebrow'
import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'
import { Reveal } from '@/components/Reveal/Reveal'
import { DigitalFlowCanvas } from '@/systems/digital-flow/DigitalFlowCanvas'
import { useMousePosition } from '@/hooks/useMousePosition'
export function Hero() {
  const parts = heroContent.headline.split(heroContent.headlineEmphasis)
  const wrapRef = useRef<HTMLElement>(null)
  const mouse = useMousePosition(wrapRef)

  return (
    <section
      ref={wrapRef}
      id="top"
      data-flow-section="home"
      className="relative overflow-hidden border-b border-border-subtle pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <DigitalFlowCanvas
        mouseX={mouse.x}
        mouseY={mouse.y}
        mouseActive={mouse.active}
        className="opacity-70"
      />
      <div className="pointer-events-none absolute inset-0 cursor-spotlight opacity-40" aria-hidden />
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{heroContent.eyebrow}</Eyebrow>
            <h1 className="mt-8 text-[2.5rem] font-semibold leading-[1.05] tracking-tight uppercase sm:text-5xl md:text-6xl lg:text-7xl">
              {parts[0]}
              <span className="text-accent">{heroContent.headlineEmphasis}</span>
              {parts[1]}
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-muted">{heroContent.supporting}</p>
            <div className="mt-10">
              <Button to={heroContent.primaryCtaHref}>{heroContent.primaryCta}</Button>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <img
              src={heroContent.image}
              alt={heroContent.imageAlt}
              className="relative z-10 mx-auto max-h-[420px] w-auto object-contain"
              width={480}
              height={480}
              fetchPriority="high"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
