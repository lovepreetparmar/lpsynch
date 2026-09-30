import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { SystemLayer } from '@/components/system/systemStates'
import { getTechnologyState, resolveLayerOffsets } from '@/components/system/systemStates'

type SystemLayerMeshProps = {
  layer: SystemLayer
  activeId: string
  inspectMode: boolean
  inspectLayer: SystemLayer | null
  boot: number
}

const layerColors: Record<SystemLayer, string> = {
  interface: '#f5f5f5',
  application: '#2a2a2a',
  runtime: '#3d3d3d',
  data: '#1a1a1a',
  infrastructure: '#252525',
}

const layerBaseY: Record<SystemLayer, number> = {
  interface: 0.22,
  application: 0.02,
  runtime: -0.08,
  data: -0.22,
  infrastructure: -0.38,
}

export function SystemLayerMesh({ layer, activeId, inspectMode, inspectLayer, boot }: SystemLayerMeshProps) {
  const group = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    const off = resolveLayerOffsets(activeId, inspectMode, inspectLayer)
    const state = getTechnologyState(activeId)
    const active = state.layer === layer || state.modules.includes(layer)
    const targetZ = off[layer]
    const inspectY = inspectMode ? 0.14 : 0
    const targetY = layerBaseY[layer] + inspectY * (layer === 'interface' ? 1 : layer === 'infrastructure' ? -1 : 0.5)

    const t = Math.min(1, delta * 2.4)
    group.current.position.z += (targetZ - group.current.position.z) * t
    group.current.position.y += (targetY - group.current.position.y) * t
    const scale = 0.88 + boot * 0.12 + (active ? 0.04 : 0)
    group.current.scale.setScalar(scale)

    if (mat.current) {
      mat.current.emissiveIntensity = active ? off.emissive : 0.04
    }
  })

  const w = layer === 'infrastructure' ? 1.85 : 1.35
  const h = layer === 'data' ? 0.14 : 0.1
  const depth = layer === 'infrastructure' ? 0.06 : 0.08
  const state = getTechnologyState(activeId)
  const active = state.layer === layer || state.modules.includes(layer)

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry args={[w, h, depth]} />
        <meshStandardMaterial
          ref={mat}
          color={layerColors[layer]}
          metalness={layer === 'interface' ? 0.2 : 0.88}
          roughness={layer === 'interface' ? 0.15 : 0.32}
          emissive={active ? '#f1ac2f' : '#000000'}
          emissiveIntensity={0.1}
          transparent={layer === 'interface'}
          opacity={layer === 'interface' ? 0.55 + boot * 0.35 : 1}
        />
      </mesh>
      {layer === 'data' && active ? (
        <>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[-0.35 + i * 0.35, 0.12, 0.06]}>
              <boxGeometry args={[0.22, 0.02, 0.04]} />
              <meshStandardMaterial color="#f1ac2f" emissive="#f1ac2f" emissiveIntensity={0.15} metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </>
      ) : null}
      {layer === 'interface' && active ? (
        <mesh position={[0, 0.08, 0.05]}>
          <planeGeometry args={[0.9, 0.04]} />
          <meshBasicMaterial color="#f1ac2f" transparent opacity={0.35} />
        </mesh>
      ) : null}
    </group>
  )
}
