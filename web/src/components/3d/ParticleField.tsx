import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ParticleFieldProps = {
  count?: number
  spread?: number
}

export function ParticleField({ count = 120, spread = 14 }: ParticleFieldProps) {
  const reduced = useReducedMotion()
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count, spread])

  useFrame((state) => {
    if (reduced || !points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.02
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#f1ac2f" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}
