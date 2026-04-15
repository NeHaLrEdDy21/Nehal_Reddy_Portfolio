import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { projects } from '@/data/projects'
import { ProjectModal } from './ProjectModal'
import type { Project } from '@/data/projects'

const CARD_COLORS = [
  { bg: 'var(--cobalt)', text: '#ffffff', num: 'rgba(255,255,255,0.15)' },
  { bg: 'var(--amber)', text: 'var(--ink)', num: 'rgba(10,10,10,0.12)' },
  { bg: 'var(--lime)', text: 'var(--ink)', num: 'rgba(10,10,10,0.12)' },
]

export function ProjectCards() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [active, setActive] = useState(0)
  const [modal, setModal] = useState<Project | null>(null)

  const project = projects[active]

  return (
    <>
      <ProjectModal project={modal} onClose={() => setModal(null)} />

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
          <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', paddingBottom: '1rem' }}>
            <p className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              // WORLD_03 · THE LAB
            </p>

            {/* Big counter + title */}
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <p
                className="display"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', color: 'rgba(10,10,10,0.12)', lineHeight: 1 }}
              >
                {String(active + 1).padStart(2, '0')}
              </p>
              <h2
                className="display"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 7rem)',
                  color: 'var(--ink)',
                  lineHeight: 0.88,
                  marginBottom: '0.8rem',
                }}
              >
                {project.title.split(' ').map((word, i) => (
                  <span key={i} style={{ display: 'block' }}>{word}</span>
                ))}
              </h2>
              <p className="mono" style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                {project.stack.slice(0, 4).join(' · ')}
              </p>
              <p className="mono" style={{ color: 'var(--signal)', fontSize: '0.8rem', fontWeight: 700 }}>
                → {project.year}{project.metric ? ` · ${project.metric.value} ${project.metric.label}` : ''}
              </p>
            </motion.div>
          </div>

          {/* Horizontal draggable card strip */}
          <div style={{ paddingLeft: 'clamp(1.5rem, 3vw, 2.5rem)', overflow: 'hidden' }}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -(projects.length - 1) * 360, right: 0 }}
              dragElastic={0.08}
              style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', paddingRight: '2rem', width: 'max-content' }}
            >
              {projects.map((p, i) => {
                const palette = CARD_COLORS[i % CARD_COLORS.length]
                return (
                  <motion.div
                    key={p.id}
                    onClick={() => { setActive(i); setModal(p) }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: 320,
                      flexShrink: 0,
                      background: palette.bg,
                      borderRadius: 20,
                      padding: '1.5rem',
                      cursor: 'pointer',
                      border: i === active ? '2.5px solid var(--ink)' : '2.5px solid transparent',
                    }}
                  >
                    <p
                      className="display"
                      style={{ fontSize: '4rem', color: palette.num, lineHeight: 1, marginBottom: '0.3rem' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p
                      className="display"
                      style={{ fontSize: '1.8rem', color: palette.text, lineHeight: 1, marginBottom: '0.8rem' }}
                    >
                      {p.title}
                    </p>
                    <p
                      className="mono"
                      style={{ fontSize: '0.75rem', color: palette.text, opacity: 0.7 }}
                    >
                      {p.stack.slice(0, 3).join(' · ')}
                    </p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Pagination dots */}
          <div style={{ display: 'flex', gap: '0.5rem', padding: '0 clamp(1.5rem, 3vw, 2.5rem)', paddingBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? 'var(--signal)' : 'var(--border)',
                  border: 'none',
                  padding: 0,
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
