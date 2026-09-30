import { useState } from 'react'
import { Container } from '@/components/Container/Container'
import { MotionReveal } from '@/components/motion/Reveal'
import { CraftObjectCanvas } from '@/components/3d/CraftObjectCanvas'

const capabilityWords = [
  { label: 'Web', slug: 'website-development' },
  { label: 'Applications', slug: 'application-development' },
  { label: 'Software', slug: 'custom-software-development' },
  { label: 'Marketing', slug: 'digital-marketing' },
  { label: 'Brand', slug: 'brand-identity' },
  { label: 'Hosting', slug: 'domain-and-hosting-management' },
] as const

export function WhatWeBuildSection() {
  const [activeSlug, setActiveSlug] = useState<string>(capabilityWords[0].slug)

  return (
    <section id="what-we-build" className="border-b border-border-subtle bg-surface py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <MotionReveal className="lg:col-span-6">
          <p className="font-mono text-xs tracking-[0.35em] text-ink-subtle uppercase">What we build</p>
          <h2 className="mt-6 text-4xl font-semibold uppercase leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
            Digital
            <span className="block text-accent">craft</span>
            for people
            <span className="block text-ink-muted">and business.</span>
          </h2>
          <p className="mt-8 max-w-lg text-ink-muted">
            We design and build web platforms, applications, and software systems — using verified LPSynch service
            lines, not invented product claims.
          </p>
          <ul className="mt-10 flex flex-wrap gap-3">
            {capabilityWords.map((word) => (
              <li key={word.slug}>
                <button
                  type="button"
                  className={`rounded-full border px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors ${
                    activeSlug === word.slug
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border text-ink-muted hover:border-ink-subtle hover:text-ink'
                  }`}
                  onMouseEnter={() => setActiveSlug(word.slug)}
                  onFocus={() => setActiveSlug(word.slug)}
                >
                  {word.label}
                </button>
              </li>
            ))}
          </ul>
        </MotionReveal>
        <MotionReveal className="lg:col-span-6" delay={0.08}>
          <CraftObjectCanvas mode="service" serviceSlug={activeSlug} heightClass="h-[min(50vh,420px)] w-full" />
        </MotionReveal>
      </Container>
    </section>
  )
}
