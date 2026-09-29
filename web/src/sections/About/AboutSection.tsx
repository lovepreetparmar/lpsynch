import { Link } from 'react-router-dom'
import { aboutContent } from '@/data/about'
import { Section } from '@/components/Section/Section'
import { Reveal } from '@/components/Reveal/Reveal'

export function AboutSection() {
  return (
    <Section id="about" flowSection="about" variant="muted">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="font-mono text-sm text-accent">{aboutContent.sectionNumber}</p>
          <h2 className="mt-4 font-mono text-xs tracking-[0.25em] text-ink-subtle uppercase">
            {aboutContent.heading}
          </h2>
          <div className="mt-8 overflow-hidden rounded-sm border border-border">
            <img
              src={aboutContent.image}
              alt={aboutContent.imageAlt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7 lg:pt-16" delay={0.08}>
          <p className="max-w-xl text-2xl font-medium leading-snug tracking-tight md:text-3xl">
            {aboutContent.label}
          </p>
          <p className="mt-8 max-w-prose text-base leading-relaxed text-ink-muted md:text-lg">
            {aboutContent.body}
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Learn more about LPSynch
          </Link>
        </Reveal>
      </div>
    </Section>
  )
}
