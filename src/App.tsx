import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ScrollProgress } from './components/ScrollProgress'
import { NoiseOverlay } from './components/NoiseOverlay'
import { Loader } from './components/Loader'
import { MagneticButton } from './components/MagneticButton'
import { ContactForm } from './components/ContactForm'
import { ThemeToggle } from './components/ThemeToggle'
import { profile } from './data/profile'
import { getWhatsAppUrl } from './lib/env'
import { ChaosCursor } from './components/ChaosCursor'

const ease = [0.22, 1, 0.36, 1] as const

function App() {
  const [siteReady, setSiteReady] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const whatsappUrl = getWhatsAppUrl()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!siteReady || !rootRef.current) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const touchDevice = matchMedia('(pointer: coarse)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-rise]').forEach((element) => {
        gsap.fromTo(element, { y: 110, opacity: 0, rotateX: -12 }, {
          y: 0, opacity: 1, rotateX: 0, duration: 1.25, ease: 'power4.out',
          scrollTrigger: { trigger: element, start: 'top 88%', toggleActions: 'play none none reverse' },
        })
      })
      if (!touchDevice) gsap.utils.toArray<HTMLElement>('[data-scrub]').forEach((element, index) => {
        gsap.to(element, {
          xPercent: index % 2 ? 18 : -18, rotate: index % 2 ? 8 : -8, ease: 'none',
          scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 1.4 },
        })
      })
      gsap.to('.hero-word-a', { xPercent: -14, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 } })
      gsap.to('.hero-word-b', { xPercent: 18, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 } })

      const projectTrack = document.querySelector<HTMLElement>('.project-track')
      const projectStage = document.querySelector<HTMLElement>('.project-stage')
      if (projectTrack && projectStage && innerWidth >= 900 && !touchDevice) {
        const distance = () => Math.max(0, projectTrack.scrollWidth - innerWidth + 96)
        gsap.to(projectTrack, {
          x: () => -distance(), ease: 'none',
          scrollTrigger: { trigger: projectStage, start: 'top top', end: () => `+=${distance() + innerHeight * 0.7}`, scrub: 1, pin: true, invalidateOnRefresh: true },
        })
      }
      gsap.to('.contact-orbit', { rotate: 360, ease: 'none', scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 1.4 } })
    }, rootRef)
    return () => ctx.revert()
  }, [siteReady])

  return (
    <div ref={rootRef} className="crazy-site min-h-dvh overflow-x-clip">
      <Loader onReady={() => setSiteReady(true)} />
      <ScrollProgress />
      <NoiseOverlay />
      <ChaosCursor />
      <div className="edge-code" aria-hidden><span>MEHUL.EXE</span><span>SCROLL / CREATE / REPEAT</span></div>
      <div className="global-mesh" aria-hidden />

      <header className="neo-nav">
        <a href="#home" className="brand-mark"><span>{profile.initials}</span><i /></a>
        <nav>
          <a href="#about">About</a><a href="#experience">Journey</a><a href="#projects">Work</a><a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions"><ThemeToggle /><MagneticButton href="#contact">Let's talk</MagneticButton></div>
      </header>

      <main>
        <section id="home" className="new-hero">
          <div className="hero-orbit orbit-one" data-scrub /><div className="hero-orbit orbit-two" data-scrub />
          <motion.div className="hero-kicker" initial={{ opacity: 0, y: 20 }} animate={siteReady ? { opacity: 1, y: 0 } : {}} transition={{ delay: .15 }}>
            <span className="live-dot" /> INDIA / AVAILABLE FOR IMPOSSIBLE IDEAS
          </motion.div>
          <div className="hero-type" aria-label={profile.headline}>
            <motion.div className="hero-word-a glitch-word" data-text="BUILDING" initial={{ opacity: 0, x: -100 }} animate={siteReady ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease }}>BUILDING</motion.div>
            <motion.div className="hero-word-b outline-word glitch-word" data-text="DIGITAL" initial={{ opacity: 0, x: 100 }} animate={siteReady ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: .1, ease }}>DIGITAL</motion.div>
            <motion.div className="hero-word-a acid-word glitch-word" data-text="CHAOS." initial={{ opacity: 0, x: -100 }} animate={siteReady ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, delay: .2, ease }}>CHAOS.</motion.div>
          </div>



          <motion.p className="hero-copy" initial={{ opacity: 0, y: 30 }} animate={siteReady ? { opacity: 1, y: 0 } : {}} transition={{ delay: .5, ease }}>
            I turn ambitious ideas into fast, expressive digital products — where engineering meets motion, story and a little bit of madness.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={siteReady ? { opacity: 1 } : {}} transition={{ delay: .7 }}>
            <MagneticButton href="#projects">Explore the lab</MagneticButton><MagneticButton href={profile.links.github} external variant="ghost">GitHub</MagneticButton>
          </motion.div>
          <div className="scroll-stamp"><span>SCROLL TO BREAK REALITY</span><b>↓</b></div>
        </section>

        <div className="ticker-wrap"><div className="ticker-track">{[...profile.marquee, ...profile.marquee].map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></div>

        <section id="about" className="story-section">
          <div className="section-index" data-rise><span>01</span><p>THE HUMAN<br/>BEHIND THE CODE</p></div>
          <div className="story-main">
            <p className="story-intro" data-rise>I DON'T JUST MAKE<br/><em>WEBSITES.</em> I MAKE<br/>DIGITAL <strong>EXPERIENCES.</strong></p>
            <div className="story-grid" data-rise>
              <p>{profile.about}</p>
              <div className="skill-cloud">{profile.skills.map((skill, i) => <motion.span key={skill} whileHover={{ scale: 1.12, rotate: i % 2 ? 4 : -4 }}>{skill}</motion.span>)}</div>
            </div>
          </div>
          <div className="scribble scribble-one" data-scrub>CURIOUS<br/>BY DEFAULT ↗</div>
        </section>

        <section id="experience" className="journey-section">
          <div className="giant-label" data-scrub>JOURNEY</div>
          <div className="section-top" data-rise><span>02 / EXPERIENCE</span><h2>LEARNING.<br/>BUILDING.<br/><i>REPEATING.</i></h2></div>
          <div className="timeline-stack">
            {profile.experience.map((item, i) => <article key={item.role} className={`timeline-card card-${i}`} data-rise>
              <span className="timeline-no">0{i + 1}</span><div><small>{item.time}</small><h3>{item.role}</h3><h4>{item.company}</h4><ul>{item.bullets.map(b => <li key={b}>{b}</li>)}</ul></div>
            </article>)}
          </div>
        </section>

        <section id="projects" className="project-stage">
          <div className="project-heading"><span>03 / SELECTED CHAOS</span><h2>WORK THAT<br/><i>HITS DIFFERENT.</i></h2><p>Drag your eyes. Scroll your curiosity.</p></div>
          <div className="project-track">
            {profile.projects.map((project, i) => <a className={`project-slide project-color-${i % 3}`} href={project.href} target="_blank" rel="noreferrer" key={project.href}>
              <div className="project-number">0{i + 1}</div><div className="project-icon">{project.kind === 'live' ? 'LIVE' : 'GIT'}</div><div className="project-body"><span>{project.tags.join(' / ')}</span><h3>{project.title}</h3><p>{project.subtitle}</p></div><div className="project-arrow">↗</div>
            </a>)}
            <div className="project-end"><span>MORE<br/>BREWING</span><a href={profile.links.githubRepos} target="_blank" rel="noreferrer">VIEW ALL REPOS ↗</a></div>
          </div>
        </section>

        <section id="contact" className="contact-finale">
          <div className="contact-orbit" aria-hidden><span>LET'S CREATE SOMETHING WILD • LET'S CREATE SOMETHING WILD •</span></div>
          <div className="contact-copy" data-rise><span>04 / DON'T BE A STRANGER</span><h2>GOT A WILD<br/>IDEA? <i>THROW<br/>IT AT ME.</i></h2><p>No corporate theatre. Just good ideas, honest conversations and work that makes people stop scrolling.</p>
            <div className="social-row"><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href={profile.links.github} target="_blank" rel="noreferrer">GITHUB ↗</a>{whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer">WHATSAPP ↗</a>}</div>
          </div>
          <div className="contact-form-shell" data-rise><div className="form-label">TRANSMIT A MESSAGE ↓</div><ContactForm /></div>
        </section>
      </main>

      <footer className="new-footer"><a href="#home" className="footer-logo">MS.</a><p>Built with caffeine, code & questionable amounts of motion.</p><span>© {new Date().getFullYear()} {profile.name}</span></footer>
      {whatsappUrl && <a className="floating-wa" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">WA</a>}
    </div>
  )
}

export default App