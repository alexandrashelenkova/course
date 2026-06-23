/* Named ErrorBanner (not Error) to avoid shadowing the JS built-in. */

export default function ErrorBanner({
  text = 'add more money for salary, you dumb ass',
}) {
  return (
    <div
      role="alert"
      className="text-caps whitespace-nowrap"
      style={{
        display: 'flex',
        gap: 'var(--space-14)',
        alignItems: 'flex-start',
        padding: 'var(--space-8)',
        borderRadius: 'var(--radius-4)',
        backgroundColor: 'var(--surface-card-on-card-red)',
        color: 'var(--status-error)',
        letterSpacing: '1.6px',
      }}
    >
      <span>error!</span>
      <span>{text}</span>
    </div>
  )
}
