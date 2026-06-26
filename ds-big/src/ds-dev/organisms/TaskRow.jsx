import Flag        from '../atoms/Flag.jsx'
import ErrorBanner from '../atoms/ErrorBanner.jsx'
import Btn         from '../atoms/Btn.jsx'

export default function TaskRow({
  property1     = 'Default',
  title         = 'Define role requirements and job description',
  showError     = true,
  showBtn       = true,
  btnLabel      = 'job description',
  noBorderBottom = false,
  flagScheme    = 'default',
  width         = 692,
}) {
  const isDone    = property1 === 'Variant2'
  const textColor = isDone ? 'var(--text-primary)' : 'var(--text-secondary)'

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-14)',
      paddingTop: 'var(--space-14)',
      paddingBottom: 'var(--space-14)',
      borderBottom: noBorderBottom ? 'none' : '1px solid var(--border-default)',
      width,
    }}>
      <Flag active={!isDone} colorScheme={flagScheme} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-start',
      }}>
        <p style={{
          fontFamily: 'var(--font-family-grotesk)',
          fontSize: 'var(--font-size-20)',
          fontWeight: 'var(--font-weight-400)',
          letterSpacing: '-0.4px',
          color: textColor,
          whiteSpace: 'nowrap',
        }}>{title}</p>

        {showError && (
          <ErrorBanner text="some field need your attention" />
        )}
        {showBtn && (
          <Btn type="secondary" label={btnLabel} />
        )}
      </div>
    </div>
  )
}
