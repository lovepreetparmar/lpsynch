import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navigation } from '@/components/layout/Navigation'
import { Container } from '@/components/Container/Container'

import { LPSynchLogo } from '@/components/brand/LPSynchLogo'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] border-b border-border-subtle/40 bg-surface/60 backdrop-blur-md">
        <Container as="div" className="flex h-20 items-center justify-between">
          <Link
            to="/"
            aria-label="LPSynch home"
            className="inline-flex shrink-0 items-center py-1 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <LPSynchLogo variant="monogram" theme="dark" size="md" className="sm:hidden" />
            <LPSynchLogo variant="full" theme="dark" size="md" showTagline={false} className="hidden sm:block" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="font-mono text-xs tracking-[0.35em] text-ink uppercase focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
          >
            Menu
          </button>
        </Container>
      </header>
      <Navigation open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
