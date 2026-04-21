import { useEffect } from 'react'

export function CursorGlow() {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0
    let cx = '50%'
    let cy = '50%'

    const flush = () => {
      raf = 0
      root.style.setProperty('--cx', cx)
      root.style.setProperty('--cy', cy)
    }

    const onMove = (e: PointerEvent) => {
      cx = `${(e.clientX / window.innerWidth) * 100}%`
      cy = `${(e.clientY / window.innerHeight) * 100}%`
      if (!raf) raf = requestAnimationFrame(flush)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="cursor-glow" aria-hidden="true" />
}
