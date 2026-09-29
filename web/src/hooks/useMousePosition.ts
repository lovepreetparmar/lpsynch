import { useEffect, useState, type RefObject } from 'react'
import { normMouse } from '@/systems/digital-flow/digitalFlow.math'

type MouseState = { x: number; y: number; active: boolean }

export function useMousePosition(containerRef: RefObject<HTMLElement | null>): MouseState {
  const [state, setState] = useState<MouseState>({ x: 0.5, y: 0.5, active: false })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const { x, y } = normMouse(e.clientX, e.clientY, rect)
      setState({ x, y, active: true })
    }
    const onLeave = () => setState((s) => ({ ...s, active: false }))

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [containerRef])

  return state
}
