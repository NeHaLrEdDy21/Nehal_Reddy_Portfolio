import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import type { WorldId } from '@/store/usePortfolioStore'

const POST_SETTINGS: Record<WorldId, { bloom: number; vignetteStrength: number }> = {
  signal:  { bloom: 1.2, vignetteStrength: 0.12 },
  origins: { bloom: 0.6, vignetteStrength: 0.08 },
  lab:     { bloom: 1.0, vignetteStrength: 0.10 },
  archive: { bloom: 0.4, vignetteStrength: 0.08 },
  kitchen: { bloom: 0.3, vignetteStrength: 0.06 },
  stage:   { bloom: 0.8, vignetteStrength: 0.08 },
  horizon: { bloom: 1.5, vignetteStrength: 0.10 },
}

export function PostProcessing() {
  const activeWorld = usePortfolioStore((s) => s.activeWorld)
  const settings = POST_SETTINGS[activeWorld]

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={settings.bloom}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.25}
        darkness={settings.vignetteStrength}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        opacity={0.025}
        blendFunction={BlendFunction.SCREEN}
      />
    </EffectComposer>
  )
}
