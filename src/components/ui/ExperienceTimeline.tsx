import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { experiences, type Experience } from '@/data/experience'

// ── Grouping ───────────────────────────────────────────────────────────────────

type Group = 'experience' | 'achievement' | 'certification'

function getGroup(id: string, type: string): Group {
  if (id === 'dsa') return 'certification'
  if (type === 'achievement') return 'achievement'
  return 'experience'
}

const GROUP_META: Record<Group, { label: string; color: string; ink: string; num: string; flex: number }> = {
  experience:    { label: 'Experience',    color: '#0038FF', ink: '#ffffff', num: '01', flex: 2 },
  achievement:   { label: 'Achievements',  color: '#FF8C00', ink: '#0A0A0A', num: '02', flex: 1 },
  certification: { label: 'Certification', color: '#E8003D', ink: '#ffffff', num: '03', flex: 1 },
}

const GROUP_ORDER: Group[] = ['experience', 'achievement', 'certification']

const TYPE_COLOR: Record<string, string> = {
  work: '#E8003D', achievement: '#FF8C00', leadership: '#0038FF', academic: '#6B6B6B',
}

// ── Flip card ─────────────────────────────────────────────────────────────────

function FlipCard({
  group,
  items,
  index,
  inView,
}: {
  group: Group
  items: Experience[]
  index: number
  inView: boolean
}) {
  const [flipped, setFlipped] = useState(false)
  const meta = GROUP_META[group]
  const ghostInk = meta.ink === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'rgba(10,10,10,0.08)'
  const mutedInk = meta.ink === '#ffffff' ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,10,0.45)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.08 + index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: meta.flex, position: 'relative', perspective: '1400px', cursor: 'pointer' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            background: meta.color,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            overflow: 'hidden',
          }}
        >
          {/* Ghost number */}
          <span
            className="display"
            style={{
              position: 'absolute',
              right: '-0.05em',
              bottom: '-0.12em',
              fontSize: 'clamp(7rem, 16vw, 15rem)',
              color: ghostInk,
              lineHeight: 1,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {meta.num}
          </span>

          {/* Top label */}
          <p className="mono" style={{ fontSize: '0.68rem', color: mutedInk, letterSpacing: '0.12em' }}>
            {meta.num}
          </p>

          {/* Bottom content */}
          <div>
            <h3
              className="display"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                color: meta.ink,
                lineHeight: 0.9,
                marginBottom: '0.9rem',
              }}
            >
              {meta.label}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="mono" style={{ fontSize: '0.68rem', color: mutedInk, letterSpacing: '0.1em' }}>
                {items.length} {items.length === 1 ? 'entry' : 'entries'}
              </span>
              <motion.span
                animate={{ rotate: flipped ? 180 : 0 }}
                style={{ color: meta.ink, fontSize: '1.1rem', opacity: 0.65 }}
              >
                ↻
              </motion.span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#F2EFEA',
            borderTop: `3px solid ${meta.color}`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Back header */}
          <div
            style={{
              padding: 'clamp(0.9rem, 1.8vw, 1.4rem)',
              paddingBottom: '0.6rem',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <span
              className="display"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)', color: meta.color, lineHeight: 1 }}
            >
              {meta.label}
            </span>
            <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
              tap to close ↻
            </span>
          </div>

          {/* Entries */}
          <div data-lenis-prevent style={{ flex: 1, overflowY: 'auto' }}>
            {items.map((exp, i) => (
              <div
                key={exp.id}
                style={{
                  padding: 'clamp(0.7rem, 1.4vw, 1.1rem) clamp(0.9rem, 1.8vw, 1.4rem)',
                  borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <h4
                  className="display"
                  style={{
                    fontSize: 'clamp(0.95rem, 2vw, 1.5rem)',
                    color: 'var(--ink)',
                    lineHeight: 1,
                    marginBottom: '0.2rem',
                  }}
                >
                  {exp.role}
                </h4>
                <p
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    color: TYPE_COLOR[exp.type],
                    marginBottom: '0.15rem',
                  }}
                >
                  {exp.org}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <p className="mono" style={{ fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>
                    {exp.period}
                  </p>
                  {exp.highlight && (
                    <p className="mono" style={{ fontSize: '0.62rem', color: TYPE_COLOR[exp.type], fontWeight: 700 }}>
                      {exp.highlight}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────────

export function ExperienceTimeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: experiences.filter((e) => getGroup(e.id, e.type) === group),
  }))

  return (
    <div
      ref={ref}
      className="relative z-10 h-full flex flex-col"
      style={{ pointerEvents: 'none' }}
    >
      {/* World label — in flow, not absolute */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          padding: 'clamp(2.5rem, 5vh, 4rem) clamp(1.5rem, 3vw, 2.5rem) 0.5rem',
          pointerEvents: 'none',
          flexShrink: 0,
        }}
      >
        <p
          className="mono"
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            marginBottom: '0.3rem',
          }}
        >
          // WORLD_06 · THE STAGE
        </p>
        <h2
          className="display"
          style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--ink)', lineHeight: 0.9 }}
        >
          THE STAGE.
        </h2>
      </motion.div>

      {/* 3 flip cards — fill remaining height */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          pointerEvents: 'auto',
        }}
      >
        {grouped.map(({ group, items }, i) => (
          <FlipCard key={group} group={group} items={items} index={i} inView={inView} />
        ))}
      </div>
    </div>
  )
}
