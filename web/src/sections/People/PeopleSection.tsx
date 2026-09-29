import { peopleContent } from '@/data/people'
import { Section } from '@/components/Section/Section'
import { Reveal } from '@/components/Reveal/Reveal'
import { useSite } from '@/systems/site/SiteContext'

export function PeopleSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const { activePersonId, setActivePersonId } = useSite()
  const active =
    peopleContent.members.find((m) => m.name === activePersonId) ?? peopleContent.members[0]

  return (
    <Section id="people" flowSection="people">
      {!hideHeader ? (
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-ink-subtle uppercase">
            {peopleContent.sectionLabel}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">{peopleContent.heading}</h2>
          <p className="mt-6 max-w-3xl text-lg font-medium text-ink">{peopleContent.introTitle}</p>
          <p className="mt-4 max-w-2xl text-ink-muted">{peopleContent.introBody}</p>
        </Reveal>
      ) : null}

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="sticky top-28 border border-border-subtle bg-surface-elevated">
            <img
              src={active.image}
              alt={active.name}
              className="aspect-square w-full object-cover"
            />
            <div className="p-6">
              <span className="font-mono text-xs text-accent">{active.number}</span>
              <h3 className="mt-2 text-2xl font-semibold">{active.name}</h3>
              <p className="mt-1 text-ink-muted">{active.role}</p>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <ul className="divide-y divide-border border-y border-border">
            {peopleContent.members.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.04}>
                <li>
                  <button
                    type="button"
                    className={`flex w-full items-center gap-6 py-6 text-left transition-colors hover:bg-surface-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                      active.name === member.name ? 'bg-surface-muted/30' : ''
                    }`}
                    onMouseEnter={() => setActivePersonId(member.name)}
                    onFocus={() => setActivePersonId(member.name)}
                  >
                    <span className="font-mono text-sm text-accent w-8">{member.number}</span>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-ink-muted">{member.role}</p>
                    </div>
                  </button>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
