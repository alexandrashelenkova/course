# RELEASE-NOTES — ds-big

Reverse-chronological log of every stage, build, and decision.  
Older entries are preserved verbatim; only exact-duplicate verbose dumps are condensed.

---

## R1.6 — Right sidebar nav — 2026-06-23

### What changed

- **Layout:** Flat `/ds-dev/*` single route → nested routes under `DsLayout`. Two-column flex: main content (`flex-1`) + right sidebar (260px, sticky on desktop / fixed overlay on mobile). Old horizontal sticky top nav removed from DsDevPage.
- **Routing:** `/ds-dev` index redirects to `/ds-dev/styles`. Four placeholder routes wired: atoms, molecules, organisms, specimens → `ComingSoonPage`.
- **Sidebar (`src/components/Sidebar.jsx`):** Single `NAV_CONFIG` array — data-driven, no nav state lives in JSX. L1 = route links; L2 = anchor links, expanded only under active L1.
- **Active states:** L1 active = `font-weight-700` + yellow (`accent/default`) right border + surface-page bg. L2 active (scrollspy) = text-primary + yellow right border. Inactive = text-secondary; quiet hover.
- **Scrollspy:** `window.addEventListener('scroll')` + `el.getBoundingClientRect().top + scrollY` vs 80px offset. Runs only on styles route; cleans up on route change.
- **Mobile:** pill "menu/close" button fixed bottom-right. Backdrop overlay tap-to-close. `translate-x-full` ↔ `translate-x-0` transition 200ms.
- **Section IDs updated** in DsDevPage: `sec-color-prim` → `colors`, `sec-tokens` → `semantic`, `sec-spacing` → `spacing`, `sec-radius` → `radius`, `sec-type` → `typography`.
- **Build:** 40 modules · 12.54 kB CSS · 184.29 kB JS ✅ first attempt

### Decisions

**`fixed` + `lg:sticky` for responsive sidebar:** Mobile uses `position: fixed; inset-y: 0; right: 0` (out of flow, main fills full width). Desktop (≥lg) Tailwind responsive override switches to `sticky top-0 h-screen` (in flow, 260px column). Single element, one state var, no duplicate markup.

**Scrollspy via scroll event (not IntersectionObserver):** `getBoundingClientRect().top + scrollY` compared to `scrollY + 80px` offset. Simpler and more predictable than IntersectionObserver rootMargin tuning for a linear single-page layout. Effect cleans up on route change.

**NAV_CONFIG is the single source of truth for sidebar:** Adding a new top-level section requires one object. Adding a subsection requires one line inside that item's `subsections[]`. No other file changes needed.

**Four placeholder routes wired immediately:** Sidebar links resolve without 404s from day one; R2–R4 fill in content without touching routing or sidebar config.

**Section IDs simplified:** Shorter, URL-fragment-friendly, match the sidebar subsection labels exactly. Renaming should always be paired with a `NAV_CONFIG` update.

---

## R1.5 — /ds-dev redesign — 2026-06-23

### What changed

- **Stale docs deleted** (7 root .md files): ATOMS.md, AUDIT.md, CHANGES.md, COLOR-CLEANUP.md, CURRENT-STATE.md, FIGMA-SOURCE.md, STRUCTURE.md. Each summarized in DECISIONS.md before deletion.
- **DsDevPage.jsx rewritten** — data-driven: `tokens.css` imported as raw string via Vite `?raw`; parsed at module load. No hardcoded token arrays.
- **5 sections:** Color Primitives (6 hue groups from COLOR_PRIM_GROUPS), Semantic Tokens (7 prefix-groups from TOKEN_GROUPS), Spacing (bar scale), Radius (live border-radius boxes), Typography (9 styled specimens).
- **ColorCard click-to-copy:** `navigator.clipboard` + 1.5s `copied ✓` transient indicator in `status/success` color.
- **Old sticky top nav kept** (removed in R1.6).
- **Build:** 37 modules · 11.25 kB CSS · 177.86 kB JS ✅ first attempt

### Decisions

**Data-driven via `?raw` import:** `parseCSSVars()` regex extracts all `--var: value;` declarations; `parseTextClasses()` extracts `.text-*` blocks; `resolveChain()` follows `var(--x)` alias chains up to depth 8. Page can never drift out of sync with the token file.

**COLOR_PRIM_GROUPS filtered against live V dict:** Groups explicitly list expected var names but filter with `v in V` — missing vars disappear silently rather than crashing.

**TOKEN_GROUPS built by prefix from V:** Dynamic prefix matching on `--text-`, `--surface-`, etc. Groups self-update when tokens are added or removed.

**Negative spacing:** `item.px <= 0` → show "negative offset" label instead of a bar (negative bar width is nonsensical).

