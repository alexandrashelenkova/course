import { useEffect, useState } from 'react'
import {
  colorTokens,
  spacingTokens,
  radiusTokens,
  effectTokens,
  typographyTokens,
} from './tokens.js'
import Button from './components/Button.jsx'
import Input from './components/Input.jsx'
import Badge from './components/Badge.jsx'
import DsCard from './components/Card.jsx'
import NavLink from './components/NavLink.jsx'
import SectionNavbar from './sections/Navbar.jsx'
import SectionHero from './sections/Hero.jsx'
import SectionFeatureRow from './sections/FeatureRow.jsx'
import SectionFooter from './sections/Footer.jsx'
import SectionCtaBand from './sections/CtaBand.jsx'

/**
 * Read CSS custom property values live from :root. tokens.css is the source of
 * truth — change a value there and this page reflects it on reload / HMR.
 */
function useTokenValues(tokens) {
  const [values, setValues] = useState({})
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement)
    const next = {}
    for (const t of tokens) {
      next[t.cssVar] = styles.getPropertyValue(t.cssVar).trim()
    }
    setValues(next)
  }, [tokens])
  return values
}

function Section({ id, title, count, unit = 'token', children }) {
  return (
    <section id={id} style={{ marginBottom: 'var(--spacing-space-6)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--spacing-space-3)',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 'var(--spacing-space-2)',
          marginBottom: 'var(--spacing-space-4)',
        }}
      >
        <h2 className="ds-text-heading" style={{ color: 'var(--color-text-strong)' }}>
          {title}
        </h2>
        {count != null && (
          <span className="ds-text-caption" style={{ color: 'var(--color-text-muted)' }}>
            {count} {unit}{count === 1 ? '' : 's'}
          </span>
        )}
      </div>
      {children}
    </section>
  )
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-space-4)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function Mono({ children }) {
  return (
    <span
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '12px',
        color: 'var(--color-text-muted)',
      }}
    >
      {children}
    </span>
  )
}

