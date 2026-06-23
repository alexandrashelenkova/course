/* Dotted progress bar — whole dots only, no fractional last dot.
   ResizeObserver measures container width → totalDots = floor(w / DOT_CELL).
   filledDots = round(value/100 * total). Two segments: filled + empty.
   default: single row of 5px dots (h=5). big: two rows (h=12, per Figma 357:34112).
   colorFilled / colorEmpty override the per-token defaults (used by Team molecule). */

import { useRef, useState, useEffect } from 'react'

const DOT_CELL = 7   // 5px dot + 2px gap

export default function Bar({
  size        = 'default',
  value       = 75,
  colorFilled,
  colorEmpty,
}) {
  const isBig  = size === 'big'
  const height = isBig ? 12 : 5
  const pct    = Math.max(0, Math.min(100, value))
  const fill   = colorFilled ?? 'var(--bar-on-base-filled)'
  const empty  = colorEmpty  ?? 'var(--bar-on-base-empty)'

  const ref = useRef(null)
  const [totalDots, setTotalDots] = useState(60)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const w = el.offsetWidth
      if (w > 0) setTotalDots(Math.max(1, Math.floor(w / DOT_CELL)))
    }
    measure()
    const obs = new ResizeObserver(measure)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const filledDots = Math.round(pct / 100 * totalDots)
  const emptyDots  = totalDots - filledDots

  const dotStyle = (color, count) => {
    const w = count * DOT_CELL
    if (isBig) {
      return {
        width: w, height, flexShrink: 0,
        backgroundImage: [
          `radial-gradient(circle at 2.5px 2.5px, ${color} 2.5px, transparent 2.5px)`,
          `radial-gradient(circle at 2.5px 9.5px, ${color} 2.5px, transparent 2.5px)`,
        ].join(', '),
        backgroundSize: `${DOT_CELL}px ${height}px`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'left top',
      }
    }
    return {
      width: w, height, flexShrink: 0,
      backgroundImage: `radial-gradient(circle, ${color} 2.5px, transparent 2.5px)`,
      backgroundSize: `${DOT_CELL}px ${height}px`,
      backgroundRepeat: 'repeat-x',
      backgroundPosition: 'left center',
    }
  }

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ display: 'flex', width: '100%', height, overflow: 'hidden' }}
    >
      {filledDots > 0 && <div style={dotStyle(fill,  filledDots)} />}
      {emptyDots  > 0 && <div style={dotStyle(empty, emptyDots)}  />}
    </div>
  )
}
