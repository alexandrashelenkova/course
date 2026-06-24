import { useState, useEffect, useRef } from 'react'
import Icons from './Icons.jsx'

export default function Dropdown({
  variant     = 'default',
  headline    = 'head line',
  value,
  placeholder = 'frontend-team',
  disabled    = false,
  options     = [],
  hug         = false,
  initialOpen = false,
  forceOpen   = false,
}) {
  const [isOpen,   setIsOpen]   = useState(initialOpen)
  const [selected, setSelected] = useState(value ?? null)
  const ref = useRef(null)

  const panelOpen = forceOpen || isOpen

  useEffect(() => {
    if (!isOpen || forceOpen) return
    const close    = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false) }
    const closeEsc = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown',   closeEsc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown',   closeEsc)
    }
  }, [isOpen, forceOpen])

  const displayed = selected ?? placeholder
  const isOnColor = variant === 'On color'
  const bg        = isOnColor ? 'var(--accent-gold)'  : 'var(--control-secondary)'
  const textColor = isOnColor
    ? 'var(--text-on-color)'
    : (selected ? 'var(--text-primary)' : 'var(--text-secondary)')

  const toggle = () => { if (!disabled && !forceOpen) setIsOpen(v => !v) }
  const pick   = (opt) => { setSelected(opt); if (!forceOpen) setIsOpen(false) }

  return (
    <div
      ref={ref}
      style={{
        display:       'flex',
        flexDirection: 'column',
        gap:           hug ? undefined : 'var(--space-8)',
        width:         hug ? undefined : 180,
        position:      'relative',
      }}
    >
      {!hug && headline && (
        <span
          className="text-caps"
          style={{ color: isOnColor ? 'var(--accent-gold)' : 'var(--text-primary)', letterSpacing: '1.6px' }}
        >
          {headline}
        </span>
      )}

      <button
        type="button"
        aria-disabled={disabled ? 'true' : undefined}
        aria-haspopup="listbox"
        aria-expanded={panelOpen}
        data-open={panelOpen ? 'true' : undefined}
        onClick={toggle}
        className="ds-interactive"
        style={{
          display:         'inline-flex',
          alignItems:      'center',
          gap:             'var(--space-8)',
          padding:         'var(--space-8) var(--space-14)',
          borderRadius:    'var(--radius-4)',
          backgroundColor: bg,
          border:          'none',
          cursor:          disabled ? 'not-allowed' : 'pointer',
          flexShrink:      0,
          ...(hug ? {} : { width: '100%' }),
        }}
      >
        {/* Label: flex-grow fills available space so arrow slot never drifts */}
        <span
          className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
          style={{ color: textColor, flex: '1 1 auto' }}
        >
          {displayed}
        </span>
        {/* Fixed 16×16 arrow slot — only transform changes, no layout shift */}
        <span style={{
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          16,
          height:         16,
          flexShrink:     0,
          color:          textColor,
          transform:      panelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition:     'transform 140ms ease-out',
        }}>
          <Icons name="arrow-down" size={16} />
        </span>
      </button>

      {panelOpen && options.length > 0 && (
        <div
          role="listbox"
          style={{
            position:        'absolute',
            top:             '100%',
            left:            0,
            marginTop:       'var(--space-2)',
            minWidth:        '100%',
            backgroundColor: bg,
            borderRadius:    'var(--radius-4)',
            overflow:        'hidden',
            zIndex:          200,
          }}
        >
          {options.map(opt => (
            <button
              key={opt}
              role="option"
              type="button"
              aria-selected={opt === displayed}
              onClick={() => pick(opt)}
              style={{
                display:         'flex',
                alignItems:      'center',
                width:           '100%',
                padding:         'var(--space-8) var(--space-14)',
                backgroundColor: opt === displayed ? 'rgba(0,0,0,0.1)' : 'transparent',
                border:          'none',
                cursor:          'pointer',
                textAlign:       'left',
              }}
            >
              <span
                className="text-text-pixel tracking-[2px] uppercase whitespace-nowrap"
                style={{ color: textColor }}
              >
                {opt}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
