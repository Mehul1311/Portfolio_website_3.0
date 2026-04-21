import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'

type Props = {
  siteReady: boolean
}

export function HeroPortrait({ siteReady }: Props) {
  const [useFallbackVisual, setUseFallbackVisual] = useState(false)
  const [imgSrc, setImgSrc] = useState<string>(profile.heroPhoto)

  const onImgError = useCallback(() => {
    if (imgSrc === profile.heroPhoto && profile.heroPhotoRemote) {
      setImgSrc(profile.heroPhotoRemote)
      return
    }
    setUseFallbackVisual(true)
  }, [imgSrc])

  return (
    <div className="flex w-full justify-center lg:w-auto lg:justify-end lg:shrink-0">
      <div className="w-full max-w-[220px] sm:max-w-[240px] md:max-w-[250px] lg:max-w-[260px] xl:max-w-[270px]">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2, scale: 0.94 }}
          animate={siteReady ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.15 }}
          className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[var(--bg1)] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.05]"
        >
          <div className="relative aspect-[3/4] w-full bg-[var(--bg0)]">
            {!useFallbackVisual ? (
              <img
                src={imgSrc}
                alt={profile.heroPhotoAlt}
                onError={onImgError}
                className="size-full object-cover object-[center_25%]"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                fetchPriority="high"
                sizes="(max-width: 640px) 240px, 260px"
              />
            ) : (
              <div className="grid size-full min-h-[200px] place-items-center bg-gradient-to-b from-white/[0.06] to-[var(--bg0)]">
                <span className="text-4xl font-bold tracking-tight text-[var(--accent)] sm:text-5xl">{profile.initials}</span>
                <p className="absolute bottom-4 px-4 text-center text-[0.7rem] text-white/50">
                  Add <code className="rounded bg-black/50 px-1 py-0.5 text-white/80">public/profile-photo.jpg</code>
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-white/[0.08] bg-[var(--bg0)]/95 px-3 py-2.5 sm:px-4 sm:py-3">
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]/90">
              {profile.heroStatTitle}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-white/95">{profile.shortTitle}</p>
            <p className="mt-0.5 text-[0.7rem] text-white/50 sm:text-xs">{profile.heroStatSubtitle}</p>
            <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-white/40">{profile.location}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
