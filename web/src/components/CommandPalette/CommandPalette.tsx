import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mainNav } from '@/data/navigation'
import { servicesContent } from '@/data/services'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const items = [
    { label: 'Home', path: '/' },
    ...mainNav.map((n) => ({ label: n.label, path: n.path })),
    ...servicesContent.items.map((s) => ({ label: s.title, path: '/services' })),
  ].filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[150] flex items-start justify-center bg-black/60 p-4 pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md border border-border bg-surface-elevated shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to…"
          className="w-full border-b border-border bg-transparent px-4 py-3 text-ink outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        />
        <ul className="max-h-64 overflow-auto py-2">
          {items.map((item) => (
            <li key={item.path + item.label}>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:outline-none"
                onClick={() => {
                  navigate(item.path)
                  setOpen(false)
                  setQuery('')
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
