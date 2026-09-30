import { useEffect, useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  getTechnologyVisualState,
  lerpVisualState,
  type TechnologyVisualState,
} from '@/components/technologies/technologyStates'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type InteractionRef = MutableRefObject<{
  rotX: number
  rotY: number
  lightX: number
  lightY: number
  dragging: boolean
}>

type TechnologyObjectProps = {
  technologyId: string
  inspectMode: boolean
  interactionRef: InteractionRef
  animate: boolean
}

export function TechnologyObject({ technologyId, inspectMode, interactionRef, animate }: TechnologyObjectProps) {
  const reduced = useReducedMotion()
  const root = useRef<THREE.Group>(null)
  const layerA = useRef<THREE.Mesh>(null)
  const layerB = useRef<THREE.Mesh>(null)
  const layerC = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)
  const frame = useRef<THREE.Mesh>(null)
  const rim = useRef<THREE.PointLight>(null)
  const current = useRef<TechnologyVisualState>(getTechnologyVisualState(technologyId))
  const target = useRef<TechnologyVisualState>(getTechnologyVisualState(technologyId))

  useEffect(() => {
    target.current = getTechnologyVisualState(technologyId)
  }, [technologyId])

  useFrame((state, delta) => {
    if (!root.current || !animate) return

    const t = reduced ? 1 : Math.min(1, delta * 2.2)
    current.current = lerpVisualState(current.current, target.current, t)
    const vis = current.current
    const spread = inspectMode ? vis.layerSpread * 2.2 : vis.layerSpread

    if (layerA.current) layerA.current.position.y = spread
    if (layerB.current) layerB.current.position.y = 0
    if (layerC.current) layerC.current.position.y = -spread
    if (core.current) core.current.scale.setScalar(vis.coreScale * (inspectMode ? 0.85 : 1))
    if (frame.current) {
      frame.current.scale.set(vis.plateScale, vis.plateScale, vis.plateScale)
      frame.current.rotation.x = vis.frameTilt
    }

    const ix = interactionRef.current
    if (!reduced) {
      root.current.rotation.y = ix.rotY + state.clock.elapsedTime * 0.06
      root.current.rotation.x = ix.rotX * 0.12
      if (rim.current) {
        rim.current.position.x += (ix.lightX * 2 - rim.current.position.x) * 0.06
        rim.current.position.y += (ix.lightY * 1.5 - rim.current.position.y) * 0.06
      }
    }

    const mats = [layerA.current, layerB.current, layerC.current, core.current]
    mats.forEach((m) => {
      if (!m) return
      const mat = m.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = vis.emissive
    })
  })

  return (
    <group ref={root}>
      <ambientLight intensity={0.28} />
      <directionalLight position={[3, 5, 4]} intensity={0.85} color="#fff8ee" />
      <pointLight ref={rim} position={[-1.5, 1, 2]} intensity={0.5} color="#f1ac2f" distance={10} />

      <mesh ref={frame}>
        <boxGeometry args={[1.65, 0.08, 1.05]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.92} roughness={0.28} />
      </mesh>

      <mesh ref={layerA} position={[0, 0.22, 0]}>
        <boxGeometry args={[1.35, 0.04, 0.85]} />
        <meshPhysicalMaterial
          color="#fafafa"
          metalness={0.15}
          roughness={0.12}
          transmission={0.55}
          thickness={0.4}
          transparent
          opacity={0.45}
        />
      </mesh>
      <mesh ref={layerB}>
        <boxGeometry args={[1.15, 0.06, 0.7]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.88} roughness={0.22} emissive="#f1ac2f" emissiveIntensity={0.12} />
      </mesh>
      <mesh ref={layerC} position={[0, -0.22, 0]}>
        <boxGeometry args={[1.25, 0.035, 0.75]} />
        <meshStandardMaterial color="#141414" metalness={0.95} roughness={0.35} />
      </mesh>
      <mesh ref={core} position={[0, 0, 0.15]}>
        <boxGeometry args={[0.35, 0.35, 0.12]} />
        <meshStandardMaterial color="#f1ac2f" metalness={0.9} roughness={0.15} emissive="#f1ac2f" emissiveIntensity={0.2} />
      </mesh>

      {/* Technical frame lines */}
      <mesh>
        <boxGeometry args={[1.7, 0.5, 1.1]} />
        <meshBasicMaterial visible={false} />
        <lineSegments>
          <edgesGeometry attach="geometry" />
          <lineBasicMaterial color="#f1ac2f" transparent opacity={0.25} />
        </lineSegments>
      </mesh>
    </group>
  )
}
