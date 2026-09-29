import { useEffect, useState } from 'react'
import { useSite } from '@/systems/site/SiteContext'
import { siteStateIndex, siteStateOrder } from '@/systems/site/site.types'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function MetadataStrip() {
  const { siteState } = useSite()
  const scroll = useScrollProgress()
  const reduced = useReducedMotion()
  const [time, setTime] = useState('')
  const [viewport, setViewport] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false }),
      )
      setViewport(`${window.innerWidth}×${window.innerHeight}`)
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    window.addEventListener('resize', tick)
    return () => {
      clearInterval(id)
      window.removeEventListener('resize', tick)
    }
  }, [])

  if (reduced) return null

  const section = siteStateIndex(siteState) + 1

  return (
    <div
      className="fixed bottom-3 left-3 z-40 hidden font-mono text-[10px] tracking-wide text-ink-subtle md:block"
      aria-hidden
    >
      SECTION {String(section).padStart(2, '0')}/{siteStateOrder.length} · SCROLL{' '}
      {Math.round(scroll * 100)}% · {time} · VIEWPORT {viewport}
    </div>
  )
}
