import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { SiteState } from '@/systems/site/site.types'

type SiteContextValue = {
  siteState: SiteState
  setSiteState: (state: SiteState) => void
  activeServiceId: string | null
  setActiveServiceId: (id: string | null) => void
  activePersonId: string | null
  setActivePersonId: (id: string | null) => void
  sectionPulse: number
  triggerSectionPulse: () => void
  letterformProgress: number
  triggerLetterform: () => void
}

const SiteContext = createContext<SiteContextValue | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [siteState, setSiteState] = useState<SiteState>('home')
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null)
  const [activePersonId, setActivePersonId] = useState<string | null>('Lovepreet Parmar')
  const [sectionPulse, setSectionPulse] = useState(0)
  const [letterformProgress, setLetterformProgress] = useState(0)

  const triggerSectionPulse = useCallback(() => {
    setSectionPulse((p) => p + 1)
  }, [])

  const triggerLetterform = useCallback(() => {
    setLetterformProgress(1)
    window.setTimeout(() => setLetterformProgress(0), 1200)
  }, [])

  const value = useMemo(
    () => ({
      siteState,
      setSiteState,
      activeServiceId,
      setActiveServiceId,
      activePersonId,
      setActivePersonId,
      sectionPulse,
      triggerSectionPulse,
      letterformProgress,
      triggerLetterform,
    }),
    [
      siteState,
      activeServiceId,
      activePersonId,
      sectionPulse,
      triggerSectionPulse,
      letterformProgress,
      triggerLetterform,
    ],
  )

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
