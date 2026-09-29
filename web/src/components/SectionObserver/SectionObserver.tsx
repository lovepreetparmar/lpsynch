import { useEffect } from 'react'
import { useSite } from '@/systems/site/SiteContext'
import type { SiteState } from '@/systems/site/site.types'

const SECTION_ATTR = 'data-flow-section'

export function SectionObserver() {
  const { setSiteState, triggerSectionPulse } = useSite()

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(`[${SECTION_ATTR}]`)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible?.target) return
        const state = visible.target.getAttribute(SECTION_ATTR) as SiteState
        if (state) {
          setSiteState(state)
          triggerSectionPulse()
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [setSiteState, triggerSectionPulse])

  return null
}

export const flowSectionAttr = SECTION_ATTR
