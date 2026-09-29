import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar/Navbar'
import { Footer } from '@/components/Footer/Footer'
import { SiteProvider, useSite } from '@/systems/site/SiteContext'
import { SectionObserver } from '@/components/SectionObserver/SectionObserver'
import { SynchLoader } from '@/components/SynchLoader/SynchLoader'
import { CommandPalette } from '@/components/CommandPalette/CommandPalette'
import { FlowSpine } from '@/components/FlowSpine/FlowSpine'
import { MetadataStrip } from '@/components/MetadataStrip/MetadataStrip'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { CursorSystem } from '@/systems/cursor/CursorSystem'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'

function LayoutShell() {
  const location = useLocation()
  const { setSiteState } = useSite()
  const [cursorMode, setCursorMode] = useState<'default' | 'link' | 'view' | 'flow'>('default')
  useKeyboardShortcuts()

  useEffect(() => {
    if (location.pathname !== '/') setSiteState('home')
  }, [location.pathname, setSiteState])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--spot-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--spot-y', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SynchLoader />
      <CommandPalette />
      <SectionObserver />
      <FlowSpine />
      <MetadataStrip />
      <ThemeToggle />
      <CursorSystem mode={cursorMode} />
      <Navbar />
      <main className="flex-1" onMouseOver={(e) => {
        const t = e.target as HTMLElement
        if (t.closest('[data-cursor-view]')) setCursorMode('view')
        else if (t.closest('a')) setCursorMode('link')
        else setCursorMode('default')
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <p className="sr-only">
        Keyboard: 1–6 navigate, T theme, L Digital Flow, Cmd/Ctrl+K palette, ? help
      </p>
    </div>
  )
}

export function MainLayout() {
  return (
    <SiteProvider>
      <LayoutShell />
    </SiteProvider>
  )
}
