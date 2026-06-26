import { useState, useRef } from 'react'
import Topmenu   from '../ds-dev/organisms/Topmenu.jsx'
import SecondRow from '../ds-dev/organisms/SecondRow.jsx'
import Btn       from '../ds-dev/atoms/Btn.jsx'
import Switch    from '../ds-dev/atoms/Switch.jsx'
import NodeCard  from '../ds-dev/molecules/NodeCard.jsx'

// ── Canvas geometry (from Figma node 357:59152) ────────────────────────────
// NodeCard: width=280, padding=14. Handle dots: 10×10px, justify-between.
// Left handle center x:  14(pad) + 5(radius) = 19px from node.x
// Right handle center x: 14(pad) + 252(content-w) - 10(dot-w) + 5(radius) = 261px from node.x
// Handle row center y:   14(pad) + 16(icons) + 14(gap) + 13(title) + 8(gap) + 12(sub) + 24(section-gap) + 5(radius) ≈ 106px
const HDX_IN  = 19
const HDX_OUT = 261
const HDY     = 106

function handleXY(node, side) {
  return { x: node.x + (side === 'out' ? HDX_OUT : HDX_IN), y: node.y + HDY }
}

function cubicBezier(sx, sy, tx, ty) {
  const c = Math.max(40, Math.abs(tx - sx) * 0.5)
  return `M ${sx} ${sy} C ${sx + c} ${sy}, ${tx - c} ${ty}, ${tx} ${ty}`
}

// ── Static data ────────────────────────────────────────────────────────────
const INIT_NODES = [
  { id: 'applicant-screening', label: 'Applicant Screening',    subtitle: 'Review resumes and applications',   x: 133, y: 156, color: 'var(--surface-card-red)'    },
  { id: 'interview-stage',     label: 'Interview Stage',         subtitle: 'Conduct initial interviews',        x: 161, y: 483, color: 'var(--surface-card-violet)' },
  { id: 'final-decision',      label: 'Final Decision',          subtitle: 'Select candidate and extend offer', x: 473, y: 268, color: 'var(--surface-card-pink)'   },
]

const EDGES = [
  { id: 'e1', fromNode: 'applicant-screening', toNode: 'final-decision' },
  { id: 'e2', fromNode: 'interview-stage',     toNode: 'final-decision' },
]

const OUT_NODES = new Set(EDGES.map(e => e.fromNode))
const IN_NODES  = new Set(EDGES.map(e => e.toNode))

const NODE_LIB = [
  { label: 'Start Trigger',      sub: 'Initialize workflow',   color: 'var(--surface-card-on-card-red)'    },
  { label: 'Application Review', sub: 'Screen candidates',     color: 'var(--surface-card-on-card-red)'    },
  { label: 'Interview',          sub: 'Schedule interviews',   color: 'var(--surface-card-on-card-red)'    },
  { label: 'Email Notification', sub: 'Send automated emails', color: 'var(--surface-card-yellow)'         },
  { label: 'Conditional Logic',  sub: 'Branch workflow paths', color: 'var(--surface-card-yellow)'         },
  { label: 'Training Module',    sub: 'Assign learning paths', color: 'var(--surface-card-on-card-pink)'   },
  { label: 'Progress Tracker',   sub: 'Monitor development',   color: 'var(--surface-card-on-card-violet)' },
]

const FIELD_BASE = {
  width: '100%',
  backgroundColor: 'var(--control-secondary)',
  borderRadius: 'var(--radius-4)',
  paddingTop:    'var(--space-8)',
  paddingBottom: 'var(--space-8)',
  paddingLeft:   'var(--space-14)',
  paddingRight:  'var(--space-14)',
  boxSizing: 'border-box',
  border: 'none',
  outline: 'none',
  fontFamily: 'var(--font-family-pixel)',
  fontSize: 10,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  resize: 'none',
}

function initNodeData() {
  return Object.fromEntries(INIT_NODES.map(n => [n.id, {
    name: n.label, letterHeadline: '', mainText: '', bodyText: '', byeByeText: '',
  }]))
}

// ── Shared sub-components ──────────────────────────────────────────────────
function FieldLabel({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-family-grotesk)',
      fontSize: 'var(--font-size-8)',
      letterSpacing: '1.6px',
      textTransform: 'uppercase',
      color: 'var(--text-primary)',
    }}>{children}</p>
  )
}

function PanelHeading({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-family-antiqa)',
      fontSize: 'var(--font-size-40)',
      letterSpacing: '-0.4px',
      color: 'var(--text-primary)',
    }}>{children}</p>
  )
}

