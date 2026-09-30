import { Seo } from '@/components/Seo/Seo'
import { Hero } from '@/sections/Hero/Hero'
import { ServicesSection } from '@/sections/Services/ServicesSection'
import { WorkSection } from '@/sections/Work/WorkSection'
import { AboutSection } from '@/sections/About/AboutSection'
import { TechnologiesSection } from '@/sections/Technologies/TechnologiesSection'
import { PeopleSection } from '@/sections/People/PeopleSection'
import { ContactCTA } from '@/sections/Contact/ContactCTA'

export function HomePage() {
  return (
    <>
      <Seo
        title="LPSynch"
        description="LPSynch delivers web design, development, and software solutions to elevate your business with cutting-edge technology."
        path="/"
      />
      <Hero />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <TechnologiesSection />
      <PeopleSection />
      <ContactCTA />
    </>
  )
}
