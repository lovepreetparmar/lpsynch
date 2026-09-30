import { Link } from 'react-router-dom'
import { company } from '@/data/company'
import { mainNav } from '@/data/navigation'
import { LPSynchLogo } from '@/components/brand/LPSynchLogo'
import { Container } from '@/components/Container/Container'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border-subtle bg-surface-elevated py-16 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden />
      <Container>
        <div className="flex flex-col items-center border-b border-border-subtle pb-12 text-center">
          <Link to="/" aria-label="LPSynch home" className="inline-flex px-2 py-1">
            <LPSynchLogo variant="full" theme="dark" size="lg" showTagline />
          </Link>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">{company.footerDescription}</p>
          <div>
            <p className="font-mono text-xs tracking-widest text-ink-subtle uppercase">Navigation</p>
            <ul className="mt-4 space-y-2">
              {mainNav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-ink-muted hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-ink-subtle uppercase">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-accent">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.social.linkedin} rel="noopener noreferrer" target="_blank" className="hover:text-ink">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={company.social.instagram} rel="noopener noreferrer" target="_blank" className="hover:text-ink">
                  Instagram
                </a>
              </li>
              <li>
                <a href={company.social.facebook} rel="noopener noreferrer" target="_blank" className="hover:text-ink">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-center text-xs text-ink-subtle">
          Copyright © {year} {company.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
