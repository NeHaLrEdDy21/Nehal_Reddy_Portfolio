import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import { skills } from '@/data/skills'

const CLUSTER_POSITIONS: Record<string, [number, number, number]> = {
  languages:     [-5.0, 2.0, 0],
  ml:            [0, 0, 0],
  web:           [5.0, 1.5, 0],
  tools:         [-3.0, -2.5, 0],
  visualization: [3.5, -2.5, 0],
}

const CODE_FRAGMENTS = [
  'import torch_geometric',
  'from sklearn import ensemble',
  'SELECT * FROM insights',
  'useEffect(() => {}, [])',
  'docker build -t app .',
  'git push origin main',
  'plt.show()',
  'npm run dev',
]

function CodeFragment({ text, startY, x, z }: { text: string; startY: number; x: number; z: number }) {
  const ref = useRef<any>(null)
  const speed = 0.15 + Math.random() * 0.1
  const reset = startY - 6

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = reset + ((clock.getElapsedTime() * speed + startY + 3) % 6)
    ref.current.material.opacity = Math.min(
      1,
      Math.max(0, 1 - Math.abs(ref.current.position.y - (reset + 3)) / 3)
    ) * 0.35
  })

  return (
    <Text
      ref={ref}
      position={[x, startY, z]}
      fontSize={0.13}
      font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTkA.woff2"
      color="#555555"
      anchorX="left"
      anchorY="middle"
    >
      {text}
    </Text>
  )
}

function SkillOrb({
  skill,
  index,
}: {
  skill: { name: string; level: number; category: string }
  index: number
}) {
  const meshRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const currentScale = useRef(1)
  const targetScale = useRef(1)

  const isML = skill.category === 'ml'
  const size = 0.12 + skill.level * 0.18
  const center = CLUSTER_POSITIONS[skill.category] || [0, 0, 0]

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const phase = index * 0.55
    const orbitR = 0.6 + skill.level * 0.8

    meshRef.current.position.x = center[0] + Math.cos(t * 0.3 + phase) * orbitR
    meshRef.current.position.y = center[1] + Math.sin(t * 0.2 + phase * 1.3) * orbitR * 0.5
    meshRef.current.position.z = center[2] + Math.sin(t * 0.15 + phase) * 0.3

    targetScale.current = hovered ? 3.5 : 1
    currentScale.current += (targetScale.current - currentScale.current) * 0.1
    meshRef.current.scale.setScalar(currentScale.current)

    meshRef.current.material.emissiveIntensity = hovered
      ? 3.0
      : skill.level * 0.6
  })

  // Alternate geometry per index: sphere, octa, ico, box, octa...
  const geoType = index % 5

  return (
    <group>
      <mesh
        ref={meshRef}
        position={center}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
      >
        {geoType === 0 && <sphereGeometry args={[size, 12, 12]} />}
        {geoType === 1 && <octahedronGeometry args={[size * 1.1, 0]} />}
        {geoType === 2 && <icosahedronGeometry args={[size * 1.0, 0]} />}
        {geoType === 3 && <boxGeometry args={[size * 1.4, size * 1.4, size * 1.4]} />}
        {geoType === 4 && <octahedronGeometry args={[size * 0.95, 1]} />}
        <meshPhysicalMaterial
          color={
            skill.category === 'ml'            ? '#e8003d'
            : skill.category === 'languages'   ? '#0038FF'
            : skill.category === 'web'         ? '#1a1a1a'
            : skill.category === 'tools'       ? '#FF8C00'
            :                                    '#5a8a00'
          }
          roughness={0.08}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.04}
          iridescence={0.7}
          iridescenceIOR={1.4}
          iridescenceThicknessRange={[100, 700]}
          envMapIntensity={3}
          reflectivity={1}
        />
      </mesh>
      {hovered && meshRef.current && (
        <Text
          position={[
            meshRef.current.position.x,
            meshRef.current.position.y + size * 4 + 0.15,
            meshRef.current.position.z,
          ]}
          fontSize={0.13}
          color="#0A0A0A"
          anchorX="center"
          anchorY="bottom"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTkA.woff2"
        >
          {skill.name}
        </Text>
      )}
    </group>
  )
}

export function WorldArchive() {
  const activeWorld = usePortfolioStore((s) => s.activeWorld)
  const isVisible = activeWorld === 'archive' || activeWorld === 'lab' || activeWorld === 'kitchen'

  const codePositions = useMemo(() =>
    CODE_FRAGMENTS.map((text, i) => ({
      text,
      x: -5 + (i % 3) * 3.5,
      z: -2 + (i % 2) * 1,
      startY: -3 + Math.random() * 4,
    })), [])

  return (
    <group position={[0, -2, 0]} visible={isVisible}>
      {skills.map((skill, i) => (
        <SkillOrb key={skill.name} skill={skill} index={i} />
      ))}

      {/* Category labels */}
      {Object.entries(CLUSTER_POSITIONS).map(([cat, pos]) => (
        <Text
          key={cat}
          position={[pos[0], pos[1] + 1.2, pos[2]]}
          fontSize={0.14}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTkA.woff2"
          color="#333333"
          anchorX="center"
          anchorY="middle"
        >
          {`// ${cat}`}
        </Text>
      ))}

      {codePositions.map((p, i) => (
        <CodeFragment key={i} {...p} />
      ))}

      <ambientLight intensity={1.2} />
      <pointLight position={[0, 4, 6]} color="#ffffff" intensity={6} distance={20} />
      <pointLight position={[-6, -2, 4]} color="#ffffff" intensity={4} distance={16} />
      <pointLight position={[6, 2, 4]} color="#ffffff" intensity={4} distance={16} />
    </group>
  )
}
