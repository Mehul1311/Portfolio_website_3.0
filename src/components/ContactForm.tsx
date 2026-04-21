import { useMemo, useState } from 'react'
import { submitContact } from '../lib/api'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [savedToDb, setSavedToDb] = useState(false)

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
    setSavedId(null)
    setEmailSent(false)
    setSavedToDb(false)
    try {
      const res = await submitContact({ name, email, message })
      setStatus('sent')
      setSavedId(typeof res.id === 'string' ? res.id : null)
      setEmailSent(res.emailSent === true)
      setSavedToDb(res.savedToDb === true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
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
          className="min-h-[44px] rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-[0_16px_48px_-12px_rgba(255,255,255,0.2)] transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send message'}
        </button>

        <div className="text-xs text-[var(--muted)]">
          {status === 'sent'
            ? emailSent
              ? 'Email received — I’ll reply soon.'
              : savedToDb
                ? 'Message saved — I’ll reply soon.'
                : 'Done.'
            : 'Usually replies within 24 hours.'}
        </div>
      </div>

      {status === 'error' && error ? (
        <p className="mt-4 text-sm leading-relaxed text-red-300/90">{error}</p>
      ) : null}

      {status === 'sent' && savedId ? (
        <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">
          {emailSent && <span className="text-emerald-400/90">✓ Email sent to inbox. </span>}
          {savedToDb && (
            <span>
              Reference: <span className="text-[var(--text)]">{savedId}</span>
            </span>
          )}
          {!emailSent && savedToDb && <span className="text-[var(--muted)]"> (stored securely)</span>}
        </p>
      ) : null}
    </form>
  )
}
