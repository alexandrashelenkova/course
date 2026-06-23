/* Two-column bar chart. bars = array of numbers (0–100 = percent of maxHeight).
   Figma default: [100, 58] — two bars, taller first. */

export default function Graph({ bars = [100, 58], maxHeight = 82 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'var(--space-2)',
        height: maxHeight,
        width: 143,
      }}
    >
      {bars.map((pct, i) => (
        <div
          key={i}
          style={{
            flex: '1 0 0',
            minWidth: 1,
            height: `${Math.max(0, Math.min(100, pct))}%`,
            backgroundColor: 'var(--text-secondary)',
            borderRadius: 'var(--radius-4)',
            mixBlendMode: 'multiply',
          }}
        />
      ))}
    </div>
  )
}
