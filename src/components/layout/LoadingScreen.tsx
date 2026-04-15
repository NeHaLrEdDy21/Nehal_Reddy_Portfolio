import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from '@/store/usePortfolioStore'

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const setLoaded = usePortfolioStore((s) => s.setLoaded)
  const raf = useRef<number>(0)
  const startTime = useRef(Date.now())

  useEffect(() => {
    const duration = 2200
    const tick = () => {
      const elapsed = Date.now() - startTime.current
      const p = Math.min(elapsed / duration, 1)
      setProgress(Math.floor(p * 100))
      if (p < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          setVisible(false)
          setLoaded()
        }, 400)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [setLoaded])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--void)' }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          {/* Initials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mono"
              style={{ border: '1px solid var(--signal)', color: 'var(--signal)' }}
            >
              NR
            </div>
          </motion.div>

          {/* Progress bar */}
          <div
            className="w-48 h-px relative overflow-hidden"
            style={{ background: 'var(--border)' }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{
                background: 'var(--signal)',
                width: `${progress}%`,
                boxShadow: '0 0 8px var(--signal)',
              }}
            />
          </div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 section-label"
            style={{ color: 'var(--muted)' }}
          >
            Initializing Universe · {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
