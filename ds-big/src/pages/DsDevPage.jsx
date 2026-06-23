import { useState } from 'react'
import tokensRaw from '../styles/tokens.css?raw'

// ─── CSS token parsing (runs once at module load) ─────────────────────────

function parseCSSVars(css) {
  const vars = {}
  const re = /^\s*(--[\w-]+)\s*:\s*([^;]+);/gm
  let m
  while ((m = re.exec(css)) !== null) vars[m[1].trim()] = m[2].trim()
  return vars
}

function resolveChain(val, vars, depth = 0) {
  if (!val || depth > 8) return val ?? ''
  if (val.startsWith('#')) return val
  const m = val.match(/^var\((--[\w-]+)\)$/)
  if (!m) return val
  return resolveChain(vars[m[1]] ?? val, vars, depth + 1)
}

function parseTextClasses(css) {
  const out = []
  const blockRe = /\.(text-[\w-]+)\s*\{([^}]+)\}/g
  let m
  while ((m = blockRe.exec(css)) !== null) {
    const props = {}
    const propRe = /([\w-]+)\s*:\s*([^;]+);/g
    let pm
    while ((pm = propRe.exec(m[2])) !== null) props[pm[1].trim()] = pm[2].trim()
    out.push({ className: m[1], props })
  }
  return out
}

// ─── Parsed data ──────────────────────────────────────────────────────────

const V = parseCSSVars(tokensRaw)

const COLOR_PRIM_GROUPS = [
  { label: 'Neutral', vars: ['--color-white','--color-black','--color-gray-50','--color-gray-100','--color-gray-200','--color-gray-400'] },
  { label: 'Red',     vars: ['--color-red','--color-red-100','--color-red-200','--color-red-300','--color-red-400'] },
  { label: 'Purple',  vars: ['--color-purple','--color-purple-200'] },
  { label: 'Teal',    vars: ['--color-teal','--color-teal-200'] },
  { label: 'Yellow',  vars: ['--color-yellow','--color-yellow-100','--color-yellow-200','--color-yellow-dark'] },
  { label: 'Accent',  vars: ['--color-gold','--color-sage'] },
].map(g => ({
  ...g,
  items: g.vars.filter(v => v in V).map(v => ({ varName: v, hex: V[v] })),
}))

const TOKEN_GROUPS = [
  { label: 'Text',    prefix: '--text-' },
  { label: 'Surface', prefix: '--surface-' },
  { label: 'Border',  prefix: '--border-' },
  { label: 'Control', prefix: '--control-' },
  { label: 'Bar',     prefix: '--bar-' },
  { label: 'Status',  prefix: '--status-' },
  { label: 'Accent',  prefix: '--accent-' },
].map(g => ({
  ...g,
  items: Object.keys(V)
    .filter(k => k.startsWith(g.prefix))
    .map(k => ({
      varName: k,
      alias: V[k],
      hex: resolveChain(V[k], V),
    })),
})).filter(g => g.items.length > 0)

const SPACE_ITEMS = Object.entries(V)
  .filter(([k]) => k.startsWith('--space-'))
  .map(([k, v]) => ({ varName: k, value: v, px: parseFloat(v) }))
  .sort((a, b) => a.px - b.px)

const RADIUS_ITEMS = Object.entries(V)
  .filter(([k]) => k.startsWith('--radius-'))
  .map(([k, v]) => ({ varName: k, value: v, px: parseFloat(v) }))
  .sort((a, b) => a.px - b.px)

