import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type Props = {
  lead: string
  accent: string
  siteReady: boolean
  className?: string
}

const spring = { type: 'spring' as const, stiffness: 380, damping: 22, mass: 0.6 }

export function SplitWords({ lead, accent, siteReady, className }: Props) {
  const reduced = usePrefersReducedMotion()
  const leadWords = lead.trim().split(/\s+/)
  const accentWords = accent.trim().split(/\s+/)

  if (reduced) {
    return (
      <h1 className={[className, 'w-full min-w-0'].filter(Boolean).join(' ')}>
        {lead}{' '}
        <span className="text-shimmer">{accent}</span>
      </h1>
    )
  }

  return (
    <h1 className={[className, 'w-full min-w-0'].filter(Boolean).join(' ')}>
      {/* Flex + gap: avoids collapsed spaces between inline-block words (text-balance bug) */}
      <span className="flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1">
        {leadWords.map((w, i) => (
          <motion.span
            key={`l-${i}`}
            className="inline-block origin-bottom will-change-transform"
            initial={{ opacity: 0, y: 72, rotate: -4, filter: 'blur(12px)' }}
            animate={
              siteReady
                ? { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 72, rotate: -4, filter: 'blur(12px)' }
            }
            transition={{ ...spring, delay: 0.06 * i }}
          >
            {w}
          </motion.span>
        ))}
      </span>{' '}
      <span className="mt-2 flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1 sm:mt-1 sm:inline-flex sm:max-w-none">
        {accentWords.map((w, i) => (
          <motion.span
            key={`a-${i}`}
            className="text-shimmer inline-block origin-bottom will-change-transform"
            initial={{ opacity: 0, y: 56, scale: 0.92, filter: 'blur(10px)' }}
            animate={
              siteReady
                ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, y: 56, scale: 0.92, filter: 'blur(10px)' }
            }
            transition={{
              ...spring,
              delay: 0.08 * leadWords.length + 0.07 * i,
            }}
          >
            {w}
          </motion.span>
        ))}
      </span>
    </h1>
  )
}
