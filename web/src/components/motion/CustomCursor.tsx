import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type CursorLabel = 'default' | 'view' | 'open' | 'explore' | 'link'

const labels: Record<CursorLabel, string> = {
  default: '',
  view: 'VIEW',
  open: 'OPEN',
  explore: 'EXPLORE',
  link: '↗',
}

export function CustomCursor({ label = 'default' }: { label?: CursorLabel }) {
  const reduced = useReducedMotion()
  const isTouch = useMediaQuery('(pointer: coarse)')
  const [visible, setVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const dotRef = useRef<HTMLDivElement>(null)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (reduced || isTouch) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15
      pos.current.y += (target.current.y - pos.current.y) * 0.15
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.body.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [reduced, isTouch])

  if (reduced || isTouch || !visible) return null

  const text = labels[label]
  const active = label !== 'default'

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[120] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      aria-hidden
    >
      <div
        className={`flex items-center gap-2 rounded-full border border-white/40 px-2 py-1 font-mono text-[10px] tracking-widest text-white transition-transform duration-200 ${
          active ? 'scale-110' : 'scale-100'
        }`}
      >
        <span className={`block rounded-full border border-white ${active ? 'h-2 w-2 bg-white' : 'h-2 w-2'}`} />
        {text ? <span>{text}</span> : null}
      </div>
    </div>
  )
}
