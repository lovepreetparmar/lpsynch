import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSite } from '@/systems/site/SiteContext'

export function useKeyboardShortcuts() {
  const navigate = useNavigate()
  const { triggerLetterform } = useSite()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === 'l' || e.key === 'L') {
        triggerLetterform()
      }
      if (e.key === '?') {
        window.alert(
          'Shortcuts: 1–6 home sections (on homepage), T theme, L Digital Flow easter egg, Cmd/Ctrl+K command palette',
        )
      }
      const map: Record<string, string> = {
        '1': '/',
        '2': '/about',
        '3': '/approach',
        '4': '/services',
        '5': '/people',
        '6': '/contact',
      }
      if (map[e.key]) navigate(map[e.key])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, triggerLetterform])
}
