import { contactContent } from '@/data/contactContent'
import { Section } from '@/components/Section/Section'
import { Button } from '@/components/Button/Button'
import { Reveal } from '@/components/Reveal/Reveal'

export function ContactCTA() {
  return (
    <Section id="contact-cta" flowSection="contact" className="border-t border-border-subtle">
      <Reveal>
        <div className="max-w-4xl">
          <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">{contactContent.ctaEyebrow}</p>
          <h2 className="mt-6 text-3xl font-semibold uppercase leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
            {contactContent.ctaTitle}
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-ink-muted">{contactContent.intro}</p>
          <Button to="/contact" className="mt-10">{contactContent.ctaButton}</Button>
        </div>
      </Reveal>
    </Section>
  )
}
