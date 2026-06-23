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

---

## R2-fix — Atoms corrective pass — 2026-06-23

Figma ds-atoms was re-read as source of truth. All 12 items resolved. Build passes.

### Checklist

| # | Atom        | Fix applied                                                                      | Figma node  | Status |
|---|-------------|----------------------------------------------------------------------------------|-------------|--------|
| 1 | BUTTON      | Removed "selected" VariantRow + "states" VariantRow from AtomsPage. Removed `btnSelected` state var. Only "variants" row remains (5 Figma types). | 357:35427 | ✅ done |
| 2 | SWITCH      | Removed "interactive toggle" StateLabel from AtomsPage switch "states" VariantRow. Removed `switchActive` state var. | 357:35345 | ✅ done |
| 3 | DROPDOWN    | Dropdown uses `<Icons name="arrow-down" />` which now renders actual Figma SVG path (boxed download arrow). No change to Dropdown.jsx itself. | 357:35391 | ✅ done |
| 4 | TAG         | Fixed padding: `'0 var(--space-8)'` → `'var(--space-8)'` (all sides per Figma `p-[8px]`). Fixed gap: `var(--space-4)` → `10` px (Figma `gap-[10px]`, not a token). | 357:35359 | ✅ done |
| 5 | TEXTAREA    | `resize: 'vertical'` → `'none'`. Removed `fontFamily: 'inherit'` (now inherits pixel font class). Wrapper width `240` → `180`. | 357:35381 | ✅ done |
| 6 | STATUS      | Removed `label` prop from Status.jsx; labels now hardcoded from CONFIG only. Removed "custom labels" VariantRow from AtomsPage. | 357:35321 | ✅ done |
| 7 | ERROR       | Added `letterSpacing: '1.6px'` to ErrorBanner div style (Figma `tracking-[1.6px]`; missing from `text-caps` class). | 357:35365 | ✅ done |
| 8 | AVATAR      | Removed `size` prop; hardcoded `const SIZE = 30`. Removed "sizes" VariantRow from AtomsPage. | 357:35314 | ✅ done |
| 9 | BAR         | "big" variant now renders 2 rows of 5px dots (not 12px circles). Uses two `radial-gradient` layers at y=2.5px and y=9.5px, `background-size: 7px 12px`. Updated AtomsPage label. | 357:34112 | ✅ done |
|10 | ICONS       | All 5 icons replaced with actual Figma paths (fill="currentColor"). play=solid wedge; user=filled silhouette; more=3 circles; arrow-down=boxed download arrow; close=circle-minus. SVG source files saved to `src/ds-dev/assets/icons/`. | 357:35334 | ✅ done |
|11 | LIST        | Name column: replaced `className="text-h4"` (grotesk 15px 700) with inline style `fontFamily: grotesk, fontSize: --font-size-20, fontWeight: --font-weight-400, letterSpacing: -0.4px` (matches Figma grotesk 20px regular). | 357:35374 | ✅ done |
|12 | GRAPH       | Removed "custom data" VariantRow (5-bar) from AtomsPage. Only "default (Figma layout)" row remains. | 357:35416 | ✅ done |

### SVGs exported from Figma

| File | Node | Size |
|------|------|------|
| `src/ds-dev/assets/icons/play.svg`       | 357:35335 | 804 B  |
| `src/ds-dev/assets/icons/user.svg`       | 357:35337 | 883 B  |
| `src/ds-dev/assets/icons/more.svg`       | 357:35339 | 1090 B |
| `src/ds-dev/assets/icons/arrow-down.svg` | 357:35341 | 1575 B |
| `src/ds-dev/assets/icons/close.svg`      | 357:35343 | 1087 B |

Clean versions (fill="currentColor", no Figma context groups) overwrite the originals and are used as path sources in `Icons.jsx`.

### Build result — R2-fix

