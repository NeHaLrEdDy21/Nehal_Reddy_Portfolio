import { useRive } from '@rive-app/react-canvas'

interface Props {
  src: string
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}

/**
 * Decorative Rive animation wrapper.
 * Gracefully renders nothing if the .riv file is missing.
 *
 * Usage:
 *   <RiveAccent src="/animations/accent.riv" width={300} height={300} />
 *
 * To get a .riv file:
 *   1. Go to rive.app/community and pick a geometric/abstract animation
 *   2. Export as .riv to public/animations/accent.riv
 */
export function RiveAccent({ src, width = 300, height = 300, style }: Props) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    onLoadError: () => { /* silently ignore missing .riv */ },
  })

  return (
    <div style={{ width, height, ...style }}>
      <RiveComponent />
    </div>
  )
}
