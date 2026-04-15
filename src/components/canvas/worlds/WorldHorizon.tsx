import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Stars } from '@react-three/drei'
import { AdditiveBlending, ShaderMaterial, Vector2 } from 'three'
import { usePortfolioStore } from '@/store/usePortfolioStore'

const atmosphereVert = `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const atmosphereFrag = `
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  uniform vec3 uCameraPos;
  void main() {
    vec3 viewDir = normalize(uCameraPos - vWorldPos);
    float fresnel = 1.0 - dot(vNormal, viewDir);
    fresnel = pow(fresnel, 2.5);
    gl_FragColor = vec4(0.91, 0.0, 0.24, fresnel * 0.7);
  }
`

function HorizonPlanet() {
  const matRef = useRef<ShaderMaterial>(null)
  const groupRef = useRef<any>(null)

  // Drag state
  const isDragging = useRef(false)
  const prevPointer = useRef(new Vector2())
  const velocity = useRef(new Vector2())
  const rotation = useRef(new Vector2())

  useFrame(({ camera, clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uCameraPos.value.copy(camera.position)
    }
    if (groupRef.current) {
      if (!isDragging.current) {
        velocity.current.multiplyScalar(0.94)
        rotation.current.add(velocity.current)
        if (Math.abs(velocity.current.x) < 0.0005) {
          rotation.current.y += clock.getDelta() * 0.04
        }
      }
      groupRef.current.rotation.y = rotation.current.x + clock.getElapsedTime() * 0.04
      groupRef.current.rotation.x = Math.max(-0.5, Math.min(0.5, rotation.current.y))
    }
  })

  return (
    <group ref={groupRef} position={[0, 3, -6]}>
      {/* Invisible drag catcher */}
      <mesh
        onPointerDown={(e) => {
          isDragging.current = true
          prevPointer.current.set(e.clientX, e.clientY)
          velocity.current.set(0, 0)
          e.stopPropagation()
        }}
        onPointerMove={(e) => {
          if (!isDragging.current) return
          const dx = (e.clientX - prevPointer.current.x) * 0.005
          const dy = (e.clientY - prevPointer.current.y) * 0.005
          velocity.current.set(dx, dy)
          rotation.current.x += dx
          rotation.current.y += dy
          prevPointer.current.set(e.clientX, e.clientY)
        }}
        onPointerUp={() => { isDragging.current = false }}
        onPointerLeave={() => { isDragging.current = false }}
      >
        <sphereGeometry args={[3.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Core planet — chrome mirror with slow morph */}
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <MeshDistortMaterial
          color="#111111"
          roughness={0}
          metalness={1}
          envMapIntensity={3}
          distort={0.1}
          speed={0.5}
        />
      </mesh>
      {/* Red wireframe latitude lines */}
      <mesh>
        <sphereGeometry args={[2.22, 16, 16]} />
        <meshBasicMaterial color="#e8003d" wireframe transparent opacity={0.1} />
      </mesh>
      {/* Atmosphere glow shell */}
      <mesh>
        <sphereGeometry args={[2.7, 32, 32]} />
        <shaderMaterial
          ref={matRef}
          vertexShader={atmosphereVert}
          fragmentShader={atmosphereFrag}
          uniforms={{ uCameraPos: { value: { x: 0, y: 3, z: 10 } } }}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          side={2}
        />
      </mesh>
    </group>
  )
}

export function WorldHorizon() {
  const activeWorld = usePortfolioStore((s) => s.activeWorld)
  const isVisible = activeWorld === 'horizon' || activeWorld === 'stage'

  const starsRef = useRef<any>(null)
  const mouseNorm = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (!starsRef.current) return
    // Subtle parallax on star field
    starsRef.current.rotation.y += (mouseNorm.current.x * 0.003 - starsRef.current.rotation.y) * 0.04
    starsRef.current.rotation.x += (mouseNorm.current.y * 0.002 - starsRef.current.rotation.x) * 0.04
  })

  return (
    <group
      visible={isVisible}
      position={[0, 3, 0]}
      onPointerMove={(e) => {
        mouseNorm.current.x = (e.clientX / window.innerWidth - 0.5) * 2
        mouseNorm.current.y = (e.clientY / window.innerHeight - 0.5) * 2
      }}
    >
      <Stars
        ref={starsRef}
        radius={80}
        depth={60}
        count={3000}
        factor={3}
        saturation={0}
        fade
        speed={0.4}
      />
      <HorizonPlanet />
      <ambientLight color="#0a0000" intensity={1} />
      <pointLight position={[0, 3, -4]} color="#e8003d" intensity={4} distance={20} />
      <pointLight position={[3, 5, 3]} color="#ffffff" intensity={3} distance={16} />
    </group>
  )
}
