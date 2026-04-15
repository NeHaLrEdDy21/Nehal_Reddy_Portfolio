import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  // Ring lags behind for smooth trailing effect
  const ringPos = useRef({ x: -100, y: -100 })
  const mousePos = useRef({ x: -100, y: -100 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    }

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      ring.style.left = `${ringPos.current.x}px`
      ring.style.top = `${ringPos.current.y}px`
      rafId.current = requestAnimationFrame(animate)
    }

    const onEnterHover = () => {
      dot.classList.add('cursor-hover')
      ring.classList.add('cursor-hover')
    }
    const onLeaveHover = () => {
      dot.classList.remove('cursor-hover')
      ring.classList.remove('cursor-hover')
    }

    document.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animate)

    // Expand on interactive elements
    const targets = document.querySelectorAll('a, button, [role="button"]')
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnterHover)
      el.addEventListener('mouseleave', onLeaveHover)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      <div id="custom-cursor" ref={dotRef} />
      <div id="custom-cursor-ring" ref={ringRef} />
    </>
  )
}
