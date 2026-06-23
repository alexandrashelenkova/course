const DEFAULT_TAGS = ['React', 'Node.js', 'MongoDB', 'WebSocket']

export default function ProjectPreview({
  text = 'Full-stack e-commerce solution with React frontend and Node.js backend',
  tags = DEFAULT_TAGS,
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
    }}>
      <p style={{
        fontFamily: 'var(--font-family-grotesk)',
        fontSize: 'var(--font-size-20)',
        fontWeight: 'var(--font-weight-400)',
        letterSpacing: '-0.4px',
        color: 'var(--text-primary)',
        maxWidth: 419,
      }}>{text}</p>
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
        {tags.map((tag, i) => (
          <div key={i} style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 32,
            padding: 'var(--space-8)',
            borderRadius: 'var(--radius-4)',
            backgroundColor: 'var(--surface-card-on-card-yellow)',
          }}>
            <span className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
              style={{ color: 'var(--text-primary)' }}>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
