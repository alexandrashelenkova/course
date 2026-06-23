export default function ExperiencePreview({
  dateRange   = 'Jan 2022 — Present (3 years)',
  title       = 'Senior Frontend Developer',
  company     = 'TechCorp Solutions',
  description = 'Led development of React applications, mentored junior developers, improved performance by 40%',
}) {
  return (
    <div style={{
      borderTop: '1px solid var(--border-default)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-30)',
      paddingTop: 'var(--space-14)',
      paddingBottom: 'var(--space-14)',
      width: 696,
      color: 'var(--text-primary)',
    }}>
      <p className="text-text-pixel tracking-[2px] uppercase"
        style={{ color: 'var(--text-primary)' }}>
        {dateRange}
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-14)',
        fontFamily: 'var(--font-family-grotesk)',
      }}>
        <p style={{
          fontSize: 'var(--font-size-20)',
          fontWeight: 'var(--font-weight-400)',
          letterSpacing: '-0.4px',
          color: 'var(--text-primary)',
        }}>{title}</p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-8)',
          fontSize: 'var(--font-size-11)',
          fontWeight: 'var(--font-weight-400)',
          color: 'var(--text-primary)',
        }}>
          <p>{company}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  )
}
