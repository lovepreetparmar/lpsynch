import { Seo } from '@/components/Seo/Seo'
import { PageHeader } from '@/components/PageHeader/PageHeader'
import { Container } from '@/components/Container/Container'
import { PeopleSection } from '@/sections/People/PeopleSection'
import { peopleContent } from '@/data/people'

export function PeoplePage() {
  return (
    <>
      <Seo title="Our People — LPSynch" description={peopleContent.introBody.slice(0, 155)} path="/people" />
      <Container>
        <PageHeader title={peopleContent.heading} subtitle={peopleContent.introTitle} />
      </Container>
      <PeopleSection hideHeader />
    </>
  )
}
