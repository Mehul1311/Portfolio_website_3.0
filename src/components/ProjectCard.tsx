import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { SpotlightCard } from './SpotlightCard'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  title: string
  subtitle: string
  tags: string[]
  href: string
  kind?: 'repo' | 'live'
  index?: number
}

export function ProjectCard({ title, subtitle, tags, href, kind = 'repo', index = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion) return

    let raf = 0
    let lastEvent: PointerEvent | null = null

    const tick = () => {
      raf = 0
      if (!lastEvent) return
      const e = lastEvent
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rx = (py - 0.5) * -10
      const ry = (px - 0.5) * 12
      gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.28, ease: 'power2.out' })
    }

    const onMove = (e: PointerEvent) => {
      lastEvent = e
      if (raf) return
      raf = window.requestAnimationFrame(tick)
    }

    const onLeave = () => {
      if (raf) window.cancelAnimationFrame(raf)
      raf = 0
      lastEvent = null
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power3.out' })
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  const meta = kind === 'live' ? 'Live site' : 'Repository'
  const cta = kind === 'live' ? 'Open' : 'GitHub'

  return (
    <motion.div
      initial={{ opacity: 0, y: 56, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -10, transition: { type: 'spring', stiffness: 420, damping: 24 } }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1200 }}
    >
      <SpotlightCard
        ref={ref}
        className="group border-l-[3px] border-l-[var(--accent)] p-5 md:p-6 [transform-style:preserve-3d] lg:p-7"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-[var(--accent)]/12 blur-3xl transition-opacity group-hover:opacity-100" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-56 rounded-full bg-[var(--accent2)]/10 blur-3xl transition-opacity group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight text-[var(--text)] md:text-xl">
              {title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">{subtitle}</p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] text-sm font-semibold text-[var(--accent)] transition duration-300 group-hover:scale-105 group-hover:border-[var(--accent)]/40">
            ↗
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--stroke)] bg-[var(--bg0)]/50 px-3 py-1 text-xs text-[var(--muted)]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-xs text-[var(--muted)]">{meta}</span>
          <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-[var(--stroke)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text)] transition hover:border-[var(--accent)]/35"
          >
            {cta} <span className="inline-block">↗</span>
          </motion.a>
        </div>
      </SpotlightCard>
    </motion.div>
  )
}
