import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const STORAGE_KEY = 'lpsynch-loader-seen'

export function SynchLoader() {
  const [show, setShow] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    setShow(true)
    const t = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setShow(false)
    }, reduced ? 400 : 1500)
    return () => clearTimeout(t)
  }, [reduced])

  if (!show) return null

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-surface"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: reduced ? 0.2 : 1.2, duration: 0.35 }}
      role="status"
      aria-label="Loading LPSynch"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-8">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="h-2 w-2 rounded-full bg-accent/60 animate-pulse [animation-delay:150ms]" />
        </div>
        <img src="/logo.png" alt="LPSynch" className="h-10 w-auto opacity-90" />
        <button
          type="button"
          className="text-xs text-ink-subtle underline focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => {
            sessionStorage.setItem(STORAGE_KEY, '1')
            setShow(false)
          }}
        >
          Skip
        </button>
      </div>
    </motion.div>
  )
}
