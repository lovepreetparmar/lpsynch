import { useMemo, useRef, type MutableRefObject } from 'react'
import { Line } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export type MouseTrackerRef = MutableRefObject<{ x: number; y: number; active: boolean }>

const NODE_COUNT = 6

type NetworkSceneProps = {
  mouseRef: MouseTrackerRef
  animate?: boolean
}

export function NetworkScene({ mouseRef, animate = true }: NetworkSceneProps) {
  const reduced = useReducedMotion()
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const pointerLight = useRef<THREE.PointLight>(null)
  const { camera } = useThree()
  const targetCam = useRef({ x: 0, y: 0.4 })

  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2 - Math.PI / 2
      const r = 2.35
      pts.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r * 0.55, Math.sin(angle) * r * 0.35))
    }
    return pts
  }, [])

  const corePoint = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame((state) => {
    if (reduced || !animate) return

    const t = state.clock.elapsedTime
    if (group.current) group.current.rotation.y = t * 0.04
    if (core.current) {
      core.current.rotation.y = -t * 0.08
      core.current.rotation.x = Math.sin(t * 0.15) * 0.06
    }

    const m = mouseRef.current
    if (m.active) {
      targetCam.current.x = (m.x - 0.5) * 0.9
      targetCam.current.y = 0.35 + (0.5 - m.y) * 0.45
      if (pointerLight.current) {
        pointerLight.current.position.x += ((m.x - 0.5) * 3 - pointerLight.current.position.x) * 0.06
        pointerLight.current.position.y += ((0.5 - m.y) * 2 - pointerLight.current.position.y) * 0.06
      }
    }

    camera.position.x += (targetCam.current.x - camera.position.x) * 0.04
    camera.position.y += (targetCam.current.y - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={group}>
      <pointLight ref={pointerLight} position={[0, 0, 3]} intensity={0.45} color="#f1ac2f" distance={12} />
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color="#fafafa" emissive="#f1ac2f" emissiveIntensity={0.28} />
        </mesh>
      ))}
      {nodes.map((n, i) => (
        <Line key={`l-${i}`} points={[n, corePoint]} color="#f1ac2f" transparent opacity={0.22} lineWidth={1} />
      ))}
      <mesh ref={core} position={corePoint}>
        <icosahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial color="#f1ac2f" emissive="#f1ac2f" emissiveIntensity={0.55} wireframe />
      </mesh>
      <mesh position={corePoint}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#f1ac2f" emissive="#f1ac2f" emissiveIntensity={0.65} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <ringGeometry args={[2.65, 2.68, 64]} />
        <meshBasicMaterial color="#f1ac2f" transparent opacity={0.07} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
