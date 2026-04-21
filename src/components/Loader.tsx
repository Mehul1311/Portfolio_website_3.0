import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  onReady?: () => void
}

const letters = profile.name.split('')

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.04 },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -55, scale: 0.7 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 16, mass: 0.55 },
  },
}

export function Loader({ onReady }: Props) {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduced) {
      const t = window.setTimeout(() => setVisible(false), 320)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => setVisible(false), 1450)
    return () => window.clearTimeout(t)
  }, [reduced])

  return (
    <AnimatePresence onExitComplete={() => onReady?.()}>
      {visible ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-[var(--bg0)]"
          initial={{ opacity: 1 }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.35 } }
              : {
                  clipPath: 'inset(0 0 100% 0)',
                  transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const },
                }
          }
        >
          <motion.div
            className="h-px w-full origin-left bg-gradient-to-r from-cyan-400 via-white to-zinc-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduced ? 0.2 : 0.85,
              ease: reduced ? 'linear' : ([0.22, 0.85, 0.22, 1] as const),
            }}
          />

          <div
            className="relative flex flex-1 flex-col items-center justify-center px-6"
            style={{ perspective: reduced ? undefined : 900 }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 40% 45%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%)',
              }}
            />

            <div className="flex flex-col items-center gap-8">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-wrap justify-center gap-[0.05em] md:gap-[0.08em]"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {letters.map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    variants={letterVariants}
                    className="font-display inline-block text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_40px_rgba(34,211,238,0.25)] sm:text-6xl md:text-7xl lg:text-8xl"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                className="text-[0.65rem] font-semibold uppercase tracking-[0.55em] text-[var(--muted)] sm:text-xs"
                initial={{ opacity: 0, letterSpacing: '0.8em' }}
                animate={{ opacity: 1, letterSpacing: '0.5em' }}
                transition={{ delay: reduced ? 0 : 0.5, duration: 0.6 }}
              >
                Portfolio
              </motion.p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
