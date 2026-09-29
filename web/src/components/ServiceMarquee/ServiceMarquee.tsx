import { servicesContent } from '@/data/services'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ServiceMarquee() {
  const reduced = useReducedMotion()
  const titles = servicesContent.items.map((s) => s.title).join(' · ')

  if (reduced) return null

  return (
    <div className="overflow-hidden border-y border-border-subtle py-6" aria-hidden>
      <div className="animate-marquee whitespace-nowrap font-mono text-4xl font-semibold uppercase tracking-tight text-transparent md:text-6xl [-webkit-text-stroke:1px_var(--color-border)]">
        {titles} · {titles}
      </div>
    </div>
  )
}