**ColorCard uses inline `style` for per-item dynamic color:** Tailwind purges arbitrary values whose var name is unknown at build time. Static structural classes (rounded, border, overflow-hidden) remain as Tailwind utilities.

**Structural px values not tokenized:** `height: '72px'` (color block), `minWidth: '140px'` (spacing label column), grid template columns — no Figma primitives for these structural slots.

---

## R1 — React rebuild — 2026-06-23

### What changed

- **Archive (STEP 1):** 11 items moved to `_archive_2026-06-23/` — dist/, src/App.jsx, src/main.jsx, src/index.css, src/styles/fonts.css, src/styles/tokens.css, src/components/ (all atoms), src/pages/ (DsDevPage, PreviewPage, PageRoute), src/assets/avatars+flags+icons. Font files never archived — consolidated to `public/fonts/`.
- **Figma source read (STEP 2):** 49 Primitives + 26 Tokens + 9 text styles extracted from Figma `hweXsvd1QXslnovecOVKzy`.
- **tokens.css regenerated (STEP 3):** `src/styles/tokens.css` — 5 `@font-face`, 49 primitive vars, 26 token vars (all `var()` aliases), 9 text-style utility classes. `@tailwind` directives at top → single CSS import in `main.jsx`.
- **App shell (STEP 4):** `main.jsx` + `App.jsx` (react-router) + `DsDevPage` (inline hardcoded token preview, replaced in R1.5) + `PreviewPage` (placeholder).
- **Build (STEP 5):** 36 modules · 10.20 kB CSS · 169.56 kB JS ✅ first attempt

### Decisions

**CSS naming convention:** Figma `/` → CSS `-`, prefix `--`. Negatives use `neg` infix: `space/-1` → `--space-neg-1`, `space/-8` → `--space-neg-8`. Avoids the syntactically invalid `----space-1`.

**Font family string precision:** `@font-face font-family` declarations match Figma Primitive values exactly: `'Pixform'`, `'Akkurat LL Cyr TT'`, `'Instrument Serif'`. Old `fonts.css` used `'Akkurat LL Cyrillic'` (wrong); R1 corrects this to match the Figma Primitive and the actual font file name.

**Fonts consolidated to `public/fonts/`:** Served at `/fonts/<file>` via Vite's `public/` passthrough. Old source locations in `fonts/` (root) and `src/assets/fonts/` left intact — never archive font files.

**Tailwind directives in tokens.css:** `@tailwind base/components/utilities` placed at top so `main.jsx` has one CSS import. `src/index.css` (which only contained the three directives) was archived.

**No old API CSS var names carried forward:** R1 tokens.css uses Figma-native names (`--color-gray-50`, `--surface-page`, `--radius-4`). Old names (`--indents-m`, `--rounds-s`, `--color-background-base`) are in archive. Components rebuilt in R2+ must use new names.

**File classification:** `package.json`, lockfile, `vite.config.*`, `tailwind.config.*`, `postcss.config.*`, `index.html`, `.gitignore`, `.git/`, `node_modules/`, root `*.md`, all font files — kept. Everything else → archived.

---

## Stage 3.11 — Legacy collection deletion — 2026-06-23

- **Pre-scan:** 67 node refs (expected 1). 66 INSTANCE nodes had their own override bindings (scalar padding/radius + paint-level fills/strokes) still pointing to old vars — Stage 3.10 had skipped all instances.
- **Pass 5 (pre-deletion):** Fixed all fixable instance overrides: 52 scalar fixes via `setBoundVariable` + all paint-level fill/stroke overrides via `setBoundVariableForPaint`. 0 unfixable slot bindings on instances.
- **Deleted:** VariableCollectionId:2006:13229 (58 vars) · 2006:13288 (1 var) · 2006:13290 (21 vars) — all named "variables".
- **Post-state:** Primitives (49) + Tokens (26) — exact expected state ✓
- **1 broken ref remains:** Rectangle 229 (357:35710) `boundVariables.fills[0]` → deleted var 2006:13260. Paint-level binding (`fills[0].bvColor` = 6051:45) intact. Manual fix required in Figma UI.

### Decisions

**Instance overrides repointed before collection deletion:** Stage 3.10 skipped all INSTANCE nodes. Pre-delete scan discovered 66 instances with override bindings still pointing to old vars. Decision: run Pass 5 to fix all fixable overrides before deleting, minimizing broken refs.

**Rectangle 229 slot binding is the only remaining broken ref:** `node.boundVariables.fills[0]` points to deleted var. `node.setBoundVariable('fills', ...)` throws "fills and strokes variable bindings must be set on paints directly" — slot-level fills are not settable via Plugin API. Paint-level binding is intact and correct; visual rendering unaffected.

---

## Stage 3.10 — Repoint pass — 2026-06-22

