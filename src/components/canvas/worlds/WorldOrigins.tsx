import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { usePortfolioStore } from '@/store/usePortfolioStore'

function geoToXYZ(lat: number, lon: number, r: number): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ]
}

const HYDERABAD: [number, number, number] = geoToXYZ(17.38, 78.47, 2.82)

export function WorldOrigins() {
  const activeWorld = usePortfolioStore((s) => s.activeWorld)
  const isVisible = activeWorld === 'origins' || activeWorld === 'lab' || activeWorld === 'signal'

  const globeGroupRef = useRef<any>(null)
  const ring1 = useRef<any>(null)
  const ring2 = useRef<any>(null)
  const pinRef = useRef<any>(null)

  // Drag state
  const isDragging = useRef(false)
  const prevPointer = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0, y: 0 })
  const rotation = useRef({ x: 0, y: 0 })
  const autoRotate = useRef(true)

  useFrame(({ clock }) => {
    if (!isVisible) return
    const t = clock.getElapsedTime()

    if (globeGroupRef.current) {
      if (!isDragging.current) {
        // Apply inertia
        velocity.current.x *= 0.95
        velocity.current.y *= 0.95
        rotation.current.x += velocity.current.x
        rotation.current.y += velocity.current.y
        // Auto-rotate when nearly stopped
        if (Math.abs(velocity.current.y) < 0.001) {
          rotation.current.y += 0.0008
        }
      }
      globeGroupRef.current.rotation.y = rotation.current.y
      globeGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, rotation.current.x))
    }

    if (ring1.current) ring1.current.rotation.z = t * 0.12
    if (ring2.current) ring2.current.rotation.y = t * 0.08

    if (pinRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.2
      pinRef.current.scale.set(s, s, s)
    }
  })

  return (
    <group position={[-6, 0, 0]} visible={isVisible}>
      {/* Invisible catch sphere for drag events */}
      <mesh
        onPointerDown={(e) => {
          isDragging.current = true
          prevPointer.current = { x: e.clientX, y: e.clientY }
          velocity.current = { x: 0, y: 0 }
          e.stopPropagation()
        }}
        onPointerMove={(e) => {
          if (!isDragging.current) return
          const dx = (e.clientX - prevPointer.current.x) * 0.006
          const dy = (e.clientY - prevPointer.current.y) * 0.006
          velocity.current.x = dy
          velocity.current.y = dx
          rotation.current.x += dy
          rotation.current.y += dx
          prevPointer.current = { x: e.clientX, y: e.clientY }
        }}
        onPointerUp={() => { isDragging.current = false }}
        onPointerLeave={() => { isDragging.current = false }}
      >
        <sphereGeometry args={[4.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Globe */}
      <group ref={globeGroupRef}>
        <Sphere args={[2.8, 64, 64]}>
          <meshPhysicalMaterial
            color="#181818"
            roughness={0.08}
            metalness={1}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={3}
            reflectivity={1}
          />
        </Sphere>

        {/* Wireframe overlay — continent lines */}
        <Sphere args={[2.82, 24, 24]}>
          <meshBasicMaterial color="#e8003d" wireframe transparent opacity={0.08} />
        </Sphere>

        {/* Hyderabad pin */}
        <group position={HYDERABAD}>
          <mesh ref={pinRef}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#e8003d" />
          </mesh>
          <mesh rotation-x={Math.PI / 2}>
            <ringGeometry args={[0.09, 0.14, 24]} />
            <meshBasicMaterial color="#e8003d" transparent opacity={0.6} depthWrite={false} />
          </mesh>
          {/* Pulse ring */}
          <mesh rotation-x={Math.PI / 2}>
            <ringGeometry args={[0.16, 0.2, 24]} />
            <meshBasicMaterial color="#e8003d" transparent opacity={0.25} depthWrite={false} />
          </mesh>
        </group>
      </group>

      {/* Orbit rings (outside globe group so they don't rotate with drag) */}
      <mesh ref={ring1} rotation-x={Math.PI * 0.3}>
        <torusGeometry args={[3.8, 0.01, 8, 80]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation-x={Math.PI * 0.15}>
        <torusGeometry args={[4.5, 0.007, 8, 80]} />
        <meshBasicMaterial color="#222222" transparent opacity={0.4} />
      </mesh>

      <pointLight position={[0, 0, 5]} color="#ffffff" intensity={4} distance={14} />
      <pointLight position={[3, 4, 3]} color="#e8003d" intensity={2} distance={12} />
      <pointLight position={[-3, -2, 4]} color="#aaaaaa" intensity={2} distance={10} />
    </group>
  )
}
