import Lenis from 'lenis'
import gsap from 'gsap'

let lenisInstance: Lenis | null = null

export function initLenis(): Lenis {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  })

  // Critical: connect Lenis RAF to GSAP ticker so ScrollTrigger stays in sync
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  lenisInstance = lenis
  return lenis
}

export function getLenis(): Lenis | null {
  return lenisInstance
}
