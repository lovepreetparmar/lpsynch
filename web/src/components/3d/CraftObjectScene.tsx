import { useEffect, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  craftDefaultState,
  lerpCraftState,
  resolveCraftState,
  type CraftVisualState,
} from '@/lib/three/objectStates'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type MouseTrackerRef = MutableRefObject<{ x: number; y: number; active: boolean }>

type CraftObjectSceneProps = {
  mode: 'hero' | 'service' | 'process' | 'idle'
  stateIndex: number
  serviceSlug?: string
  mouseRef: MouseTrackerRef
  animate: boolean
  chapterProgressRef?: MutableRefObject<number>
}

export function CraftObjectScene({
  mode,
  stateIndex,
  serviceSlug,
  mouseRef,
  animate,
  chapterProgressRef,
}: CraftObjectSceneProps) {
  const reduced = useReducedMotion()
  const root = useRef<THREE.Group>(null)
  const shell = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const layerA = useRef<THREE.Mesh>(null)
  const layerB = useRef<THREE.Mesh>(null)
  const rimLight = useRef<THREE.PointLight>(null)
  const current = useRef<CraftVisualState>(craftDefaultState)
  const target = useRef<CraftVisualState>(craftDefaultState)

  useEffect(() => {
    if (mode === 'hero') return
    target.current = resolveCraftState(mode, stateIndex, serviceSlug)
  }, [mode, stateIndex, serviceSlug])

  useFrame((state, delta) => {
    if (reduced || !animate || !root.current) return

    if (mode === 'hero' && chapterProgressRef) {
      const chapterProgress = chapterProgressRef.current
      const i = Math.floor(chapterProgress * (4 - 0.001))
      const next = Math.min(3, i + 1)
      const t = chapterProgress * 3 - i
      target.current = lerpCraftState(
        resolveCraftState('hero', i),
        resolveCraftState('hero', next),
        Math.max(0, Math.min(1, t)),
      )
    }

    const t = Math.min(1, delta * 2.5)
    current.current = lerpCraftState(current.current, target.current, t)

    const vis = current.current
    root.current.rotation.set(vis.groupRotation[0], vis.groupRotation[1], vis.groupRotation[2])
    root.current.scale.setScalar(vis.groupScale)

    if (shell.current) {
      shell.current.scale.setScalar(vis.shellScale)
      const mat = shell.current.material as THREE.MeshPhysicalMaterial
      mat.opacity = vis.glassOpacity
      mat.metalness = vis.metalness * 0.3
      mat.roughness = vis.roughness
    }
    if (core.current) {
      core.current.scale.setScalar(vis.coreScale)
      const mat = core.current.material as THREE.MeshStandardMaterial
      mat.metalness = vis.metalness
      mat.roughness = vis.roughness
      mat.emissiveIntensity = vis.emissiveIntensity
    }
    if (ringA.current) ringA.current.scale.setScalar(vis.ringScale)
    if (ringB.current) ringB.current.scale.setScalar(vis.ringScale * 0.92)
    if (layerA.current) layerA.current.position.y = vis.layerSpread * 0.35
    if (layerB.current) layerB.current.position.y = -vis.layerSpread * 0.28

    root.current.rotation.y += delta * 0.08

    const m = mouseRef.current
    if (m.active && rimLight.current) {
      rimLight.current.position.x += ((m.x - 0.5) * 2.5 - rimLight.current.position.x) * 0.05
      rimLight.current.position.y += ((0.5 - m.y) * 1.8 - rimLight.current.position.y) * 0.05
    }

    const idle = state.clock.elapsedTime
    if (ringA.current) ringA.current.rotation.x = idle * 0.12
    if (ringB.current) ringB.current.rotation.z = idle * 0.09
  })

  return (
    <group ref={root}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} color="#fff5e6" />
      <pointLight ref={rimLight} position={[-2, 1, 3]} intensity={0.55} color="#f1ac2f" distance={14} />
      <pointLight position={[3, -2, -2]} intensity={0.25} color="#8ab4ff" distance={12} />

      <mesh ref={layerB} position={[0, -0.28, 0]}>
        <boxGeometry args={[1.4, 0.06, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.35} />
      </mesh>
      <mesh ref={layerA} position={[0, 0.35, 0]}>
        <boxGeometry args={[1.1, 0.05, 1.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.28} />
      </mesh>

      <mesh ref={core}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial color="#c9c9c9" metalness={0.9} roughness={0.18} emissive="#f1ac2f" emissiveIntensity={0.12} />
      </mesh>

      <mesh ref={shell}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.08}
          transmission={0.92}
          thickness={0.8}
          transparent
          opacity={0.35}
          ior={1.2}
        />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.05, 0.012, 12, 80]} />
        <meshStandardMaterial color="#f1ac2f" metalness={0.95} roughness={0.2} emissive="#f1ac2f" emissiveIntensity={0.08} />
      </mesh>
      <mesh ref={ringB} rotation={[0.4, 0.5, 0]}>
        <torusGeometry args={[0.88, 0.01, 10, 64]} />
        <meshStandardMaterial color="#fafafa" metalness={0.8} roughness={0.25} opacity={0.6} transparent />
      </mesh>
    </group>
  )
}
