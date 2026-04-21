import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'

type Link = { label: string; href: string; external?: boolean }

type Props = {
  whatsappUrl: string | null
}

export function Footer({ whatsappUrl }: Props) {
  const year = useMemo(() => new Date().getFullYear(), [])

  const quick: Link[] = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const socials: Link[] = [
    { label: 'LinkedIn', href: profile.links.linkedin, external: true },
    { label: 'GitHub', href: profile.links.github, external: true },
    ...(whatsappUrl
      ? [{ label: 'WhatsApp', href: whatsappUrl, external: true } satisfies Link]
      : []),
  ]

  function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-16 border-t border-[var(--stroke)] md:mt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-10 size-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute -top-28 right-0 size-80 rounded-full bg-[var(--accent2)]/10 blur-3xl" />
      </div>

      <div className="relative z-10 grid w-full gap-10 px-3 py-14 sm:px-5 md:px-6 lg:grid-cols-3 lg:gap-10 lg:px-8 lg:py-20 xl:px-10 2xl:px-12">
        <div className="spotlight relative overflow-hidden rounded-[1.75rem] border border-[var(--stroke)] bg-[var(--surface)] p-8 md:p-9">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--stroke)] bg-[var(--bg0)]/50 text-xs font-bold text-[var(--accent)]">
              {profile.initials}
            </span>
            <div>
              <p className="text-base font-semibold tracking-wide text-[var(--text)]">{profile.name}</p>
              <p className="mt-0.5 text-sm text-[var(--muted)]">{profile.shortTitle} · {profile.location}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[var(--muted)] md:text-base">{profile.subhead}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {profile.skills.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--stroke)] bg-[var(--bg0)]/40 px-3 py-1 text-xs text-[var(--muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
          <div className="spotlight relative overflow-hidden rounded-3xl border border-[var(--stroke)] bg-[var(--surface)] p-8">
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">NAVIGATION</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {quick.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-2xl border border-transparent px-3 py-2.5 text-[var(--muted)] transition hover:border-[var(--stroke)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text)]"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="spotlight relative overflow-hidden rounded-3xl border border-[var(--stroke)] bg-[var(--surface)] p-8">
            <p className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)]">CONNECT</p>
            <div className="mt-4 grid gap-2 text-sm">
              {socials.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noreferrer' : undefined}
                  className="group flex items-center justify-between rounded-2xl border border-[var(--stroke)] bg-[var(--bg0)]/40 px-4 py-3.5 text-[var(--text)] transition hover:bg-[var(--surface-elevated)]"
                >
                  <span>{l.label}</span>
                  <span className="text-[var(--muted)] transition group-hover:translate-x-0.5">↗</span>
                </a>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[var(--muted)]">Open to opportunities</div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={backToTop}
                className="rounded-full border border-[var(--stroke)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text)] transition hover:bg-[var(--surface-elevated)]"
              >
                Back to top ↑
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--stroke)]">
        <div className="relative z-10 flex w-full flex-col items-center justify-between gap-2 px-3 py-8 text-xs text-[var(--muted)] sm:flex-row sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <span>
            © {year} {profile.name}. All rights reserved.
          </span>
          <span className="text-[var(--muted)]/80">React · Vite · Express · MongoDB</span>
        </div>
      </div>
    </footer>
  )
}