- **STEP 0:** Created `Primitives/space/-1` (VariableID:6088:2, value=-1) for `indents/-1` mapping.
- **Pre-check:** 0 flags. All OLD→NEW ds-mode value-equality checks passed (grotesk rename skipped as intentional).
- **Total sites repointed: 2,773** across 4 passes:
  - Pass 1: fills/strokes paint color + scalar node fields → 2,424 sites
  - Pass 2: fontFamily/fontSize array-form bindings → 305 sites
  - Pass 3: layoutGrids gutterSize/offset → 40 sites
  - Pass 4: gridRowGap/gridColumnGap → 4 sites
- **Decisions applied:** wf mode abandoned (ds values only); Yellow dark mapped to `surface/card/on-card/yellow` by value; grotesk family-name corrected to "Akkurat LL Cyr TT"; indents/-1 → new space/-1; indents/XXL → space/90 (ds value).
- **1 FLAG — Rectangle 229 (357:35710):** Node-level fills slot binding unfixable via Plugin API (see Stage 3.11 for resolution).

### Decisions

**`space/-1` created as new Primitive:** Value -1 had no matching Primitive (closest: space/-8 = -8). Decision: create it rather than map to -8. Rationale: -1 (hairline overlap) and -8 (significant negative indent) are different design intents; silently swapping would change layouts.

**wf mode abandoned:** Old collections had a "wf" (wireframe) mode with different values. New Primitives has only "ds" mode. Decision: map every old variable by ds-mode value only. wf mode deprecated.

