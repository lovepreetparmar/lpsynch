import { Seo } from '@/components/Seo/Seo'
import { Hero } from '@/sections/Hero/Hero'
import { AboutSection } from '@/sections/About/AboutSection'
import { ApproachSection } from '@/sections/Approach/ApproachSection'
import { ServicesSection } from '@/sections/Services/ServicesSection'
import { PeopleSection } from '@/sections/People/PeopleSection'
import { ContactCTA } from '@/sections/Contact/ContactCTA'
import { ServiceMarquee } from '@/components/ServiceMarquee/ServiceMarquee'

export function HomePage() {
  return (
    <>
      <Seo
        title="LPSynch"
        description="LPSynch delivers web design, development, and software solutions to elevate your business with cutting-edge technology."
        path="/"
      />
      <Hero />
      <AboutSection />
      <ServiceMarquee />
      <ApproachSection />
      <ServicesSection />
      <PeopleSection />
      <ContactCTA />
    </>
  )
}
