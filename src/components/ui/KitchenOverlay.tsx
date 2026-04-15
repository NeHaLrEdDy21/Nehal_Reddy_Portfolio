import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const STRIPS = [
  {
    label: 'CULINARY CLUB',
    sublabel: 'Founder & General Secretary',
    bg: 'var(--lime)',
    text: 'var(--ink)',
    desc: 'Founded La Culina from scratch. Organized cooking events, food festivals, and cultural experiences around cuisine. Because the best conversations happen over food.',
  },
  {
    label: 'MUN DELEGATE',
    sublabel: 'Top 4 of 5 Conferences',
    bg: 'var(--cobalt)',
    text: '#ffffff',
    desc: 'Represented nations, chaired committees, crafted resolutions. Diplomacy, rhetoric, and structured debate — the human counterpart to algorithmic problem-solving.',
  },
  {
    label: 'DEBATE · LIT',
    sublabel: 'Stentorian · Public Speaking',
    bg: 'var(--signal)',
    text: '#ffffff',
    desc: 'Literature through Stentorian, rhetoric through competitive debate, public speaking through everything in between. Code is just one language I speak.',
  },
]

function Strip({ strip, index, inView }: { strip: typeof STRIPS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ overflow: 'hidden' }}
    >
      <motion.div
        layout
        style={{
          background: strip.bg,
          borderRadius: hovered ? 16 : 0,
          margin: hovered ? '0.25rem 0' : 0,
          transition: 'border-radius 0.35s ease, margin 0.35s ease',
        }}
      >
        {/* Strip header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.5rem',
            minHeight: 64,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
            <span className="display" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: strip.text, lineHeight: 1 }}>
              {strip.label}
            </span>
            <span className="mono" style={{ fontSize: '0.72rem', color: strip.text, opacity: 0.65, letterSpacing: '0.1em' }}>
              {strip.sublabel}
            </span>
          </div>
          <motion.span
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ color: strip.text, opacity: 0.7, fontSize: '1.1rem', display: 'inline-block' }}
          >
            +
          </motion.span>
        </div>

        {/* Expanded body */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{
                color: strip.text,
                opacity: 0.85,
                fontSize: '0.92rem',
                lineHeight: 1.7,
                padding: '0 1.5rem 1.2rem',
                maxWidth: '60ch',
              }}>
                {strip.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function KitchenOverlay() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div ref={ref} className="relative z-10 h-full flex flex-col justify-end" style={{ pointerEvents: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(242,239,234,0.92)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          pointerEvents: 'auto',
        }}
      >
        {/* Heading */}
        <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', paddingBottom: '1rem' }}>
          <p className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            // WORLD_05 · THE KITCHEN
          </p>
          <h2 className="display" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', color: 'var(--ink)', lineHeight: 0.9, marginBottom: '1rem' }}>
            BEYOND<br />THE CODE.
          </h2>
        </div>

        {/* Expanding strips */}
        <div style={{ paddingBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
          {STRIPS.map((strip, i) => (
            <Strip key={strip.label} strip={strip} index={i} inView={inView} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
