import { getApiBaseUrl } from './env'

export type ContactPayload = {
  name: string
  email: string
  message: string
}

export type ContactResponse = {
  ok?: boolean
  id?: string
  emailSent?: boolean
  savedToDb?: boolean
  emailError?: string
  error?: string
}

export async function healthCheck() {
  const base = getApiBaseUrl().replace(/\/$/, '')
  const res = await fetch(`${base}/api/health`)
  if (!res.ok) throw new Error('API health check failed')
  return (await res.json()) as unknown
}

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const base = getApiBaseUrl().replace(/\/$/, '')
  let res: Response
  try {
    res = await fetch(`${base}/api/contact`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      'Network error — backend reach nahi ho raha. API chalu rakho aur frontend/.env mein VITE_API_URL sahi likho (jaise http://localhost:8080 ya apna deployed API URL).'
    )
  }

  const text = await res.text()
  let data: ContactResponse = {}
  if (text) {
    try {
      data = JSON.parse(text) as ContactResponse
    } catch {
      throw new Error('Server se valid JSON nahi aaya.')
    }
  }

  if (!res.ok) {
    const msg =
      typeof data.error === 'string'
        ? data.error
        : res.status === 503
          ? 'Server configure nahi hai — backend/.env mein MongoDB ya email (SMTP) add karo.'
          : 'Request failed'
    throw new Error(msg)
  }

  return data
}
