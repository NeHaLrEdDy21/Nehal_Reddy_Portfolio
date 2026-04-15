import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/data/projects'

interface Props {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(10,10,10,0.6)',
              zIndex: 999,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              background: 'var(--surface)',
              borderRadius: '24px 24px 0 0',
              padding: 'clamp(2rem, 5vw, 4rem)',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--border)',
                border: 'none',
                fontSize: '1.2rem',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>

            <p className="mono" style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              → {project.year}
            </p>

            <h2
              className="display"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: 'var(--ink)', marginBottom: '1.5rem', lineHeight: 0.9 }}
            >
              {project.title}
            </h2>

            {project.metric && (
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                <span className="display" style={{ fontSize: '4rem', color: 'var(--signal)' }}>{project.metric.value}</span>
                <span style={{ color: 'var(--muted)', fontSize: '1rem' }}>{project.metric.label}</span>
              </div>
            )}

            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '60ch', marginBottom: '2rem' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="mono pill"
                  style={{
                    background: 'var(--bg)',
                    color: 'var(--ink)',
                    fontSize: '0.8rem',
                    border: '1px solid var(--border)',
                    padding: '0.4em 1em',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
