import { useEffect, useRef, type ReactNode } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { bindParallax } from '@/lib/animations/parallax'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ParallaxProps = {
  children: ReactNode
  className?: string
  amount?: number
}

export function Parallax({ children, className = '', amount = -40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      bindParallax(ref.current!, amount)
    }, ref)
    return () => ctx.revert()
  }, [reduced, amount])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
