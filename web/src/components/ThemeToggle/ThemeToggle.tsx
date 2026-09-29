import { useCallback, useEffect, useState } from 'react'

const KEY = 'lpsynch-theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as 'dark' | 'light' | null
    const initial = stored ?? 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      const apply = () => {
        localStorage.setItem(KEY, next)
        document.documentElement.setAttribute('data-theme', next)
      }
      if ('startViewTransition' in document) {
        document.startViewTransition(apply)
      } else {
        apply()
      }
      return next
    })
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
        e.preventDefault()
        toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-3 right-3 z-40 rounded-full border border-border bg-surface-elevated px-3 py-1.5 font-mono text-[10px] text-ink-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  )
}
