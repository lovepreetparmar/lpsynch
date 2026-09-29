const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT ?? '/mail.php'

export type ContactPayload = {
  name: string
  email: string
  subject: string
  number: string
  message: string
}

export async function submitContactForm(payload: ContactPayload): Promise<string> {
  const body = new URLSearchParams({
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    number: payload.number,
    message: payload.message,
  })

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body,
  })

  const text = await response.text()

  if (!response.ok) {
    throw new Error(text || 'Request failed')
  }

  return text
}
