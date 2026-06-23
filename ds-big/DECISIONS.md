# DECISIONS.md — ds-big

Decision log. Created in R2 (DECISIONS.md was deleted during doc consolidation in the prior session; recreated here per explicit R2 task instruction "log only into DECISIONS.md").

---

## R2 — Atoms — 2026-06-23

### Part A — Atoms inventory (ds-atoms section 357:33706)

**16 component sets found:**

| # | Figma name   | Node       | Variants                                                  |
|---|--------------|------------|-----------------------------------------------------------|
| 1 | btn          | 357:35427  | CTA=no/yes × type=secondary/On color/small/big/node (5)  |
| 2 | switch       | 357:35345  | switch=on/off × size=big/small (4)                        |
| 3 | switch group | 357:35420  | Default (1 — 3 tab instances)                             |
| 4 | dropdown     | 357:35391  | Property1=On color/default × filled=on/off (4)            |
| 5 | tag          | 357:35359  | Property1=control/static (2)                              |
| 6 | input        | 357:35386  | Default (1)                                               |
| 7 | text_area    | 357:35381  | Default (1)                                               |
| 8 | status       | 357:35321  | Property1=purple/green/red/stopped (4)                    |
| 9 | error        | 357:35365  | Default (1)                                               |
|10 | avatar       | 357:35314  | Property1=katya/dog/petya (3)                             |
|11 | avatars      | 357:35369  | Default (1 — 3 overlapping avatars)                       |
|12 | bar          | 357:33707  | Property1=Default/big × length=20%/75% (4)                |
|13 | icons        | 357:35334  | Property1=play/user/more/arrow-down/close (5)             |
|14 | flag         | 357:35354  | Property1=no/yes (2)                                      |
|15 | list         | 357:35374  | Default (1 — table row with 4 columns)                    |
|16 | graph        | 357:35416  | Default (1 — 2 bars)                                      |

**Token bindings extracted:**
- btn: `--control-secondary`, `--control-on-color`, `--text-primary`, `--surface-card-on-card-red`, `--surface-page`, `--radius-999`, `--radius-4`, `--font-family-pixel`, `--font-family-antiqa`, `--font-family-grotesk`, `--space-8`, `--space-14`, `--space-20`
- switch: `--control-secondary`, `--text-on-color`, `--text-primary`, `--text-secondary`, `--radius-4`, `--font-family-pixel`, `--font-family-grotesk`
- switch group: `--accent-default`, `--text-on-color`, `--text-primary`, `--radius-8`, `--radius-4`, `--space-2`, `--space-4`, `--space-14`
- dropdown: `--accent-gold`, `--control-secondary`, `--text-on-color`, `--text-primary`, `--text-secondary`, `--radius-4`, `--space-8`, `--space-14`, `--font-family-pixel`, `--font-family-grotesk`
- tag: `--control-secondary`, `--surface-card-on-card-red`, `--text-primary`, `--radius-4`, `--space-8`
- input/text_area: `--control-secondary`, `--text-primary`, `--color-gray-200`, `--radius-4`, `--space-8`, `--space-14`, `--font-family-pixel`, `--font-family-grotesk`
- status: `--status-info`, `--status-success`, `--status-error`, `--color-gray-200`, `--font-family-pixel`
- error: `--surface-card-on-card-red`, `--status-error`, `--radius-4`, `--space-8`, `--space-14`, `--font-family-grotesk`
- avatar/avatars: image assets + `--space-neg-8`
- bar: `--bar-on-base-filled`, `--bar-on-base-empty`
- icons: currentColor SVG (no token fills)
- flag: `--text-primary`, `--text-secondary` on SVG (no token fills in Figma)
- list: `--border-default`, `--text-primary`, `--control-secondary`, `--radius-999`, `--space-14`, `--font-family-grotesk`, `--font-family-pixel`
- graph: `--text-secondary`, `--radius-4`, `--space-2`, mix-blend-multiply
- switch_group: `--accent-default`, `--text-on-color`, `--radius-8`, `--radius-4`

---

### Part B — Component build decisions

**Atom folder:** `src/ds-dev/atoms/` — new folder; no existing folder was established to match. Using `src/ds-dev/atoms/` as specified in the task. (Archive pre-R1 used `src/components/atoms/`; deliberately not reusing to avoid confusion with the rewritten token system.)

**State tokens added to tokens.css `:root`:**
- `--state-hover: rgba(0,0,0,0.06)` — subtle darkening overlay on any background
- `--state-pressed: rgba(0,0,0,0.12)` — slightly stronger press overlay
- `--state-focus-ring: var(--color-black)` — high-contrast visible ring, works on all bg colors

**`.ds-interactive` utility class added to tokens.css:**
Single class handles all states — hover/pressed via `::after` overlay, focus via `:focus-visible` outline, disabled via `opacity: 0.45`. `@media (prefers-reduced-motion: reduce)` strips transform and drops duration to 0 for `::after`. Defined once, reused across all interactive atoms.

