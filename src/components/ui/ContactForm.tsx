import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personal } from '@/data/personal'

export function ContactForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div
      ref={ref}
      className="relative z-10 h-full flex flex-col justify-end"
      style={{ pointerEvents: 'none' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(242,239,234,0.96)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          padding: 'clamp(2rem, 4vw, 4rem)',
          paddingBottom: 'clamp(2.5rem, 5vh, 4.5rem)',
          pointerEvents: 'auto',
        }}
      >
        <p className="mono" style={{ fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>
          // WORLD_07 · THE HORIZON
        </p>

        {/* Giant Bebas Neue heading */}
        <h2
          className="display"
          style={{
            fontSize: 'clamp(4rem, 16vw, 14rem)',
            color: 'var(--ink)',
            lineHeight: 0.85,
            marginBottom: '2rem',
          }}
        >
          LET'S<br />BUILD<br /><span style={{ color: 'var(--signal)' }}>SOMETHING.</span>
        </h2>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
          {/* Email */}
          <a
            href={`mailto:${personal.email}`}
            className="mono"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
              color: 'var(--ink)',
              textDecoration: 'none',
              fontWeight: 600,
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--signal)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
          >
            {personal.email}
          </a>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {[
              { label: '↗ LinkedIn', href: personal.linkedin },
              { label: '↗ GitHub', href: personal.github },
              { label: '↓ Resume', href: personal.resume, download: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.download ? undefined : '_blank'}
                rel="noopener noreferrer"
                download={link.download}
                className="mono"
                style={{ color: 'var(--muted)', fontSize: '0.88rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--ink)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mono" style={{ color: 'var(--border)', fontSize: '0.66rem', letterSpacing: '0.14em', marginTop: '1.5rem' }}>
          MUDIAM NEHAL REDDY · HYDERABAD · 2026
        </p>
      </motion.div>
    </div>
  )
}
