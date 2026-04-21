import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  siteReady: boolean
}

export function HeroStats({ siteReady }: Props) {
  const reduced = usePrefersReducedMotion()
  const items = [
    { value: `${profile.projects.length}+`, label: 'Projects shipped' },
    { value: `${profile.skills.length}+`, label: 'Stack skills' },
    { value: 'MCA', label: 'Program' },
    { value: '∞', label: 'Curiosity' },
  ]

  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-9 sm:grid-cols-4 sm:gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={reduced ? false : { opacity: 0, y: 28, scale: 0.94 }}
          animate={siteReady ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
            delay: reduced ? 0 : 0.45 + i * 0.08,
          }}
          whileHover={reduced ? {} : { y: -4, transition: { duration: 0.2 } }}
          className="group relative overflow-hidden rounded-xl border border-[var(--stroke)] bg-[var(--surface)] px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:px-4 sm:py-3.5"
        >
          <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-[var(--accent)]/10 blur-2xl transition duration-500 group-hover:bg-[var(--accent)]/18" />
          <p className="relative text-lg font-bold tracking-tight text-[var(--text)] sm:text-xl md:text-2xl">{item.value}</p>
          <p className="relative mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-[var(--muted)] sm:text-[0.65rem]">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
