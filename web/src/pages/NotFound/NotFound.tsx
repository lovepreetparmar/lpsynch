import { Section } from '@/components/Section/Section'
import { Button } from '@/components/Button/Button'

export function NotFoundPage() {
  return (
    <Section className="pt-32 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-ink-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Button to="/" className="mt-8">Back to home</Button>
    </Section>
  )
}