function Colors() {
  const values = useTokenValues(colorTokens)
  return (
    <Section id="colors" title="Colors" count={colorTokens.length}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 'var(--spacing-space-3)',
        }}
      >
        {colorTokens.map((t) => (
          <Card key={t.cssVar} style={{ padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                height: 88,
                background: `var(${t.cssVar})`,
                borderBottom: '1px solid var(--color-border)',
              }}
            />
            <div style={{ padding: 'var(--spacing-space-3)' }}>
              <div
                className="ds-text-label"
                style={{ color: 'var(--color-text-strong)' }}
              >
                {t.figma}
              </div>
              <div style={{ marginTop: 2 }}>
                <Mono>{values[t.cssVar] || '—'}</Mono>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Typography() {
  return (
    <Section id="typography" title="Typography" count={typographyTokens.length}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-4)' }}>
        {typographyTokens.map((t) => (
          <Card key={t.className}>
            <div className={t.className} style={{ color: 'var(--color-text-strong)' }}>
              {t.figma}
            </div>
            <div style={{ marginTop: 'var(--spacing-space-2)' }}>
              <span
                className="ds-text-label"
                style={{ color: 'var(--color-text-strong)', marginRight: 'var(--spacing-space-3)' }}
              >
                {t.figma}
              </span>
              <Mono>{t.specs}</Mono>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

function Scale({ id, title, tokens, render }) {
  const values = useTokenValues(tokens)
  return (
    <Section id={id} title={title} count={tokens.length}>
      <Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-4)' }}>
          {tokens.map((t) => (
            <div
              key={t.cssVar}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-space-4)' }}
            >
              <div style={{ width: 150, flexShrink: 0 }}>
                <div className="ds-text-label" style={{ color: 'var(--color-text-strong)' }}>
                  {t.figma}
                </div>
                <Mono>{values[t.cssVar] || '—'}</Mono>
              </div>
              <div style={{ flex: 1 }}>{render(t)}</div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  )
}

function Effects() {
  const values = useTokenValues(effectTokens)
  return (
    <Section id="effects" title="Effects" count={effectTokens.length}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 'var(--spacing-space-5)',
          // extra padding so shadows aren't clipped by the grid cell
          padding: 'var(--spacing-space-2)',
        }}
      >
        {effectTokens.map((t) => (
          <div key={t.cssVar}>
            <div
              style={{
                height: 96,
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: `var(${t.cssVar})`,
                marginBottom: 'var(--spacing-space-3)',
              }}
            />
            <div className="ds-text-label" style={{ color: 'var(--color-text-strong)' }}>
              {t.figma}
            </div>
            {t.note && (
              <div className="ds-text-caption" style={{ color: 'var(--color-text-muted)' }}>
                {t.note}
              </div>
            )}
            <div style={{ marginTop: 2 }}>
              <Mono>{values[t.cssVar] || '—'}</Mono>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ComponentGroup({ name, node, description, children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-space-3)',
        marginBottom: 'var(--spacing-space-5)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--spacing-space-2)',
        }}
      >
        <span className="ds-text-subheading" style={{ color: 'var(--color-text-strong)' }}>
          {name}
        </span>
        <Mono>{node}</Mono>
      </div>
      {description && (
        <p
          className="ds-text-body-sm"
          style={{ color: 'var(--color-text-muted)', maxWidth: 560, margin: 0 }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  )
}

function Specimen({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-2)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 72,
          padding: 'var(--spacing-space-3)',
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        {children}
      </div>
      <span className="ds-text-caption" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </span>
    </div>
  )
}

function VariantRow({ label, minWidth = 140, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-space-2)' }}>
      {label && (
        <div className="ds-text-label" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </div>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))`,
          gap: 'var(--spacing-space-3)',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function Components() {
  const buttonTypes = ['primary', 'secondary', 'ghost']
  const buttonStates = ['default', 'hover', 'disabled']
  const inputStates = ['default', 'focus', 'error']
  const badgeVariants = ['success', 'danger', 'neutral']

  return (
    <Section id="components" title="Components" count={5} unit="component">
      <ComponentGroup name="Button" node="44-54 · type × state" description="A clickable action element with three visual variants — primary for the main call to action, secondary for alternative actions, and ghost for low-emphasis actions. Use it wherever users need to trigger an action: form submissions, navigation, or dialog confirmations.">
        {buttonTypes.map((type) => (
          <VariantRow key={type} label={type}>
            {buttonStates.map((s) => (
              <Specimen key={s} label={s}>
                <Button variant={type} state={s} />
              </Specimen>
            ))}
          </VariantRow>
        ))}
      </ComponentGroup>

      <ComponentGroup name="Input" node="44-73 · state" description="A labeled text field for collecting user-entered text, with optional helper text and three interactive states — default, focused, and error. Use it for single-line input such as names, emails, or search queries; pair with the error state to surface validation feedback.">
        <VariantRow minWidth={240}>
          {inputStates.map((s) => (
            <Specimen key={s} label={s}>
              <Input state={s} style={{ width: '100%' }} />
            </Specimen>
          ))}
        </VariantRow>
      </ComponentGroup>

      <ComponentGroup name="Badge" node="44-94 · variant" description="A compact inline label that conveys semantic status using color — success (green), danger (red), or neutral (gray). Use it to tag items in lists, cards, or tables to communicate their current state at a glance.">
        <VariantRow>
          {badgeVariants.map((v) => (
            <Specimen key={v} label={v}>
              <Badge variant={v} />
            </Specimen>
          ))}
        </VariantRow>
      </ComponentGroup>

      <ComponentGroup name="Nav Link" node="44-101 · state" description="A navigation anchor that renders a primary-colored underline indicator when active. Use it inside navbars to mark the current section and provide clear wayfinding across pages.">
        <VariantRow>
          <Specimen label="default">
            <NavLink state="default" />
          </Specimen>
          <Specimen label="active">
            <NavLink state="active" />
          </Specimen>
        </VariantRow>
      </ComponentGroup>

      <ComponentGroup name="Card" node="44-89 · default" description="A contained surface for grouping related content with an optional icon, heading, body text, and action link. Use it to present feature highlights, info items, or any grouped content that benefits from visual separation in a grid or list layout.">
        <DsCard style={{ width: 'min(340px, 100%)' }} />
      </ComponentGroup>
    </Section>
  )
}

const SECTION_PREVIEWS = [
  { name: 'Navbar', node: '44-108', Cmp: SectionNavbar },
  { name: 'Hero', node: '44-123', Cmp: SectionHero },
  { name: 'Feature Row', node: '44-133', Cmp: SectionFeatureRow },
  { name: 'Footer', node: '44-156', Cmp: SectionFooter },
  { name: 'CTA Band', node: '44-164', Cmp: SectionCtaBand },
]

function SectionsShowcase() {
  return (
    <div id="sections" style={{ marginBottom: 'var(--spacing-space-6)' }}>
      {/* Heading row — constrained to match the rest of the page */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 var(--spacing-space-4) var(--spacing-space-4)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--spacing-space-3)',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: 'var(--spacing-space-2)',
            marginBottom: 'var(--spacing-space-4)',
          }}
        >
          <h2 className="ds-text-heading" style={{ color: 'var(--color-text-strong)' }}>
            Sections
          </h2>
          <span className="ds-text-caption" style={{ color: 'var(--color-text-muted)' }}>
            5 sections
          </span>
        </div>
      </div>

      {/* Each section full-width, labelled above */}
      {SECTION_PREVIEWS.map(({ name, node, Cmp }) => (
        <div key={name} style={{ marginBottom: 'var(--spacing-space-4)' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 var(--spacing-space-4) var(--spacing-space-2)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-space-2)' }}>
              <span className="ds-text-subheading" style={{ color: 'var(--color-text-strong)' }}>
                {name}
              </span>
              <Mono>Section/{name} · {node}</Mono>
            </div>
          </div>
          <Cmp />
        </div>
      ))}
    </div>
  )
}

export default function DsDev() {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Token + component sections — constrained to 960px */}
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: 'var(--spacing-space-6) var(--spacing-space-4) 0',
        }}
      >
        <header style={{ marginBottom: 'var(--spacing-space-6)' }}>
          <div className="ds-text-caption" style={{ color: 'var(--color-text-muted)' }}>
            /ds-dev/
          </div>
          <h1 className="ds-text-display" style={{ color: 'var(--color-text-strong)' }}>
            WBL AI Design System
          </h1>
          <p
            className="ds-text-body"
            style={{ color: 'var(--color-text-muted)', maxWidth: 640 }}
          >
            Live reference for the design tokens and styles defined in{' '}
            <Mono>src/tokens.css</Mono>. Every value below is read directly from
            the token definitions, so editing a token updates this page.
          </p>
        </header>

        <Colors />
        <Typography />
        <Scale
          id="spacing"
          title="Spacing"
          tokens={spacingTokens}
          render={(t) => (
            <div
              style={{
                height: 16,
                width: `var(${t.cssVar})`,
                background: 'var(--color-primary)',
                borderRadius: 'var(--radius-sm)',
              }}
            />
          )}
        />
        <Scale
          id="radius"
          title="Radius"
          tokens={radiusTokens}
          render={(t) => (
            <div
              style={{
                height: 56,
                width: 96,
                background: 'var(--color-surface)',
                border: '1.5px solid var(--color-primary)',
                borderRadius: `var(${t.cssVar})`,
              }}
            />
          )}
        />
        <Effects />
        <Components />
      </div>

      {/* Sections — full-width, each section breaks out of the 960px column */}
      <SectionsShowcase />

      {/* Reference page footer — back in the constrained column */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 var(--spacing-space-4) var(--spacing-space-6)' }}>
        <footer
          className="ds-text-caption"
          style={{ color: 'var(--color-text-muted)', paddingTop: 'var(--spacing-space-4)', borderTop: '1px solid var(--color-border)' }}
        >
          {'Source: Figma "WBL AI Design System Shorts" · file YJlrRZ0qVDw0pwdLsbouF2 (nodes 44-21 tokens, 44-44 text styles, 44-52 components, 44-107 sections).'}
        </footer>
      </div>
    </div>
  )
}
