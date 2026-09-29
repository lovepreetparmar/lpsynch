import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/Home/Home'

const AboutPage = lazy(() => import('@/pages/About/About').then((m) => ({ default: m.AboutPage })))
const ApproachPage = lazy(() => import('@/pages/Approach/Approach').then((m) => ({ default: m.ApproachPage })))
const ServicesPage = lazy(() => import('@/pages/Services/Services').then((m) => ({ default: m.ServicesPage })))
const PeoplePage = lazy(() => import('@/pages/People/People').then((m) => ({ default: m.PeoplePage })))
const ContactPage = lazy(() => import('@/pages/Contact/Contact').then((m) => ({ default: m.ContactPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound').then((m) => ({ default: m.NotFoundPage })))

function PageFallback() {
  return <div className="flex min-h-[40vh] items-center justify-center text-ink-muted">Loading…</div>
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="approach" element={<ApproachPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
