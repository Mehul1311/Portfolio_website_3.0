import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { CursorGlow } from './components/CursorGlow'
import { ScrollProgress } from './components/ScrollProgress'
import { NoiseOverlay } from './components/NoiseOverlay'
import { FloatingOrbs } from './components/FloatingOrbs'
import { Loader } from './components/Loader'
import { Marquee } from './components/Marquee'
import { MagneticButton } from './components/MagneticButton'
import { ProjectCard } from './components/ProjectCard'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { HeroPortrait } from './components/HeroPortrait'
import { SplitWords } from './components/SplitWords'
import { HeroStats } from './components/HeroStats'
import { AuroraBackdrop } from './components/AuroraBackdrop'
import { HeroScrollCue } from './components/HeroScrollCue'
import { profile } from './data/profile'
import { getWhatsAppUrl } from './lib/env'

/** Edge-to-edge width; minimal horizontal padding (symmetric) */
const layoutMain = 'relative z-10 w-full px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12'
const layoutHeader = 'relative z-30 w-full px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12'

/** Rounded section panels — depth + consistent rhythm */
const sectionPanel =
  'rounded-[1.5rem] md:rounded-[2rem] border border-[var(--stroke)] bg-[var(--surface)]/95 p-6 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.55)] md:p-8 lg:p-10'

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function App() {
  const [siteReady, setSiteReady] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const whatsappUrl = getWhatsAppUrl()

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const els = gsap.utils.toArray<HTMLElement>('[data-reveal]')
    els.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 56, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  useEffect(() => {
    if (!siteReady) return
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [siteReady])


  const headerEase = [0.22, 1, 0.36, 1] as const

  return (
    <div className="relative min-h-dvh w-full overflow-x-clip">
      <div className="page-grid-bg" aria-hidden />
      <Loader onReady={() => setSiteReady(true)} />
      <ScrollProgress />
      <CursorGlow />
      <NoiseOverlay />

      {whatsappUrl ? (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          initial={false}
          animate={siteReady ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.15 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 md:bottom-8 md:right-8 md:h-16 md:w-16"
          aria-label="Message Mehul on WhatsApp"
        >
          <svg className="size-8 md:size-9" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>
      ) : null}

      <motion.header
        initial={false}
        animate={siteReady ? { y: 0, opacity: 1 } : { y: -32, opacity: 0 }}
        transition={{ duration: 0.65, ease: headerEase }}
        className={[
          'sticky top-0 z-30 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500',
          navSolid
            ? 'border-b border-white/[0.09] bg-[var(--bg0)]/95 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.65)]'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <div className={`flex items-center justify-between gap-4 py-5 md:py-6 ${layoutHeader}`}>
          <motion.a
            href="#home"
            className="group inline-flex min-w-0 items-center gap-3"
            whileHover={{ x: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-xs font-bold tracking-tight text-purple-400 shadow-[0_0_24px_-4px_rgba(168,85,247,0.35)] md:size-11 md:text-sm">
              {profile.initials}
            </span>
            <span className="truncate text-sm font-semibold tracking-wide text-[var(--text)] md:text-base">
              {profile.name}
            </span>
          </motion.a>

          <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] lg:flex">
            {(
              [
                ['About', '#about'],
                ['Experience', '#experience'],
                ['Projects', '#projects'],
                ['Contact', '#contact'],
              ] as const
            ).map(([label, href]) => (
              <motion.a
                key={href}
                href={href}
                className="relative transition hover:text-[var(--text)]"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              >
                {label}
                <motion.span
                  className="absolute -bottom-1 left-0 block h-px w-full origin-left bg-gradient-to-r from-purple-400 to-white/80"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.25 }}
                />
              </motion.a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full border border-[#25D366]/35 bg-[#25D366]/12 px-4 py-2.5 text-sm font-semibold text-[#bbf7d0] transition hover:bg-[#25D366]/22 lg:inline-flex"
              >
                WhatsApp
              </a>
            ) : null}
            <MagneticButton href="#contact" variant="primary">
              Let’s talk
            </MagneticButton>
          </div>
        </div>
      </motion.header>

      <main className={layoutMain}>
        <section
          id="home"
          className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
        >
          <div className="cinematic-vignette pointer-events-none absolute inset-0 z-[1]" aria-hidden />
          <AuroraBackdrop />
          <FloatingOrbs />

          <div className="relative z-[2] grid w-full min-w-0 items-start gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(200px,0.75fr)] lg:items-center lg:gap-x-8 xl:gap-x-12 2xl:gap-x-16">
            <motion.div
              variants={heroContainer}
              initial="hidden"
              animate={siteReady ? 'show' : 'hidden'}
              className="min-w-0 w-full max-w-full lg:max-w-none"
            >
              <motion.p
                variants={heroItem}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:px-3.5 sm:py-2 sm:text-xs"
              >
                <span className="inline-block size-1.5 rounded-full bg-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.55)]" />
                {profile.badge}
              </motion.p>

              <SplitWords
                lead={profile.heroLead}
                accent={profile.heroAccent}
                siteReady={siteReady}
                className="font-display text-pretty text-[1.65rem] font-bold leading-[1.15] tracking-tight text-[var(--text)] sm:text-3xl md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] xl:leading-[1.12]"
              />

              <motion.p
                variants={heroItem}
                className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-base md:text-[1.05rem]"
              >
                {profile.subhead}
              </motion.p>

              <motion.div variants={heroItem}>
                <HeroStats siteReady={siteReady} />
              </motion.div>

              <motion.div variants={heroItem} className="mt-8 flex flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3">
                <MagneticButton href="#projects" variant="primary">
                  View projects
                </MagneticButton>
                <MagneticButton href={profile.links.linkedin} external variant="ghost">
                  LinkedIn
                </MagneticButton>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-[#25D366]/35 bg-[#25D366]/12 px-5 py-3 text-sm font-semibold text-[#dcfce7] transition hover:bg-[#25D366]/22"
                  >
                    WhatsApp
                  </a>
                ) : null}
                <motion.a
                  href="#about"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-[var(--stroke)] bg-[var(--surface)] px-5 py-3 text-sm text-[var(--muted)]"
                >
                  About
                </motion.a>
              </motion.div>
            </motion.div>

            <HeroPortrait siteReady={siteReady} />
          </div>

          <HeroScrollCue visible={siteReady} />
        </section>

        <section className="py-14 md:py-20">
          <div data-reveal className={`${sectionPanel} py-6 md:py-8`}>
            <Marquee items={[...profile.marquee]} />
          </div>
        </section>

        <section id="about" className="py-16 md:py-24 lg:py-28">
          <div data-reveal className={`grid gap-14 lg:grid-cols-12 lg:gap-20 ${sectionPanel}`}>
            <div className="lg:col-span-4">
              <p className="font-display mb-2 text-[0.65rem] font-bold tabular-nums tracking-[0.35em] text-zinc-600">
                01
              </p>
              <span className="section-accent mb-5 block" aria-hidden />
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl"
              >
                About
              </motion.h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--muted)] md:text-base">
                Snapshot aligned with my public{' '}
                <a href={profile.links.linkedin} className="text-[var(--accent)] underline-offset-4 hover:underline">
                  LinkedIn
                </a>{' '}
                and{' '}
                <a href={profile.links.github} className="text-[var(--accent)] underline-offset-4 hover:underline">
                  GitHub
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="spotlight relative overflow-hidden rounded-[1.75rem] border border-[var(--stroke)] bg-[var(--bg0)]/50 p-9 md:p-11 lg:p-14">
                <p className="text-pretty text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  {profile.about}
                </p>
                <div className="mt-10 flex flex-wrap gap-2">
                  {profile.skills.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, duration: 0.4 }}
                      className="rounded-full border border-[var(--stroke)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--muted)]"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-16 md:py-24 lg:py-28">
          <div className={`grid gap-14 lg:grid-cols-12 lg:gap-20 ${sectionPanel}`} data-reveal>
            <div className="lg:col-span-4">
              <p className="font-display mb-2 text-[0.65rem] font-bold tabular-nums tracking-[0.35em] text-zinc-600">
                02
              </p>
              <span className="section-accent mb-5 block" aria-hidden />
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
                Experience
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                Education and project path—mirror your exact job titles from LinkedIn when you add formal roles.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-6 md:gap-8">
                {profile.experience.map((x, i) => (
                  <motion.div
                    key={`${x.company}-${x.role}`}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-12%' }}
                    transition={{ duration: 0.75, delay: i * 0.1, ease: headerEase }}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    className="rounded-[1.75rem] border border-[var(--stroke)] bg-[var(--surface)] p-8 md:p-9"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-[var(--text)] md:text-xl">{x.role}</p>
                        <p className="mt-1 text-sm text-[var(--muted)] md:text-base">{x.company}</p>
                      </div>
                      <span className="rounded-full border border-[var(--stroke)] bg-[var(--bg0)]/60 px-3 py-1.5 text-xs font-medium text-[var(--muted)]">
                        {x.time}
                      </span>
                    </div>
                    <ul className="mt-5 grid gap-2.5 text-sm text-[var(--muted)] md:text-base">
                      {x.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 md:py-24 lg:py-28">
          <div data-reveal className={sectionPanel}>
            <div className="mb-12 md:mb-16">
              <p className="font-display mb-2 text-[0.65rem] font-bold tabular-nums tracking-[0.35em] text-zinc-600">
                03
              </p>
              <span className="section-accent mb-5 block" aria-hidden />
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
                Projects
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-[var(--muted)] md:text-base">
                Selected repositories from{' '}
                <a
                  href={profile.links.github}
                  className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  github.com/Mehul1311
                </a>
                . Each card links to the repo.
              </p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {profile.projects.map((p, i) => (
                <ProjectCard
                  key={p.href}
                  title={p.title}
                  subtitle={p.subtitle}
                  tags={[...p.tags]}
                  href={p.href}
                    kind={p.kind}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24 lg:py-32">
          <div className={`grid gap-14 lg:grid-cols-2 lg:gap-24 ${sectionPanel}`} data-reveal>
            <div>
              <p className="font-display mb-2 text-[0.65rem] font-bold tabular-nums tracking-[0.35em] text-zinc-600">
                04
              </p>
              <span className="section-accent mb-5 block" aria-hidden />
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">Contact</h2>
              <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
                WhatsApp is fastest—floating button or link below. The form saves to MongoDB when the API runs.
              </p>
              <div className="mt-10 grid gap-3 sm:max-w-md">
                <motion.a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  className="flex items-center justify-between rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-5 py-4 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]/30"
                >
                  LinkedIn profile
                  <span className="text-[var(--muted)]">↗</span>
                </motion.a>
                <motion.a
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 6 }}
                  className="flex items-center justify-between rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-5 py-4 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]/30"
                >
                  GitHub
                  <span className="text-[var(--muted)]">↗</span>
                </motion.a>
                {whatsappUrl ? (
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 6 }}
                    className="flex items-center justify-between rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-4 text-sm font-semibold text-[#dcfce7] transition hover:bg-[#25D366]/18"
                  >
                    Message on WhatsApp
                    <span className="text-[#bbf7d0]/80">↗</span>
                  </motion.a>
                ) : null}
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </section>

        <Footer whatsappUrl={whatsappUrl} />
      </main>
    </div>
  )
}

export default App
