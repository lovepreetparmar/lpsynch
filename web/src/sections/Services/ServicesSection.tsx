import { useState } from 'react'
import { Link } from 'react-router-dom'
import { servicesContent } from '@/data/services'
import { Section } from '@/components/Section/Section'
import { Reveal } from '@/components/Reveal/Reveal'
import { ServiceGlyph } from '@/components/ServiceGlyph/ServiceGlyph'
import { useSite } from '@/systems/site/SiteContext'

export function ServicesSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const [active, setActive] = useState<string | null>(null)
  const { setActiveServiceId } = useSite()

  const setService = (slug: string | null) => {
    setActive(slug)
    setActiveServiceId(slug)
  }

  const activeService = servicesContent.items.find((s) => s.slug === active)

  return (
    <Section id="services" flowSection="services" variant="muted">
      {!hideHeader ? (
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-ink-subtle uppercase">
            {servicesContent.sectionLabel}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight capitalize md:text-4xl">
            {servicesContent.heading}
          </h2>
        </Reveal>
      ) : null}
      <div className="relative mt-16 divide-y divide-border border-y border-border">
        {activeService && (
          <div
            className="pointer-events-none fixed z-30 hidden max-w-xs border border-border bg-surface/95 p-4 backdrop-blur-md md:block"
            style={{
              left: 'max(1rem, var(--preview-x, 50%))',
              top: 'max(6rem, var(--preview-y, 40%))',
            }}
            aria-hidden
          >
            <ServiceGlyph slug={activeService.slug} active />
            <p className="mt-3 text-sm text-ink-muted">{activeService.description}</p>
          </div>
        )}
        {servicesContent.items.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.04}>
            <article
              data-cursor-view
              className="group grid gap-4 py-10 transition-colors md:grid-cols-12 md:gap-8 md:py-14"
              onMouseEnter={(e) => {
                setService(service.slug)
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                document.documentElement.style.setProperty('--preview-x', `${rect.right + 16}px`)
                document.documentElement.style.setProperty('--preview-y', `${rect.top}px`)
              }}
              onMouseLeave={() => setService(null)}
              onFocus={() => setService(service.slug)}
              onBlur={() => setService(null)}
            >
              <div className="flex items-start gap-4 md:col-span-2">
                <span className="font-mono text-2xl text-accent md:text-3xl">{service.number}</span>
                <ServiceGlyph slug={service.slug} active={active === service.slug} />
              </div>
              <div className="md:col-span-4">
                <h3
                  className={`text-2xl font-semibold uppercase leading-tight tracking-tight transition-transform md:text-3xl ${
                    active === service.slug ? 'translate-x-1 text-accent' : ''
                  }`}
                >
                  {service.title.split(' ').map((word) => (
                    <span key={word} className="block">{word}</span>
                  ))}
                </h3>
                <span className="mt-2 hidden font-mono text-xs text-ink-subtle md:inline">↗</span>
              </div>
              <div className="md:col-span-6">
                <p
                  className={`max-w-lg leading-relaxed transition-all ${
                    active === service.slug ? 'text-ink' : 'text-ink-muted'
                  }`}
                >
                  {service.description}
                </p>
                <span
                  className={`mt-4 block h-px bg-accent transition-all ${
                    active === service.slug ? 'w-24' : 'w-12 opacity-40'
                  }`}
                  aria-hidden
                />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      {!hideHeader ? (
        <Link to="/services" className="mt-10 inline-block text-sm font-medium text-accent hover:underline">
          All services
        </Link>
      ) : null}
    </Section>
  )
}
