import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const ITEMS = [
  'Python', 'React', 'PyTorch Geometric', 'GNN', 'FastAPI',
  'Docker', 'PostgreSQL', 'Tableau', 'NetworkX', 'Scikit-learn',
  'TypeScript', 'Node.js', 'Azure OCR', 'Pandas', 'Git',
]

export function SkillMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Total width is exactly half (we duplicate the list)
    const totalW = track.scrollWidth / 2

    tweenRef.current = gsap.to(track, {
      x: -totalW,
      duration: 28,
      ease: 'none',
      repeat: -1,
    })

    return () => { tweenRef.current?.kill() }
  }, [])

  const list = [...ITEMS, ...ITEMS]

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        ref={trackRef}
        style={{ display: 'flex', gap: '0', willChange: 'transform' }}
      >
        {list.map((item, i) => (
          <span
            key={i}
            className="mono"
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              fontSize: '0.82rem',
              color: 'var(--signal)',
              letterSpacing: '0.08em',
              padding: '0 2.5rem',
              borderRight: '1px solid var(--border)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
