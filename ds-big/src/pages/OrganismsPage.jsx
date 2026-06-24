import OrgHeader  from '../ds-dev/organisms/OrgHeader.jsx'
import Topmenu    from '../ds-dev/organisms/Topmenu.jsx'
import SecondRow  from '../ds-dev/organisms/SecondRow.jsx'
import Canban     from '../ds-dev/organisms/Canban.jsx'
import TaskRow    from '../ds-dev/organisms/TaskRow.jsx'
import CardTop    from '../ds-dev/organisms/CardTop.jsx'

function OrgSection({ id, title, children }) {
  return (
    <section
      id={id}
      style={{
        paddingTop: 'var(--space-90)',
        borderTop: '1px solid var(--border-default)',
        marginTop: 'var(--space-90)',
      }}
    >
      <h2
        className="text-h3"
        style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-30)' }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

function VariantRow({ label, children }) {
  return (
    <div style={{ marginBottom: 'var(--space-24)' }}>
      <p
        className="text-caps"
        style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}
      >
        {label}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-14)', alignItems: 'flex-start' }}>
        {children}
      </div>
    </div>
  )
}

/* Scroll fallback for organisms wider than the content area */
function ScrollWrap({ dark = false, bg, children }) {
  return (
    <div style={{
      width: '100%',
      overflowX: 'auto',
      backgroundColor: dark ? 'var(--text-primary)' : bg ?? undefined,
      borderRadius: dark ? 'var(--radius-4)' : undefined,
    }}>
      {children}
    </div>
  )
}

export default function OrganismsPage() {
  return (
    <div style={{ padding: 'var(--space-90) var(--space-30)' }}>
      <div style={{ paddingBottom: 'var(--space-30)' }}>
        <h1 className="text-h3" style={{ color: 'var(--text-primary)' }}>Organisms</h1>
        <p
          className="text-text-grotesk"
          style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-8)' }}
        >
          Composed from molecules and atoms. Each organism maps to a Figma ds-organisms node.
        </p>
      </div>

      {/* ── topmenu ──────────────────────────────────────────────────────── */}
      <OrgSection id="topmenu" title="topmenu">
        <VariantRow label="Property 1=all">
          <ScrollWrap>
            <Topmenu property1="all" />
          </ScrollWrap>
        </VariantRow>
        <VariantRow label="Property 1=templates">
          <ScrollWrap>
            <Topmenu property1="templates" />
          </ScrollWrap>
        </VariantRow>
        <VariantRow label="Property 1=off">
          <ScrollWrap>
            <Topmenu property1="off" />
          </ScrollWrap>
        </VariantRow>
      </OrgSection>

      {/* ── second-row ───────────────────────────────────────────────────── */}
      <OrgSection id="second-row" title="second-row">
        <VariantRow label="type=Default">
          <ScrollWrap>
            <SecondRow type="Default" />
          </ScrollWrap>
        </VariantRow>
        <VariantRow label="type=builder">
          <ScrollWrap>
            <SecondRow type="builder" />
          </ScrollWrap>
        </VariantRow>
      </OrgSection>

      {/* ── header ───────────────────────────────────────────────────────── */}
      <OrgSection id="header" title="header">
        <VariantRow label="type=default">
          <ScrollWrap bg="var(--surface-page)">
            <OrgHeader />
          </ScrollWrap>
        </VariantRow>
      </OrgSection>

      {/* ── canban ───────────────────────────────────────────────────────── */}
      <OrgSection id="canban" title="canban">
        <VariantRow label="default">
          <ScrollWrap>
            <Canban />
          </ScrollWrap>
        </VariantRow>
      </OrgSection>

      {/* ── task ─────────────────────────────────────────────────────────── */}
      <OrgSection id="task" title="task">
        <VariantRow label="Property 1=Default">
          <TaskRow property1="Default" />
        </VariantRow>
        <VariantRow label="Property 1=Variant2">
          <TaskRow property1="Variant2" />
        </VariantRow>
      </OrgSection>

      {/* ── card top ─────────────────────────────────────────────────────── */}
      <OrgSection id="card-top" title="card top">
        <VariantRow label="Property 1=Default">
          <CardTop property1="Default" />
        </VariantRow>
        <VariantRow label="Property 1=Variant2">
          <CardTop property1="Variant2" />
        </VariantRow>
      </OrgSection>
    </div>
  )
}
