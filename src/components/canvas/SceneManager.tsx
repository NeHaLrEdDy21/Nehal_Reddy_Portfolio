import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { ACESFilmicToneMapping } from 'three'
import { CameraRig } from './CameraRig'
import { PostProcessing } from './PostProcessing'
import { WorldSignal } from './worlds/WorldSignal'
import { WorldOrigins } from './worlds/WorldOrigins'
import { WorldLab } from './worlds/WorldLab'
import { WorldArchive } from './worlds/WorldArchive'
import { WorldKitchen } from './worlds/WorldKitchen'
import { WorldStage } from './worlds/WorldStage'
import { WorldHorizon } from './worlds/WorldHorizon'

export function SceneManager() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
      }}
    >
      <Canvas
        dpr={[1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio : 2)]}
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 5], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#F2EFEA' }}
        eventSource={document.body}
        eventPrefix="client"
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping
          gl.toneMappingExposure = 0.9
          gl.setClearColor('#F2EFEA', 1)
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={null}>
          {/* HDRI environment — powers all physical material reflections */}
          <Environment preset="warehouse" background={false} />

          <WorldSignal />
          <WorldOrigins />
          <WorldLab />
          <WorldArchive />
          <WorldKitchen />
          <WorldStage />
          <WorldHorizon />
        </Suspense>

        <CameraRig />
        <PostProcessing />
      </Canvas>

    </div>
  )
}
