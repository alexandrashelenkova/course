export default function ComingSoonPage({ section }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ padding: 'var(--space-90)' }}
    >
      <h1 className="text-h3 text-[var(--text-primary)]">{section}</h1>
      <p
        className="text-text-grotesk text-[var(--text-secondary)]"
        style={{ marginTop: 'var(--space-8)' }}
      >
        Coming soon — work in progress.
      </p>
    </div>
  )
}
