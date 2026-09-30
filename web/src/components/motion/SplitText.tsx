import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { revealChars, revealWords } from '@/lib/animations/text'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type SplitMode = 'words' | 'chars'

type SplitTextProps = {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  mode?: SplitMode
  animate?: boolean
  delay?: number
}

export function SplitText({
  children,
  as: Tag = 'span',
  className = '',
  mode = 'words',
  animate = true,
  delay = 0,
}: SplitTextProps) {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)

  const units = useMemo(() => {
    if (mode === 'chars') return children.split('')
    return children.split(/\s+/).filter(Boolean)
  }, [children, mode])

  useEffect(() => {
    if (!animate || reduced || !rootRef.current) return
    ensureGsapPlugins()
    const els = Array.from(rootRef.current.querySelectorAll('[data-split-unit]')) as HTMLElement[]
    const ctx = gsap.context(() => {
      const tween = mode === 'chars' ? revealChars(els) : revealWords(els)
      if (delay) tween.delay(delay)
    }, rootRef)
    return () => ctx.revert()
  }, [animate, reduced, mode, delay, children])

  return (
    <Tag ref={rootRef as never} className={className}>
      {units.map((unit, i) => (
        <span key={`${unit}-${i}`} className="inline-block overflow-hidden bg-surface align-top">
          <span
            data-split-unit
            className="inline-block will-change-transform"
            style={reduced || !animate ? undefined : { opacity: 0 }}
          >
            {unit}
            {mode === 'words' && i < units.length - 1 ? '\u00A0' : null}
          </span>
        </span>
      ))}
    </Tag>
  )
}

export function SplitTextBlock({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}
