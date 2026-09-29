import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type CursorMode = 'default' | 'link' | 'view' | 'flow'

export function CursorSystem({ mode = 'default' }: { mode?: CursorMode }) {
  const reduced = useReducedMotion()
  const isTouch = useMediaQuery('(pointer: coarse)')
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reduced || isTouch) return

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    document.body.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced, isTouch])

  if (reduced || isTouch || !visible) return null

  const label =
    mode === 'link' ? '↗' : mode === 'view' ? 'VIEW' : mode === 'flow' ? '◎' : '+'

  return (
    <div
      className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-accent mix-blend-difference"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    >
      {label}
    </div>
  )
}