**Yellow dark (#FFFD9E) mapped to surface/card/on-card/yellow:** Old var `Color/Controls/On Color/Yellow dark` (2006:13281) has anomalous name — value resolves to a card-surface color, not a control-on-color. Mapped by value match.

**On cads/Yellow (#E0E2A4) mapped to surface/card/yellow (not on-card/yellow):** Old var `Color/Background/On cads/Yellow` (2006:13283) has misleading name — value = yellow-200 = surface/card/yellow. Mapped by value, correcting the old naming error.

**grotesk family-name correction is intentional:** Old C3 ds value "Akkurat LL Cyrillic" ≠ new Primitive "Akkurat LL Cyr TT". Rebinding the 1 consumer node to the new Primitive corrects the font family name string.

**Rectangle 229 fills slot binding — unfixable via Plugin API:** `node.setBoundVariable('fills', ...)` throws. Paint-level fix via `setBoundVariableForPaint` succeeds but does not clear the node-level slot. Manual reconnect in Figma UI required.

---

## Stage 3.9 — Migration audit — 2026-06-22

Read-only audit across all 27,139 nodes (6 pages) to map old variables to new Primitives/Tokens.

| Metric | Count |
|---|---|
| Old variables total (3 collections) | 80 |
| Confidently mapped | 61 |
| FLAGGED (needs review) | 10 |
| Unused, safe to drop | 9 |
| Total unique node consumer refs | ~25,800 |

**FLAGGED items (resolved in Stage 3.10):**
- `Color/Controls/On Color/Yellow dark` — value = yellow-100 (card surface), not a control color
- `Color/Background/On cads/Yellow` — name implies on-card but value = surface/card/yellow
- `radius/L` (Coll3) — wf=4 ≠ ds=12; new Primitives has no wf mode
- `font/family/grotesk` (Coll3) — old value "Akkurat LL Cyrillic" ≠ new Primitive
- `indents/-1` (Coll3) — value -1; no space/-1 Primitive → created in Stage 3.10
- `indents/XXL (out)` (Coll3) — wf=60; no space/60 Primitive → ds value 90 used
- `font/family/Antiqa` (Coll2) — wf="Inter"; 0 consumers, safe to drop
- 3× font-size vars (Coll3) — wf/ds mode mismatches; all 0 consumers

---

## Stage 3.8 — Typography frame wired — 2026-06-22

- **Frame:** `typography` (2001:19516) → `table` (2001:19517) — 5 columns, 9 data rows.
- **Specimens (9/9):** All 9 name-column nodes have their matching text style applied.
- **Metadata (40 cells):** All 4 columns set to `text-grotesk` style. Content corrections: 5 font cells "Akkurat LL Cyrillic" → "Akkurat LL Cyr TT"; 9 weight cells "Regular/Semibold/Bold" → "400/700".

### Decisions

**Weight column to numeric values:** Original cells used "Regular", "Semibold", "Bold". Changed to "400" and "700" to match Primitive values and avoid the ambiguity of "Semibold" (not a weight in the system — only 400 and 700 exist).

**Specimen nodes serve as both label and specimen:** The name column text node is simultaneously the row identifier and the typography specimen. Applied text styles directly; no separate specimen frame needed.

---

## Stage 3.7 — Text styles created — 2026-06-22

- **Fonts loaded:** Instrument Serif Regular, Akkurat LL Cyr TT Regular/Bold, Pixform Regular — all OK.
- **9 styles created:** h1, h2, h3, h4, description, text-pixel, text-grotesk, text-grotesk-bold, caps.
- **27 bindings:** fontFamily + fontSize + fontWeight bound for every style. Zero raw fallbacks.
- **caps:** textCase = UPPER (only style with text transform).
- **lineHeight:** fixed PIXELS on all styles — not bindable via Plugin API.

### Decisions

**lineHeight as fixed PIXELS:** `TextStyle.lineHeight` accepts `{ value, unit }` — there is no `setBoundVariable` path for lineHeight. Fixed pixel values from the blueprint used on all 9 styles.

**fontWeight binding explicit even though fontName.style encodes it:** Binding `fontWeight` to `font/weight/400` or `font/weight/700` keeps the token system self-consistent. If the weight primitive changes, styles update automatically.

---

## Stage 3.6 — Page reorg complete — 2026-06-22

- **Font gate:** `Akkurat LL Cyr TT` (Regular + Bold), `Pixform` (Regular), `Instrument Serif` (Regular) all confirmed via `listAvailableFontsAsync`. Uploaded between Stage 3.5 and this run.
- **4 sections moved:** ds-atoms → Atoms, ds-molecules → Molecules, ds-organisms → Organisms, design → Specimens. All read-back confirmed.
- **Design page deleted:** 0 children; guard passed; `page.remove()` executed. Confirmed absent.
- **Final structure:** Cover(0) · Styles(1) · Atoms(2) · Molecules(3) · Organisms(4) · Specimens(5)

### Decisions

**Font gate is mandatory pre-check for section moves:** Cloud MCP runner cannot load local fonts. `figma.loadFontAsync` throws; `page.appendChild(section)` blocks until all fonts in subtree are loaded. Always run `listAvailableFontsAsync` first.

**Design page deleted (guarded):** Guard: name = "Design" AND childCount = 0. Active page switched to Cover first. Only authorized deletion in this run.

---

## Stage 3.5 — Organize + pages — 2026-06-22

- **Variable reorder:** NOT attempted via API — `variableIds` is read-only. Delete + recreate would break all alias chains. Manual drag required in Figma UI.
- **Swatch frame 2001:19573:** 22 ellipses repositioned in family order. 22 Inter Regular 11px text labels added at x=208. Frame widened 282 → 430px.
- **Pages created:** Cover (pre-existing), Styles, Atoms, Molecules, Organisms, Specimens, Design.
- **Section moves — 2/6 OK:** `styles → Styles` ✅; `Frame 1728 → Cover` ✅ (best-guess). Four blocked by cloud font limitation — resolved in Stage 3.6.

### Decisions

**Frame 1728 → Cover:** Nav/orientation frame with no section parent. Moved to Cover as document header artifact. Flagged — may need manual relocation.

---

## Stage 3.4 — Palette expanded + frame synced — 2026-06-22

- **Primitives:** 11 → **21** colour (+gray-50, red-100/200/300/400, teal-200, purple-200, yellow-100/200, yellow-dark).
- **Tokens:** 15 → **26** (+surface/card/×5 pastel groups, surface/card/on-card/×5, text/yellow-dark; surface/page → gray-50; surface/card renamed to surface/card/default; control/secondary → gray-100).
- **All 14 previously-flagged 🚩 and 1 ⚠️ old colour vars resolved. 0 remaining flags.**
- **Swatch frame:** 11 → 22 ellipses. 1 legacy unbound swatch (Ellipse 21 / #f5dedb blush) remains — no Primitive match, cannot delete.

### Decisions

**Primitive naming: tonal scale, no semantic names:** `red-100` through `red-400`; lower number = lighter tint. `yellow-dark` is an exception (saturated olive #646905, not a tint of yellow).

**`surface/card` renamed to `surface/card/default` before adding card group:** Figma variable names use `/` as group separators. A leaf variable and a folder cannot share the same path segment — must rename before creating `surface/card/red` etc.

**`control/secondary` repointed to gray-100 (#eaeaea):** Stage 3.3 blueprint said gray-200 based on semantic inference. Actual old `Color/Controls/Secondary/default` = #eaeaea = gray-100. Corrected to match real design value. Can be flipped to gray-200 if a darker input background is ever desired.

**Font-family values in Primitives: `Akkurat LL Cyr TT` (not "Akkurat LL Cyrillic"):** Matches old Collection 1 value and the actual font file name. Collection 3 had "Akkurat LL Cyrillic" — a variant spelling, not used in new Primitives.

---

## Stage 3.3 — Figma variables rebuilt from blueprint — 2026-06-21

- **Primitives** (6051:2) built fresh: 38 vars — 11 color + 3 font-family + 8 font-size + 2 font-weight + 9 space + 4 radius + 1 size.
- **Tokens** (6051:41) built fresh: 15 color aliases — every alias resolved to correct hex.
- **18/33** old colour vars mapped cleanly. **1** ambiguous. **14** flagged (pastel palette — no primitive match at this stage; resolved in Stage 3.4).
- Old 3 collections (58+1+21 vars) left untouched.
- `size/830` placed under `size/` group (canvas layout base width).
- space/ values confirmed from live `indents/` ds data: `-8·2·4·8·14·20·24·30·90` (blueprint estimate discarded).
- radius/ values confirmed from live `rounds/` ds data: `4·8·12·999` (blueprint estimate discarded).

### Decisions

**Additive-only build:** New collections built fresh alongside old ones. Nothing merged or deleted. Components remain bound to old collections until repointing pass.

**`size/830` in Primitives `size/` group:** Canvas layout base width. Naming follows value-as-name convention: `size/830`. Future component heights (btn=32, etc.) will join this group.

**`control/secondary` → gray-200 (blueprint) at this stage:** Followed blueprint exactly. Corrected to gray-100 in Stage 3.4.

---

## Stage 3.2 — Figma color cleanup — 2026-06-21

- **Collections merged:** Added "wf" mode to Collection 1; migrated 18 vars + created 3 new; removed all C2/C3 vars. C2/C3 left empty (no API to delete collections).
- **11 color paint styles created** from palette swatches (Ellipses 12–22, node 2001:19573).
- **1 variable de-hexed:** `Color/Controls/Secondary/default` → alias `Color/lines`. Only 1 of 33 color vars had a direct primitive match.
- **11 raw-hex vars flagged** — no primitive match, left as-is.

### Decisions

**`variable.moveToCollection()` does not exist in Figma Plugin API:** Collection merge done by: adding wf mode to C1, copying wf values from C2/C3, removing C2/C3 variables. Empty collections left for manual deletion — Plugin API also has no `collection.delete()` at this stage.

**Name collision strategy:** (1) exact match → write wf value; (2) case mismatch → merge into C1 capitalised var; (3) unique C2/C3 name → create new var in C1.

**Color/blush (#f5dedb):** 11th swatch has no matching variable (`Color/Background/On cads/Red` = #f7e0dd, 2 points off). Paint style created with exact hex; variable deferred to design decision.

**Controls/Secondary/default wf mode also aliased:** wf mode auto-populated with raw hex when mode was added to C1. Fixed: wf also set to `VARIABLE_ALIAS:2006:13252`.

---

## Stage 3.1 — Token reconciliation — 2026-06-21

Complete re-extraction of Figma variables. `tokens.css` fully reconciled. All 16 atoms + DsDevPage + PreviewPage + PageRoute consumer references updated.

| Category | Added | Renamed | Value fixed | Removed |
|---|---|---|---|---|
| Colors | 21 | 11 | 2 | 0 |
| Font families | 0 | 1 | 0 | 0 |
| Font sizes | 0 | 4 | 0 | 2 |
| Spacing | 0 | 9 | 2 | 0 |
| Radius | 1 | 3 | 1 | 0 |
| Layout | 1 | 0 | 0 | 0 |

### Decisions

**No separate primitive color layer:** Single collection holds both primitives and semantics. Treated direct-hex vars as primitives; duplicate-value vars aliased to primitives in hygiene pass.

**Token naming: slash → dash, strip parens, `&` dropped:** `Color/Text & icon/Secondary` → `--color-text-icon-secondary`. `indents/-(XS)` → `--indents-neg-xs`.

**`indents/XXL (out)` = 90px (ds), not 60px:** Stage 2 used the wf mode value (60). Corrected to ds value (90).

**`rounds/S = 4` was incorrectly named `--radius-l`:** Full set: S=4, M=8, L=12, Over=999. Radius-l was actually rounds/S. Fixed.

**`indents/-(XS) = -8`, not -1:** Stage 2 used -1 from context. Figma variable is -8. Fixed.

**`Color/gray = #cbcbcb`:** Stage 2 had #eaeaea (which was `Color/Controls/Secondary/default`). Both tokens now exist with correct values.

**`rounds/Over = 999`, not 9999:** Stage 2 used 9999. Figma variable value is 999. Fixed.

**Icon paths inlined as JSX constants:** Downloaded SVGs had `<rect fill="#F5F5F5">` backgrounds stripped. Only `<path d={...}>` retained in Icons.jsx with configurable `color` prop.

**CSS custom properties in SVG fill:** `var(--...)` in inline SVG `fill` attributes resolved by modern browsers (Chrome 49+, Firefox 29+, Safari 9.1+).

---

## Stage 3 — Atoms — 2026-06-21

**Stage 2 flags resolved:**
- H3/H4 weight corrected to Bold (700) — no Semibold file exists; Bold used.
- spacing XXL Figma label updated "90px" → "60px" (node 2001:19602) — note: later corrected again; actual ds value is 90.
- `/preview-page` route added; `/page/` stub retired.

**16 atoms built** (`src/components/atoms/`): Btn, Status, Tag, Switch, Error, Avatar, Bar, Avatars, List, TextArea, Input, Dropdown, Graph, SwitchGroup, Icons, Flag. *(Archived in R1 — rebuild in R2 against current token system.)*

**Assets downloaded:** 3 avatar PNGs · 5 icon SVGs · 2 flag SVGs. *(Archived in R1.)*

**Build:** 57 modules, 0 errors.

### Decisions

**Bar: dotted-track via CSS gradient:** Figma renders 200 individual 5px dots. Decision: `repeating-linear-gradient` — visually equivalent, eliminates 200 DOM nodes.

**Switch: tab selector, not toggle:** "switch" atom is a text-based tab selector (big+on = white bg, big+off = transparent). Renamed prop from `switch` → `checked`.

**Status: CSS circles, not PNG:** Figma exports 5px dots as PNGs. Decision: `border-radius: 50%` spans with `--color-tech-*` tokens. Eliminates image assets for 5px decorations.

**`Error` component imported as `ErrorAtom`:** `Error` is a JavaScript built-in constructor. Component file remains `Error.jsx` with `export default function Error`; imported aliased to avoid shadowing.

---

## Stage 2 — Styles — 2026-06-21

- **React app scaffolded manually** (Vite 5 + React 18 + Tailwind CSS v3 + react-router-dom v6). `npm create vite@latest .` not used — cancels on non-empty directories.
- **tokens.css written** — 11 colors, 9 type styles, 9 spacing steps, 1 radius. Fonts: Instrument Serif, Akkurat LL Cyrillic, Pixform.
- **Routes:** `/ds-dev/*` and `/page/*`.
- **Build:** 38 modules ✅. Dev server: `http://localhost:5173/`.
- **Flags:** Akkurat LL Cyrillic Semibold missing (Bold used for H3/H4); spacing XXL label said 90px but variable = 60 (both later corrected in 3.1).

### Decisions

**Stack:** Vite 5 + @vitejs/plugin-react · React 18, JSX only (no TS) · Tailwind CSS v3 (v4 has different config shape) · react-router-dom v6.

**Tailwind kept minimal:** No theme extension. All consumption via `var(--...)` arbitrary values. tokens.css is the single source of truth.

**0 shadows defined in Figma.**

---

## Stage 1c — Page restructure — 2026-06-21

- Created 6 pages (Prepare, Styles, Atoms, Molecules, Organisms, Specimens); Cover pre-existing.
- Moved 6 sections — 4 direct, 2 best-guess (`design` → Specimens; `Frame 1728` → Prepare).
- Old "Design" page left empty; Prepare page later deleted (only content was Frame 1728 nav junk).

### Decisions

**`design` section → Specimens:** Contains product screen wireframes (All_teams, Hiring_campaign, Candidate, etc.) — not DS components but DS applied in product contexts.

**`Frame 1728` → Prepare → Cover:** Nav/orientation label bar. No section parent. Moved to Cover as document header artifact.

---

## Stage 1 — Prep — 2026-06-21

Figma file `hweXsvd1QXslnovecOVKzy`. Inventory, naming cleanup, typo fixes, descriptions.

- **6 component sets renamed:** `switch group` → `switch_group`, `card metric` → `card_metric`, `Cards metrica` → `cards_metrics`, `attemt` → `attempt`, `canban` → `kanban`, `card top` → `card_top`.
- **9 variant/layer names fixed:** `builider` → `builder`; `CTA?` property → `CTA`; `On color` → `on_color` across btn/dropdown; `::` → `offer_flow`.
- **Descriptions added** to 33 component sets.
- **1 orphan deleted:** Ellipse 12 (357:59098) — stray, no parent frame, no usages.
- **8 items deferred:** `Property 1` generic renames, `Variant2` placeholders, typography/color style layer renames, variable collections.

### Decisions

**Snake_case for component set names:** Matches existing majority (`text_area`, `campaign_preview`). All-lowercase for variant values (matches majority: `type=secondary`, `switch=on`).

**`CTA?` → `CTA`:** `?` is not valid in Figma variant property names. Renamed by updating all 5 btn variant node names.

**`::` → `offer_flow`:** Frame at x=120, y=6257 contains text about candidate offer acceptance flow. Named descriptively.

---

## Figma migration summary

The ds-big Figma file underwent a complete token system migration across Stages 3.1–3.11. Starting from a single "variables" collection with 80 variables spread across three collections (IDs 2006:13229/13288/13290) using inconsistent naming and dual wireframe/design modes, the project was rebuilt with two clean collections: **Primitives** (6051:2, 49 vars — raw values, hidden from designers) and **Tokens** (6051:41, 26 vars — semantic roles, all VARIABLE_ALIAS pointing to Primitives). The migration required a full audit across 27,139 nodes (6 pages), a 4-pass repoint operation touching 2,773 binding sites (fills/strokes, fontFamily/fontSize, layoutGrids, gap fields), a pre-deletion pass to fix 66 INSTANCE node override bindings that Stage 3.10 had skipped, and finally deletion of all three legacy collections. One binding site remains manually fixable: Rectangle 229 (357:35710) has a node-level fills slot binding to a deleted variable that the Plugin API cannot clear programmatically — visual rendering is unaffected because the paint-level binding is correct; the fix is to disconnect and reconnect the fills variable to `surface/page` in the Figma UI.

---

## Token & Type Blueprint (canonical spec)

*The following section is the verbatim content of the original TOKENS-BLUEPRINT.md.*

---

# TOKENS-BLUEPRINT.md — ds-big design system

Single source of truth for the Figma variable + style architecture.
Build Figma from this blueprint first, then mirror it into React (`tokens.css`).

## Architecture

Two variable collections:

- **Primitives** (`VariableCollectionId:6051:2`) — raw values. The only place hex and literal numbers live. Hidden from designers.
- **Tokens** (`VariableCollectionId:6051:41`) — semantic roles. Each one references a Primitive. This is what gets applied in designs.

Naming rule: the group already gives the context, so a variable's name inside a group is just its value or role (e.g. `space/16`, never `space/space-16`). Numeric scales for size / space / radius; hue names for colour primitives (tonal suffixes 50/100/200/400 follow a light-to-dark convention, lower = lighter).

---

## Collection 1 — Primitives (`VariableCollectionId:6051:2`, mode `ds` = `6051:0`)

### color/  (21 — the only place hex lives)

| name | hex | ID |
|---|---|---|
| white | #FFFFFF | 6051:3 |
| black | #000000 | 6051:4 |
| gray-50 | #f2f2f2 | 6059:2 |
| gray-100 | #EAEAEA | 6051:5 |
| gray-200 | #CBCBCB | 6051:6 |
| gray-400 | #979797 | 6051:7 |
| yellow | #FFE900 | 6051:8 |
| yellow-100 | #fffd9e | 6059:9 |
| yellow-200 | #e0e2a4 | 6059:10 |
| yellow-dark | #646905 | 6059:11 |
| purple | #9747FF | 6051:9 |
| purple-200 | #ddd6ef | 6059:8 |
| red | #CC0000 | 6051:10 |
| red-100 | #ffe3f1 | 6059:3 |
| red-200 | #f7e0dd | 6059:4 |
| red-300 | #fad5e7 | 6059:5 |
| red-400 | #f5cfca | 6059:6 |
| teal | #00867B | 6051:11 |
| teal-200 | #d4eee7 | 6059:7 |
| gold | #D1A63B | 6051:12 |
| sage | #B8C6C3 | 6051:13 |

Tonal scale meaning: `red` = full-saturation brand/status red; `red-400`/`red-300`/`red-200`/`red-100` are progressively lighter tints used as card surfaces and on-card highlights.

### font/family/  (3 — string)

| name | value | ID |
|---|---|---|
| pixel | Pixform | 6051:14 |
| grotesk | Akkurat LL Cyr TT | 6051:15 |
| antiqa | Instrument Serif | 6051:16 |

### font/size/  (8 — number)

`8 · 10 · 11 · 15 · 20 · 30 · 40 · 84`  
IDs: 6051:17–6051:24 (8, 10, 11, 15, 20, 30, 40, 84)

### font/weight/  (2 — number)

`400 · 700`  (former Semibold 600 unified to 700)  
IDs: 6051:25–6051:26

### space/  (9 — number, confirmed from `indents/` ds values)

| value | ID | Old `indents/` name |
|---|---|---|
| -8 | 6051:27 | indents/-(XS) |
| 2 | 6051:28 | indents/XXXS |
| 4 | 6051:29 | indents/XXS |
| 8 | 6051:30 | indents/XS |
| 14 | 6051:31 | indents/S (inner) |
| 20 | 6051:32 | indents/M |
| 24 | 6051:33 | indents/L |
| 30 | 6051:34 | indents/X |
| 90 | 6051:35 | indents/XXL (out) |

### radius/  (4 — number, confirmed from `rounds/` ds values)

| value | ID | Old `rounds/` name |
|---|---|---|
| 4 | 6051:36 | rounds/S |
| 8 | 6051:37 | rounds/M |
| 12 | 6051:38 | rounds/L |
| 999 | 6051:39 | rounds/Over |

### size/  (1 — number)

| name | value | ID |
|---|---|---|
| size/830 | 830 | 6051:40 |

---

## Collection 2 — Tokens  (`VariableCollectionId:6051:41`, mode `ds` = `6051:1`)

Each token references a Primitive by VARIABLE_ALIAS.

### text/
| token | → Primitive | resolved | ID |
|---|---|---|---|
| primary | black | #000000 | 6051:42 |
| secondary | gray-400 | #979797 | 6051:43 |
| on-color | white | #ffffff | 6051:44 |
| yellow-dark | yellow-dark | #646905 | 6060:12 |

### surface/
| token | → Primitive | resolved | ID |
|---|---|---|---|
| page | gray-50 | #f2f2f2 | 6051:45 |
| card/default | white | #ffffff | 6051:46 |
| card/red | red-400 | #f5cfca | 6060:2 |
| card/pink | red-300 | #fad5e7 | 6060:3 |
| card/green | teal-200 | #d4eee7 | 6060:4 |
| card/violet | purple-200 | #ddd6ef | 6060:5 |
| card/yellow | yellow-200 | #e0e2a4 | 6060:6 |
| card/on-card/red | red-200 | #f7e0dd | 6060:7 |
| card/on-card/pink | red-100 | #ffe3f1 | 6060:8 |
| card/on-card/green | teal-200 | #d4eee7 | 6060:9 |
| card/on-card/violet | purple-200 | #ddd6ef | 6060:10 |
| card/on-card/yellow | yellow-100 | #fffd9e | 6060:11 |

### border/
| token | → Primitive | resolved | ID |
|---|---|---|---|
| default | gray-100 | #eaeaea | 6051:47 |

### control/
| token | → Primitive | resolved | ID |
|---|---|---|---|
| secondary | gray-100 | #eaeaea | 6051:48 |
| on-color | white | #ffffff | 6051:49 |

Note: `control/secondary` → gray-100 (#eaeaea) — matches the real old value. Can be flipped to gray-200 (#cbcbcb) if a darker input background is desired.

### bar/
| token | → Primitive | resolved | ID |
|---|---|---|---|
| on-base-filled | sage | #b8c6c3 | 6051:50 |
| on-base-empty | white | #ffffff | 6051:51 |

### status/
| token | → Primitive | resolved | ID |
|---|---|---|---|
| info | purple | #9747ff | 6051:52 |
| success | teal | #00867b | 6051:53 |
| error | red | #cc0000 | 6051:54 |

### accent/
| token | → Primitive | resolved | ID |
|---|---|---|---|
| default | yellow | #ffe900 | 6051:55 |
| gold | gold | #d1a63b | 6051:56 |

---

## Text styles  (9 — composite; line-height stays on the style, not a variable)

| style | family | size | weight | line-height |
|---|---|---|---|---|
| `h1` | antiqa | 84 | 400 | 76 |
| `h2` | antiqa | 40 | 400 | 36 |
| `h3` | grotesk | 20 | 700 | 18 |
| `h4` | grotesk | 15 | 700 | 14 |
| `description` | pixel | 30 | 400 | 27 |
| `text-pixel` | pixel | 10 | 400 | 9 |
| `text-grotesk` | grotesk | 11 | 400 | 10 |
| `text-grotesk-bold` | grotesk | 11 | 700 | 10 |
| `caps` | grotesk | 8 | 400 | 7 |

`family` / `size` / `weight` bind to Primitive variables. `line-height` is a fixed value on the style.

---

## Colour frame (Figma node 2001:19573)

22 ellipse swatches (102×102, x=90, y=90+n×110, no auto-layout).  
21 swatches bound to their Primitive variable. 1 legacy unbound swatch (Ellipse 21 / #f5dedb blush) remains — not a primitive, cannot delete.

---

## Open items

1. **Legacy blush swatch** (Ellipse 21 / #f5dedb): no matching Primitive variable. Options: add `color/red-50 #f5dedb` as a 22nd Primitive, or leave as an unbound decoration.
2. **Old 3 "variables" collections** (2006:13229 / 2006:13288 / 2006:13290): ~~retire after re-pointing component bindings~~ **COMPLETED in Stage 3.11.**
3. **Text styles**: ~~0 defined in Figma~~ **COMPLETED in Stage 3.7** — 9 styles bound to Primitives.

## React caveat (later stage, not now)

H3/H4 use weight 700 (Bold). `font/weight/` has only 400 and 700 — no Semibold needed. The AkkuratLLCyrTT-Bold.ttf file in `public/fonts/` satisfies this.
