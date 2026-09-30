import { Suspense, useEffect, useRef, type MutableRefObject, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { CraftObjectScene, type MouseTrackerRef } from '@/components/3d/CraftObjectScene'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useIntersectionVisible } from '@/hooks/useIntersectionVisible'

type CraftObjectCanvasProps = {
  className?: string
  mode?: 'hero' | 'service' | 'process' | 'idle'
  stateIndex?: number
  serviceSlug?: string
  chapterProgressRef?: MutableRefObject<number>
  heightClass?: string
  enablePointer?: boolean
  children?: ReactNode
}

export function CraftObjectCanvas({
  className = '',
  mode = 'idle',
  stateIndex = 0,
  serviceSlug,
  chapterProgressRef,
  heightClass = 'h-full min-h-[280px]',
  enablePointer = true,
}: CraftObjectCanvasProps) {
  const reduced = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const wrapRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false }) as MouseTrackerRef
  const visible = useIntersectionVisible(wrapRef, '120px')

  useEffect(() => {
    if (reduced || isMobile || !enablePointer) return
    const el = wrapRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      }
    }
    const onLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false }
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced, isMobile, enablePointer])

  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, isMobile ? 1 : 1.75) : 1
  const shouldAnimate = visible && !reduced

  if (reduced) {
    return (
      <div
        ref={wrapRef}
        className={`${heightClass} ${className} bg-[radial-gradient(ellipse_at_50%_40%,rgb(241_172_47_/_0.07),transparent_60%)]`}
        aria-hidden
      />
    )
  }

  return (
    <div ref={wrapRef} className={`${heightClass} ${className}`} data-cursor-light aria-hidden>
      <Suspense fallback={<div className="h-full w-full bg-surface-muted/30" />}>
        <Canvas
          dpr={dpr}
          frameloop={shouldAnimate ? 'always' : 'demand'}
          camera={{ position: [0, 0.2, 4.2], fov: 42 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        >
          <fog attach="fog" args={['#0a0a0a', 4, 14]} />
          <CraftObjectScene
            mode={mode}
            stateIndex={stateIndex}
            serviceSlug={serviceSlug}
            mouseRef={mouseRef}
            animate={shouldAnimate}
            chapterProgressRef={chapterProgressRef}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
