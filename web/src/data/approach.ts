/** Source: index.php #work — Our Approach */
export type ApproachStep = {
  number: string
  title: string
  description: string
}

export const approachContent = {
  heading: 'Our Approach',
  subheading: 'We are here to support your business success with our 3-step approach.',
  sectionLabel: 'How we work',
  steps: [
    {
      number: '01',
      title: 'Understanding Business Requirements',
      description:
        'Identifying and Assessing your unique business requirements to tailor the advanced solutions with increased productivity and efficiency',
    },
    {
      number: '02',
      title: 'Implementing Advanced Solutions',
      description:
        'Unlocking modern digital strategies, deploying cutting-edge technologies, and ensuring seamless integrations to cater your business requirements',
    },
    {
      number: '03',
      title: 'Ensuring Sustained Success',
      description:
        'Turning your business vision into reality by ensuring unified solutions tailored with constantly evolving technologies and digital support',
    },
  ] satisfies ApproachStep[],
} as const
