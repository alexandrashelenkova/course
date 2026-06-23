import Profile          from '../ds-dev/molecules/Profile.jsx'
import NodeCard         from '../ds-dev/molecules/NodeCard.jsx'
import CampaignPreview  from '../ds-dev/molecules/CampaignPreview.jsx'
import ProjectPreview   from '../ds-dev/molecules/ProjectPreview.jsx'
import ExperiencePreview from '../ds-dev/molecules/ExperiencePreview.jsx'
import Team             from '../ds-dev/molecules/Team.jsx'
import CardMetric       from '../ds-dev/molecules/CardMetric.jsx'
import CardsMetrica     from '../ds-dev/molecules/CardsMetrica.jsx'
import Attemt           from '../ds-dev/molecules/Attemt.jsx'
import Notify           from '../ds-dev/molecules/Notify.jsx'

function MolSection({ id, title, children }) {
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

export default function MoleculesPage() {
  return (
    <div
      style={{
        padding: 'var(--space-90) var(--space-30)',
        maxWidth: 'var(--size-830)',
      }}
    >
      <div style={{ paddingBottom: 'var(--space-30)' }}>
        <h1 className="text-h3" style={{ color: 'var(--text-primary)' }}>Molecules</h1>
        <p
          className="text-text-grotesk"
          style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-8)' }}
        >
          Composed from atoms. Each molecule maps to a Figma ds-molecules node.
        </p>
      </div>

      {/* ── profile ──────────────────────────────────────────────────── */}
      <MolSection id="profile" title="profile">
        <VariantRow label="long">
          <div style={{ width: '100%' }}>
            <Profile variant="long" />
          </div>
        </VariantRow>
        <VariantRow label="short">
          <Profile variant="short" />
        </VariantRow>
        <VariantRow label="short-outlined">
          <Profile variant="short-outlined" />
        </VariantRow>
      </MolSection>

      {/* ── node ─────────────────────────────────────────────────────── */}
      <MolSection id="node" title="node">
        <VariantRow label="default">
          <NodeCard />
        </VariantRow>
      </MolSection>

      {/* ── campaign preview ─────────────────────────────────────────── */}
      <MolSection id="campaign-preview" title="campaign preview">
        <VariantRow label="default">
          <CampaignPreview />
        </VariantRow>
      </MolSection>

      {/* ── project preview ──────────────────────────────────────────── */}
      <MolSection id="project-preview" title="project preview">
        <VariantRow label="default">
          <ProjectPreview />
        </VariantRow>
      </MolSection>

      {/* ── experience preview ───────────────────────────────────────── */}
      <MolSection id="experience-preview" title="experience preview">
        <VariantRow label="default">
          <ExperiencePreview />
        </VariantRow>
      </MolSection>

      {/* ── team ─────────────────────────────────────────────────────── */}
      <MolSection id="team" title="team">
        <VariantRow label="default">
          <Team />
        </VariantRow>
      </MolSection>

      {/* ── card metric ──────────────────────────────────────────────── */}
      <MolSection id="card-metric" title="card metric">
        <VariantRow label="default">
          <CardMetric />
        </VariantRow>
      </MolSection>

      {/* ── cards metrica ────────────────────────────────────────────── */}
      <MolSection id="cards-metrica" title="cards metrica">
        <VariantRow label="default">
          <CardsMetrica />
        </VariantRow>
      </MolSection>

      {/* ── attemt ───────────────────────────────────────────────────── */}
      <MolSection id="attemt" title="attemt">
        <VariantRow label="Default (first attempt)">
          <Attemt variant="Default" />
        </VariantRow>
        <VariantRow label="Variant2 (next attempt)">
          <Attemt variant="Variant2" />
        </VariantRow>
      </MolSection>

      {/* ── notify ───────────────────────────────────────────────────── */}
      <MolSection id="notify" title="notify">
        <VariantRow label="type=Default">
          <Notify />
        </VariantRow>
        <VariantRow label="with btn">
          <Notify showBtn />
        </VariantRow>
      </MolSection>
    </div>
  )
}
