import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function ChaosCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const halo = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const dotEl = dot.current
    const haloEl = halo.current
    if (!dotEl || !haloEl) return
    const dotX = gsap.quickTo(dotEl, 'x', { duration: .12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dotEl, 'y', { duration: .12, ease: 'power3.out' })
    const haloX = gsap.quickTo(haloEl, 'x', { duration: .55, ease: 'power3.out' })
    const haloY = gsap.quickTo(haloEl, 'y', { duration: .55, ease: 'power3.out' })
    const move = (event: PointerEvent) => { dotX(event.clientX); dotY(event.clientY); haloX(event.clientX); haloY(event.clientY) }
    const over = (event: PointerEvent) => {
      const active = (event.target as HTMLElement).closest('a,button,.project-slide')
      gsap.to(haloEl, { scale: active ? 2.4 : 1, borderColor: active ? 'var(--acid)' : 'var(--hot)', duration: .3 })
      gsap.to(dotEl, { scale: active ? .4 : 1, duration: .2 })
    }
    addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    return () => { removeEventListener('pointermove', move); document.removeEventListener('pointerover', over) }
  }, [])

  return <><div ref={halo} className="chaos-cursor-halo" aria-hidden /><div ref={dot} className="chaos-cursor-dot" aria-hidden /></>
}