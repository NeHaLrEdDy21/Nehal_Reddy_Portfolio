import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const SHAPES = [
  { color: '#E8003D', pos: [-3.2,  0.4,  0.0] as [number, number, number], geo: 'octa',  size: 0.52, speed: 0.28, phase: 0.0  },
  { color: '#FF8C00', pos: [-1.1, -0.6,  0.6] as [number, number, number], geo: 'ico',   size: 0.44, speed: 0.35, phase: 1.1  },
  { color: '#0038FF', pos: [ 0.8,  1.1, -0.2] as [number, number, number], geo: 'octa',  size: 0.58, speed: 0.22, phase: 2.2  },
  { color: '#0038FF', pos: [ 2.8, -0.4,  0.4] as [number, number, number], geo: 'ico',   size: 0.40, speed: 0.40, phase: 0.6  },
  { color: '#C8FF57', pos: [ 1.4,  0.3,  1.1] as [number, number, number], geo: 'octa',  size: 0.34, speed: 0.32, phase: 3.3  },
  { color: '#FF8C00', pos: [-2.2,  1.3, -0.4] as [number, number, number], geo: 'ico',   size: 0.36, speed: 0.26, phase: 1.8  },
]

function FloatingShape({ shape, index }: { shape: typeof SHAPES[0]; index: number }) {
  const ref = useRef<any>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    // Gentle float
    ref.current.position.y = shape.pos[1] + Math.sin(t * shape.speed + shape.phase) * 0.22
    // Slow rotation on all axes
    ref.current.rotation.x = t * 0.18 + shape.phase
    ref.current.rotation.y = t * 0.24 + shape.phase * 0.7
    ref.current.rotation.z = t * 0.10 + shape.phase * 0.4
  })

  return (
    <mesh ref={ref} position={shape.pos}>
      {shape.geo === 'octa'
        ? <octahedronGeometry args={[shape.size, 0]} />
        : <icosahedronGeometry args={[shape.size, 0]} />
      }
      <meshPhysicalMaterial
        color={shape.color}
        roughness={0.06}
        metalness={0.55}
        clearcoat={1}
        clearcoatRoughness={0.0}
        iridescence={0.5}
        iridescenceIOR={1.4}
        iridescenceThicknessRange={[100, 600]}
        envMapIntensity={3}
        reflectivity={1}
      />
    </mesh>
  )
}

export function WorldStage() {
  const activeWorld = usePortfolioStore((s) => s.activeWorld)
  const isVisible = activeWorld === 'stage' || activeWorld === 'kitchen' || activeWorld === 'horizon'

  return (
    <group position={[1, 0.5, 0]} visible={isVisible}>
      {SHAPES.map((shape, i) => (
        <FloatingShape key={i} shape={shape} index={i} />
      ))}

      <ambientLight intensity={1.8} color="#ffffff" />
      <pointLight position={[0, 5, 5]}   color="#ffffff" intensity={10} distance={22} />
      <pointLight position={[-5, 2, 3]}  color="#E8003D" intensity={6}  distance={18} />
      <pointLight position={[5, -1, 3]}  color="#0038FF" intensity={5}  distance={18} />
      <pointLight position={[0, -3, 2]}  color="#FF8C00" intensity={3}  distance={14} />
    </group>
  )
}
