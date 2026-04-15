import { useEffect } from 'react'
import { SceneManager } from '@/components/canvas/SceneManager'
import { LoadingScreen } from '@/components/layout/LoadingScreen'
import { Navbar } from '@/components/layout/Navbar'
import { HeroOverlay } from '@/components/ui/HeroOverlay'
import { AboutCard } from '@/components/ui/AboutCard'
import { ProjectCards } from '@/components/ui/ProjectCard'
import { SkillsOverlay } from '@/components/ui/SkillsOverlay'
import { KitchenOverlay } from '@/components/ui/KitchenOverlay'
import { ExperienceTimeline } from '@/components/ui/ExperienceTimeline'
import { ContactForm } from '@/components/ui/ContactForm'
import { initLenis } from '@/lib/lenis'
import { CustomCursor } from '@/components/layout/CustomCursor'
import '@/lib/gsap' // register ScrollTrigger

export default function App() {
  useEffect(() => {
    const lenis = initLenis()
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <Navbar />

      {/* Fixed 3D canvas layer */}
      <SceneManager />

      {/* Scroll container — worlds 1 & 7 full height, inner worlds 85vh */}
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>

        {/* World 1 — The Signal */}
        <section id="world-signal" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'auto', height: '100%' }}>
            <HeroOverlay />
          </div>
        </section>

        {/* World 2 — The Origins */}
        <section id="world-origins" style={{ height: '72vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'auto', height: '100%' }}>
            <AboutCard />
          </div>
        </section>

        {/* World 3 — The Lab */}
        <section id="world-lab" style={{ height: '72vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'auto', height: '100%' }}>
            <ProjectCards />
          </div>
        </section>

        {/* World 4 — The Archive */}
        <section id="world-archive" style={{ height: '72vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'auto', height: '100%' }}>
            <SkillsOverlay />
          </div>
        </section>

        {/* World 5 — The Kitchen */}
        <section id="world-kitchen" style={{ height: '72vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'auto', height: '100%' }}>
            <KitchenOverlay />
          </div>
        </section>

        {/* World 6 — The Stage */}
        <section id="world-stage" style={{ height: '72vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'auto', height: '100%' }}>
            <ExperienceTimeline />
          </div>
        </section>

        {/* World 7 — The Horizon */}
        <section id="world-horizon" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
          <div style={{ pointerEvents: 'auto', height: '100%' }}>
            <ContactForm />
          </div>
        </section>

      </div>
    </>
  )
}
