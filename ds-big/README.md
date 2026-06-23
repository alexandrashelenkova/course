# ds-big

React + Figma design system — token viewer, typography specimens, and component library scaffold.

---

## Commands

```bash
npm run dev     # dev server → http://localhost:5173/ds-dev/styles
npm run build   # production build → dist/
npm run preview # preview built output
```

---

## Folder structure

```
ds-big/
├── public/
│   └── fonts/          # served as /fonts/* by Vite; referenced by @font-face
├── src/
│   ├── App.jsx         # BrowserRouter + nested routes
│   ├── main.jsx        # entry — single CSS import (tokens.css)
│   ├── components/
│   │   └── Sidebar.jsx # two-level nav + scrollspy; NAV_CONFIG at top
│   ├── pages/
│   │   ├── DsLayout.jsx       # two-column shell (Outlet + Sidebar)
│   │   ├── DsDevPage.jsx      # /styles — token reference (data-driven from tokens.css)
│   │   ├── PreviewPage.jsx    # /preview-page — placeholder (R2)
│   │   └── ComingSoonPage.jsx # Atoms / Molecules / Organisms / Specimens placeholders
│   ├── styles/
│   │   └── tokens.css  # THE source of truth — @font-face + :root vars + text utilities
│   └── assets/
│       └── fonts/      # font files (also in root fonts/ — both kept)
├── fonts/              # original font source copies (never delete)
├── index.html          # Vite entry
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── _archive_2026-06-23/ # archived pre-R1 code (never delete)
```

---

## Current system state

### Figma file

File key: `hweXsvd1QXslnovecOVKzy`  
Pages: Cover · Styles · Atoms · Molecules · Organisms · Specimens (6 pages)

### Token layers

Two variable collections in Figma:

| Collection | ID | Vars | Description |
|---|---|---|---|
| Primitives | 6051:2 | 49 | Raw values — hex, numbers, strings. Hidden from designers. |
| Tokens | 6051:41 | 26 | Semantic aliases — every one points to a Primitive. |

**Primitive groups:** color/ (21) · font/family/ (3) · font/size/ (8) · font/weight/ (2) · space/ (10) · radius/ (4) · size/ (1)

**Token groups:**

| Group | Vars | Notes |
|---|---|---|
| text/ | 4 | primary · secondary · on-color · yellow-dark |
| surface/ | 12 | page · card/default · card/{red,pink,green,violet,yellow} · card/on-card/×5 |
| border/ | 1 | default |
| control/ | 2 | secondary · on-color |
| bar/ | 2 | on-base-filled · on-base-empty |
| status/ | 3 | info · success · error — these are the state tokens |
| accent/ | 2 | default · gold |

**One broken Figma ref (known, non-critical):** Rectangle 229 (357:35710) has a node-level fills slot binding to deleted var 2006:13260. Paint-level binding is correct (`surface/page`). Manual fix: open in Figma, disconnect and reconnect fills variable to `surface/page`.

### Text styles (9)

| style | family | size | weight | lh | transform |
|---|---|---|---|---|---|
| h1 | Instrument Serif | 84px | 400 | 76px | — |
| h2 | Instrument Serif | 40px | 400 | 36px | — |
| h3 | Akkurat LL Cyr TT | 20px | 700 | 18px | — |
| h4 | Akkurat LL Cyr TT | 15px | 700 | 14px | — |
| description | Pixform | 30px | 400 | 27px | — |
| text-pixel | Pixform | 10px | 400 | 9px | — |
| text-grotesk | Akkurat LL Cyr TT | 11px | 400 | 10px | — |
| text-grotesk-bold | Akkurat LL Cyr TT | 11px | 700 | 10px | — |
| caps | Akkurat LL Cyr TT | 8px | 400 | 7px | uppercase |

In CSS: `.text-h1` · `.text-h2` · `.text-h3` · `.text-h4` · `.text-description` · `.text-text-pixel` · `.text-text-grotesk` · `.text-text-grotesk-bold` · `.text-caps`

### Atoms built

None in the current live codebase. The pre-R1 atoms (Btn, Status, Tag, Switch, Error, Avatar, Bar, Avatars, List, TextArea, Input, Dropdown, Graph, SwitchGroup, Icons, Flag) are archived in `_archive_2026-06-23/src/components/`. R2 will rebuild them against the current token system.