- **Modules:** 57
- **CSS:** 14.31 kB (gzip 3.61 kB)
- **JS:** 212.43 kB (gzip 65.04 kB)
- **Status:** ✅ first attempt, zero errors
- **Dev command:** `npm run dev` → [http://localhost:5173/ds-dev/atoms](http://localhost:5173/ds-dev/atoms)

---

## tag-fix — Tag corrective pass — 2026-06-23

### Figma metrics read (node 357:35359)

| Property       | Figma value                           | CSS token / value         |
|----------------|---------------------------------------|---------------------------|
| height         | `h-[24px]`                            | `height: 24` (border-box) |
| padding        | `p-[var(--space/8,8px)]` (all sides)  | `var(--space-8)`          |
| border-radius  | `rounded-[var(--radius/4,4px)]`       | `var(--radius-4)`         |
| gap (control)  | `gap-[10px]` (no space token in Figma)| `var(--space-10)` (new)   |
| text           | pixel font 10px uppercase tracking-2px| `text-text-pixel tracking-[2px] uppercase` |
| fill (control) | `var(--control/secondary)`            | `var(--control-secondary)` |
| fill (static)  | `var(--surface/card/on-card/red)`     | `var(--surface-card-on-card-red)` |
| text color     | `var(--text/primary)`                 | `var(--text-primary)` |

Disabled state: baked into `.ds-interactive[aria-disabled='true']` → opacity 0.45, cursor not-allowed. No separate Figma variant.

### Changes made

**Step 2 — tokens.css:** Added `--space-10: 10px` after `--space-8` in the primitives layer. Sequence is now 4 → 8 → **10** → 14. Decision: Figma uses `gap-[10px]` (no Figma token for this value); `--space-10` is the correct primitive to add rather than using the nearest (`--space-8` or `--space-14`) which would both be wrong.

**Step 3 — Tag.jsx:**
- Gap: hardcoded `10` → `var(--space-10)`.
- Added `boxSizing: 'border-box'` to inline style to guarantee `height: 24` is the total outer height (matching Tailwind Figma box model). This ensures the 8px all-sides padding is internal to the 24px height rather than additive.
- Padding and radius were already correct (`var(--space-8)`, `var(--radius-4)`) from the prior R2-fix.

**Step 4 — AtomsPage.jsx:**
- Removed `VariantRow label="selected (control)"` (contained "selected toggle" interactive demo).
- Removed `VariantRow label="states"` (contained "default (interactive)" + "disabled").
- Added disabled tag directly into the "variants" row as a third item.
- Removed `const [tagSelected, setTagSelected] = useState(false)` (was only used by removed row).
- Tag section now shows: control · static · disabled — all in one "variants" row. No separate interactive-state showcases.

### Build result — tag-fix

- **CSS:** 14.33 kB (gzip 3.62 kB) — +0.02 kB for `--space-10`
- **JS:** 212.12 kB (gzip 65.00 kB)
- **Status:** ✅ first attempt, zero errors

---

## R3 — Molecules — 2026-06-23

### Part A — Figma reads (sequential, node 357:35439)

10 molecules found in ds-molecules section. Read one node at a time in order:

| # | Molecule | Node | Variants | Atoms used |
|---|----------|------|----------|------------|
| 1 | profile | 357:35440 | long (357:35441), short (357:35449), short-outlined (357:35454) | Avatar, Status, Bar |
| 2 | node | 357:35459 | Default (357:35460) | Icons (play, more) |
| 3 | campaign_preview | 357:35471 | Default (357:35472) | Status, Btn |
| 4 | project_preview | 357:35491 | Default (357:35492) | — (inline yellow tags) |
| 5 | experience_preview | 357:35499 | Default (357:35500) | — (pure text) |
| 6 | team | 357:35507 | Default (357:35508) | Bar, Avatars |
| 7 | card metric | 357:35523 | Default (357:35524) | Graph |
| 8 | Cards metrica | 357:35529 | Default (357:35530) | — (pure text) |
| 9 | attemt | 357:35535 | Default (357:35536), Variant2 (357:35552) | — (inline status in Default) |
| 10 | notify | 357:35567 | type=Default (357:35568) | Btn (optional) |

### Part B — Component decisions

**Profile** — 3 variants in one component: `long` (border-bottom row with Avatar/name-role/Status/Bar),
`short` (h=59 card, `--surface-card-on-card-red` bg), `short-outlined` (h=59 card, `--border-default` bg).

**NodeCard** — Named `NodeCard.jsx` (not `Node`) to avoid namespace confusion. Two connector dots
(10px circles): left = `--color-gray-200`, right = `--color-black`.

**CampaignPreview** — Uses antiqa 84px for stat numbers (`--font-size-84`), grotesk 8px for labels
(tracking 1.6px). Five stats rendered via array prop with defaults matching Figma.

**ProjectPreview** — Yellow tags (`--surface-card-on-card-yellow`) rendered inline at h=32 with gap-2.
**Not** using the Tag atom because Figma's project_preview tags are h=32 (not h=24 like the Tag atom).

**Team** — Bar uses `colorFilled="var(--status-success)"` (teal) per Figma. Figma shows
three-segment bar (teal/light-teal/white); molecule uses two-segment Bar atom with teal fill — close
enough, full three-segment multi-fill not modelled.

**Attemt** — `variant="Default"` shows "failed" inline (dot + pixel text in `--status-error`) rather
than Status atom because the Status atom hardcodes label "Failing" (r2-fix decision); "failed" is the
exact Figma wording. `variant="Variant2"` shows "$?" placeholders and no status indicator.

**Notify** — Pixel 30px text (`--font-size-30`) in `--status-success` (teal) on green card. Optional
`showBtn` prop renders a `Btn type="On color"` below the text.

### Atom prop additions (minimal, required by molecules)

| Atom | New prop | Used by |
|------|----------|---------|
| Bar.jsx | `colorFilled` — overrides `--bar-on-base-filled` | Team (teal bar) |
| Graph.jsx | `color` — overrides `--text-secondary` bar fill | CardMetric (gray-50 + multiply on green) |

### Part C — Wiring

- Created `src/ds-dev/molecules/` directory with 10 `.jsx` files.
- Created `src/pages/MoleculesPage.jsx` — same `MolSection`/`VariantRow` pattern as AtomsPage.
- `src/App.jsx`: swapped `<ComingSoonPage section="Molecules" />` → `<MoleculesPage />`.
- `src/components/Sidebar.jsx` NAV_CONFIG: molecules entry now has 10 subsections (scrollspy-ready).

### Build result — R3

- **CSS:** 14.33 kB (gzip 3.62 kB) — no token changes
- **JS:** 227.93 kB (gzip 67.20 kB) — +15.8 kB for 10 molecules + MoleculesPage
- `✓ built in 631ms` — zero errors, zero warnings

### Dev command

```
npm run dev
```
Then visit: http://localhost:5173/ds-dev/molecules

---

## molecules-fix — 2026-06-23

### 1 — BAR ATOM: whole-dot model (no fractional last dot)

**Figma node:** 357:34112 (Bar atom) — rate-limited on re-read; used data from prior R2-fix read + Team molecule read (357:35516).

**Problem:** old model used `width: ${pct}%` for the filled section, which clipped the last dot at a fractional pixel. Empty section started at that same arbitrary pixel, so boundaries between segments were mid-dot.

**New model:** `ResizeObserver` measures container → `totalDots = Math.floor(width / 7)`. `filledDots = Math.round(pct/100 * totalDots)`. Each section is an exact multiple of 7px (5px dot + 2px gap). No partial dot is possible. `overflow: hidden` on the container clips the small remainder pixel.

**New props:**
- `colorFilled` — override filled dot token (default: `var(--bar-on-base-filled)`)
- `colorEmpty` — override empty dot token (default: `var(--bar-on-base-empty)`)

**Default tokens (unchanged):** filled = `var(--bar-on-base-filled)` = `var(--color-sage)` · empty = `var(--bar-on-base-empty)` = `var(--color-white)`

---

### 2 — TEAM: pale teal empty dots restored

**Figma tokens (from 357:35516 read):**
- Filled: `var(--color/text-&-icon/green)` = #00867b = `var(--status-success)` ✓
- Empty/pale: `var(--color/background/on-cads/green)` = #d4eee7 = `var(--surface-card-on-card-green)` = `var(--color-teal-200)` — both are existing primitives in tokens.css, no alpha reduction needed

**Change:** `<Bar colorFilled="var(--status-success)" colorEmpty="var(--surface-card-on-card-green)" />`

Result: bright teal dots up to 89%, pale teal for the remaining 11%. All whole dots.

---

### 3 — PROFILE / long: alignItems + bar colors

**Figma:** `items-start` on the row container — was `alignItems: 'center'`, corrected to `alignItems: 'flex-start'`.

**Bar colors:** same teal pair as Team (Figma for profile long also shows teal bar per session screenshot "green dots → lighter-green → gray"). Applied `colorFilled="var(--status-success)" colorEmpty="var(--surface-card-on-card-green)"`. Bar wrapper uses `alignSelf: 'center'` so it stays vertically centered in the taller row.

**Paddings:** `paddingTop/paddingBottom: var(--space-14)`, no horizontal padding — matches Figma `py-[var(--space/14)]`. No change needed.

---

### 4 — PROFILE / short + short-outlined: height auto

**Problem:** `height: 59` was a fixed value from Figma's expanded frame. Task requires HUG (fit-content).

**Fix:** Changed outer div from `display: 'flex'` (block) to `display: 'inline-flex'` and removed `height: 59`. Height is now governed by `padding: var(--space-14)` (28px total vertical) + tallest child (text column ~38px) ≈ 66px. Cards shrink/grow with content.

---

### 5 — NODECARD: left dot color

**Problem:** `var(--color-gray-200)` is a raw primitive. Task required re-read but Figma MCP was rate-limited; Figma rendered the dot as an Ellipse image asset so exact color was not derivable from the prior read.

**Decision:** Changed to `var(--text-secondary)` = `var(--color-gray-400)` = #979797. Rationale: `--text-secondary` is the correct semantic token for an "inactive/secondary" element; #979797 (darker gray) is more visible than #cbcbcb on the pink card background (`--surface-card-red` = #f5cfca). **FLAGGED** — could not re-verify from Figma due to rate limit.

---

### 6 — CARDMETRIC + CARDSMETRICA: side paddings

**Problem:** Both used `padding: var(--space-30)` (30px all sides). CardMetric card is 190px wide → content width = 190 − 60 = 130px, but Graph atom has `width: 143` (fixed) which overflows by 13px.

**Fix:** Changed to `padding: 'var(--space-30) var(--space-14)'` (30px top/bottom, 14px left/right). Content width = 190 − 28 = 162px → Graph (143px) fits with 19px to spare. CardsMetrica (202px) content = 202 − 28 = 174px — all text, no overflow concern.

**Token bound:** `var(--space-14)` for horizontal, `var(--space-30)` for vertical — both existing primitives.

---

### Build result — molecules-fix

- **CSS:** 14.63 kB (gzip 3.67 kB)
- **JS:** 228.48 kB (gzip 67.42 kB)
- `✓ built in 512ms` — zero errors