**`overflow: hidden` on `.ds-interactive`:** Clips the `::after` overlay to the element's border-radius boundary. Safe: element's own `:focus-visible` outline draws outside its border-box and is never clipped by its own overflow property.

**Bar — CSS radial-gradient:** Figma renders 200 individual 5px dots. Decision: `radial-gradient(circle, var(--bar-on-base-filled) 2.5px, transparent 2.5px)` + `background-size: 7px 5px`. Two adjacent divs (filled segment + empty segment) split at `value%`. Same visual result, no DOM nodes. (Same approach as pre-R1 archive.)

**Status dots — CSS `border-radius: 50%`:** Figma exports 5px dots as PNG images. Decision: CSS circles with `backgroundColor: var(--status-*)`. Eliminates image assets for 5px decorations. (Same as pre-R1 archive.)

**Icons — inline SVG paths:** Figma `Icons` component returns empty 16×16 div (cannot export SVG via Plugin API context). Decision: hand-authored SVG paths for 5 icons using `currentColor`, so icons inherit parent text color without a separate color prop. Paths: play=solid triangle; user=circle+arc; more=3 circles; arrow-down=chevron; close=X strokes.

**Flag — SVG bookmark:** Figma `Flag` returns empty div with 26×18 bounds. Screenshot shows bookmark shape. Decision: SVG `<path d="M3 1.5H13V14.5L8 11.5L3 14.5V1.5Z">`. `active=true` → fill; `active=false` → stroke only. Color: text-primary (active) / text-secondary (inactive).

**Avatar images:** Figma MCP asset URLs used directly. URLs expire after 7 days per Figma MCP documentation. Decision: acceptable for dev reference; replace with `/public/avatars/*.png` paths in production. Noted in a comment inside `Avatar.jsx`.

**ErrorBanner naming:** File `ErrorBanner.jsx`, export `ErrorBanner`. `Error` is a JS built-in — using `Error` as a component name shadows it, causing subtle issues. (Same pattern as pre-R1 archive which used `ErrorAtom`.)

**Dropdown — trigger only:** Figma shows closed state only. Decision: implement the visual trigger (header label + gold/gray pill with arrow icon); no dropdown menu implemented. Matches Figma scope.

**Graph — `bars` array prop:** Figma has 2 fixed-height bars (82px, 58%). Decision: accepts `bars` array (0–100 percentage values) and `maxHeight` for flexible data-binding. Default `[100, 58]` reproduces Figma layout.

**List — `width: 100%`:** Figma specifies 696px fixed width. Decision: `width: 100%` for responsive layout. Columns retain Figma widths for readability; the name column is `flex: 1`.

**Scrollspy generalized:** Sidebar previously hardcoded styles-route-only scrollspy (`onStylesRoute` flag + `SECTION_IDS` constant). Rewritten: derives active L1 from `location.pathname`, extracts subsection IDs from `NAV_CONFIG[activeL1].subsections`, runs scrollspy against those IDs. Re-runs on `location.pathname` change. Works for all routes with subsections without further changes.

---

### Part C — selected/checked atoms

| Atom         | Prop                    | Selected visual                                          |
|--------------|-------------------------|----------------------------------------------------------|
| Switch       | `active=true`           | `--text-on-color` (white) bg when size=big               |
| SwitchGroup  | `value` + `onChange`    | active tab → white bg in yellow container                |
| Tag          | `selected=true`         | `--accent-default` (yellow) bg — control variant only    |
| Btn          | `selected=true`         | `--accent-default` (yellow) bg — secondary/On color only |

---

### Part D — `::after` fallback atoms

| Atom       | Fallback          | Reason                                                         |
|------------|-------------------|----------------------------------------------------------------|
| Status     | none (display)    | Display-only; no interaction in Figma or design spec           |
| ErrorBanner| none (display)    | Display-only alert; not interactive                            |
| Avatar     | none (display)    | Display-only; consumer wraps in button if needed               |
| Avatars    | none (display)    | Same — group display element                                   |
| Bar        | none (display)    | Progress indicator; not interactive                            |
| Graph      | none (display)    | Data visualization; not interactive                            |
| Input      | native focus ring | `<input>` element uses `:focus-visible` directly; `ds-interactive` applied to the field wrapper gives hover overlay. Native cursor behaviour for text fields. |
| TextArea   | native focus ring | Same as Input — `<textarea>` + wrapper. |

---

### Build result — R2

- **Modules:** 57
- **CSS:** 14.31 kB (gzip 3.61 kB)
- **JS:** 211.26 kB (gzip 64.07 kB)
- **Status:** ✅ first attempt, zero errors
- **Dev command:** `npm run dev` → [http://localhost:5173/ds-dev/atoms](http://localhost:5173/ds-dev/atoms)
