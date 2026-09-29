import { Helmet } from 'react-helmet-async'
import { company } from '@/data/company'

type SeoProps = {
  title: string
  description: string
  path: string
}

export function Seo({ title, description, path }: SeoProps) {
  const url = `${company.siteUrl}${path}`

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: company.siteUrl,
    email: company.email,
    sameAs: [company.social.facebook, company.social.linkedin, company.social.instagram],
  }

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={company.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
    </Helmet>
  )
}
