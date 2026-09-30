import { projectsContent } from '@/data/projects'
import { Container } from '@/components/Container/Container'
import { MotionReveal } from '@/components/motion/Reveal'
import { NetworkMark } from '@/components/ui/NetworkMark'
import { Button } from '@/components/Button/Button'

export function WorkSection() {
  return (
    <section id="work" data-flow-section="work" className="border-b border-border-subtle bg-surface">
      <Container className="py-16 md:py-24">
        <MotionReveal>
          <p className="font-mono text-xs tracking-[0.3em] text-ink-subtle uppercase">{projectsContent.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold uppercase tracking-tight md:text-5xl">
            {projectsContent.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-ink-muted">{projectsContent.note}</p>
        </MotionReveal>

        <MotionReveal className="mt-16">
          <div className="relative overflow-hidden border border-border bg-surface-muted px-8 py-16 md:px-16 md:py-20">
            <NetworkMark className="pointer-events-none absolute right-8 top-8 h-20 w-32 opacity-30" />
            <p className="font-mono text-xs tracking-widest text-accent uppercase">Status</p>
            <p className="mt-4 max-w-xl text-2xl font-semibold uppercase tracking-tight md:text-3xl">
              {projectsContent.status}
            </p>
            <p className="mt-6 max-w-lg text-ink-muted">
              We do not display fictional clients or case studies. When real project stories are ready, they will appear
              in this section.
            </p>
            <Button to="/contact" variant="secondary" className="mt-10">
              Discuss a project
            </Button>
          </div>
        </MotionReveal>
      </Container>
    </section>
  )
}
