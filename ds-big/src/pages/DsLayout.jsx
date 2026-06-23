import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'

export default function DsLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[var(--surface-page)]">

      {/* ── main content ──────────────────────────────────────────── */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <Outlet />
      </main>

      {/* ── mobile backdrop ───────────────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-10 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── sidebar ───────────────────────────────────────────────── */}
      {/*
        Mobile  (<lg): fixed overlay, slides in/out from right
        Desktop (≥lg): sticky, in normal flow, 260px right column
      */}
      <aside
        className={[
          'fixed inset-y-0 right-0 z-20 w-[260px] shrink-0 overflow-y-auto',
          'border-l border-[var(--border-default)] bg-[var(--surface-card-default)]',
          'transition-transform duration-200 ease-in-out',
          'lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:transition-none',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        aria-label="Site navigation"
      >
        <Sidebar onClose={() => setOpen(false)} />
      </aside>

      {/* ── mobile toggle (hidden on desktop) ─────────────────────── */}
      <button
        className="fixed z-30 lg:hidden text-caps text-[var(--text-primary)] bg-[var(--surface-card-default)] border border-[var(--border-default)] transition-colors hover:bg-[var(--surface-page)]"
        style={{
          bottom: 'var(--space-20)',
          right: 'var(--space-20)',
          padding: 'var(--space-8) var(--space-14)',
          borderRadius: 'var(--radius-999)',
        }}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
      >
        {open ? 'close' : 'menu'}
      </button>

    </div>
  )
}
