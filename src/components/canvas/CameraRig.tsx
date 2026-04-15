import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { usePortfolioStore } from '@/store/usePortfolioStore'
import type { WorldId } from '@/store/usePortfolioStore'

// Camera position for each world (x, y, z)
const CAMERA_POSITIONS: Record<WorldId, [number, number, number]> = {
  signal:  [0, 0, 5],
  origins: [-6, 0, 4],
  lab:     [6, 0, 5],
  archive: [0, -2, 5],
  kitchen: [-4, 0, 5],
  stage:   [2, 0, 6],
  horizon: [0, 3, 7],
}

// Where the camera looks in each world
const CAMERA_TARGETS: Record<WorldId, [number, number, number]> = {
  signal:  [0, 0, 0],
  origins: [-6, 0, 0],
  lab:     [6, 0, 0],
  archive: [0, -2, 0],
  kitchen: [-4, 0, 0],
  stage:   [2, -1, 0],
  horizon: [0, 3, 0],
}

export function CameraRig() {
  const { camera } = useThree()
  const setActiveWorld = usePortfolioStore((s) => s.setActiveWorld)
  const setNavVisible = usePortfolioStore((s) => s.setNavVisible)

  // Plain JS object that GSAP will animate — read in useFrame
  const camTarget = useRef({ x: 0, y: 0, z: 5 })
  const lookTarget = useRef(new Vector3(0, 0, 0))
  const tempLook = useRef(new Vector3())

  useEffect(() => {
    const worlds: WorldId[] = ['signal', 'origins', 'lab', 'archive', 'kitchen', 'stage', 'horizon']

    const triggers = worlds.map((world) => {
      const [tx, ty, tz] = CAMERA_POSITIONS[world]
      const [lx, ly, lz] = CAMERA_TARGETS[world]

      return ScrollTrigger.create({
        trigger: `#world-${world}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => {
          setActiveWorld(world)
          gsap.to(camTarget.current, { x: tx, y: ty, z: tz, duration: 1.4, ease: 'power2.inOut' })
          gsap.to(lookTarget.current, { x: lx, y: ly, z: lz, duration: 1.4, ease: 'power2.inOut' })
        },
        onEnterBack: () => {
          setActiveWorld(world)
          gsap.to(camTarget.current, { x: tx, y: ty, z: tz, duration: 1.4, ease: 'power2.inOut' })
          gsap.to(lookTarget.current, { x: lx, y: ly, z: lz, duration: 1.4, ease: 'power2.inOut' })
        },
      })
    })

    // Show navbar once user scrolls past hero
    const navTrigger = ScrollTrigger.create({
      trigger: '#world-origins',
      start: 'top 80%',
      onEnter: () => setNavVisible(true),
      onLeaveBack: () => setNavVisible(false),
    })

    return () => {
      triggers.forEach((t) => t.kill())
      navTrigger.kill()
    }
  }, [setActiveWorld, setNavVisible])

  useFrame(() => {
    // Smooth lerp camera toward GSAP-controlled target
    camera.position.x += (camTarget.current.x - camera.position.x) * 0.06
    camera.position.y += (camTarget.current.y - camera.position.y) * 0.06
    camera.position.z += (camTarget.current.z - camera.position.z) * 0.06
    // Smooth lookAt
    tempLook.current.lerp(lookTarget.current, 0.06)
    camera.lookAt(tempLook.current)
  })

  return null
}
