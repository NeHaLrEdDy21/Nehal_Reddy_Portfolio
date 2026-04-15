import { motion } from 'framer-motion'
import { getLenis } from '@/lib/lenis'
import { personal } from '@/data/personal'

export function HeroOverlay() {
  const scrollDown = () => {
    const lenis = getLenis()
    const el = document.querySelector('#world-origins')
    if (el && lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.8 })
  }

  return (
    <div className="relative z-10 w-full h-full overflow-hidden" style={{ pointerEvents: 'none' }}>

      {/* Top-left label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-8 left-8"
        style={{ pointerEvents: 'auto' }}
      >
        <p className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          // WORLD_01 · THE SIGNAL
        </p>
        <p className="mono" style={{ fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--muted)', marginTop: '0.2rem' }}>
          MUDIAM NEHAL REDDY · HYDERABAD
        </p>
      </motion.div>

      {/* Top-right available badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute top-8 right-8 flex items-center gap-2"
        style={{ pointerEvents: 'auto' }}
      >
        <span
          className="pill mono"
          style={{
            background: 'var(--ink)',
            color: '#fff',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            padding: '0.35em 0.9em',
          }}
        >
          <span style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--lime)',
            display: 'inline-block',
            marginRight: '0.5em',
          }} />
          AVAILABLE · 2026
        </span>
      </motion.div>

      {/* MASSIVE screen-filling name — Bebas Neue */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ pointerEvents: 'none' }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="display text-center select-none"
          style={{
            fontSize: 'clamp(5rem, 22vw, 20rem)',
            color: 'var(--ink)',
            lineHeight: 0.85,
            mixBlendMode: 'multiply',
          }}
        >
          NEHAL<br />REDDY
        </motion.h1>
      </div>

      {/* Bottom-left: discipline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="absolute bottom-10 left-8"
        style={{ pointerEvents: 'auto' }}
      >
        <p className="mono" style={{ fontSize: '0.78rem', letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          CS + DATA SCIENCE
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', maxWidth: '28ch' }}>
          {personal.tagline}
        </p>
      </motion.div>

      {/* Bottom-right: CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.4 }}
        className="absolute bottom-10 right-8 flex flex-col gap-3 items-end"
        style={{ pointerEvents: 'auto' }}
      >
        <button
          onClick={scrollDown}
          className="pill card-lift"
          style={{
            background: 'var(--ink)',
            color: '#ffffff',
            fontSize: '0.82rem',
            letterSpacing: '0.08em',
            padding: '0.7em 1.6em',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            border: 'none',
          }}
        >
          ENTER THE UNIVERSE
        </button>
        <a
          href={personal.resume}
          download
          className="pill"
          style={{
            background: 'transparent',
            color: 'var(--muted)',
            fontSize: '0.78rem',
            letterSpacing: '0.1em',
            border: '1px solid var(--border)',
            padding: '0.6em 1.4em',
            fontFamily: 'Inter, sans-serif',
            textDecoration: 'none',
          }}
        >
          RESUME.PDF ↓
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 36, background: 'var(--ink)', opacity: 0.25 }}
        />
        <p className="mono" style={{ fontSize: '0.64rem', letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase' }}>
          SCROLL
        </p>
      </motion.div>
    </div>
  )
}
