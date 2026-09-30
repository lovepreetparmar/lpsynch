import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/Footer/Footer'
import { SiteProvider, useSite } from '@/systems/site/SiteContext'
import { SectionObserver } from '@/components/SectionObserver/SectionObserver'
import { SynchLoader } from '@/components/SynchLoader/SynchLoader'
import { CustomCursor, type CursorLabel } from '@/components/motion/CustomCursor'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { PageTransition } from '@/components/layout/PageTransition'
import { SmoothScrollProvider } from '@/systems/scroll/SmoothScrollProvider'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

function LayoutShell() {
  const location = useLocation()
  const { setSiteState } = useSite()
  const [cursorLabel, setCursorLabel] = useState<CursorLabel>('default')
  useKeyboardShortcuts()

  useEffect(() => {
    if (location.pathname !== '/') setSiteState('home')
  }, [location.pathname, setSiteState])

  return (
    <SmoothScrollProvider>
      <div className="flex min-h-screen flex-col">
        <SynchLoader />
        <SectionObserver />
        <ScrollProgress />
        <CustomCursor label={cursorLabel} />
        <Header />
        <main
          className="flex-1"
          onMouseOver={(e) => {
            const t = e.target as HTMLElement
            if (t.closest('[data-cursor-explore]')) setCursorLabel('explore')
            else if (t.closest('[data-cursor-open]')) setCursorLabel('open')
            else if (t.closest('[data-cursor-view]')) setCursorLabel('view')
            else if (t.closest('a, button')) setCursorLabel('link')
            else setCursorLabel('default')
          }}
        >
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}

export function MainLayout() {
  return (
    <SiteProvider>
      <LayoutShell />
    </SiteProvider>
  )
}
