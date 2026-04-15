import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, MeshTransmissionMaterial, Text } from '@react-three/drei'
import { Vector3 } from 'three'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const NODE_COUNT = 22
const EDGE_COUNT = 30

const NODE_LABELS = [
  'GNN Model', 'PyTorch', 'GraphSAGE', 'Health ML', 'Profolio',
  'FastAPI', 'React', 'Node.js', 'MongoDB', 'Scikit-learn',
  'Preprocessing', 'REST API', 'Auth', 'Dashboard', 'Streamlit',
  'Docker', 'PostgreSQL', 'NLP', 'Time Series', 'Tableau',
  'D3.js', 'Redux',
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

function GNNNode({
  position,
  index,
  label,
  baseY,
}: {
  position: [number, number, number]
  index: number
  label: string
  baseY: number
}) {
  const meshRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const targetScale = useRef(1)
  const currentScale = useRef(1)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const phase = index * 0.42

    meshRef.current.position.y = baseY + Math.sin(t * 0.6 + phase) * 0.08

    targetScale.current = hovered ? 2.5 : 1
    currentScale.current += (targetScale.current - currentScale.current) * 0.12
    meshRef.current.scale.setScalar(currentScale.current)

    meshRef.current.material.emissiveIntensity = hovered
      ? 2.5
      : 0.4 + Math.sin(t * 1.5 + phase) * 0.3
    meshRef.current.material.color.setStyle(hovered ? '#e8003d' : '#f5f5f5')
    meshRef.current.material.emissive.setStyle(hovered ? '#e8003d' : '#ffffff')
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshPhysicalMaterial
          color={hovered ? '#e8003d' : '#f0f0f0'}
          roughness={0.05}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={hovered ? 0 : 0.6}
          iridescenceIOR={1.5}
          envMapIntensity={2}
        />
      </mesh>
      {hovered && (
        <Text
          position={[position[0], position[1] + 0.32, position[2]]}
          fontSize={0.14}
          color="#f5f5f5"
          anchorX="center"
          anchorY="bottom"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTkA.woff2"
        >
          {label}
        </Text>
      )}
    </group>
  )
}

export function WorldLab() {
  const activeWorld = usePortfolioStore((s) => s.activeWorld)
  const isVisible = activeWorld === 'lab' || activeWorld === 'origins' || activeWorld === 'archive'
  const groupRef = useRef<any>(null)

  const { nodes, edges } = useMemo(() => {
    const rand = seededRandom(42)
    const nodePositions: [number, number, number][] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePositions.push([
        (rand() - 0.5) * 10,
        (rand() - 0.5) * 7,
        (rand() - 0.5) * 6,
      ])
    }

    const edgePairs: [number, number][] = []
    for (let i = 0; i < EDGE_COUNT; i++) {
      const a = Math.floor(rand() * NODE_COUNT)
      let b = Math.floor(rand() * NODE_COUNT)
      while (b === a) b = Math.floor(rand() * NODE_COUNT)
      edgePairs.push([a, b])
    }

    return { nodes: nodePositions, edges: edgePairs }
  }, [])

  useFrame(({ clock }) => {
    if (!isVisible) return
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.3
  })

  return (
    <group ref={groupRef} position={[6, 0, 0]} visible={isVisible}>
      {nodes.map((pos, i) => (
        <GNNNode
          key={i}
          position={pos}
          index={i}
          label={NODE_LABELS[i] ?? `node_${i}`}
          baseY={pos[1]}
        />
      ))}

      {edges.map(([a, b], i) => {
        const pa = new Vector3(...nodes[a])
        const pb = new Vector3(...nodes[b])
        return (
          <Line
            key={i}
            points={[pa, pb]}
            color="#333333"
            lineWidth={0.5}
            transparent
            opacity={0.6}
          />
        )
      })}

      {/* Red hub node */}
      <HubNode />

      <pointLight position={[0, 0, 5]} color="#ffffff" intensity={4} distance={18} />
      <pointLight position={[0, 0, 0]} color="#e8003d" intensity={3} distance={10} />
      <pointLight position={[5, 4, 4]} color="#aaaaaa" intensity={2} distance={14} />
    </group>
  )
}

function HubNode() {
  const meshRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)
  const scale = useRef(1)

  useFrame(() => {
    if (!meshRef.current) return
    scale.current += ((hovered ? 2.2 : 1) - scale.current) * 0.1
    meshRef.current.scale.setScalar(scale.current)
  })

  return (
    <group>
      {/* Outer glass shell */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.45, 32, 32]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.6}
          roughness={0}
          ior={1.4}
          chromaticAberration={0.06}
          backside={true}
          samples={4}
          resolution={256}
          attenuationColor="#e8003d"
          attenuationDistance={hovered ? 0.3 : 0.8}
        />
      </mesh>
      {/* Red glowing core inside */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#e8003d"
          emissive="#e8003d"
          emissiveIntensity={hovered ? 6 : 3}
          toneMapped={false}
        />
      </mesh>
      {hovered && (
        <Text
          position={[0, 0.6, 0]}
          fontSize={0.16}
          color="#e8003d"
          anchorX="center"
          anchorY="bottom"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTkA.woff2"
        >
          // HUB
        </Text>
      )}
    </group>
  )
}
