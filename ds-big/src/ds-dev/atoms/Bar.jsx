/* Dotted progress bar.
   Figma renders 200 individual dots; we use CSS radial-gradient — same visual,
   no DOM nodes. size=default → 5px dots; size=big → 12px dots. */

export default function Bar({ size = 'default', value = 75 }) {
  const dot  = size === 'big' ? 12 : 5
  const gap  = 2
  const cell = dot + gap  // period: 7px or 14px

  const dotStyle = (colorVar) => ({
    flex: 1,
    height: dot,
    backgroundImage: `radial-gradient(circle, ${colorVar} ${dot / 2}px, transparent ${dot / 2}px)`,
    backgroundSize: `${cell}px ${dot}px`,
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'left center',
  })

  const pct = Math.max(0, Math.min(100, value))

  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ display: 'flex', width: '100%', height: dot }}
    >
      {pct > 0 && (
        <div style={{ width: `${pct}%`, ...dotStyle('var(--bar-on-base-filled)') }} />
      )}
      {pct < 100 && (
        <div style={{ flex: 1, ...dotStyle('var(--bar-on-base-empty)') }} />
      )}
    </div>
  )
}
