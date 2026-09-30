import { useEffect, useRef, type ReactNode } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { revealUp } from '@/lib/animations/reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article'
}

export function MotionReveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !ref.current) return
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      revealUp(ref.current!, { delay })
    }, ref)
    return () => ctx.revert()
  }, [reduced, delay])

  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
