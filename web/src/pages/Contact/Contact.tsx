import { Seo } from '@/components/Seo/Seo'
import { Container } from '@/components/Container/Container'
import { EditorialPageHero } from '@/components/layout/EditorialPageHero'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { MotionReveal } from '@/components/motion/Reveal'
import { NetworkMark } from '@/components/ui/NetworkMark'
import { contactContent } from '@/data/contactContent'
import { company } from '@/data/company'

export function ContactPage() {
  return (
    <>
      <Seo title="Contact Us — LPSynch" description={contactContent.intro.slice(0, 155)} path="/contact" />
      <Container>
        <EditorialPageHero
          label="Contact"
          title="Let's build something."
          supporting={contactContent.intro}
        />
        <div className="relative grid gap-16 pb-24 lg:grid-cols-2 lg:gap-20">
          <NetworkMark className="pointer-events-none absolute -left-4 top-32 hidden h-24 w-36 opacity-20 lg:block" />
          <MotionReveal>
            <p className="font-mono text-xs tracking-widest text-ink-subtle uppercase">{contactContent.emailLabel}</p>
            <a
              href={`mailto:${company.email}`}
              className="mt-3 block text-2xl font-medium text-accent hover:underline md:text-3xl"
            >
              {company.email}
            </a>
            <ul className="mt-10 space-y-2 text-sm text-ink-muted">
              <li>
                <a href={company.social.linkedin} className="hover:text-ink" rel="noopener noreferrer" target="_blank">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={company.social.instagram} className="hover:text-ink" rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a href={company.social.facebook} className="hover:text-ink" rel="noopener noreferrer" target="_blank">
                  Facebook
                </a>
              </li>
            </ul>
          </MotionReveal>
          <MotionReveal delay={0.08}>
            <div className="border border-border bg-surface-muted p-6 md:p-8">
              <p className="mb-6 font-mono text-xs tracking-widest text-ink-subtle uppercase">Start a conversation</p>
              <ContactForm />
            </div>
          </MotionReveal>
        </div>
      </Container>
    </>
  )
}
