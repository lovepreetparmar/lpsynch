import { Link } from 'react-router-dom'
import { approachContent } from '@/data/approach'
import { Section } from '@/components/Section/Section'
import { Reveal } from '@/components/Reveal/Reveal'

export function ApproachSection() {
  return (
    <Section id="approach" flowSection="approach">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.25em] text-ink-subtle uppercase">Our Approach</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{approachContent.heading}</h2>
        <p className="mt-4 max-w-2xl text-ink-muted">{approachContent.subheading}</p>
      </Reveal>
      <div className="mt-16 divide-y divide-border border-y border-border">
        {approachContent.steps.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.06}>
            <article className="grid gap-6 py-12 md:sticky md:top-24 md:grid-cols-12 md:items-start md:py-16 md:bg-surface">
              <div className="md:col-span-2">
                <span className="font-mono text-4xl font-medium text-accent md:text-5xl">{step.number}</span>
              </div>
              <div className="md:col-span-10">
                <h3 className="text-xl font-semibold uppercase tracking-wide md:text-2xl">{step.title}</h3>
                <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">{step.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/approach" className="text-sm font-medium text-accent hover:underline">
          View approach
        </Link>
      </div>
    </Section>
  )
}
