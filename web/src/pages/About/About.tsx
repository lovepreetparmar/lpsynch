import { Seo } from '@/components/Seo/Seo'
import { PageHeader } from '@/components/PageHeader/PageHeader'
import { Container } from '@/components/Container/Container'
import { aboutContent } from '@/data/about'
import { Reveal } from '@/components/Reveal/Reveal'

export function AboutPage() {
  return (
    <>
      <Seo title="About Us — LPSynch" description={aboutContent.body.slice(0, 155)} path="/about" />
      <Container>
        <PageHeader title="About Us" subtitle="The company behind LPSynch." />
        <Reveal>
          <div className="grid gap-12 border-b border-border-subtle pb-20 lg:grid-cols-2">
            <img
              src={aboutContent.image}
              alt={aboutContent.imageAlt}
              className="aspect-[4/3] w-full rounded-sm border border-border object-cover"
            />
            <div className="lg:pt-8">
              <p className="font-mono text-sm text-accent">{aboutContent.sectionNumber}</p>
              <p className="mt-8 text-lg leading-relaxed text-ink-muted">{aboutContent.body}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  )
}
