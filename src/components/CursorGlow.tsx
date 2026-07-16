import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const flush = () => {
      raf = 0
      if (glowRef.current) {
        // offset by half width/height (280) to center on cursor
        glowRef.current.style.transform = `translate3d(${x - 280}px, ${y - 280}px, 0)`
      }
    }

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(flush)
    }

    // Initial positioning
    flush()

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}
