import { useState } from 'react'

import Btn          from '../ds-dev/atoms/Btn.jsx'
import Switch       from '../ds-dev/atoms/Switch.jsx'
import SwitchGroup  from '../ds-dev/atoms/SwitchGroup.jsx'
import Tag          from '../ds-dev/atoms/Tag.jsx'
import Dropdown     from '../ds-dev/atoms/Dropdown.jsx'
import Input        from '../ds-dev/atoms/Input.jsx'
import TextArea     from '../ds-dev/atoms/TextArea.jsx'
import Status       from '../ds-dev/atoms/Status.jsx'
import ErrorBanner  from '../ds-dev/atoms/ErrorBanner.jsx'
import Avatar       from '../ds-dev/atoms/Avatar.jsx'
import Avatars      from '../ds-dev/atoms/Avatars.jsx'
import Bar          from '../ds-dev/atoms/Bar.jsx'
import Icons        from '../ds-dev/atoms/Icons.jsx'
import Flag         from '../ds-dev/atoms/Flag.jsx'
import List         from '../ds-dev/atoms/List.jsx'
import Graph        from '../ds-dev/atoms/Graph.jsx'

// ─── Shared layout primitives ─────────────────────────────────────────────────

function AtomSection({ id, title, children }) {
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
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-14)',
          alignItems: 'flex-start',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function StateLabel({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
      {children}
    </div>
  )
}

