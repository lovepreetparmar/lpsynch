import { Seo } from '@/components/Seo/Seo'
import { PageHeader } from '@/components/PageHeader/PageHeader'
import { Container } from '@/components/Container/Container'
import { ContactForm } from '@/components/ContactForm/ContactForm'
import { Reveal } from '@/components/Reveal/Reveal'
import { contactContent } from '@/data/contactContent'
import { company } from '@/data/company'

export function ContactPage() {
  return (
    <>
      <Seo title="Contact Us — LPSynch" description={contactContent.intro.slice(0, 155)} path="/contact" />
      <Container>
        <PageHeader title={contactContent.heading} subtitle={contactContent.intro} />
        <div className="grid gap-16 border-b border-border-subtle pb-20 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-ink-subtle uppercase">{contactContent.emailLabel}</p>
            <a href={`mailto:${company.email}`} className="mt-2 block text-2xl font-medium text-accent hover:underline">
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
          </Reveal>
          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </>
  )
}
