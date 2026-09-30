import { useEffect, useRef, useState } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LPSynchLogo } from '@/components/brand/LPSynchLogo'

const STORAGE_KEY = 'lpsynch-loader-seen'

export function SynchLoader() {
  const [show, setShow] = useState(false)
  const reduced = useReducedMotion()
  const overlayRef = useRef<HTMLDivElement>(null)
  const lockupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    setShow(true)
  }, [])

  useEffect(() => {
    if (!show || !overlayRef.current || !lockupRef.current) return

    if (reduced) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setShow(false)
      return
    }

    ensureGsapPlugins()
    const mono = lockupRef.current.querySelector('[data-loader-mono]')
    const word = lockupRef.current.querySelector('[data-loader-word]')
    const tag = lockupRef.current.querySelector('[data-loader-tag]')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(STORAGE_KEY, '1')
          setShow(false)
        },
      })
      tl.from(overlayRef.current, { opacity: 0, duration: 0.15 })
        .from(mono, { opacity: 0, scale: 0.92, duration: 0.35, ease: motion.ease.cinematic })
        .from(word, { opacity: 0, x: -12, duration: 0.35, ease: motion.ease.cinematic }, '-=0.1')
        .from(tag, { opacity: 0, y: 6, duration: 0.3, ease: motion.ease.smooth }, '-=0.05')
        .to(overlayRef.current, { opacity: 0, duration: 0.35, delay: 0.25, ease: motion.ease.smooth })
    })
    return () => ctx.revert()
  }, [show, reduced])

  if (!show) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-surface"
      role="status"
      aria-label="Loading LPSynch"
    >
      <div ref={lockupRef} className="flex flex-col items-center gap-3 px-6">
        <div data-loader-mono>
          <LPSynchLogo variant="monogram" theme="dark" size="lg" />
        </div>
        <div data-loader-word className="opacity-0">
          <LPSynchLogo variant="full" theme="dark" size="lg" showTagline={false} className="!h-8" />
        </div>
        <p
          data-loader-tag
          className="font-mono text-[9px] tracking-[0.35em] text-ink-subtle uppercase opacity-0"
        >
          BUILD <span className="text-accent">•</span> SYNC <span className="text-accent">•</span> GROW
        </p>
      </div>
      <button
        type="button"
        className="absolute bottom-8 text-xs text-ink-subtle underline focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => {
          sessionStorage.setItem(STORAGE_KEY, '1')
          setShow(false)
        }}
      >
        Skip
      </button>
    </div>
  )
}