function SectionTitle({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-family-grotesk)',
      fontSize: 'var(--font-size-20)',
      letterSpacing: '-0.4px',
      color: 'var(--text-primary)',
    }}>{children}</p>
  )
}

const PANEL_STYLE = {
  width: 350,
  flexShrink: 0,
  alignSelf: 'flex-start',
  backgroundColor: 'var(--surface-card-default)',
  borderRadius: 'var(--radius-12)',
  padding: 'var(--space-30)',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-24)',
}

// ── Canvas node wrapper (drag + selection) ─────────────────────────────────
function DraggableNode({ node, selected, dragging, inConnected, outConnected, onPointerDown, onPointerMove, onPointerUp }) {
  return (
    <div
      onPointerDown={e => onPointerDown(e, node.id)}
      onPointerMove={e => onPointerMove(e, node.id)}
      onPointerUp={e => onPointerUp(e, node.id)}
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transform: `translate(${node.x}px, ${node.y}px)`,
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: selected ? 20 : 10,
        outline: selected ? '2px solid var(--accent-default)' : '2px solid transparent',
        outlineOffset: 2,
        borderRadius: 'var(--radius-8)',
        transition: dragging ? 'none' : 'outline 140ms ease-out',
      }}
    >
      <NodeCard
        label={node.label}
        subtitle={node.subtitle}
        bg={node.color}
        inConnected={inConnected}
        outConnected={outConnected}
      />
    </div>
  )
}

// ── Left panel ─────────────────────────────────────────────────────────────
function LeftPanel({ automationName, onNameChange }) {
  return (
    <div style={PANEL_STYLE}>
      <PanelHeading>Automation</PanelHeading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <FieldLabel>Automation name</FieldLabel>
        <input
          type="text"
          value={automationName}
          onChange={e => onNameChange(e.target.value)}
          style={{ ...FIELD_BASE, height: 32 }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-14)' }}>
        <SectionTitle>Node library</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {NODE_LIB.map(item => (
            <Btn key={item.label} type="node" label={item.label} sublabel={item.sub} bg={item.color} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-14)' }}>
        <SectionTitle>Templates</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <Btn type="secondary" label="Hiring Funnel" />
          <Btn type="secondary" label="Onboarding Flow" />
          <Btn type="secondary" label="Development Plan" />
        </div>
      </div>
    </div>
  )
}

// ── Right panel ────────────────────────────────────────────────────────────
function RightPanel({ nd, onFieldChange, activeTab, onTabChange }) {
  const empty = 'var(--color-gray-200)'

  return (
    <div style={PANEL_STYLE}>
      <PanelHeading>Node Properties</PanelHeading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-14)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <FieldLabel>Node name</FieldLabel>
          <input
            type="text"
            value={nd?.name ?? ''}
            onChange={e => onFieldChange('name', e.target.value)}
            placeholder="SELECT A NODE"
            style={{ ...FIELD_BASE, height: 32, color: nd ? 'var(--text-primary)' : empty }}
          />
        </div>

        {/* Tab control — "parametrs" is Figma typo (should be "parameters"); reproduced verbatim */}
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Switch label="parametrs"   size="small" active={activeTab === 'parametrs'}   onClick={() => onTabChange('parametrs')} />
          <Switch label="custom code" size="small" active={activeTab === 'custom-code'} onClick={() => onTabChange('custom-code')} />
        </div>

        {activeTab === 'parametrs' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
              <FieldLabel>Letter headline</FieldLabel>
              <input
                type="text"
                value={nd?.letterHeadline ?? ''}
                onChange={e => onFieldChange('letterHeadline', e.target.value)}
                placeholder="TYPE SOMETHING HERE"
                style={{ ...FIELD_BASE, height: 32, color: nd?.letterHeadline ? 'var(--text-primary)' : empty }}
              />
            </div>

            {[
              { field: 'mainText',   label: 'Main text'    },
              { field: 'bodyText',   label: 'Body text'    },
              { field: 'byeByeText', label: 'Bye-bye text' },
            ].map(({ field, label }) => (
              <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                <FieldLabel>{label}</FieldLabel>
                <textarea
                  value={nd?.[field] ?? ''}
                  onChange={e => onFieldChange(field, e.target.value)}
                  placeholder="TYPE SOMETHING HERE"
                  rows={3}
                  style={{ ...FIELD_BASE, color: nd?.[field] ? 'var(--text-primary)' : empty }}
                />
              </div>
            ))}
          </>
        )}

        {activeTab === 'custom-code' && (
          <textarea
            placeholder="// WRITE CUSTOM CODE HERE"
            rows={6}
            style={{ ...FIELD_BASE, color: empty }}
          />
        )}
      </div>

      <div style={{ alignSelf: 'flex-start' }}>
        <Btn type="small" label="save" />
      </div>
    </div>
  )
}

