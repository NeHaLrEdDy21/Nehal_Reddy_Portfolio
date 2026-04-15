import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioStore, WORLDS, WORLD_NAMES } from '@/store/usePortfolioStore'
import type { WorldId } from '@/store/usePortfolioStore'
import { getLenis } from '@/lib/lenis'

const WORLD_SCROLL_TARGETS: Record<WorldId, string> = {
  signal:  '#world-signal',
  origins: '#world-origins',
  lab:     '#world-lab',
  archive: '#world-archive',
  kitchen: '#world-kitchen',
  stage:   '#world-stage',
  horizon: '#world-horizon',
}

export function Navbar() {
  const { activeWorld, navVisible } = usePortfolioStore()

  const scrollToWorld = (world: WorldId) => {
    const lenis = getLenis()
    const el = document.querySelector(WORLD_SCROLL_TARGETS[world])
    if (el && lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.8 })
  }

  return (
    <AnimatePresence>
      {navVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-full glass"
        >
          {WORLDS.map((world) => {
            const isActive = world === activeWorld
            return (
              <button
                key={world}
                onClick={() => scrollToWorld(world)}
                className="relative flex items-center gap-2 group"
                title={WORLD_NAMES[world]}
              >
                {/* Dot */}
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: isActive ? 'var(--signal)' : 'var(--muted)',
                    boxShadow: isActive ? '0 0 8px var(--signal)' : 'none',
                    transform: isActive ? 'scale(1.4)' : 'scale(1)',
                  }}
                />
                {/* Hover label */}
                <span
                  className="absolute top-5 left-1/2 -translate-x-1/2 section-label whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{ color: isActive ? 'var(--signal)' : 'var(--muted)' }}
                >
                  {WORLD_NAMES[world]}
                </span>
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
