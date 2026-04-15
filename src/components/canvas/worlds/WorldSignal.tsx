import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import {
  AdditiveBlending, BufferGeometry, Float32BufferAttribute,
  Points, ShaderMaterial, Vector3,
} from 'three'

const PARTICLE_COUNT = 5000

const vertexShader = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform vec3 uMouseWorld;
  varying float vAlpha;
  varying float vRed;

  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.4 + aPhase) * 0.14;
    pos.y += cos(uTime * 0.35 + aPhase * 1.3) * 0.11;
    pos.z += sin(uTime * 0.3 + aPhase * 0.7) * 0.09;

    // Mouse repulsion
    vec3 toMouse = pos - uMouseWorld;
    float mouseDist = length(toMouse);
    float repulse = smoothstep(2.8, 0.0, mouseDist) * 3.0;
    pos += normalize(toMouse) * repulse;

    vRed = smoothstep(3.5, 0.3, mouseDist);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (1.0 + repulse * 0.4) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    float dist = length(pos);
    vAlpha = 1.0 - smoothstep(5.0, 12.0, dist);
  }
`

const fragmentShader = `
  varying float vAlpha;
  varying float vRed;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = (1.0 - d * 2.0) * vAlpha * 0.9;
    vec3 ink = vec3(0.06, 0.06, 0.06);
    vec3 red = vec3(0.91, 0.0, 0.24);
    vec3 col = mix(ink, red, vRed);
    alpha *= (0.35 + vRed * 0.6);
    gl_FragColor = vec4(col, alpha);
  }
`

export function WorldSignal() {
  const matRef = useRef<ShaderMaterial>(null)
  const pointsRef = useRef<Points>(null)
  const mouseWorld = useRef(new Vector3(0, 0, 0))

  const { geometry, uniforms } = useMemo(() => {
    const positions: number[] = []
    const sizes: number[] = []
    const phases: number[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = Math.random() * 9 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )
      sizes.push(Math.random() * 2.5 + 0.5)
      phases.push(Math.random() * Math.PI * 2)
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geo.setAttribute('aSize', new Float32BufferAttribute(sizes, 1))
    geo.setAttribute('aPhase', new Float32BufferAttribute(phases, 1))

    const u = {
      uTime: { value: 0 },
      uMouseWorld: { value: new Vector3(0, 0, 0) },
    }
    return { geometry: geo, uniforms: u }
  }, [])

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.getElapsedTime()
      matRef.current.uniforms.uMouseWorld.value.lerp(mouseWorld.current, 0.1)
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.035
    }
  })

  return (
    <group>
      {/* Invisible sphere that catches pointer events and reports world position */}
      <mesh
        onPointerMove={(e) => { mouseWorld.current.copy(e.point) }}
        onPointerLeave={() => { mouseWorld.current.set(999, 999, 999) }}
      >
        <sphereGeometry args={[12, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} side={1} />
      </mesh>

      <points ref={pointsRef} geometry={geometry}>
        <shaderMaterial
          ref={matRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          alphaTest={0.001}
        />
      </points>

      <SignalRings />

      {/* HERO blob — centered, fills screen */}
      <group position={[0, 0, 0]}>
        <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.2}>
          <InteractiveCore />
        </Float>
        {/* Three-point lighting — boosted for cream bg chrome reflections */}
        <pointLight position={[0, 4, 5]} color="#ffffff" intensity={22} distance={18} />
        <pointLight position={[-4, -2, 4]} color="#e8003d" intensity={8} distance={12} />
        <pointLight position={[4, 3, 3]} color="#ffffff" intensity={14} distance={14} />
      </group>
    </group>
  )
}

function InteractiveCore() {
  const meshRef = useRef<any>(null)
  const matRef = useRef<any>(null)
  const isHovered = useRef(false)
  const targetScale = useRef(1)
  const currentScale = useRef(1)

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return
    const t = clock.getElapsedTime()
    targetScale.current = isHovered.current ? 1.12 : 1
    currentScale.current += (targetScale.current - currentScale.current) * 0.06
    meshRef.current.scale.setScalar(currentScale.current)
    matRef.current.speed = isHovered.current ? 5 : 1.8
    matRef.current.distort = isHovered.current
      ? 0.52 + Math.sin(t * 3) * 0.06
      : 0.38 + Math.sin(t * 0.8) * 0.04
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => { isHovered.current = true }}
      onPointerOut={() => { isHovered.current = false }}
      onClick={() => {
        targetScale.current = 2.0
        setTimeout(() => { targetScale.current = 1 }, 500)
      }}
    >
      <sphereGeometry args={[2.2, 128, 128]} />
      {/* Semi-chrome blob — warm grey so it's visible on dark background */}
      <MeshDistortMaterial
        ref={matRef}
        color="#666666"
        roughness={0.08}
        metalness={0.95}
        envMapIntensity={5}
        distort={0.38}
        speed={1.8}
      />
    </mesh>
  )
}

function SignalRings() {
  const ring1 = useRef<any>(null)
  const ring2 = useRef<any>(null)
  const ring3 = useRef<any>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pulse = (r: any, offset: number, speed: number) => {
      if (!r) return
      const s = 1 + Math.sin(t * speed + offset) * 0.07
      r.scale.set(s, s, 1)
      r.material.opacity = 0.22 + Math.sin(t * speed + offset) * 0.1
    }
    pulse(ring1.current, 0, 0.8)
    pulse(ring2.current, Math.PI * 0.66, 0.6)
    pulse(ring3.current, Math.PI * 1.33, 0.5)
  })

  return (
    <>
      <mesh ref={ring1} rotation-x={Math.PI / 2}>
        <torusGeometry args={[2.8, 0.008, 8, 80]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh ref={ring2} rotation-x={Math.PI / 2} rotation-y={Math.PI / 6}>
        <torusGeometry args={[3.6, 0.006, 8, 80]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh ref={ring3} rotation-x={Math.PI / 2} rotation-y={Math.PI / 3}>
        <torusGeometry args={[4.6, 0.005, 8, 80]} />
        <meshBasicMaterial color="#e8003d" transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </>
  )
}