// ── Page 5 ─────────────────────────────────────────────────────────────────
export default function Page5() {
  const [nodes, setNodes]               = useState(INIT_NODES)
  const [selectedId, setSelectedId]     = useState(null)
  const [draggingId, setDraggingId]     = useState(null)
  const [activeTab, setActiveTab]       = useState('parametrs')
  const [automationName, setAutomationName] = useState('Marketing Funnel')
  const [nodeData, setNodeData]         = useState(initNodeData)
  const dragRef                         = useRef(null)

  const nd = selectedId ? nodeData[selectedId] : null

  function updateField(field, val) {
    if (!selectedId) return
    setNodeData(prev => ({
      ...prev,
      [selectedId]: { ...prev[selectedId], [field]: val },
    }))
    if (field === 'name') {
      setNodes(prev => prev.map(n =>
        n.id === selectedId ? { ...n, label: val } : n
      ))
    }
  }

  function onNodePointerDown(e, nodeId) {
    const node = nodes.find(n => n.id === nodeId)
    dragRef.current = {
      nodeId,
      startPointer: { x: e.clientX, y: e.clientY },
      startNode:    { x: node.x,    y: node.y    },
    }
    e.currentTarget.setPointerCapture(e.pointerId)
    setSelectedId(nodeId)
    setDraggingId(nodeId)
  }

  function onNodePointerMove(e, nodeId) {
    if (!dragRef.current || dragRef.current.nodeId !== nodeId) return
    const { startPointer, startNode } = dragRef.current
    setNodes(prev => prev.map(n =>
      n.id === nodeId
        ? { ...n, x: startNode.x + (e.clientX - startPointer.x), y: startNode.y + (e.clientY - startPointer.y) }
        : n
    ))
  }

  function onNodePointerUp(e, nodeId) {
    if (!dragRef.current || dragRef.current.nodeId !== nodeId) return
    e.currentTarget.releasePointerCapture(e.pointerId)
    dragRef.current = null
    setDraggingId(null)
  }

  function onCanvasClick(e) {
    if (e.target === e.currentTarget) setSelectedId(null)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--surface-page)',
    }}>
      <Topmenu property1="all" />
      <SecondRow type="builder" bg="transparent" />

      <div style={{
        flex: '1 1 auto',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        paddingTop:    'var(--space-30)',
        paddingLeft:   'var(--space-30)',
        paddingRight:  'var(--space-30)',
        paddingBottom: 'var(--font-size-84)',
        gap: 'var(--space-8)',
      }}>
        <LeftPanel automationName={automationName} onNameChange={setAutomationName} />

        {/* CANVAS */}
        <div
          onClick={onCanvasClick}
          style={{
            flex: '1 1 0',
            minWidth: 0,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-4)',
            userSelect: 'none',
          }}
        >
          {/* SVG bezier edges — zIndex 30 renders above nodes (zIndex 10/20) */}
          <svg
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none',
              zIndex: 30,
            }}
          >
            {EDGES.map(edge => {
              const from = nodes.find(n => n.id === edge.fromNode)
              const to   = nodes.find(n => n.id === edge.toNode)
              if (!from || !to) return null
              const src = handleXY(from, 'out')
              const dst = handleXY(to,   'in')
              return (
                <path
                  key={edge.id}
                  d={cubicBezier(src.x, src.y, dst.x, dst.y)}
                  stroke="var(--text-primary)"
                  strokeWidth={1.5}
                  fill="none"
                  strokeLinecap="round"
                />
              )
            })}
          </svg>

          {/* Draggable node cards */}
          {nodes.map(node => (
            <DraggableNode
              key={node.id}
              node={node}
              selected={selectedId === node.id}
              dragging={draggingId === node.id}
              inConnected={IN_NODES.has(node.id)}
              outConnected={OUT_NODES.has(node.id)}
              onPointerDown={onNodePointerDown}
              onPointerMove={onNodePointerMove}
              onPointerUp={onNodePointerUp}
            />
          ))}
        </div>

        <RightPanel
          nd={nd}
          onFieldChange={updateField}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  )
}
