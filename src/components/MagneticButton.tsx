import { type PropsWithChildren, useEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = PropsWithChildren<{
  href: string
  external?: boolean
  /** Primary = light CTA (luxe). Ghost = glass outline. */
  variant?: 'primary' | 'ghost'
}>

export function MagneticButton({ href, external, children, variant = 'primary' }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const qx = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const qy = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      qx(dx * 0.18)
      qy(dy * 0.18)
    }

    const onLeave = () => {
      qx(0)
      qy(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  const isPrimary = variant === 'primary'

  return (
    <a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={[
        'group inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[0.8125rem] font-semibold transition duration-300 sm:px-5 sm:py-2.5 sm:text-sm',
        isPrimary
          ? 'border border-white/20 bg-white text-neutral-950 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_16px_50px_-12px_rgba(255,255,255,0.22)] hover:bg-zinc-100 hover:shadow-[0_20px_60px_-8px_rgba(34,211,238,0.15)]'
          : 'border border-white/[0.12] bg-white/[0.03] text-zinc-200 shadow-none hover:border-purple-400/35 hover:bg-white/[0.06] hover:text-white',
      ].join(' ')}
    >
      <span className={isPrimary ? 'text-neutral-950' : ''}>{children}</span>
      <span className={isPrimary ? 'text-neutral-800' : 'text-zinc-500 group-hover:text-purple-400/90'}>↗</span>
    </a>
  )
}
