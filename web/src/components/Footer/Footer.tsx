import { Link } from 'react-router-dom'
import { company } from '@/data/company'
import { servicesContent } from '@/data/services'
import { mainNav } from '@/data/navigation'
import { Container } from '@/components/Container/Container'
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border-subtle bg-surface-elevated py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden />
      <Container className="relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img src="/logo.png" alt="LPSynch" className="mb-4 h-8 w-auto" />
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">{company.footerDescription}</p>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs tracking-widest text-ink-subtle uppercase">Our Services</p>
            <ul className="space-y-2">
              {servicesContent.items.map((service) => (
                <li key={service.slug}>
                  <Link to="/services" className="text-sm text-ink-muted hover:text-ink">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-xs tracking-widest text-ink-subtle uppercase">Useful Links</p>
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-ink-muted hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 mb-2 font-mono text-xs tracking-widest text-ink-subtle uppercase">Contact Info</p>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-accent">{company.email}</a>
              </li>
              <li>
                <a href={company.social.facebook} rel="noopener noreferrer" target="_blank" className="hover:text-ink">
                  Facebook
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
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-border-subtle pt-8 text-center text-xs text-ink-subtle">
          Copyright © {year} {company.name}. All rights reserved. · Press ? for shortcuts
        </p>
      </Container>
    </footer>
  )
}
