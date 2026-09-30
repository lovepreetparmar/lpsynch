import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ensureGsapPlugins, ScrollTrigger } from '@/lib/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function ScrollProgress() {
  const reduced = useReducedMotion()
  const location = useLocation()
  const [progress, setProgress] = useState(0)

  const onHome = location.pathname === '/'

  useEffect(() => {
    if (reduced || !onHome) return
    ensureGsapPlugins()
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setProgress(self.progress),
    })
    return () => st.kill()
  }, [reduced, onHome])

  if (reduced || !onHome) return null

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 hidden h-px origin-left bg-accent md:block"
      style={{ transform: `scaleX(${Math.max(0.02, progress)})` }}
      aria-hidden
    />
  )
}
