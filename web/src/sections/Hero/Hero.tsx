import { lazy, Suspense, useEffect, useRef } from 'react'
import { heroContent } from '@/data/hero'
import { Container } from '@/components/Container/Container'
import { SplitText } from '@/components/motion/SplitText'
import { MagneticButton } from '@/components/motion/Magnetic'
import { Button } from '@/components/Button/Button'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const DigitalWorld = lazy(() =>
  import('@/components/3d/DigitalWorld').then((m) => ({ default: m.DigitalWorld })),
)

export function Hero() {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !subRef.current || !ctaRef.current) return
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      gsap.from(subRef.current, {
        opacity: 0,
        y: 24,
        duration: motion.duration.normal,
        delay: 0.55,
        ease: motion.ease.smooth,
      })
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 16,
        duration: motion.duration.normal,
        delay: 0.85,
        ease: motion.ease.smooth,
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [reduced])

  const headlineParts = heroContent.headline.split(heroContent.headlineEmphasis)

  return (
    <section
      ref={wrapRef}
      id="top"
      data-flow-section="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden border-b border-border-subtle pb-16 pt-24 md:pb-24 md:pt-28"
    >
      <Suspense fallback={<div className="pointer-events-none absolute inset-0 grid-bg opacity-20" aria-hidden />}>
        <DigitalWorld className="opacity-80" />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/20 via-transparent to-surface" aria-hidden />

      <Container className="relative z-20">
        <p className="font-mono text-[10px] tracking-[0.4em] text-ink-subtle uppercase">{heroContent.eyebrow}</p>
        <h1 className="mt-6 max-w-5xl rounded-sm bg-surface/70 px-1 text-[2.75rem] font-semibold leading-[0.95] tracking-tight uppercase backdrop-blur-[2px] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <SplitText as="span" className="block" mode="words" delay={0.12}>
            {headlineParts[0]}
          </SplitText>
          <SplitText as="span" className="block text-accent" mode="words" delay={0.28}>
            {heroContent.headlineEmphasis}
          </SplitText>
          <SplitText as="span" className="block" mode="words" delay={0.38}>
            {headlineParts[1] ?? ''}
          </SplitText>
        </h1>
        <p ref={subRef} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted md:text-xl">
          {heroContent.supporting}
        </p>
        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
          <MagneticButton>
            <Button to={heroContent.primaryCtaHref} data-cursor-explore>
              {heroContent.primaryCta}
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button to="/#services" variant="secondary" data-cursor-explore>
              Our services
            </Button>
          </MagneticButton>
        </div>
      </Container>
    </section>
  )
}
