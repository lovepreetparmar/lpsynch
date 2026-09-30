import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/Button/Button'
import { submitContactForm } from '@/lib/contact'

const schema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().optional(),
  number: z.string().optional(),
  message: z.string().min(1, 'Please enter a message.'),
})

type FormValues = z.infer<typeof schema>

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', subject: '', number: '', message: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    setStatus('loading')
    setStatusMessage('')
    try {
      const message = await submitContactForm({
        name: values.name,
        email: values.email,
        subject: values.subject ?? '',
        number: values.number ?? '',
        message: values.message,
      })
      setStatus('success')
      setStatusMessage(message || 'Thanks! Your message has been sent successfully.')
      reset()
    } catch {
      setStatus('error')
      setStatusMessage('Something went wrong. Please try again or email us directly.')
    }
  })

  const inputClass =
    'w-full border-0 border-b border-border bg-transparent px-0 py-3 text-ink placeholder:text-ink-subtle transition-colors focus-visible:border-accent focus-visible:outline-none focus-visible:ring-0'

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink-muted">Name</label>
          <input id="name" className={inputClass} autoComplete="name" {...register('name')} />
          {errors.name ? <p className="mt-1 text-sm text-red-400" role="alert">{errors.name.message}</p> : null}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink-muted">Email</label>
          <input id="email" type="email" className={inputClass} autoComplete="email" {...register('email')} />
          {errors.email ? <p className="mt-1 text-sm text-red-400" role="alert">{errors.email.message}</p> : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="subject" className="mb-2 block text-sm font-medium text-ink-muted">Subject</label>
          <input id="subject" className={inputClass} {...register('subject')} />
        </div>
        <div>
          <label htmlFor="number" className="mb-2 block text-sm font-medium text-ink-muted">Phone (optional)</label>
          <input id="number" type="tel" className={inputClass} autoComplete="tel" {...register('number')} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink-muted">Message</label>
        <textarea id="message" rows={5} className={`${inputClass} resize-y min-h-[120px]`} {...register('message')} />
        {errors.message ? <p className="mt-1 text-sm text-red-400" role="alert">{errors.message.message}</p> : null}
      </div>
      <Button type="submit" disabled={status === 'loading'} className="mt-2 w-full sm:w-auto">
        {status === 'loading' ? 'Sending…' : status === 'success' ? 'Message sent ✓' : 'Send message →'}
      </Button>
      {statusMessage ? (
        <p
          className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-accent'}`}
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  )
}
