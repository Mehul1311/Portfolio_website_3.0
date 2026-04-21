import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  visible: boolean
}

export function HeroScrollCue({ visible }: Props) {
  const reduced = usePrefersReducedMotion()
  if (!visible) return null

  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-10"
    >
      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-zinc-500 transition group-hover:text-zinc-400">
        Explore
      </span>
      <motion.span
        className="flex h-9 w-5 justify-center rounded-full border border-white/10 bg-white/[0.03] pt-2 backdrop-blur-sm"
        animate={reduced ? {} : { y: [0, 5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <motion.span
          className="block size-1 rounded-full bg-cyan-400/90 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
          animate={reduced ? {} : { y: [0, 10, 0], opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.span>
    </motion.a>
  )
}
