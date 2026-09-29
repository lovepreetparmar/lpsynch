import { Seo } from '@/components/Seo/Seo'
import { PageHeader } from '@/components/PageHeader/PageHeader'
import { Container } from '@/components/Container/Container'
import { ServicesSection } from '@/sections/Services/ServicesSection'
import { servicesContent } from '@/data/services'

export function ServicesPage() {
  return (
    <>
      <Seo
        title="Our Services — LPSynch"
        description="Digital marketing, website development, application development, custom software, brand identity, and domain hosting management."
        path="/services"
      />
      <Container>
        <PageHeader title={servicesContent.heading} />
      </Container>
      <ServicesSection hideHeader />
    </>
  )
}
