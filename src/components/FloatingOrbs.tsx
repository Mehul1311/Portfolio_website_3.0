/** Static ambient blurs only — no continuous GSAP (saves CPU). */
export function FloatingOrbs() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 top-16 size-80 rounded-full bg-cyan-500/8 blur-3xl" />
      <div className="absolute right-[-120px] top-32 size-96 rounded-full bg-white/[0.04] blur-3xl" />
      <div className="absolute left-1/3 top-[55%] size-72 rounded-full bg-cyan-400/5 blur-3xl" />
    </div>
  )
}
