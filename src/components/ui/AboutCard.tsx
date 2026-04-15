import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personal } from '@/data/personal'

const CHIPS = [
  { label: '8.48 CGPA', bg: 'var(--lime)', color: 'var(--ink)' },
  { label: '2023 – 27', bg: 'var(--cobalt)', color: '#ffffff' },
  { label: 'Hyderabad', bg: 'var(--amber)', color: 'var(--ink)' },
  { label: 'AI Intern @ Sage IT', bg: 'var(--signal)', color: '#ffffff' },
]

export function AboutCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div ref={ref} className="relative z-10 h-full flex flex-col justify-end" style={{ pointerEvents: 'none' }}>
      {/* Bottom content panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(242,239,234,0.92)',
          backdropFilter: 'blur(20px)',
          padding: 'clamp(2rem, 4vw, 3.5rem)',
          paddingBottom: 'clamp(2.5rem, 5vh, 4rem)',
          borderTop: '1px solid var(--border)',
          pointerEvents: 'auto',
        }}
      >
        <p className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          // WORLD_02 · THE ORIGINS
        </p>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Left: big heading + info */}
          <div style={{ flex: '1 1 300px' }}>
            <h2
              className="display"
              style={{
                fontSize: 'clamp(4rem, 12vw, 11rem)',
                color: 'var(--ink)',
                marginBottom: '1.5rem',
              }}
            >
              WHERE<br />I'M FROM.
            </h2>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <p style={{ fontWeight: 600, fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: 'var(--ink)', lineHeight: 1.9 }}>
                Hyderabad. VNR Vignana Jyothi Institute.<br />
                B.Tech CS + Data Science, 2023–27 · <span style={{ color: 'var(--signal)' }}>8.48 CGPA</span>.
              </p>
              <p style={{ fontWeight: 600, fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', color: 'var(--ink)', lineHeight: 1.9, marginTop: '0.4rem' }}>
                AI Intern · <span style={{ color: 'var(--signal)' }}>Sage IT INC</span> · Feb 2026.
              </p>
            </div>
          </div>

          {/* Right: colorful stat chips + quote */}
          <div style={{ flex: '0 1 280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {CHIPS.map((chip, i) => (
                <motion.span
                  key={chip.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="pill"
                  style={{
                    background: chip.bg,
                    color: chip.color,
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    padding: '0.5em 1.2em',
                  }}
                >
                  {chip.label}
                </motion.span>
              ))}
            </div>

            <p
              style={{
                color: 'var(--muted)',
                fontSize: '0.88rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
                borderLeft: '2px solid var(--border)',
                paddingLeft: '1rem',
              }}
            >
              "{personal.quotes[1]}"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