const TEXT_STYLES = parseTextClasses(tokensRaw).map(({ className, props }) => ({
  className,
  family: resolveChain(props['font-family'] ?? '', V).replace(/'/g, ''),
  size:   resolveChain(props['font-size'] ?? '', V),
  weight: resolveChain(props['font-weight'] ?? '', V),
  lh:     props['line-height'] ?? '',
  upper:  props['text-transform'] === 'uppercase',
}))

const totalPrims  = COLOR_PRIM_GROUPS.reduce((n, g) => n + g.items.length, 0)
const totalTokens = TOKEN_GROUPS.reduce((n, g) => n + g.items.length, 0)

// ─── Sub-components ───────────────────────────────────────────────────────

function Section({ id, title, caption, children }) {
  return (
    <section id={id} style={{ paddingTop: 'var(--space-30)', paddingBottom: 'var(--space-14)' }}>
      <div
        className="border-b border-[var(--border-default)]"
        style={{ marginBottom: 'var(--space-20)', paddingBottom: 'var(--space-8)' }}
      >
        <h2 className="text-h3 text-[var(--text-primary)]">{title}</h2>
        {caption && (
          <p
            className="text-text-grotesk text-[var(--text-secondary)]"
            style={{ marginTop: 'var(--space-4)' }}
          >
            {caption}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

function SubLabel({ label, first }) {
  return (
    <p
      className="text-caps text-[var(--text-secondary)]"
      style={{ marginBottom: 'var(--space-8)', marginTop: first ? 0 : 'var(--space-20)' }}
    >
      {label}
    </p>
  )
}

function ColorCard({ varName, hex, alias, onCopy, copied }) {
  const aliasLabel = alias?.replace(/^var\(/, '').replace(/\)$/, '')
  return (
    <div
      role="button"
      tabIndex={0}
      className="rounded-[var(--radius-4)] border border-[var(--border-default)] overflow-hidden cursor-pointer transition-colors bg-[var(--surface-card-default)] hover:border-[var(--color-gray-400)]"
      style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}
      onClick={() => onCopy(varName)}
      onKeyDown={e => e.key === 'Enter' && onCopy(varName)}
      title={`Click to copy ${varName}`}
    >
      {/* color block */}
      <div style={{ height: '72px', backgroundColor: `var(${varName})` }} />
      {/* info */}
      <div style={{ padding: 'var(--space-8)' }}>
        {copied ? (
          <p
            className="text-[var(--status-success)]"
            style={{ fontFamily: 'var(--font-family-grotesk)', fontSize: 'var(--font-size-10)', fontWeight: 'var(--font-weight-700)' }}
          >
            copied ✓
          </p>
        ) : (
          <p
            className="truncate text-[var(--text-primary)] leading-tight"
            style={{ fontFamily: 'var(--font-family-grotesk)', fontSize: 'var(--font-size-11)', fontWeight: 'var(--font-weight-700)' }}
            title={varName}
          >
            {varName}
          </p>
        )}
        <p
          className="font-mono text-[var(--text-secondary)] leading-tight"
          style={{ fontSize: 'var(--font-size-10)', marginTop: 'var(--space-2)' }}
        >
          {hex}
        </p>
        {aliasLabel && (
          <p
            className="font-mono text-[var(--text-secondary)] truncate leading-tight"
            style={{ fontSize: 'var(--font-size-8)', marginTop: 'var(--space-2)' }}
            title={aliasLabel}
          >
            → {aliasLabel}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function DsDevPage() {
  const [copied, setCopied] = useState(null)

  function copy(varName) {
    navigator.clipboard?.writeText(varName).catch(() => {})
    setCopied(varName)
    setTimeout(() => setCopied(v => (v === varName ? null : v)), 1500)
  }

  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-primary)]">

      {/* ── main content ────────────────────────────────────────── */}
      <main
        className="mx-auto"
        style={{
          maxWidth: 'var(--size-830)',
          padding: 'var(--space-24) var(--space-24) var(--space-90)',
        }}
      >
        {/* header */}
        <header style={{ marginBottom: 'var(--space-8)', paddingTop: 'var(--space-14)' }}>
          <h1 className="text-h2 text-[var(--text-primary)]">ds-big</h1>
          <p
            className="text-text-grotesk text-[var(--text-secondary)]"
            style={{ marginTop: 'var(--space-4)' }}
          >
            Design token reference · {totalPrims} primitives · {totalTokens} tokens · {TEXT_STYLES.length} text styles
          </p>
        </header>

        {/* ── 1. Color Primitives ─────────────────────────────── */}
        <Section
          id="colors"
          title="Color · Primitives"
          caption="Raw color values — the only place hex lives in the system."
        >
          {COLOR_PRIM_GROUPS.map((group, gi) => (
            <div key={group.label}>
              <SubLabel label={group.label} first={gi === 0} />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: 'var(--space-8)',
                }}
              >
                {group.items.map(item => (
                  <ColorCard
                    key={item.varName}
                    varName={item.varName}
                    hex={item.hex}
                    onCopy={copy}
                    copied={copied === item.varName}
                  />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ── 2. Semantic Tokens ──────────────────────────────── */}
        <Section
          id="semantic"
          title="Color · Semantic Tokens"
          caption="Named roles — each aliases a primitive. Use these in components; never primitives directly."
        >
          {TOKEN_GROUPS.map((group, gi) => (
            <div key={group.label}>
              <SubLabel label={group.label} first={gi === 0} />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: 'var(--space-8)',
                }}
              >
                {group.items.map(item => (
                  <ColorCard
                    key={item.varName}
                    varName={item.varName}
                    hex={item.hex}
                    alias={item.alias}
                    onCopy={copy}
                    copied={copied === item.varName}
                  />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ── 3. Spacing ──────────────────────────────────────── */}
        <Section
          id="spacing"
          title="Spacing"
          caption={`${SPACE_ITEMS.length} steps · bar width equals the token value`}
        >
          <div className="flex flex-col" style={{ gap: 'var(--space-8)' }}>
            {SPACE_ITEMS.map(item => (
              <div
                key={item.varName}
                className="flex items-center rounded-[var(--radius-4)] bg-[var(--surface-card-default)] border border-[var(--border-default)]"
                style={{ padding: 'var(--space-8) var(--space-14)', gap: 'var(--space-14)' }}
              >
                {/* name */}
                <span
                  className="font-mono text-[var(--text-secondary)] shrink-0"
                  style={{ fontSize: 'var(--font-size-11)', minWidth: '140px' }}
                >
                  {item.varName}
                </span>
                {/* bar or label */}
                <div className="flex items-center flex-1" style={{ gap: 'var(--space-8)', minWidth: 0 }}>
                  {item.px > 0 ? (
                    <div
                      className="rounded-[var(--radius-4)] bg-[var(--accent-default)] shrink-0"
                      style={{ width: item.value, height: 'var(--space-14)' }}
                    />
                  ) : (
                    <span
                      className="text-caps text-[var(--text-secondary)] italic"
                    >
                      negative offset
                    </span>
                  )}
                  <span
                    className="font-mono text-[var(--text-secondary)] ml-auto shrink-0"
                    style={{ fontSize: 'var(--font-size-10)' }}
                  >
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 4. Radius ───────────────────────────────────────── */}
        <Section
          id="radius"
          title="Radius"
          caption={`${RADIUS_ITEMS.length} steps · each box rendered with its border-radius`}
        >
          <div className="flex flex-wrap" style={{ gap: 'var(--space-20)' }}>
            {RADIUS_ITEMS.map(item => (
              <div
                key={item.varName}
                className="flex flex-col items-center"
                style={{ gap: 'var(--space-8)' }}
              >
                <div
                  className="bg-[var(--surface-card-default)] border border-[var(--border-default)]"
                  style={{
                    width: 'var(--space-90)',
                    height: 'var(--space-90)',
                    borderRadius: item.value,
                  }}
                />
                <p
                  className="font-mono text-[var(--text-secondary)] text-center"
                  style={{ fontSize: 'var(--font-size-10)' }}
                >
                  {item.varName}
                </p>
                <p
                  className="font-mono text-[var(--text-secondary)] text-center"
                  style={{ fontSize: 'var(--font-size-10)' }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── 5. Typography ───────────────────────────────────── */}
        <Section
          id="typography"
          title="Typography"
          caption="9 text styles rendered in their real fonts. Metadata parsed from tokens.css."
        >
          <div className="border-t border-[var(--border-default)]">
            {TEXT_STYLES.map(t => (
              <div
                key={t.className}
                className="border-b border-[var(--border-default)]"
                style={{ padding: 'var(--space-20) 0', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}
              >
                {/* label row */}
                <div
                  className="flex flex-wrap items-baseline justify-between"
                  style={{ gap: 'var(--space-8)' }}
                >
                  <span className="text-caps text-[var(--text-secondary)]">.{t.className}</span>
                  <span
                    className="font-mono text-[var(--text-secondary)]"
                    style={{ fontSize: 'var(--font-size-10)' }}
                  >
                    {t.family} · {t.size} / {t.lh} · {t.weight}{t.upper ? ' · uppercase' : ''}
                  </span>
                </div>
                {/* specimen */}
                <p className={`${t.className} text-[var(--text-primary)]`}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </Section>

      </main>
    </div>
  )
}
