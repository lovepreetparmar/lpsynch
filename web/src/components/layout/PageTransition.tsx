import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type PageTransitionProps = {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const reduced = useReducedMotion()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    ensureGsapPlugins()
    gsap.set(el, { opacity: 1, y: 0 })

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0.35, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: motion.duration.fast,
          ease: motion.ease.smooth,
          overwrite: 'auto',
        },
      )
    })

    return () => {
      ctx.revert()
      gsap.set(el, { opacity: 1, y: 0, clearProps: 'opacity,transform' })
    }
  }, [location.pathname, reduced])

  return (
    <div ref={contentRef} key={location.pathname}>
      {children}
    </div>
  )
}
