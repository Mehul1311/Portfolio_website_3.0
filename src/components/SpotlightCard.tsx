import { forwardRef, type PropsWithChildren, useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = PropsWithChildren<{
  className?: string
}>

export const SpotlightCard = forwardRef<HTMLDivElement, Props>(function SpotlightCard(
  { className, children },
  forwardedRef
) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!forwardedRef) return
    if (typeof forwardedRef === 'function') forwardedRef(ref.current)
    else forwardedRef.current = ref.current
  }, [forwardedRef])

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) * 100
      const y = ((e.clientY - r.top) / r.height) * 100
      el.style.setProperty('--sx', `${x}%`)
      el.style.setProperty('--sy', `${y}%`)
    }

    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [reduced])

  return (
    <div
      ref={ref}
      className={[
        'spotlight relative overflow-hidden rounded-3xl border border-[var(--stroke)] bg-[var(--surface)]',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
})

