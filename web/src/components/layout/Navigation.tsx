import { useEffect, useRef } from 'react'
import { LPSynchLogo } from '@/components/brand/LPSynchLogo'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { mainNav } from '@/data/navigation'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type NavigationProps = {
  open: boolean
  onClose: () => void
}

export function Navigation({ open, onClose }: NavigationProps) {
  const reduced = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!open || reduced || !panelRef.current || !listRef.current) return
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      gsap.fromTo(panelRef.current, { yPercent: -100 }, { yPercent: 0, duration: motion.duration.normal, ease: motion.ease.inOut })
      gsap.from(listRef.current!.children, {
        y: 40,
        opacity: 0,
        stagger: motion.stagger.normal,
        duration: motion.duration.normal,
        ease: motion.ease.cinematic,
        delay: 0.15,
      })
    })
    return () => ctx.revert()
  }, [open, reduced])

  if (!open) return null

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[80] flex flex-col bg-surface"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="flex items-center justify-between border-b border-border-subtle px-6 py-5 md:px-10">
        <Link to="/" onClick={onClose} aria-label="LPSynch home" className="inline-flex py-1">
          <LPSynchLogo variant="full" theme="dark" size="md" showTagline={false} />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-xs tracking-widest text-ink-muted uppercase hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
        >
          Close ×
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-between px-6 py-12 md:px-10 md:py-16">
        <ul ref={listRef} className="space-y-4 md:space-y-6">
          <li>
            <Link
              to="/"
              onClick={onClose}
              className="block text-4xl font-semibold uppercase tracking-tight transition-transform hover:translate-x-2 md:text-6xl"
            >
              Home
            </Link>
          </li>
          {mainNav.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={onClose}
                className="block text-4xl font-semibold uppercase tracking-tight transition-transform hover:translate-x-2 md:text-6xl"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/#work"
              onClick={onClose}
              className="block text-4xl font-semibold uppercase tracking-tight transition-transform hover:translate-x-2 md:text-6xl"
            >
              Work
            </a>
          </li>
        </ul>
        <div className="border-t border-border pt-8">
          <p className="max-w-md font-mono text-xs leading-relaxed tracking-widest text-ink-subtle uppercase">
            Let&apos;s build something interesting.
          </p>
          <Link to="/contact" onClick={onClose} className="mt-4 inline-block text-sm text-accent">
            Start a conversation →
          </Link>
        </div>
      </div>
    </div>
  )
}
