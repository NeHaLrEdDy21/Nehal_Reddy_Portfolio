import { useEffect, useRef } from 'react'
import { getLenis } from '@/lib/lenis'

/** Returns a ref (not state) of normalized 0-1 scroll progress across entire page.
 *  Using a ref avoids re-renders on every scroll frame — read it in useFrame. */
export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    const lenis = getLenis()
    if (!lenis) return
    const handleScroll = ({ progress: p }: { progress: number }) => {
      progress.current = p
    }
    lenis.on('scroll', handleScroll)
    return () => {
      lenis.off('scroll', handleScroll)
    }
  }, [])

  return progress
}
