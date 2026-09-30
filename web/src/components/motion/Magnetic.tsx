import { useRef, type ReactNode, type MouseEvent } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = '', strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isTouch = useMediaQuery('(pointer: coarse)')

  const onMove = (e: MouseEvent) => {
    if (reduced || isTouch || !ref.current) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
  }

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

export function MagneticButton({ children, className = '' }: MagneticProps) {
  return (
    <Magnetic className={className} strength={0.18}>
      {children}
    </Magnetic>
  )
}