function SLabel({ children }) {
  return (
    <span
      className="text-caps"
      style={{ color: 'var(--text-secondary)' }}
    >
      {children}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AtomsPage() {
  // stateful demos
  const [sgValue,       setSgValue]       = useState('Team')
  const [flagActive,    setFlagActive]    = useState(false)
  const [inputVal,      setInputVal]      = useState('')
  const [taVal,         setTaVal]         = useState('')

  return (
    <div
      style={{
        padding: 'var(--space-90) var(--space-30)',
        maxWidth: 'var(--size-830)',
      }}
    >
      {/* ── Page heading ───────────────────────────────────────────────── */}
      <div style={{ paddingBottom: 'var(--space-30)' }}>
        <h1 className="text-h3" style={{ color: 'var(--text-primary)' }}>Atoms</h1>
        <p
          className="text-text-grotesk"
          style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-8)' }}
        >
          Hover · press · Tab-focus each component to see interaction states.
          Disabled variants show the reduced-opacity state.
        </p>
      </div>

      {/* ── btn ────────────────────────────────────────────────────────── */}
      <AtomSection id="btn" title="btn">
        <VariantRow label="variants">
          <StateLabel><SLabel>secondary</SLabel>   <Btn type="secondary" label="More info" /></StateLabel>
          <StateLabel><SLabel>On color</SLabel>    <Btn type="On color"  label="More info" /></StateLabel>
          <StateLabel><SLabel>small</SLabel>       <Btn type="small"     label="More info" /></StateLabel>
          <StateLabel><SLabel>big</SLabel>         <Btn type="big"       label="More info" /></StateLabel>
          <StateLabel>
            <SLabel>node</SLabel>
            <Btn type="node" label="More info" sublabel="more info" />
          </StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── switch ─────────────────────────────────────────────────────── */}
      <AtomSection id="switch" title="switch">
        <VariantRow label="size=big">
          <StateLabel><SLabel>on</SLabel>  <Switch label="Team" size="big" active={true}  /></StateLabel>
          <StateLabel><SLabel>off</SLabel> <Switch label="Team" size="big" active={false} /></StateLabel>
        </VariantRow>
        <VariantRow label="size=small">
          <StateLabel><SLabel>on</SLabel>  <Switch label="Team" size="small" active={true}  /></StateLabel>
          <StateLabel><SLabel>off</SLabel> <Switch label="Team" size="small" active={false} /></StateLabel>
        </VariantRow>
        <VariantRow label="states">
          <StateLabel><SLabel>disabled</SLabel> <Switch label="Team" size="big" active={false} disabled /></StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── switch-group ───────────────────────────────────────────────── */}
      <AtomSection id="switch-group" title="switch group">
        <VariantRow label="default (3 tabs)">
          <SwitchGroup options={['Team', 'Projects', 'Reports']} value={sgValue} onChange={setSgValue} />
        </VariantRow>
        <VariantRow label="states">
          <StateLabel><SLabel>interactive</SLabel> <SwitchGroup options={['Team', 'Projects', 'Reports']} value={sgValue} onChange={setSgValue} /></StateLabel>
          <StateLabel><SLabel>disabled</SLabel>    <SwitchGroup options={['Team', 'Projects', 'Reports']} value="Team" disabled /></StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── dropdown ───────────────────────────────────────────────────── */}
      <AtomSection id="dropdown" title="dropdown">
        <VariantRow label="variants">
          <StateLabel><SLabel>On color, filled</SLabel>     <Dropdown variant="On color" value="frontend-team" /></StateLabel>
          <StateLabel><SLabel>On color, empty</SLabel>      <Dropdown variant="On color" value="" /></StateLabel>
          <StateLabel><SLabel>default, filled</SLabel>      <Dropdown variant="default"  value="frontend-team" /></StateLabel>
          <StateLabel><SLabel>default, empty</SLabel>       <Dropdown variant="default"  value="" /></StateLabel>
        </VariantRow>
        <VariantRow label="states">
          <StateLabel><SLabel>default (interactive)</SLabel> <Dropdown variant="default" value="frontend-team" options={['Option A', 'Option B', 'Option C']} /></StateLabel>
          <StateLabel><SLabel>disabled</SLabel>              <Dropdown variant="default" value="frontend-team" disabled /></StateLabel>
        </VariantRow>
        <VariantRow label="open">
          <StateLabel><SLabel>live (starts open)</SLabel>    <Dropdown variant="default" placeholder="Select…" initialOpen options={['Option A', 'Option B', 'Option C']} /></StateLabel>
          <StateLabel><SLabel>pinned open</SLabel>            <Dropdown variant="default" placeholder="Select…" forceOpen  options={['Option A', 'Option B', 'Option C']} /></StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── tag ────────────────────────────────────────────────────────── */}
      <AtomSection id="tag" title="tag">
        <VariantRow label="variants">
          <StateLabel><SLabel>control</SLabel>  <Tag variant="control" label="React" /></StateLabel>
          <StateLabel><SLabel>static</SLabel>   <Tag variant="static"  label="React" /></StateLabel>
          <StateLabel><SLabel>disabled</SLabel> <Tag variant="control" label="React" disabled /></StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── input ──────────────────────────────────────────────────────── */}
      <AtomSection id="input" title="input">
        <VariantRow label="default">
          <Input headline="head line" value={inputVal} placeholder="Michael Lee" onChange={setInputVal} />
        </VariantRow>
        <VariantRow label="states">
          <StateLabel><SLabel>default (interactive)</SLabel> <Input headline="head line" value={inputVal} placeholder="Michael Lee" onChange={setInputVal} /></StateLabel>
          <StateLabel><SLabel>disabled</SLabel>              <Input headline="head line" value="" placeholder="Disabled" disabled /></StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── text-area ──────────────────────────────────────────────────── */}
      <AtomSection id="text-area" title="text area">
        <VariantRow label="default">
          <TextArea headline="head line" value={taVal} placeholder="type something here" onChange={setTaVal} />
        </VariantRow>
        <VariantRow label="states">
          <StateLabel><SLabel>default (interactive)</SLabel> <TextArea headline="head line" value={taVal} placeholder="type something here" onChange={setTaVal} /></StateLabel>
          <StateLabel><SLabel>disabled</SLabel>              <TextArea headline="head line" value="" placeholder="Disabled" disabled /></StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── status ─────────────────────────────────────────────────────── */}
      <AtomSection id="status" title="status">
        <VariantRow label="variants">
          <Status variant="purple"  />
          <Status variant="green"   />
          <Status variant="red"     />
          <Status variant="stopped" />
        </VariantRow>
      </AtomSection>

      {/* ── error ──────────────────────────────────────────────────────── */}
      <AtomSection id="error" title="error">
        <VariantRow label="default">
          <ErrorBanner />
        </VariantRow>
        <VariantRow label="custom message">
          <ErrorBanner text="field is required" />
        </VariantRow>
      </AtomSection>

      {/* ── avatar ─────────────────────────────────────────────────────── */}
      <AtomSection id="avatar" title="avatar">
        <VariantRow label="variants (person=katya | dog | petya)">
          <StateLabel><SLabel>katya</SLabel> <Avatar person="katya" /></StateLabel>
          <StateLabel><SLabel>dog</SLabel>   <Avatar person="dog"   /></StateLabel>
          <StateLabel><SLabel>petya</SLabel> <Avatar person="petya" /></StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── avatars ────────────────────────────────────────────────────── */}
      <AtomSection id="avatars" title="avatars">
        <VariantRow label="default (3 overlapping)">
          <Avatars />
        </VariantRow>
      </AtomSection>

      {/* ── bar ────────────────────────────────────────────────────────── */}
      <AtomSection id="bar" title="bar">
        <VariantRow label="size=default (5px dots)">
          <div style={{ width: 300 }}>
            <p className="text-caps" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>75%</p>
            <Bar size="default" value={75} />
          </div>
          <div style={{ width: 300 }}>
            <p className="text-caps" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>20%</p>
            <Bar size="default" value={20} />
          </div>
        </VariantRow>
        <VariantRow label="size=big (2×5px dots, 2 rows)">
          <div style={{ width: 300 }}>
            <p className="text-caps" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>75%</p>
            <Bar size="big" value={75} />
          </div>
          <div style={{ width: 300 }}>
            <p className="text-caps" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-8)' }}>20%</p>
            <Bar size="big" value={20} />
          </div>
        </VariantRow>
      </AtomSection>

      {/* ── icons ──────────────────────────────────────────────────────── */}
      <AtomSection id="icons" title="icons">
        <VariantRow label="all icons (16×16, currentColor)">
          {['play', 'user', 'more', 'arrow-down', 'close'].map(name => (
            <StateLabel key={name}>
              <SLabel>{name}</SLabel>
              <Icons name={name} size={16} />
            </StateLabel>
          ))}
        </VariantRow>
        <VariantRow label="with token color">
          <Icons name="play"       size={16} color="var(--status-error)"   />
          <Icons name="user"       size={16} color="var(--status-success)"  />
          <Icons name="more"       size={16} color="var(--status-info)"     />
          <Icons name="arrow-down" size={16} color="var(--accent-gold)"     />
          <Icons name="close"      size={16} color="var(--text-secondary)"  />
        </VariantRow>
      </AtomSection>

      {/* ── flag ───────────────────────────────────────────────────────── */}
      <AtomSection id="flag" title="flag">
        <VariantRow label="variants">
          <StateLabel><SLabel>no (inactive)</SLabel>  <Flag active={false} /></StateLabel>
          <StateLabel><SLabel>yes (active)</SLabel>   <Flag active={true}  /></StateLabel>
        </VariantRow>
        <VariantRow label="states">
          <StateLabel>
            <SLabel>interactive toggle</SLabel>
            <Flag active={flagActive} onChange={setFlagActive} />
          </StateLabel>
          <StateLabel><SLabel>disabled</SLabel> <Flag active={false} disabled /></StateLabel>
        </VariantRow>
      </AtomSection>

      {/* ── list ───────────────────────────────────────────────────────── */}
      <AtomSection id="list" title="list">
        <VariantRow label="default">
          <div style={{ width: '100%' }}>
            <List />
            <List name="Michael Chen"    type="Spreadsheet" createdBy="created by Olga" date="12.03.2025" />
            <List name="Priya Shankar"   type="Presentation" createdBy="created by Kim" date="08.06.2025" />
          </div>
        </VariantRow>
        <VariantRow label="states">
          <div style={{ width: '100%' }}>
            <List name="Default Row" />
            <List name="Disabled Row" disabled />
          </div>
        </VariantRow>
      </AtomSection>

      {/* ── graph ──────────────────────────────────────────────────────── */}
      <AtomSection id="graph" title="graph">
        <VariantRow label="default (Figma layout)">
          <Graph bars={[100, 58]} />
        </VariantRow>
      </AtomSection>

    </div>
  )
}
