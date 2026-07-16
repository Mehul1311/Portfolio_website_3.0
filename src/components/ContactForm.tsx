import { useMemo, useState } from 'react'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const disabled = status === 'sending'
  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && email.trim().length >= 5 && message.trim().length >= 10
  }, [name, email, message])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit || disabled) return
    setStatus('sending')
    setError(null)
    
    try {
      // Simulate network delay for UX
      await new Promise((resolve) => setTimeout(resolve, 800))

      const waText = encodeURIComponent(
        `*New Message from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`
      )

      // Open WhatsApp in a new tab
      window.open(`https://wa.me/919057902949?text=${waText}`, '_blank')

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')

      // Reset after a few seconds
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.75rem] border border-[var(--stroke)] bg-[var(--surface)] p-6 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.5)] md:p-8"
    >
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm text-[var(--muted)]">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-h-[44px] rounded-2xl border border-[var(--stroke)] bg-[var(--bg0)]/80 px-4 py-2.5 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]/40 sm:text-sm"
            placeholder="Your name"
            disabled={disabled}
            autoComplete="name"
            inputMode="text"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--muted)]">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-h-[44px] rounded-2xl border border-[var(--stroke)] bg-[var(--bg0)]/80 px-4 py-2.5 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]/40 sm:text-sm"
            placeholder="you@example.com"
            disabled={disabled}
            autoComplete="email"
            inputMode="email"
          />
        </label>

        <label className="grid gap-2 text-sm text-[var(--muted)]">
          Message
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-28 resize-y rounded-2xl border border-[var(--stroke)] bg-[var(--bg0)]/80 px-4 py-2.5 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]/40 sm:text-sm"
            placeholder="Tell me about your project…"
            disabled={disabled}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="submit"
          disabled={!canSubmit || disabled}
          className="min-h-[44px] rounded-full border border-[#25D366]/30 bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-[0_16px_48px_-12px_rgba(37,211,102,0.4)] transition hover:bg-[#22c35e] disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-2"
        >
          {status === 'sending' ? (
            'Opening WhatsApp…'
          ) : status === 'sent' ? (
            'Sent!'
          ) : (
            <>
              Send via WhatsApp
              <span className="text-black/60">↗</span>
            </>
          )}
        </button>

        <div className="text-xs text-[var(--muted)]">
          {status === 'sent'
            ? 'Thank you! I will get back to you soon.'
            : 'Usually replies within 24 hours.'}
        </div>
      </div>

      {status === 'error' && error ? (
        <p className="mt-4 text-sm leading-relaxed text-red-300/90">{error}</p>
      ) : null}

      {status === 'sent' ? (
        <p className="mt-4 text-xs leading-relaxed text-[#25D366]/90">
          ✓ WhatsApp opened successfully.
        </p>
      ) : null}
    </form>
  )
}
