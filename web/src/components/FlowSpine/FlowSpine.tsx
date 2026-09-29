import { siteStateOrder, siteStateIndex } from '@/systems/site/site.types'
import { useSite } from '@/systems/site/SiteContext'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useLocation, useNavigate } from 'react-router-dom'

const anchors: Record<string, string> = {
  home: '#top',
  about: '#about',
  approach: '#approach',
  services: '#services',
  people: '#people',
  contact: '#contact-cta',
}

export function FlowSpine() {
  const { siteState } = useSite()
  const scroll = useScrollProgress()
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname !== '/') return null

  const active = siteStateIndex(siteState)

  return (
    <div
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 md:flex"
      aria-hidden
    >
      <div className="relative h-48 w-px bg-border">
        <div
          className="absolute left-0 top-0 w-full bg-accent transition-all duration-300"
          style={{ height: `${Math.max(scroll * 100, ((active + 1) / siteStateOrder.length) * 100)}%` }}
        />
      </div>
      {siteStateOrder.map((state, i) => (
        <button
          key={state}
          type="button"
          className={`h-2 w-2 rounded-full border transition-colors ${
            i <= active ? 'border-accent bg-accent' : 'border-border bg-transparent'
          }`}
          onClick={() => {
            const hash = anchors[state]
            if (hash === '#top') navigate('/')
            else document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
          }}
          tabIndex={-1}
        />
      ))}
    </div>
  )
}
