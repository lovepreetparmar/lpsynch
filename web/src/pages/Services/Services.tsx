import { Seo } from '@/components/Seo/Seo'
import { Container } from '@/components/Container/Container'
import { EditorialPageHero } from '@/components/layout/EditorialPageHero'
import { ServicesSection } from '@/sections/Services/ServicesSection'

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Our Services — LPSynch"
        description="Digital marketing, website development, application development, custom software, brand identity, and domain hosting management."
        path="/services"
      />
      <Container>
        <EditorialPageHero
          label="Services"
          title="We design and build digital products."
          supporting="Six verified service lines from LPSynch — web, applications, software, marketing, brand, and hosting."
        />
      </Container>
      <ServicesSection hideHeader />
    </>
  )
}
