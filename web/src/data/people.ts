/** Source: index.php #team — Our People */
export type Person = {
  number: string
  name: string
  role: string
  image: string
  instagram?: string
}

export const peopleContent = {
  heading: 'Our People',
  introTitle:
    'Meet the collaborative minds behind success: Our Team crafting innovative web solutions tailored to elevate your business',
  introBody:
    "Our diverse team of expert developers, designers, and strategists collaborate to bring your vision to life. With a passion for innovation and expertise in web development, we work together to craft tailored solutions for your business's success.",
  sectionLabel: 'Our People',
  members: [
    {
      number: '01',
      name: 'Lovepreet Parmar',
      role: 'Founder & Senior Software Developer',
      image: '/legacy-team/15.jpg',
      instagram: 'https://www.instagram.com/lovepreetparmarr/',
    },
    {
      number: '02',
      name: 'Rajat Rana',
      role: 'Senior .Net Developer',
      image: '/legacy-team/16.jpg',
      instagram: 'https://www.instagram.com/rajatrana05/',
    },
    {
      number: '03',
      name: 'Vasu Sharma',
      role: 'Senior Software Developer',
      image: '/legacy-team/18.jpg',
      instagram: 'https://www.instagram.com/iam_vasu/',
    },
    {
      number: '04',
      name: 'Ketan Kapania',
      role: 'Senior Business Analyst',
      image: '/legacy-team/17.jpg',
      instagram: 'https://www.instagram.com/ketankapania/',
    },
    {
      number: '05',
      name: 'Bhanu Pratap',
      role: 'Senior Project Manager',
      image: '/legacy-team/40.png',
      instagram: 'https://www.instagram.com/_0bliviate___/',
    },
  ] satisfies Person[],
} as const
