/** Source: index.php #services — six services only */
export type ServiceItem = {
  number: string
  slug: string
  title: string
  description: string
  /** Related tooling / capability tags — not client claims */
  technologies: readonly string[]
}

export const servicesContent = {
  heading: 'Our services',
  sectionLabel: 'Our Services',
  items: [
    {
      number: '01',
      slug: 'digital-marketing',
      title: 'Digital Marketing',
      description:
        'Cultivate brand success with our tailored, high-impact digital marketing services and strategies for your unique business growth.',
      technologies: ['Content', 'Analytics', 'SEO', 'Social'],
    },
    {
      number: '02',
      slug: 'website-development',
      title: 'Website Development',
      description:
        'Crafting responsive, dynamic websites that elevate your online presence and drive business growth through our seamless development services.',
      technologies: ['React', 'TypeScript', 'PHP', 'APIs'],
    },
    {
      number: '03',
      slug: 'application-development',
      title: 'Application Development',
      description:
        'Transforming ideas into powerful, user-centric applications with our development services and seamless functionality for success.',
      technologies: ['Mobile', 'React', 'APIs', 'UX'],
    },
    {
      number: '04',
      slug: 'custom-software-development',
      title: 'Custom Software Development',
      description:
        'Tailored software solutions to streamline operations, enhance efficiency, and drive business growth through our development services.',
      technologies: ['.NET', 'PHP', 'Integrations', 'Databases'],
    },
    {
      number: '05',
      slug: 'brand-identity',
      title: 'Brand Identity',
      description:
        "Designing captivating logos, websites, and posters that elevate your brand's visual identity through our creative design services.",
      technologies: ['Visual design', 'UI', 'Brand systems', 'Web'],
    },
    {
      number: '06',
      slug: 'domain-and-hosting-management',
      title: 'Domain and Hosting Management',
      description:
        'Efficiently manage domains and hosting for seamless online presence, ensuring reliability through our management services.',
      technologies: ['DNS', 'Hosting', 'SSL', 'Monitoring'],
    },
  ] satisfies ServiceItem[],
} as const
