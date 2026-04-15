import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { AdditiveBlending } from 'three'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const STEAM_COUNT = 80

function SteamParticles() {
  const positions = useRef<Float32Array>(new Float32Array(STEAM_COUNT * 3))
  const phases = useRef<Float32Array>(new Float32Array(STEAM_COUNT))
  const pointsRef = useRef<any>(null)

  useMemo(() => {
    for (let i = 0; i < STEAM_COUNT; i++) {
      positions.current[i * 3 + 0] = (Math.random() - 0.5) * 0.4
      positions.current[i * 3 + 1] = Math.random() * 2
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 0.4
      phases.current[i] = Math.random() * Math.PI * 2
    }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    const pos = pointsRef.current.geometry.attributes.position
    for (let i = 0; i < STEAM_COUNT; i++) {
      const ph = phases.current[i]
      let y = ((t * 0.3 + ph) % 2.0) * 1.2
      pos.setX(i, Math.sin(t * 0.5 + ph * 2) * 0.15)
      pos.setY(i, y)
      pos.setZ(i, Math.cos(t * 0.4 + ph) * 0.12)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef} position={[0, 0.5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#888888"
        size={0.12}
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

function RecipeCard({
  text, position, rotation,
}: { text: string; position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<any>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.08
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.3 + position[0]) * 0.03
  })
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[1.8, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0} />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.1}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.2}
        lineHeight={1.4}
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTkA.woff2"
      >
        {text}
      </Text>
    </group>
  )
}

export function WorldKitchen() {
  const activeWorld = usePortfolioStore((s) => s.activeWorld)
  const isVisible = activeWorld === 'kitchen' || activeWorld === 'archive' || activeWorld === 'stage'

  return (
    <group position={[-4, 0, 0]} visible={isVisible}>
      {/* Counter/table surface — polished dark stone */}
      <mesh position={[0, -1.2, 0]} receiveShadow>
        <boxGeometry args={[7, 0.12, 4]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          roughness={0.05}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
          reflectivity={1}
        />
      </mesh>

      {/* Pot body — mirror-polished chrome */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.55, 0.48, 0.8, 32]} />
        <meshPhysicalMaterial
          color="#111111"
          roughness={0}
          metalness={1}
          clearcoat={0.8}
          clearcoatRoughness={0}
          envMapIntensity={3}
          reflectivity={1}
        />
      </mesh>
      {/* Pot rim — bright chrome ring */}
      <mesh position={[0, -0.24, 0]}>
        <torusGeometry args={[0.55, 0.035, 16, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0}
          metalness={1}
          envMapIntensity={4}
        />
      </mesh>
      {/* Pot lid */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.53, 0.53, 0.06, 32]} />
        <meshPhysicalMaterial
          color="#0d0d0d"
          roughness={0}
          metalness={1}
          clearcoat={1}
          clearcoatRoughness={0}
          envMapIntensity={3}
        />
      </mesh>
      {/* Lid handle */}
      <mesh position={[0, -0.14, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshPhysicalMaterial color="#888888" roughness={0} metalness={1} envMapIntensity={3} />
      </mesh>

      <SteamParticles />

      {/* Recipe cards */}
      <RecipeCard
        text={"Recipe for Code:\n1 part curiosity\n2 parts persistence\nServe: ∞ problems solved"}
        position={[-1.4, 0.1, 0.5]}
        rotation={[0, 0.3, 0.05]}
      />
      <RecipeCard
        text={"Recipe for Leadership:\n1 part vision\n+ active listening\nServes: any team"}
        position={[1.3, 0.2, 0.4]}
        rotation={[0, -0.2, -0.04]}
      />

      {/* Chalkboard text */}
      <Text
        position={[0, 1.4, -0.5]}
        fontSize={0.18}
        color="#e8003d"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gozuPTPDg.woff2"
      >
        La Culina
      </Text>
      <Text
        position={[0, 1.1, -0.5]}
        fontSize={0.10}
        color="#444444"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTkA.woff2"
      >
        Culinary Club · Founder & Gen. Secretary
      </Text>

      {/* Warm lighting */}
      <pointLight position={[0, 2, 2]} color="#ff8855" intensity={1.2} distance={10} />
      <pointLight position={[-2, 0, 1]} color="#ffcc88" intensity={0.4} distance={8} />
      <ambientLight color="#201510" intensity={0.5} />
    </group>
  )
}
