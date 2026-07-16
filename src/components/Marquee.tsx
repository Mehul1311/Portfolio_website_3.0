import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = {
  items: string[]
}

export function Marquee({ items }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 8,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] shadow-[0_0_40px_-12px_color-mix(in_srgb,var(--accent)_12%,transparent)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg0)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg0)] to-transparent" />
      <div ref={trackRef} className="flex w-[200%] items-center gap-10 py-5 pl-8 will-change-transform transform-gpu md:gap-14 md:py-6">
        {[...items, ...items].map((t, idx) => (
          <div key={`${t}-${idx}`} className="flex items-center gap-4 whitespace-nowrap">
            <span className="size-1 rounded-full bg-[var(--accent)] shadow-[0_0_14px_color-mix(in_srgb,var(--accent)_55%,transparent)]" />
            <span className="text-xs font-semibold tracking-wide text-white/50 md:text-sm">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
