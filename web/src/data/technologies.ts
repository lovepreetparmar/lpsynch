export type TechnologyNode = {
  id: string
  label: string
  category: string
  detail: string
  connections: string[]
}

export const technologiesContent = {
  eyebrow: 'Tools / Technology',
  heading: 'The tools',
  subheading: 'Technologies we use to design, build and ship digital products.',
  nodes: [
    {
      id: 'react',
      label: 'React',
      category: 'Frontend / Interface',
      detail: 'Modern interfaces and design systems for the web.',
      connections: ['typescript', 'node'],
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      category: 'Language / Types',
      detail: 'Typed application code for maintainable products.',
      connections: ['react', 'node'],
    },
    {
      id: 'php',
      label: 'PHP',
      category: 'Server / Application',
      detail: 'Server-side web applications and integrations.',
      connections: ['mysql'],
    },
    {
      id: 'dotnet',
      label: '.NET',
      category: 'Enterprise / Application',
      detail: 'Enterprise application development.',
      connections: ['azure'],
    },
    {
      id: 'node',
      label: 'Node.js',
      category: 'Runtime / API',
      detail: 'APIs, tooling, and full-stack JavaScript services.',
      connections: ['react', 'typescript'],
    },
    {
      id: 'mysql',
      label: 'MySQL',
      category: 'Data / Storage',
      detail: 'Relational data storage for web platforms.',
      connections: ['php'],
    },
    {
      id: 'azure',
      label: 'Azure',
      category: 'Infrastructure / Cloud',
      detail: 'Cloud hosting and backend services.',
      connections: ['dotnet'],
    },
  ] satisfies TechnologyNode[],
} as const
