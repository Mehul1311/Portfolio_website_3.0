import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type P = { x: number; y: number; vx: number; vy: number; life: number; r: number; hue: number }

export function ParticleTrail() {
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particles = useRef<P[]>([])
  const last = useRef<{ x: number; y: number; t: number } | null>(null)

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const resize = () => {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawn = (x: number, y: number, n: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2
        const s = 0.25 + Math.random() * 0.9
        particles.current.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life: 1,
          r: 1.2 + Math.random() * 2.6,
          hue: 188 + Math.random() * 36, // sky / cyan band
        })
      }
      if (particles.current.length > 720) particles.current.splice(0, particles.current.length - 720)
    }

    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      const x = e.clientX
      const y = e.clientY
      const prev = last.current
      last.current = { x, y, t: now }
      if (!prev) return
      const dx = x - prev.x
      const dy = y - prev.y
      const dist = Math.hypot(dx, dy)
      const amount = Math.min(22, Math.max(0, Math.floor(dist / 5)))
      if (amount > 0) spawn(x, y, amount)
    }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'

      const arr = particles.current
      for (let i = arr.length - 1; i >= 0; i--) {
        const p = arr[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.985
        p.vy *= 0.985
        p.life -= 0.015
        if (p.life <= 0) {
          arr.splice(i, 1)
          continue
        }

        const alpha = Math.max(0, Math.min(1, p.life))
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 88%, 62%, ${alpha * 0.22})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[35] opacity-80"
    />
  )
}

