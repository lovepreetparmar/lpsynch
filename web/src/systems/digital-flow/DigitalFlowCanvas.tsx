import { useEffect, useRef } from 'react'
import {
  applyLetterformSnap,
  createNodes,
  updateDigitalFlow,
} from '@/systems/digital-flow/digitalFlow.engine'
import type { FlowConnection, FlowNode } from '@/systems/digital-flow/digitalFlow.types'
import { useSite } from '@/systems/site/SiteContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

type DigitalFlowCanvasProps = {
  className?: string
  mouseX: number
  mouseY: number
  mouseActive: boolean
  visible?: boolean
}

export function DigitalFlowCanvas({
  className = '',
  mouseX,
  mouseY,
  mouseActive,
  visible = true,
}: DigitalFlowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<FlowNode[] | null>(null)
  const rafRef = useRef<number>(0)
  const { siteState, activeServiceId, activePersonId, letterformProgress } = useSite()
  const reducedMotion = useReducedMotion()
  const isTouch = useMediaQuery('(pointer: coarse)')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !visible) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!nodesRef.current) {
        nodesRef.current = createNodes(rect.width, rect.height)
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let running = true
    const start = performance.now()

    const frame = (now: number) => {
      if (!running) return
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      const nodes = nodesRef.current
      if (!nodes || w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(frame)
        return
      }

      let connections: FlowConnection[]
      if (letterformProgress > 0) {
        applyLetterformSnap(nodes, w, h, letterformProgress)
        connections = []
      } else {
        connections = updateDigitalFlow(nodes, {
        siteState,
        width: w,
        height: h,
        mouseX,
        mouseY,
        mouseActive,
        reducedMotion,
        isTouch,
        activeServiceId,
        activePersonId,
        time: now - start,
        pulse: 0,
        })
      }

      ctx.clearRect(0, 0, w, h)
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#f1ac2f'

      ctx.strokeStyle = accent
      ctx.globalAlpha = 0.15
      connections.forEach((c) => {
        const a = nodes.find((n) => n.id === c.from)
        const b = nodes.find((n) => n.id === c.to)
        if (!a || !b) return
        ctx.globalAlpha = 0.08 + c.strength * 0.12
        ctx.lineWidth = 0.5 + c.strength
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      })

      nodes.forEach((node) => {
        ctx.globalAlpha = node.state === 'active' ? 0.9 : 0.45
        ctx.fillStyle = accent
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [
    visible,
    siteState,
    mouseX,
    mouseY,
    mouseActive,
    reducedMotion,
    isTouch,
    activeServiceId,
    activePersonId,
    letterformProgress,
  ])

  if (!visible) return null

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  )
}
