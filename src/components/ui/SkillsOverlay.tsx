import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skills } from '@/data/skills'
import { SkillMarquee } from './SkillMarquee'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const SKILL_ICONS: Record<string, string> = {
  'Python': '🐍',
  'JavaScript': '⚡',
  'C++': '⚙️',
  'Java': '☕',
  'SQL': '🗄️',
  'R': '📈',
  'Scikit-learn': '🤖',
  'PyTorch Geometric': '🔥',
  'Statsmodels': '📊',
  'Time Series': '⏱️',
  'NLP': '💬',
  'React': '⚛️',
  'Node.js': '🟢',
  'FastAPI': '🚀',
  'MongoDB': '🍃',
  'PostgreSQL': '🐘',
  'REST APIs': '🔌',
  'Docker': '🐳',
  'Git': '🌿',
  'Postman': '📮',
  'Streamlit': '🌊',
  'VS Code': '💻',
  'Matplotlib': '📉',
  'Tableau': '🎨',
  'Power BI': '💡',
}

const CAT_META: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  languages:     { label: 'Languages',     icon: '</>',  color: '#0038FF', bg: 'rgba(0,56,255,0.07)'   },
  ml:            { label: 'ML & Data',     icon: '∑',    color: '#E8003D', bg: 'rgba(232,0,61,0.07)'   },
  web:           { label: 'Web Dev',       icon: '{}',   color: '#0A0A0A', bg: 'rgba(10,10,10,0.05)'   },
  tools:         { label: 'Tools',         icon: '⚙',    color: '#FF8C00', bg: 'rgba(255,140,0,0.07)'  },
  visualization: { label: 'Visualisation', icon: '◈',    color: '#5a8a00', bg: 'rgba(200,255,87,0.18)' },
}

// Static positions — no randomness to avoid hydration mismatch
const FLOATERS = [
  { char: '</>', x: 6,  y: 18, delay: 0.0, size: 0.7  },
  { char: '{}',  x: 82, y: 12, delay: 0.8, size: 0.85 },
  { char: '=>',  x: 24, y: 55, delay: 1.4, size: 0.65 },
  { char: '∑',   x: 68, y: 38, delay: 0.3, size: 1.1  },
  { char: '[]',  x: 90, y: 62, delay: 2.1, size: 0.7  },
  { char: '++',  x: 46, y: 8,  delay: 0.6, size: 0.75 },
  { char: '∂',   x: 14, y: 78, delay: 1.9, size: 0.9  },
  { char: '&&',  x: 58, y: 72, delay: 0.2, size: 0.65 },
  { char: '#!',  x: 36, y: 88, delay: 1.2, size: 0.7  },
  { char: '**',  x: 76, y: 84, delay: 2.8, size: 0.8  },
  { char: '~',   x: 50, y: 30, delay: 3.2, size: 1.4  },
  { char: '∫',   x: 3,  y: 45, delay: 1.7, size: 0.95 },
]

function SkillBadge({ skill }: { skill: typeof skills[0] }) {
  const color = CAT_META[skill.category]?.color ?? '#0A0A0A'
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -4, rotate: [-1, 1, -1, 0] }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.35rem 0.7rem',
        border: `1.5px solid ${color}22`,
        borderRadius: '9999px',
        background: 'var(--surface)',
        cursor: 'default',
        whiteSpace: 'nowrap',
        boxShadow: `0 1px 4px ${color}18`,
      }}
    >
      <span style={{ fontSize: '0.82rem', lineHeight: 1 }}>
        {SKILL_ICONS[skill.name] ?? '◆'}
      </span>
      <span style={{ fontSize: '0.76rem', fontWeight: 500, color: 'var(--ink)' }}>
        {skill.name}
      </span>
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: color,
          flexShrink: 0,
          opacity: 0.5 + skill.level * 0.5,
        }}
      />
    </motion.div>
  )
}

const CATEGORIES = ['languages', 'ml', 'web', 'tools', 'visualization'] as const

export function SkillsOverlay() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const isMobile = useMediaQuery('(max-width: 639px)')

  return (
    <div ref={ref} className="relative z-10 h-full flex flex-col justify-end" style={{ pointerEvents: 'none' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        data-lenis-prevent={isMobile ? '' : undefined}
        style={{
          position: 'relative',
          background: 'rgba(242,239,234,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          pointerEvents: 'auto',
          overflowX: 'hidden',
          overflowY: isMobile ? 'auto' : 'hidden',
          maxHeight: isMobile ? '90vh' : 'none',
        }}
      >
        {/* Floating code decorations */}
        {FLOATERS.map((f, i) => (
          <motion.span
            key={i}
            className="mono"
            initial={{ opacity: 0, y: 0 }}
            animate={inView ? {
              opacity: [0, 0.1, 0],
              y: [0, -20, -40],
            } : {}}
            transition={{
              duration: 5,
              delay: f.delay,
              repeat: Infinity,
              repeatDelay: 3 + f.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              left: `${f.x}%`,
              top: `${f.y}%`,
              fontSize: `${f.size}rem`,
              color: 'var(--ink)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          >
            {f.char}
          </motion.span>
        ))}

        {/* Heading row */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            paddingBottom: '1rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div>
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
              // WORLD_04 · THE ARCHIVE
            </p>
            <h2
              className="display"
              style={{ fontSize: 'clamp(4rem, 11vw, 9rem)', color: 'var(--ink)', lineHeight: 0.9 }}
            >
              THE ARCHIVE<span style={{ color: 'var(--signal)' }}>.</span>
            </h2>
          </div>
          <span
            className="mono"
            style={{ fontSize: '0.7rem', color: 'var(--muted)', paddingBottom: '0.5rem' }}
          >
            {skills.length} skills · 5 domains
          </span>
        </div>

        {/* Skill categories */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '0 clamp(1.5rem, 3vw, 2.5rem)',
            paddingBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {CATEGORIES.map((cat, catIdx) => {
            const meta = CAT_META[cat]
            const catSkills = skills.filter((s) => s.category === cat)
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + catIdx * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}
              >
                {/* Category label */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    flexShrink: 0,
                    minWidth: '7.5rem',
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.9rem',
                      color: meta.color,
                      lineHeight: 1,
                      fontWeight: 700,
                    }}
                  >
                    {meta.icon}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: '0.65rem',
                      color: meta.color,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {meta.label}
                  </span>
                </div>

                {/* Skill badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {catSkills.map((skill, si) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + catIdx * 0.08 + si * 0.04 }}
                    >
                      <SkillBadge skill={skill} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Marquee strip */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            borderTop: '1px solid var(--border)',
            padding: '0.7rem 0',
            background: 'var(--surface)',
          }}
        >
          <SkillMarquee />
        </div>
      </motion.div>
    </div>
  )
}
