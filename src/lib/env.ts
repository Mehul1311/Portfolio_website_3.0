export function getApiBaseUrl() {

  return (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8080'

}



/** E.164 digits only, no plus — e.g. 9198XXXXXXXX for India. Opens WhatsApp chat on tap. */

export function getWhatsAppUrl(): string | null {

  const raw = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.trim()

  if (!raw) return null

  const digits = raw.replace(/\D/g, '')

  if (digits.length < 10) return null

  return `https://wa.me/${digits}`

}


