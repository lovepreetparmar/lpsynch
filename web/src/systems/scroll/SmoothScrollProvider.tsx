import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { ensureGsapPlugins, gsap, ScrollTrigger } from '@/lib/animations/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

function RouteScrollReset({ lenis }: { lenis: Lenis | null }) {
  const location = useLocation()
  const reduced = useReducedMotion()

  useEffect(() => {
    ensureGsapPlugins()

    if (lenis && !reduced) {
      lenis.scrollTo(0, { immediate: true, force: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? ('instant' as ScrollBehavior) : 'auto' })
    }

    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [location.pathname, lenis, reduced])

  return null
}

type SmoothScrollProviderProps = {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    ensureGsapPlugins()
    if (reduced) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    instance.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)

    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    ensureGsapPlugins()
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [reduced])

  return (
    <LenisContext.Provider value={lenis}>
      <RouteScrollReset lenis={lenis} />
      {children}
    </LenisContext.Provider>
  )
}
