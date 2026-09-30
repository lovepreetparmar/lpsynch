import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { aboutContent } from '@/data/about'
import { Container } from '@/components/Container/Container'
import { ensureGsapPlugins, ScrollTrigger } from '@/lib/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const statements = [
  'We build digital products',
  'with web design, development,',
  'and software solutions.',
] as const

export function AboutSection() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [line, setLine] = useState(0)

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    ensureGsapPlugins()
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      end: 'bottom 40%',
      scrub: 0.4,
      onUpdate: (self) => {
        setLine(Math.min(statements.length - 1, Math.floor(self.progress * statements.length)))
      },
    })
    return () => st.kill()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="about"
      data-flow-section="about"
      className="relative border-b border-border-subtle bg-surface py-20 md:py-28"
    >
      <Container>
        <p className="font-mono text-xs tracking-[0.3em] text-ink-subtle uppercase">{aboutContent.heading}</p>
        <div className="mt-10 max-w-5xl">
          {statements.map((text, i) => (
            <p
              key={text}
              className={`text-3xl font-semibold uppercase leading-[1.05] tracking-tight transition-opacity duration-500 md:text-5xl lg:text-6xl ${
                i <= line ? 'opacity-100' : 'opacity-25'
              }`}
            >
              {text}
            </p>
          ))}
        </div>
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <p className="max-w-prose text-base leading-relaxed text-ink-muted md:text-lg">{aboutContent.body}</p>
          <div>
            <div className="overflow-hidden rounded-sm border border-border">
              <img
                src={aboutContent.image}
                alt={aboutContent.imageAlt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <Link to="/about" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
              Learn more about LPSynch
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
