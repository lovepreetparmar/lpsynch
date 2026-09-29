import { Seo } from '@/components/Seo/Seo'
import { PageHeader } from '@/components/PageHeader/PageHeader'
import { Container } from '@/components/Container/Container'
import { approachContent } from '@/data/approach'
import { Reveal } from '@/components/Reveal/Reveal'

export function ApproachPage() {
  return (
    <>
      <Seo
        title="Our Approach — LPSynch"
        description={approachContent.subheading}
        path="/approach"
      />
      <Container>
        <PageHeader title={approachContent.heading} subtitle={approachContent.subheading} />
        <div className="divide-y divide-border border-y border-border pb-20">
          {approachContent.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06}>
              <article className="grid gap-6 py-12 md:grid-cols-12 md:py-16">
                <div className="md:col-span-2">
                  <span className="font-mono text-5xl text-accent">{step.number}</span>
                </div>
                <div className="md:col-span-10">
                  <h2 className="text-2xl font-semibold uppercase tracking-wide">{step.title}</h2>
                  <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">{step.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  )
}