### Routes

| Path | Component | Status |
|---|---|---|
| `/ds-dev` | redirect → `/ds-dev/styles` | — |
| `/ds-dev/styles` | DsDevPage | live — token reference |
| `/ds-dev/atoms` | ComingSoonPage | placeholder — R2 |
| `/ds-dev/molecules` | ComingSoonPage | placeholder — R3 |
| `/ds-dev/organisms` | ComingSoonPage | placeholder — R4 |
| `/ds-dev/specimens` | ComingSoonPage | placeholder — R4 |
| `/preview-page` | PreviewPage | placeholder — R2 |

### Sidebar nav

`src/components/Sidebar.jsx` — single `NAV_CONFIG` array at top. Two levels:
- **L1:** Styles · Atoms · Molecules · Organisms · Specimens (route links)
- **L2 (Styles only):** Colors · Semantic · Spacing · Radius · Typography (anchor links with scrollspy)

Active L1: bold + yellow (`var(--accent-default)`) right border.  
Active L2 (scrollspy): text-primary + yellow right border.  
Mobile: fixed overlay sidebar, pill "menu/close" button fixed bottom-right.

---

## Conventions

### Stack
- **Vite 5 + React 18, JSX only** — no TypeScript
- **Tailwind CSS v3** — arbitrary values point at CSS vars: `bg-[var(--surface-page)]`, `text-[var(--text-primary)]`, `gap-[var(--space-8)]`
- **react-router-dom v6** — nested routes under `DsLayout`
- **No JS token objects** — `src/styles/tokens.css` is the single source of truth; parsed at build time via Vite `?raw` import where needed

### Fully token-driven
- No hardcoded hex anywhere in JSX
- No hardcoded `px` values except structural layout (grid template columns, color block height 72px, label min-width 140px)
- All color and spacing via CSS custom properties from `tokens.css`
- Per-item dynamic colors use inline `style={{ backgroundColor: \`var(\${varName})\` }}` — Tailwind purges unknown arbitrary values at build time

### Separation of concerns
- `/preview-page` is completely independent of `/ds-dev` — do not cross-import
- `btn-playground` directory is untouched — never modify it
- `src/styles/tokens.css` values and `@font-face` are immutable — regenerate only from Figma on a deliberate token update

### Fonts
`@font-face` family names must exactly match Figma Primitive string values:
- `'Pixform'` (font/family/pixel)
- `'Akkurat LL Cyr TT'` (font/family/grotesk)
- `'Instrument Serif'` (font/family/antiqa)

Font files are served from `public/fonts/` at `/fonts/<file>`.

---

## Token & naming reference

### CSS variable convention

Figma path → CSS custom property: `/` becomes `-`, prefix `--`.

| Figma path | CSS var |
|---|---|
| `color/gray-50` | `--color-gray-50` |
| `surface/card/default` | `--surface-card-default` |
| `font/family/grotesk` | `--font-family-grotesk` |
| `font/size/11` | `--font-size-11` |
| `font/weight/700` | `--font-weight-700` |
| `space/8` | `--space-8` |
| `radius/4` | `--radius-4` |
| `size/830` | `--size-830` |

### Negatives use `neg` infix

| Figma path | CSS var |
|---|---|
| `space/-1` | `--space-neg-1` |
| `space/-8` | `--space-neg-8` |

(Never `----space-1` — double-dash prefix plus leading minus is invalid CSS var syntax.)

### Tailwind usage pattern

```jsx
// Static token via arbitrary value
<div className="bg-[var(--surface-page)] border-[var(--border-default)]" />

// Dynamic token via inline style (required when var name is runtime-computed)
<div style={{ backgroundColor: `var(${cssVarName})` }} />

// Text style utility class
<p className="text-text-grotesk text-[var(--text-secondary)]" />
```

---

## Docs

Only two documentation files exist in this repo root:

- **README.md** — living present: how to run, current state, conventions
- **RELEASE-NOTES.md** — history: every stage log + decisions + Figma token blueprint

Never create new root `.md` files. All logging goes into one of these two.
