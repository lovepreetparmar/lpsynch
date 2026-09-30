import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from '@/components/3d/ParticleField'
import { NetworkScene, type MouseTrackerRef } from '@/components/3d/NetworkScene'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useIntersectionVisible } from '@/hooks/useIntersectionVisible'

type DigitalWorldProps = {
  className?: string
}

function SceneContent({ mouseRef, animate, particleCount }: { mouseRef: MouseTrackerRef; animate: boolean; particleCount: number }) {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 6, 18]} />
      <ambientLight intensity={0.32} />
      <pointLight position={[4, 4, 4]} intensity={0.65} color="#f1ac2f" />
      <NetworkScene mouseRef={mouseRef} animate={animate} />
      <ParticleField count={particleCount} />
    </>
  )
}

export function DigitalWorld({ className = '' }: DigitalWorldProps) {
  const reduced = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const wrapRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false }) as MouseTrackerRef
  const visible = useIntersectionVisible(wrapRef, '80px')

  useEffect(() => {
    if (reduced || isMobile) return
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
  }, [reduced, isMobile, mouseRef])

  const dpr =
    typeof window !== 'undefined'
      ? Math.min(window.devicePixelRatio, isMobile ? 1 : 1.75)
      : 1
  const particleCount = isMobile ? 48 : 100
  const shouldAnimate = visible && !reduced

  if (reduced) {
    return (
      <div
        ref={wrapRef}
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgb(241_172_47_/_0.08),transparent_55%)] ${className}`}
        aria-hidden
      />
    )
  }

  return (
    <div ref={wrapRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <Suspense fallback={null}>
        <Canvas
          dpr={dpr}
          frameloop={shouldAnimate ? 'always' : 'demand'}
          camera={{ position: [0, 0.35, 7], fov: 50 }}
          gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        >
          <SceneContent mouseRef={mouseRef} animate={shouldAnimate} particleCount={particleCount} />
        </Canvas>
      </Suspense>
      <div className="absolute inset-0 grid-bg opacity-30" />
    </div>
  )
}
