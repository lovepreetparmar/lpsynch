type SectionHeadingProps = {
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ title, description, align = 'left' }: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'

  return (
    <div className={`mb-12 md:mb-16 ${alignClass}`}>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg text-ink-muted text-pretty">{description}</p>
      ) : null}
    </div>
  )
}
