import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { SystemCore, type SystemInteractionRef } from '@/components/system/SystemCore'
import { SystemFallback } from '@/components/system/SystemFallback'
import type { SystemLayer } from '@/components/system/systemStates'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useIntersectionVisible } from '@/hooks/useIntersectionVisible'

type SystemSceneProps = {
  activeId: string
  inspectMode: boolean
  inspectLayer: SystemLayer | null
  boot: number
  className?: string
}

export function SystemScene({ activeId, inspectMode, inspectLayer, boot, className = '' }: SystemSceneProps) {
  const reduced = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const wrapRef = useRef<HTMLDivElement>(null)
  const visible = useIntersectionVisible(wrapRef, '80px')
  const [webglOk, setWebglOk] = useState(true)
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 })
  const interactionRef = useRef({ rotX: 0, rotY: 0, lightX: 0, lightY: 0 }) as SystemInteractionRef

  useEffect(() => {
    if (reduced || isMobile) return
    const el = wrapRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      if (dragRef.current.active) {
        const dx = e.clientX - dragRef.current.lastX
        const dy = e.clientY - dragRef.current.lastY
        dragRef.current.lastX = e.clientX
        dragRef.current.lastY = e.clientY
        interactionRef.current.rotY += dx * 0.0035
        interactionRef.current.rotX += dy * 0.0025
        interactionRef.current.rotX = Math.max(-0.12, Math.min(0.12, interactionRef.current.rotX))
        return
      }
      const rect = el.getBoundingClientRect()
      interactionRef.current.lightX = (e.clientX - rect.left) / rect.width - 0.5
      interactionRef.current.lightY = (e.clientY - rect.top) / rect.height - 0.5
      interactionRef.current.rotY = interactionRef.current.lightX * 0.1
      interactionRef.current.rotX = -interactionRef.current.lightY * 0.07
    }
    const onDown = (e: MouseEvent) => {
      dragRef.current.active = true
      dragRef.current.lastX = e.clientX
      dragRef.current.lastY = e.clientY
    }
    const onUp = () => {
      dragRef.current.active = false
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [reduced, isMobile])

  const shouldAnimate = visible && !reduced && webglOk && boot > 0.05
  const useFallback = !webglOk || reduced

  if (useFallback) {
    return (
      <div ref={wrapRef} className={className}>
        <SystemFallback activeId={activeId} inspectMode={inspectMode} inspectLayer={inspectLayer} boot={boot} />
      </div>
    )
  }

  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, isMobile ? 1 : 1.75) : 1

  return (
    <div ref={wrapRef} className={`relative touch-none select-none ${className}`} data-cursor-light aria-hidden>
      <Suspense fallback={<SystemFallback activeId={activeId} inspectMode={inspectMode} inspectLayer={inspectLayer} boot={boot} />}>
        <Canvas
          dpr={dpr}
          frameloop={shouldAnimate ? 'always' : 'demand'}
          camera={{ position: [0, 0.05, 3.6], fov: 40 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            const lost = gl.getContext()?.isContextLost?.()
            if (lost) setWebglOk(false)
          }}
        >
          <fog attach="fog" args={['#0a0a0a', 3.5, 10]} />
          <SystemCore
            activeId={activeId}
            inspectMode={inspectMode}
            inspectLayer={inspectLayer}
            boot={boot}
            animate={shouldAnimate}
            interactionRef={interactionRef}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
