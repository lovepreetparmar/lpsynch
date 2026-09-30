import { useState } from 'react'
import { Link } from 'react-router-dom'
import { approachContent } from '@/data/approach'
import { Container } from '@/components/Container/Container'
import { CraftObjectCanvas } from '@/components/3d/CraftObjectCanvas'
import { MotionReveal } from '@/components/motion/Reveal'

export function ProcessSection() {
  const [step, setStep] = useState(0)
  const current = approachContent.steps[step]

  return (
    <section id="process" data-flow-section="approach" className="border-b border-border-subtle bg-surface py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <MotionReveal className="lg:col-span-5">
          <p className="font-mono text-xs tracking-[0.35em] text-ink-subtle uppercase">{approachContent.sectionLabel}</p>
          <h2 className="mt-4 text-4xl font-semibold uppercase tracking-tight md:text-5xl">{approachContent.heading}</h2>
          <p className="mt-4 max-w-lg text-ink-muted">{approachContent.subheading}</p>
          <ol className="mt-10 space-y-2">
            {approachContent.steps.map((s, i) => (
              <li key={s.number}>
                <button
                  type="button"
                  onClick={() => setStep(i)}
                  className={`flex w-full items-baseline gap-4 border-l-2 py-3 pl-4 text-left transition-colors ${
                    i === step ? 'border-accent text-ink' : 'border-transparent text-ink-muted hover:text-ink'
                  }`}
                >
                  <span className="font-mono text-xs text-accent">{s.number}</span>
                  <span className="text-lg font-semibold uppercase tracking-tight">{s.title.split(' ')[0]}</span>
                </button>
              </li>
            ))}
          </ol>
          {current ? (
            <p className="mt-8 max-w-prose text-sm leading-relaxed text-ink-muted md:text-base">{current.description}</p>
          ) : null}
          <Link to="/approach" className="mt-8 inline-block text-sm text-accent hover:underline">
            Our approach
          </Link>
        </MotionReveal>
        <MotionReveal className="lg:col-span-7" delay={0.06}>
          <CraftObjectCanvas mode="process" stateIndex={step} heightClass="h-[min(50vh,440px)] w-full border border-border" />
        </MotionReveal>
      </Container>
    </section>
  )
}
