import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { mainNav } from '@/data/navigation'
import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container/Container'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-subtle bg-surface/90 backdrop-blur-md">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <img src="/logo.png" alt="LPSynch" className="h-8 w-auto" width={172} height={36} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {mainNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact" variant="primary" className="!py-2.5 !px-5 text-sm">
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink lg:hidden focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open ? (
        <div className="fixed inset-0 top-16 z-40 bg-surface lg:hidden">
          <Container className="flex flex-col gap-6 py-8">
            <nav className="flex flex-col gap-4" aria-label="Mobile">
              {mainNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-2xl font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button to="/contact" onClick={() => setOpen(false)}>Let&apos;s Talk</Button>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
