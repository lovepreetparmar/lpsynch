import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { TechnologyObject, type InteractionRef } from '@/components/technologies/TechnologyObject'
import { TechnologyFallback } from '@/components/technologies/TechnologyFallback'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useIntersectionVisible } from '@/hooks/useIntersectionVisible'
import { getTechnologyVisualState } from '@/components/technologies/technologyStates'

type TechnologySceneProps = {
  technologyId: string
  inspectMode: boolean
  className?: string
}

export function TechnologyScene({ technologyId, inspectMode, className = '' }: TechnologySceneProps) {
  const reduced = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const wrapRef = useRef<HTMLDivElement>(null)
  const visible = useIntersectionVisible(wrapRef, '80px')
  const [webglOk, setWebglOk] = useState(true)
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 })
  const interactionRef = useRef({
    rotX: 0,
    rotY: 0,
    lightX: 0,
    lightY: 0,
    dragging: false,
  }) as InteractionRef

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
        interactionRef.current.rotY += dx * 0.004
        interactionRef.current.rotX += dy * 0.003
        interactionRef.current.rotX = Math.max(-0.14, Math.min(0.14, interactionRef.current.rotX))
        return
      }
      const rect = el.getBoundingClientRect()
      interactionRef.current.lightX = (e.clientX - rect.left) / rect.width - 0.5
      interactionRef.current.lightY = (e.clientY - rect.top) / rect.height - 0.5
      interactionRef.current.rotY = interactionRef.current.lightX * 0.12
      interactionRef.current.rotX = -interactionRef.current.lightY * 0.08
    }

    const onDown = (e: MouseEvent) => {
      dragRef.current.active = true
      dragRef.current.lastX = e.clientX
      dragRef.current.lastY = e.clientY
      interactionRef.current.dragging = true
    }
    const onUp = () => {
      dragRef.current.active = false
      interactionRef.current.dragging = false
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

  const visual = getTechnologyVisualState(technologyId)
  const shouldAnimate = visible && !reduced && webglOk

  if (!webglOk || reduced) {
    return (
      <div ref={wrapRef} className={className}>
        <TechnologyFallback technologyId={technologyId} inspectMode={inspectMode} emphasis={visual.emphasis} layers={visual.layers} />
      </div>
    )
  }

  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, isMobile ? 1 : 1.75) : 1

  return (
    <div ref={wrapRef} className={`relative touch-none select-none ${className}`} data-cursor-light aria-hidden>
      <Suspense fallback={<TechnologyFallback technologyId={technologyId} inspectMode={inspectMode} emphasis={visual.emphasis} layers={visual.layers} />}>
        <Canvas
          dpr={dpr}
          frameloop={shouldAnimate ? 'always' : 'demand'}
          camera={{ position: [0, 0.15, 3.4], fov: 42 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            try {
              if (!gl.capabilities) setWebglOk(false)
            } catch {
              setWebglOk(false)
            }
          }}
          onError={() => setWebglOk(false)}
        >
          <fog attach="fog" args={['#0a0a0a', 3, 9]} />
          <TechnologyObject
            technologyId={technologyId}
            inspectMode={inspectMode}
            interactionRef={interactionRef}
            animate={shouldAnimate}
          />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] tracking-widest text-ink-subtle uppercase">
        System / 01 · Active module
      </div>
    </div>
  )
}
