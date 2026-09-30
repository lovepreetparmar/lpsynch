import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { servicesContent } from '@/data/services'
import { Container } from '@/components/Container/Container'
import { ServiceSpecimenPanel } from '@/components/services/ServiceSpecimen'
import { MotionReveal } from '@/components/motion/Reveal'

export function ServicesSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const [lockedIndex, setLockedIndex] = useState(0)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const prevIndexRef = useRef(0)

  const activeIndex = previewIndex ?? lockedIndex
  const active = servicesContent.items[activeIndex]
  const total = servicesContent.items.length
  const prevIndexForTransition = prevIndexRef.current

  useEffect(() => {
    prevIndexRef.current = activeIndex
  }, [activeIndex])

  const handleSelect = (index: number) => {
    setLockedIndex(index)
    setPreviewIndex(null)
  }

  return (
    <section id="services" data-flow-section="services" className="relative border-b border-border-subtle bg-surface-muted">
      <Container className="py-16 pb-20 md:py-24 md:pb-28">
        {!hideHeader ? (
          <MotionReveal className="mb-12 max-w-2xl">
            <p className="font-mono text-xs tracking-[0.3em] text-ink-subtle uppercase">Services</p>
            <h2 className="mt-4 text-4xl font-semibold uppercase tracking-tight md:text-5xl">
              {servicesContent.heading}
            </h2>
          </MotionReveal>
        ) : null}

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 lg:items-stretch">
          <div className="lg:col-span-6 lg:min-h-0">
            <ul
              className="divide-y divide-border border-y border-border"
              role="listbox"
              aria-label="Services"
              onMouseLeave={() => setPreviewIndex(null)}
            >
              {servicesContent.items.map((service, index) => {
                const isActive = index === activeIndex
                const isLocked = index === lockedIndex && previewIndex === null
                return (
                  <li key={service.slug}>
                    <button
                      type="button"
                      data-cursor-view
                      role="option"
                      aria-selected={isActive}
                      className={`group w-full py-8 text-left transition-colors md:py-10 ${
                        isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                      }`}
                      onMouseEnter={() => setPreviewIndex(index)}
                      onFocus={() => setPreviewIndex(index)}
                      onClick={() => handleSelect(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown') {
                          e.preventDefault()
                          handleSelect(Math.min(total - 1, index + 1))
                        }
                        if (e.key === 'ArrowUp') {
                          e.preventDefault()
                          handleSelect(Math.max(0, index - 1))
                        }
                      }}
                    >
                      <span
                        className={`font-mono text-sm transition-colors md:text-base ${
                          isActive ? 'text-accent' : 'text-ink-subtle'
                        }`}
                      >
                        {service.number}
                      </span>
                      <h3
                        className={`mt-3 text-2xl font-semibold uppercase leading-tight tracking-tight transition-transform md:text-4xl ${
                          isActive ? 'translate-x-1' : ''
                        }`}
                      >
                        {service.title}
                      </h3>
                      {isLocked ? (
                        <span className="mt-2 block font-mono text-[9px] tracking-widest text-accent uppercase">
                          Active
                        </span>
                      ) : null}
                      <span
                        className={`mt-4 block h-px bg-accent transition-all ${
                          isActive ? 'w-full max-w-md opacity-100' : 'w-12 opacity-30'
                        }`}
                        aria-hidden
                      />
                      <p className="mt-4 max-w-lg text-base leading-relaxed md:text-lg">{service.description}</p>
                      <ul className="mt-4 flex flex-wrap gap-2 lg:hidden">
                        {service.technologies.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-ink-subtle uppercase"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="relative hidden min-h-0 lg:col-span-6 lg:block">
            <div className="sticky top-24 z-[1] lg:max-h-[calc(100svh-5.5rem)]">
              {active ? (
                <ServiceSpecimenPanel
                  service={active}
                  index={activeIndex}
                  total={total}
                  prevIndex={prevIndexForTransition}
                  className="lg:max-h-[calc(100svh-5.5rem)]"
                />
              ) : null}
            </div>
          </div>
        </div>

        {active ? (
          <div className="mt-10 lg:hidden">
            <ServiceSpecimenPanel
              service={active}
              index={activeIndex}
              total={total}
              prevIndex={prevIndexForTransition}
            />
          </div>
        ) : null}

        {!hideHeader ? (
          <Link
            to="/services"
            className="relative z-[2] mt-12 inline-block pb-6 text-sm font-medium text-accent hover:underline lg:mt-8"
          >
            All services
          </Link>
        ) : null}
      </Container>
    </section>
  )
}
