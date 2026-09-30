import { useEffect, useRef, useState } from 'react'
import { NetworkMark } from '@/components/ui/NetworkMark'
import { contactContent } from '@/data/contactContent'
import { company } from '@/data/company'
import { Container } from '@/components/Container/Container'
import { SplitText } from '@/components/motion/SplitText'
import { MagneticButton } from '@/components/motion/Magnetic'
import { Button } from '@/components/Button/Button'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ContactCTA() {
  const reduced = useReducedMotion()
  const formWrap = useRef<HTMLDivElement>(null)
  const [showFormLink, setShowFormLink] = useState(false)

  useEffect(() => {
    if (reduced) {
      setShowFormLink(true)
      return
    }
    const t = window.setTimeout(() => setShowFormLink(true), 900)
    return () => clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    if (reduced || !formWrap.current || !showFormLink) return
    ensureGsapPlugins()
    gsap.from(formWrap.current, {
      opacity: 0,
      y: 20,
      duration: motion.duration.normal,
      ease: motion.ease.smooth,
    })
  }, [reduced, showFormLink])

  return (
    <section id="contact-cta" data-flow-section="contact" className="relative overflow-hidden border-t border-border-subtle py-20 md:py-28">
      <NetworkMark className="pointer-events-none absolute bottom-8 right-8 h-20 w-32 opacity-25 md:right-16" />
      <Container>
        <p className="font-mono text-xs tracking-[0.35em] text-accent uppercase">Have a project in mind?</p>
        <h2 className="mt-8 max-w-4xl text-4xl font-semibold uppercase leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          <SplitText as="span" className="block" mode="words">
            Let&apos;s build something.
          </SplitText>
        </h2>
        <p className="mt-8 max-w-2xl text-lg text-ink-muted">{contactContent.intro}</p>
        {showFormLink ? (
          <div ref={formWrap} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <MagneticButton>
              <Button to="/contact" data-cursor-explore>
                Start a conversation →
              </Button>
            </MagneticButton>
            <a href={`mailto:${company.email}`} className="font-mono text-sm text-ink-muted hover:text-accent">
              {company.email}
            </a>
          </div>
        ) : null}
      </Container>
    </section>
  )
}
