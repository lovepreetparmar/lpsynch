import { useRef, type MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SystemLayerMesh } from '@/components/system/SystemLayer'
import { resolveLayerOffsets } from '@/components/system/systemStates'
import type { SystemLayer } from '@/components/system/systemStates'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type SystemInteractionRef = MutableRefObject<{
  rotX: number
  rotY: number
  lightX: number
  lightY: number
}>

type SystemCoreProps = {
  activeId: string
  inspectMode: boolean
  inspectLayer: SystemLayer | null
  boot: number
  animate: boolean
  interactionRef: SystemInteractionRef
}

export function SystemCore({
  activeId,
  inspectMode,
  inspectLayer,
  boot,
  animate,
  interactionRef,
}: SystemCoreProps) {
  const reduced = useReducedMotion()
  const root = useRef<THREE.Group>(null)
  const rim = useRef<THREE.PointLight>(null)
  const outerScale = useRef(1)
  const targetScale = useRef(1)

  useFrame((state, delta) => {
    if (!root.current || !animate) return
    const off = resolveLayerOffsets(activeId, inspectMode, inspectLayer)
    targetScale.current = off.outerScale
    const t = reduced ? 1 : Math.min(1, delta * 2.2)
    outerScale.current += (targetScale.current - outerScale.current) * t

    if (!reduced) {
      const ix = interactionRef.current
      root.current.rotation.y = ix.rotY + state.clock.elapsedTime * 0.04
      root.current.rotation.x = ix.rotX * 0.1
      root.current.scale.setScalar(outerScale.current)
      if (rim.current) {
        rim.current.position.x += (ix.lightX * 2.2 - rim.current.position.x) * 0.05
        rim.current.position.y += (ix.lightY * 1.4 - rim.current.position.y) * 0.05
      }
    }
  })

  return (
    <group ref={root}>
      <ambientLight intensity={0.26} />
      <directionalLight position={[2.5, 4, 3]} intensity={0.82} color="#fff6ea" />
      <pointLight ref={rim} position={[-1.2, 0.8, 2.2]} intensity={0.45} color="#f1ac2f" distance={12} />

      <mesh position={[0, -0.05, -0.15]}>
        <boxGeometry args={[2, 0.04, 1.35]} />
        <meshStandardMaterial color="#121212" metalness={0.92} roughness={0.4} />
      </mesh>
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(1.95, 1.05, 1.15)]} />
        <lineBasicMaterial color="#f1ac2f" transparent opacity={0.18 + boot * 0.12} />
      </lineSegments>

      {(['interface', 'application', 'runtime', 'data', 'infrastructure'] as SystemLayer[]).map((layer) => (
        <SystemLayerMesh
          key={layer}
          layer={layer}
          activeId={activeId}
          inspectMode={inspectMode}
          inspectLayer={inspectLayer}
          boot={boot}
        />
      ))}

      <mesh position={[0.92, 0, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.75, 0.012, 0.012]} />
        <meshStandardMaterial color="#f1ac2f" emissive="#f1ac2f" emissiveIntensity={0.08 + boot * 0.1} metalness={0.95} roughness={0.25} />
      </mesh>
    </group>
  )
}
