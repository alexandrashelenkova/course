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

---

## molecules-fix-2 — Targeted molecule corrections — 2026-06-23

5 targeted corrections based on second Figma self-verify pass.

### 1 — NOTIFY: Btn full-width stretch fixed

**Problem:** Btn was inside a `flex-direction: column` container → stretched to full card width.
**Fix:** Wrapped `<Btn>` in `<div style={{ display: 'flex' }}>`. The flex container hugs the button's inline width.

### 2 — ATTEMT: Failed badge vertical alignment

**Problem:** Badge (dot + "Failed" text) was aligning to `flex-start` in the row, appearing too high.
**Fix:** Added `alignSelf: 'center'` to the badge wrapper div.

### 3 — CARDMETRIC: padding reverted + Graph width

**Problem (a):** Prior molecules-fix had set `padding: 'var(--space-30) var(--space-14)'` to prevent Graph overflow. This was a symptom fix; real fix is to let Graph fill width.
**Fix (a):** Reverted to `padding: 'var(--space-30)'` all sides (Figma spec). Passed `width="100%"` to Graph.

**Problem (b):** Graph had fixed `width: 143` with no way to override.
**Fix (b):** Added `width` prop to Graph atom (default `143`). CardMetric passes `width="100%"`, AtomsPage continues passing default.

### 4 — PROFILE long: restructured middle container

**Problem:** Figma shows a 333px fixed-width middle container holding name/role (w-243) and Status side-by-side with `justify-between`. Prior implementation had them in a simpler layout.
**Fix:** Middle container: `width: 333, flexShrink: 0, display: 'flex', justifyContent: 'space-between'`. Name/role sub-div: `width: 243, whiteSpace: 'nowrap'`. Bar uses `flex: '1 0 0'` to fill remaining horizontal space.

### 5 — PROFILE short/short-outlined: kept inline-flex

Profile short variants intentionally use `display: 'inline-flex'` so they hug content and don't stretch in flex columns. This is a known trade-off: KanbanCard (Canban organism) must compose Avatar directly rather than using Profile short-outlined. FLAGGED for future `fullWidth` prop on Profile.

### Build result — molecules-fix-2

- **CSS:** 14.63 kB (gzip 3.67 kB)
- **JS:** ~229 kB (gzip ~67 kB)
- `✓ built` — zero errors

---

## R4 — Organisms — 2026-06-23

### Part A — Figma reads (sequential, section 357:35571)

7 component sets found in ds-organisms:

| # | Figma name   | Node       | Variants                          | Atoms/molecules used              |
|---|--------------|------------|-----------------------------------|-----------------------------------|
| 1 | second-row   | 357:35572  | type=Default, type=builider       | Btn                               |
| 2 | topmenu      | 357:35588  | Property1=all/templates/off       | Btn, local MenuSwitch sub-comp    |
| 3 | header       | 357:35619  | type=default                      | Topmenu, SecondRow, Bar           |
| 4 | canban       | 357:35635  | (single)                          | Avatar (direct, not Profile)      |
| 5 | task         | 357:35671  | Property1=Default, Variant2       | Flag, ErrorBanner, Btn            |
| 6 | card top     | 357:35684  | Property1=Default, Variant2       | Btn, SwitchGroup, Icons           |
| 7 | menu_switch  | 357:35722  | menu=on/off                       | local sub-component of Topmenu    |

### Part B — Component decisions

**Topmenu:** Local `MenuSwitch` sub-component (not exported) — h=32, p=10, rounded-4, active = white border. Brand "Hired & Wired" uses antiqa 23px — no `--font-size-23` token exists. Hardcoded as structural value. LOGGED.

**SecondRow Default "Back" button:** Btn atom lacks a border/outlined variant with green border. Built inline as a `<button>` with `border: '1px solid var(--status-success)'`. FLAGGED for future Btn border prop.

**Canban KanbanCard:** Profile `short-outlined` uses `display: inline-flex` and cannot fill column width from outside without restyling. Decision: Canban builds a local `KanbanCard` function composing Avatar atom directly. Same visual structure. FLAGGED for future `fullWidth` prop on Profile.

**Canban column gap (50px):** No `--space-50` token. Hardcoded 50 as structural value (between Pipeline title and board). LOGGED.

**CardTop GoldTag:** Dropdown atom has fixed `width: 180` and always shows arrow — not suitable for hug-width tag pills. Local `GoldTag` function built inline. FLAGGED for future Dropdown `hug` prop.

**CardTop gold "add" button:** Not in Btn atom variants (no gold background option). Built inline as `GoldAdd` local function. FLAGGED.

**CardTop `#ffb700` blend overlay:** The Default variant uses `mix-blend-mode: hard-light` with `#ffb700` (bright amber). This is a CSS color-mixing technique to achieve the gold appearance from a black-and-white underlying image — it is not a semantic color token. Hardcoded as structural visual value. There is no `--blend-amber` or equivalent token in tokens.css.

**CardTop Figma CDN image URLs:** Expire after 7 days per Figma MCP documentation. Logged in file comment. Replace with `/public/` assets in production.

**CardTop Variant2 background:** Figma has oversized (1442px) positioned photo background with complex overflow. Simplified to `object-cover` image + linear-gradient overlay (`transparent → var(--surface-page)`). Visual intent preserved; exact Figma positioning not reproduced.

**Nav organisms on dark background (OrganismsPage):** Topmenu/SecondRow/OrgHeader have `borderBottom: 1px solid var(--text-on-color)` (white) designed for dark-page context. OrganismsPage `ScrollWrap` applies `backgroundColor: 'var(--text-primary)'` (black) when `dark=true`, making the white border visible in the preview.

**No new tokens added in R4.** All organism styling uses existing primitives. Two hardcoded structural values logged: font-size 23 (Topmenu brand), gap 50 (Canban title-to-board).

### Part C — Self-verify checklist

| Organism     | Match | Discrepancy / note                                                      |
|-------------|-------|-------------------------------------------------------------------------|
| Topmenu     | ✅    | MenuSwitch active border correct; brand font size 23 hardcoded          |
| SecondRow   | ✅    | Default Back btn inline (no Btn border prop); breadcrumb exact          |
| OrgHeader   | ✅    | Bar size=big, 9 stage labels, paddings match                            |
| Canban      | ✅    | KanbanCard uses Avatar directly; column counts match Figma              |
| TaskRow     | ✅    | Default text-secondary + Flag active; Variant2 text-primary + inactive  |
| CardTop Default | ✅ | Gold blend effect: image + mix-blend-color + hard-light overlay        |
| CardTop Variant2 | ✅ | Photo bg + gradient; SwitchGroup at bottom; small Btns for CTA        |

### Part D — Wiring

- Created `src/ds-dev/organisms/` with 5 files: `SecondRow.jsx`, `Topmenu.jsx`, `OrgHeader.jsx`, `Canban.jsx`, `TaskRow.jsx`, `CardTop.jsx`
- Created `src/pages/OrganismsPage.jsx` — same `OrgSection`/`VariantRow` pattern as MoleculesPage; 1440px organisms in `ScrollWrap` (overflow-x auto); nav organisms with `dark=true` ScrollWrap
- `src/App.jsx`: swapped `<ComingSoonPage section="Organisms" />` → `<OrganismsPage />`
- `src/components/Sidebar.jsx` NAV_CONFIG: organisms entry now has 6 subsections (scrollspy-ready)

### Build result — R4

- **Modules:** 75
- **CSS:** 15.06 kB (gzip 3.75 kB)
- **JS:** 244.35 kB (gzip 69.78 kB)
- `✓ built in 669ms` — zero errors, zero warnings

---

## R4-fix — Organism background + Task Variant2 restore — 2026-06-23

### Fix 1 — Topmenu: transparent background

**Figma node read:** 357:35589 (Property1=all)
**Finding:** Outer div className has no `bg-*` class — no fill in Figma. Transparent.
**Root cause:** OrganismsPage `ScrollWrap dark={true}` was applying `backgroundColor: 'var(--text-primary)'` (black) to the wrapper. Dark text on black → invisible content.
**Fix:** Removed `dark` prop from all 3 Topmenu `ScrollWrap` calls (all/templates/off). Background now transparent — inherits `--surface-page` from page.
**Self-verify:** Node 357:35589 — no `bg-*` in Figma output. MATCH.

### Fix 2 — SecondRow: transparent background

**Figma node read:** 357:35573 (type=Default)
**Finding:** Outer div className has no `bg-*` class — transparent in Figma.
**Fix:** Removed `dark` prop from both SecondRow `ScrollWrap` calls (Default/builder). Transparent.
**Self-verify:** Node 357:35573 — no `bg-*` in Figma output. MATCH.

### Fix 3 — OrgHeader: `var(--surface-page)` background

**Figma node read:** 357:35620 (type=default)
**Finding:** Header outer div `"content-stretch flex flex-col items-start relative w-[1440px]"` — no fill. Transparent. The light surface seen in Figma is the canvas colour.
**Decision:** Per instruction to "bind the light surface token", explicitly set `backgroundColor: 'var(--surface-page)'` on the ScrollWrap rather than relying on transparent inheritance. Result is visually identical but explicitly token-bound.
**Fix:** Changed `ScrollWrap dark` → `ScrollWrap bg="var(--surface-page)"`. Updated ScrollWrap to accept optional `bg` prop.
**Bar check:** OrgHeader still uses `<Bar size="big" value={57} />` with default `colorFilled`/`colorEmpty` tokens — whole-dot model from molecules-fix is intact, no regression.
**Self-verify:** Node 357:35620 — no fill in Figma. Bound to `--surface-page` per instruction. MATCH (with explicit token binding).

### Fix 4 — TaskRow Variant2: restored error block + button

**Figma node read:** 357:35678 (Property1=Variant2)
**Finding:** `showError = true, showBtn = true` are the Figma defaults for Variant2. Screenshot confirms: outline bookmark + black title + ErrorBanner + "JOB DESCRIPTION" button all present.
**Root cause:** OrganismsPage was calling `<TaskRow property1="Variant2" showError={false} showBtn={false} />` — wrong assumption that Variant2 hid these elements. Variant2 differs from Default only in: (a) title color `--text-primary` vs `--text-secondary`, (b) Flag `active={false}` vs `active={true}`.
**Fix:** Changed to `<TaskRow property1="Variant2" />` (defaults showError/showBtn both true). Removed "(completed)" label from VariantRow since Variant2 is not "completed" — it just has a different text emphasis.
**Self-verify:** Node 357:35678 — ErrorBanner and Btn both present. MATCH.

### Build result — R4-fix

- **Modules:** 75
- **CSS:** 15.06 kB (gzip 3.75 kB) — unchanged
- **JS:** 244.29 kB (gzip 69.77 kB) — unchanged (logic-only fix)
- `✓ built in 612ms` — zero errors, zero warnings

---

## R4-responsive — Fluid fill-width organisms — 2026-06-23

### Fill vs Hug decisions

| Organism  | Figma width        | Decision       | Reason                                                         |
|-----------|-------------------|----------------|----------------------------------------------------------------|
| Topmenu   | 1440px (Fill)     | → `width:100%` | Navigation bar; spans full page width by design                |
| SecondRow | 1440px (Fill)     | → `width:100%` | Navigation row; spans full page width by design                |
| OrgHeader | 1440px (Fill)     | → `width:100%` | Composes Topmenu + SecondRow + Bar; inherits fill intent       |
| Canban    | 1440px (Fill)     | → `width:100%` | Board panel; intended to fill available page width             |
| CardTop   | `var(--size/830)` (HUG token) | → `maxWidth:830, width:100%` | Figma uses named size token (not Fill); but 830px exceeds narrow content area (viewport-260px sidebar), so `maxWidth` bounds it while preventing overflow |
| TaskRow   | 692px (HUG)       | untouched      | Card component; fixed width by design, no overflow at 692px    |

### Changes per file

**`Topmenu.jsx`**
- Root: `width: 1440` → `width: '100%'`
- Left cluster: `flexShrink: 0, width: 820` → `flex: '1 1 auto', minWidth: 0` (fills space, can shrink)
- Brand `<p>`: added `flexShrink: 0` to keep "Hired & Wired" from truncating
- Nav items div: `flexShrink: 0` → `flexWrap: 'wrap', minWidth: 0` (items wrap before overflowing)
- Right cluster ("Profile / Log out") retains `whiteSpace: 'nowrap'`; pinned right by root `justifyContent: 'space-between'`

**`SecondRow.jsx`**
- Both variants root: `width: 1440` → `width: '100%'`
- Default: Back btn + breadcrumb row already compact; `whiteSpace: 'nowrap'` on breadcrumb keeps it on one line
- Builder: `justifyContent: 'space-between'` already pins Save/Deploy to the right

**`OrgHeader.jsx`**
- Root: `width: 1440` → `width: '100%'`
- Stage labels: `flex: '1 0 0'` → `flex: '1 1 0', minWidth: 0, overflow: 'hidden'` — `flex-shrink: 0` was preventing stage labels from compressing; now they compress proportionally

**`Canban.jsx`**
- Root: `width: 1440` → `width: '100%'`
- "Pipeline" heading: `width: 830` → `width: '100%', maxWidth: 830` (centered heading, hugs up to 830px)
- Kanban columns: `flex: '1 0 0', minWidth: 1` → `flex: '1 1 0', minWidth: 0` — `flex-shrink: 0` was preventing column compression

**`CardTop.jsx`**
- Both variants: `width: 830` → `width: '100%', maxWidth: 830`
- Variant2 center content: `width: 754` → `width: '100%', maxWidth: 754`
- Default center content: `width: 754` (absolute-positioned) → `width: '90%', maxWidth: 754`
- Inner overflow clipped cleanly by outer `overflow: 'hidden'`

**`OrganismsPage.jsx` — `ScrollWrap`**
- Added `width: '100%'` to the ScrollWrap div so it fills the VariantRow flex container
- `overflowX: 'auto'` retained as scroll fallback for any future fixed-width organism

**`DsLayout.jsx`** — no change. Already has `flex-1 min-w-0 overflow-x-hidden` on `<main>`, which correctly makes the content area fill the viewport minus the 260px sidebar with no content-imposed min-width.

### Build result — R4-responsive

- **Modules:** 75
- **CSS:** 15.06 kB (gzip 3.75 kB) — unchanged
- **JS:** 244.46 kB (gzip 69.79 kB) — unchanged (no new logic)
- `✓ built in 602ms` — zero errors, zero warnings

---

## R5 — Assembled Test Pages (2026-06-23)

### Goal
Assemble two composed test pages from existing organisms/molecules/atoms, wire into standalone routes `/page1` and `/page2`, replace "Specimens" sidebar item with "Pages".

### Pages config
`src/pagesConfig.js` exports `PAGES_CONFIG = [{ id, route, node, label }]` — single source of truth consumed by App.jsx (routes) and referenced by Sidebar.jsx (NAV_CONFIG).

### Page 1 — All Teams (Figma node 357:58932)
- **OrgHeader** (full-width): Topmenu `property1="all"` + SecondRow Default + Bar big
- **AllTeamsCard** (local, not reusing CardTop organism): different background technique (2 Figma CDN images: `7e51eaf9-...` + `82c9f8c1-...` with `mix-blend-mode: plus-lighter`), "All teams" antiqa 84px heading, pixel 30px subtitle, black "add team" btn, SwitchGroup ["Overview","Employees","Report"]
- **4 CardMetric cards** (flex-1 each): Health/red, Productivity/pink, Distribution/violet, Hiring/yellow
- **6 Team cards** (CSS grid 2-col): Engineering/Design/Product/Marketing/Sales/Support teams

Why AllTeamsCard is local (not CardTop organism): The Figma instance reuses the `card top` component slot but with completely different background technique (dual-image blend vs gold hard-light) and different content layout. Building inline avoids distorting the CardTop organism with page-specific overrides.

### Page 2 — Candidate (Figma node 357:59014)
- **OrgHeader** (full-width): same as Page 1
- **CardTop** `property1="Variant2"`: Sarah Mitchell, SwitchGroup ["Team","Projects","Reports"]
- **Notify** molecule: green card, default text
- **Achievements** section card: 4 items (Top performer/Team player/Innovator/Mentor) with dates, "add achievement" btn
- **Personal Development** section card: Bar big at 40%, stage labels (onboarding/adapting/performing/ready), Next Level → Lead Software Engineer, Prediction: Febrary 2026 (Figma typo kept), "full review" btn
- **Relations** section card: "Reports to" 3× Profile short + "change" btn; "Mentoring:" 3× Profile short

### Molecule changes (minimal, backward-compatible)
- `CardMetric`: added `bg` prop (default `--surface-card-green`) and `width` prop (default 190) — MoleculesPage unchanged
- `Team`: added `width` prop (default 462) — MoleculesPage unchanged
- `Notify`: added `width` prop (default 830) — MoleculesPage unchanged

### Routing
- `/page1`, `/page2`: standalone routes (no DsLayout, full-screen)
- `/preview-page/*`: redirected to `/page1`
- `/ds-dev/specimens`: removed (replaced by Pages)

### Sidebar
- "Specimens" replaced with "Pages" (`alwaysExpanded: true`)
- Subsections: "Page 1" → `/page1`, "Page 2" → `/page2`
- `alwaysExpanded` flag: subsections render even when L1 is not route-active (pages are outside DsLayout)
- `sub.path` support: path-subsections render as `<Link>` instead of anchor scroll

### Figma CDN image note
AllTeamsCard background images expire ~7 days from 2026-06-23:
- `7e51eaf9-22aa-46ac-92e1-678c365bc062` (base photo)
- `82c9f8c1-fce6-424b-b96b-2badc9d49688` (blend overlay, plus-lighter)

### Build
- **Modules:** 76 (+1 pagesConfig)
- **JS:** 252.23 kB (gzip 71.04 kB)
- `✓ built in 594ms` — zero errors, zero warnings

---

## pages-fix — Page 1 + Page 2 corrective pass (2026-06-23)

### Item 1 — Page 1 hero: full-bleed, absolute header overlay

**Change:** Page1.jsx restructured.
- Outer page div: `backgroundColor: --surface-page`, `minHeight: 100vh`
- Hero block: `position: relative`, `width: 100%`, `height: 480`, `overflow: hidden`, **no** `borderRadius` (was `--radius-12`). Full viewport width, no container.
- Header overlay: `position: absolute, top: 0, left: 0, right: 0, zIndex: 10` — Topmenu (`property1="all"`) + SecondRow (`showBack={false}`).
- Topmenu has no background (transparent) — confirmed from Figma. Topmenu and SecondRow render as white-text elements over image.

**FLAG:** Topmenu uses `--text-primary` (black) for nav text and `--text-on-color` (white) for the border-bottom. Text on image background — contrast depends on the Figma CDN image brightness and the gradient overlay. The gradient fades `var(--surface-page)` to transparent at the top, which may darken the very top edge. Manual visual check required. Not changed — this is Figma intent.

### Item 2 — SwitchGroup active token

**No change.** SwitchGroup already correct: container bg `--accent-default` (yellow), active pill bg `--text-on-color` (white). Confirmed in prior session Figma read.

### Item 3 — Equal-width metric + team rows

**Change:** Page1.jsx content column (`maxWidth: 830, margin: 0 auto`) now contains BOTH the metric-cards flex row and the team-cards CSS grid. Both use `width: 100%` within the same container — edges are aligned by default. Previously AllTeamsCard was also inside the 830px column; it is now outside (hero). `paddingTop: var(--space-4)` on the column creates 4px gap below the hero.

### Item 4 — SecondRow `showBack` prop + Page 1 Back hidden

**SecondRow.jsx changes:**
- Added `showBack = true` parameter (default true — all existing usages unchanged).
- Back button wrapped in `{showBack && (...)}` — when false, Back is not rendered; breadcrumb always renders.

**Page1.jsx:** Passes `showBack={false}` to SecondRow in the absolute overlay.
**OrgHeader.jsx:** Unchanged — uses `<SecondRow type="Default" />` → showBack defaults to true → Back is shown on Page 2.

### Item 5 — Page 2 CardTop: Default replaces Variant2

**Change:** Page2.jsx — `<CardTop property1="Variant2" />` → `<CardTop />` (Default).
Default CardTop: gold blend card, Sarah Mitchell, PROMOTE/NEGOTIATE/SUSPEND/FIRE buttons, Teams/Access dropdowns.
Removed Variant2 usage: it had a photo bg + SwitchGroup ["Team","Projects","Reports"] which is not the Figma target for the Candidate page.

### Item 6 — Page 2 full-width sections with Figma bg tokens

**Change:** All Page 2 sections share the same 830px content container (`maxWidth: 830, margin: 0 auto, gap: var(--space-4)`). `SectionCard` now accepts an optional `bg` prop (default `var(--surface-card-default)`). Achievements section passes `bg="var(--surface-card-yellow)"`.

`paddingTop: var(--space-90)` (90px) on the content column matches Figma layout (OrgHeader h=114, content y=204 → gap=90px).

### Item 7 — Achievements: yellow bg + dark text + "all achievements" pill btn

**Changes in Page2.jsx:**
- Section card bg: `--surface-card-yellow` (was `--surface-card-default`)
- SectionTitle color: `--text-yellow-dark` (was `--text-primary`)
- Achievement items text: `--text-yellow-dark` for both name (grotesk 20px) and date (pixel 10px)
- Items row: `paddingTop: var(--space-14), paddingBottom: var(--space-14)` per Figma `py-[var(--space/14)]`
- Button: custom yellow pill (NOT Btn atom — no gold/yellow variant in Btn):
  - bg: `--surface-card-on-card-yellow` (#fffd9e)
  - text: pixel 10px uppercase tracking-2px, color `--text-yellow-dark` (#646905)
  - label: "all achievements"

SectionTitle updated to accept optional `color` prop (default `--text-primary`).

### Item 8 — Personal Development: bar colors + "Next Level" text-caps

**Changes in Page2.jsx:**
- SectionTitle: fontSize `--font-size-40` (was `--font-size-30`)
- Bar: `size="big"`, `value={60}`, `colorFilled="var(--status-success)"` (bright teal, was default grey), `colorEmpty="var(--surface-card-on-card-green)"` (pale teal)
- "Next Level" label: changed from `text-text-pixel tracking-[2px] uppercase` to `text-caps` — matches Figma `8px grotesk caps` style
- "Prediction:" label: already `text-caps` ✓
- Stage labels: already `text-caps` ✓
- "Febrary 2026" typo kept (Figma source)

### Item 9 — Relations: katya avatars, Figma colors, spacing, "Org. chart" btn

**Profile.jsx changes:**
- Added optional `bg` prop.
- Local variable renamed from `bg` (conflict with prop) to `cardBg`.
- `cardBg = bg ?? (variant === 'short' ? '--surface-card-on-card-red' : '--border-default')`
- All existing Profile `short`/`short-outlined` usages unchanged (default behavior preserved).

**Page2.jsx Relations changes:**
- Person names and roles updated to Figma-exact values.
- All profile cards: `person="katya"` (all same avatar, per Figma "katya" instance on all 6 cards).
- Per-card bg colors (Figma):
  - Reports to: red / green / pink
  - Mentoring: yellow / violet / red
- Sub-sections wrapped in `flex-direction: column, gap: var(--space-90)` (was `marginBottom: var(--space-30)` = 30px; Figma specifies 90px gap).
- Button label: "Org. chart" (was "change"). Both sub-sections have own "Org. chart" button.
- SectionTitle fontSize: `--font-size-40` (was `--font-size-30`).

**Token note:** `--surface-card-on-card-pink` and `--surface-card-on-card-violet` assumed to exist per naming convention. Build passed ✓ (unresolved CSS vars degrade to transparent, not build error).

### Build result — pages-fix

- **Modules:** 76
- **CSS:** 15.06 kB (gzip 3.75 kB) — unchanged
- **JS:** 253.24 kB (gzip 71.14 kB)
- `✓ built in 614ms` — zero errors, zero warnings

---

## page1-fix-2 — Page 1 three remaining items (2026-06-23)

### Item 1 — Hero content top spacing

**Figma data (node 357:58935, card top):**
- Card: 830×480px; on-page position: x=305, y=178 (inside Frame 1356 which starts at y=178)
- Page layout: header (h=88, y=0) + gap (90px) + card (y=178, h=480)
- Card inner layout: `flex-col, justify-end, gap-[160px], p-[30px]`
- Content block (w-754): "All teams" antiqa 84px + subtitle pixel 30px + "add team" btn
- SwitchGroup: at the very bottom (justify-end pushes to bottom)

**Problem:** In the full-bleed implementation the hero starts at y=0 (not y=178). With `justify-end` in a 480px hero, the title block sits at approximately y=53 from the hero top — INSIDE the 88px header overlay. The title appears immediately below the header with no breathing room.

**Fix:** Set hero height to 658px (= Figma card y-offset 178 + card height 480). With `justify-end` + `gap: 160` + `p-30` in a 658px container:
- Inner height = 658 - 60 = 598px
- SwitchGroup (h≈40) bottom at y=628, top at y=588
- Title block (h≈197) top at y = 588 - 160 - 197 = 231

**Result:** Title starts at y≈231 from page top. Header ends at y=88. Clearance = 143px. Matches Figma (card starts y=178, title within card at y≈50 → page y=228). ✓

**Token:** 658 is a structural value = header(88px) + gap(var(--space-90)=90px) + card-height(480px). Not in the token table; logged here.

**CDN URLs:** refreshed to `984e7eaf-...` (base) + `a8247f65-...` (blend/plus-lighter). Previous URLs may have expired after 7 days.

**Note:** hero background image fills via `inset: 0` regardless of hero height — the image correctly spans the full 658px. Gradient bottom-fade (transparent → `--surface-page`) still applies.

---

### Item 2 — SwitchGroup tokens (confirmed correct; no change)

**Figma data (node 357:58935, switch group child):**
- Container: `bg-[var(--accent/default,#ffe900)]` = `var(--accent-default)` (yellow)
- Active switch (Overview): `bg-[var(--text/on-color,white)]` = `var(--text-on-color)` (white)
- Inactive switches (Employees, Report): no `bg-*` class = `transparent`

**Current implementation (SwitchGroup.jsx + Switch.jsx):**
```
Container:          backgroundColor: 'var(--accent-default)'   → yellow ✓
Active (size=big):  backgroundColor: 'var(--text-on-color)'    → white  ✓
Inactive (size=big):backgroundColor: 'transparent'             → none   ✓
```

**Computed backgrounds:**
- Container bg: `var(--accent-default)` = `#ffe900` (yellow) — MATCH
- Active pill bg: `var(--text-on-color)` = `#ffffff` (white on yellow) — MATCH
- Inactive pill bg: `transparent` (shows yellow container through) — MATCH

No change needed. Item was already correct from prior session.

---

### Item 3 — Equal-width metric cards + team cards

**Figma data (node 357:58934, Frame 1356):**
- Single 830px-wide column, no horizontal padding
- `card top` (hero): w=830
- `Frame 1707` (metric cards): w=830, 4 cards each 204.5px wide with 4px gaps
- `Frame 1354` (team cards): w=830, 2-column grid, cards 413px each with 4px gap

**Problem:** Both `Team.jsx` and `CardMetric.jsx` used `width: props.width` in their root element style without `boxSizing: 'border-box'`. Both have `padding: 'var(--space-30)'` = 30px all sides (60px horizontal total). Result: `width="100%"` rendered as `(parent content-box width) + 60px`, overflowing the container. For metric cards, the wrapping `div { flex: '1 1 0', minWidth: 0 }` contained the overflow visually. For team cards (CSS Grid with no `minWidth: 0` wrapper), there was no containment — cards overflowed by 60px each.

**Fix:**
1. `Team.jsx`: Added `boxSizing: 'border-box'` to root element style. `width="100%"` now means total element width = 100% of grid cell, padding included. Cards fit grid cells exactly.
2. `CardMetric.jsx`: Same fix — added `boxSizing: 'border-box'`. Consistent behavior whether used in flex or grid contexts.
3. `Page1.jsx` grid items: Added `div { minWidth: 0 }` wrapper around each `<Team>` in the CSS Grid as belt-and-suspenders (follows the same pattern as the metric cards flex row wrappers). Ensures no future revert breaks grid containment.

**Shared container:** both metric cards row (`display: flex, gap: var(--space-4)`) and team cards grid (`display: grid, gridTemplateColumns: '1fr 1fr', gap: var(--space-4)`) are inside the same `maxWidth: 830, margin: '0 auto', boxSizing: 'border-box'` column. No horizontal padding on the column — both rows reach the full 830px. Left/right edges flush. ✓

---

### Build result — page1-fix-2

- **Modules:** 76
- **CSS:** 15.06 kB (gzip 3.75 kB) — unchanged
- **JS:** 253.33 kB (gzip 71.14 kB)
- `✓ built in 611ms` — zero errors, zero warnings

---

## page1-fix-3 — SwitchGroup yellow + team card equal height (2026-06-23)

### Item 1 — SwitchGroup yellow background on /page1

**Root cause — CSS stacking order, not a token override.**

The hero container (`position: relative`) contains:
- Background layer: `position: absolute, inset: 0` — no z-index → paints as a positioned z-index:auto descendant (CSS paint step 6)
- Title block: `position: relative` — explicitly a positioned element → also step 6, DOM order 2nd (AFTER background → paints on top ✓)
- SwitchGroup: `display: inline-flex`, no `position` set → paints as an inline-level box (CSS paint step 5, BEFORE step 6)

Result: the gradient overlay (`linear-gradient(transparent → --surface-page)` fully opaque at the bottom) painted AFTER the SwitchGroup in step 6, covering the yellow background with the page color. The title block was unaffected because it has `position: relative`.

**Figma confirmation:** The Figma-generated code for the card top's switch group has `relative` in its class list — the Figma design already specifies `position: relative` on the SwitchGroup container.

**Fix:** Added `position: 'relative'` to `SwitchGroup.jsx` root div style. This elevates the SwitchGroup to step 6, and since it appears after the background div in the DOM, it paints last (topmost). Fix is in the atom, not the page — matches Figma spec and works everywhere SwitchGroup is used inside a positioned context.

**Self-verify — computed backgrounds:**
- `/ds-dev` atom: `SwitchGroup.jsx` root → `backgroundColor: 'var(--accent-default)'` → `#ffe900` (yellow)
- `/page1` hero: same atom, same prop, same token → `#ffe900` — MATCH ✓
- Active pill (Switch, size=big, active=true): `backgroundColor: 'var(--text-on-color)'` → white — MATCH ✓
- Inactive pills: `backgroundColor: 'transparent'` → yellow shows through — MATCH ✓

---

### Item 2 — Team cards equal height in grid rows

**Root cause:** CSS Grid default `align-items: stretch` stretches grid ITEMS (the wrapping `<div style={{ minWidth: 0 }}>`) to the row-track height, but the Team card inside (`display: flex, flex-direction: column`) had no `height` set → auto-sized to content. Shorter card stopped short of the row-track boundary; taller card defined the row height.

**Fix:** Added `height: '100%'` to `Team.jsx` root element style. The grid item wrapper already has a defined height (from `align-items: stretch`), so `height: 100%` on the card fills it completely.

**Regression check:** In MoleculesPage (and any non-grid usage), the parent div has no explicit height → `height: 100%` resolves to `auto` (W3C: "percentage heights on elements whose containing block is not constrained to a height are treated as auto"). Team card still sizes to content. No regression. ✓

**Self-verify:** In a 2-column grid row where one Team card has 3-line highlight text and another has 1-line text: both cards fill the row-track height. The shorter card's white background extends to the taller card's bottom edge, leaving empty space above the avatars row. Equal height across all rows. ✓

---

### Build result — page1-fix-3

- **Modules:** 76
- **CSS:** 15.06 kB (gzip 3.75 kB) — unchanged
- **JS:** 253.37 kB (gzip 71.14 kB)
- `✓ built in 518ms` — zero errors, zero warnings

---

## page2-fix — 2026-06-24

Eight corrective items for `/page2`.

---

### Item 1 — Promote button active state (black bg, white text)

**Figma finding:** Default CardTop in the ORGANISM specimen shows ALL four CTA buttons as `bg-[var(--control/on-color, white)]` (identical). Variant2 shows ALL four as `bg-[var(--text/primary, black)]`. The task requires Promote to visually differentiate as "active" (black + white), matching Variant2's button style.

**Fix — Btn.jsx:** Changed `On color` type's selected state:
- `bgMap['On color']`: `selected ? 'var(--text-primary)' : 'var(--control-on-color)'` (was yellow `--accent-default`)
- `colorMap['On color']`: `selected ? 'var(--surface-page)' : 'var(--text-primary)'` (was always `--text-primary`)

**Fix — CardTop.jsx:** Added `selected={label === 'promote'}` to the Default variant CTA row.

**AtomsPage regression:** Selected-state rows for Btn were removed in R2-fix → no visible regression.

---

### Item 2 — Functional dropdown pills in CardTop

**Context:** GoldTag was a static `<div>` with arrow icon and no interaction. Dropdown atom had `onClick` prop but no open/close state.

**Fix — Dropdown.jsx:** Full rewrite with:
- `useState(false)` — `isOpen` toggle
- `useRef` + `useEffect` — click-outside closes panel; `keydown` Escape also closes
- `options` prop (array of strings) — options panel rendered when open
- Arrow icon: `transform: rotate(180deg)` when open, `transition: transform 140ms ease-out`
- `hug` boolean prop (default `false`) — when `true`, outer div has no fixed width and no headline, for inline pill usage in CardTop; default `width: 180` preserved for AtomsPage
- Options panel: `position: absolute`, `top: 100%`, `z-index: 200`

**Fix — CardTop.jsx:**
- Removed `GoldTag` local component; replaced with `<Dropdown hug variant="On color" headline="" placeholder="..." options={[...]} />`
- Moved `overflow: hidden` from card outer div to background wrapper div (keeps background-image clipped to `border-radius` while allowing dropdown panels to escape card bounds)
- Added per-dropdown option arrays: TEAM_OPTIONS, LAB_OPTIONS, ROLE_OPTIONS, ORG_OPTIONS, LEVEL_OPTIONS
- Refreshed IMG_DEFAULT CDN URL: `62f67f9b-82ea-423f-bdc1-a0e716c9e8d5` (expires 2026-07-01)
- Imported Dropdown atom

---

### Item 3 — Achievements button spacing

**Figma coordinates (node 357:59019, card h=226):**
- Title at y=30, h=29; items frame at y=83; gap title→items = 24px ✓ (already correct via SectionTitle `marginBottom: var(--space-24)`)
- Items frame at y=83, h=57 (py-14 + content-29 + py-14) ✓
- Button at y=164; gap items→button = 164−140 = **24px** — was 0px in code (missing)

**Fix:** Added `marginTop: 'var(--space-24)'` to the "all achievements" button div.

---

### Item 4 — Personal Dev "Next Level" label style

**Change:** Removed `text-caps` class + `--text-secondary`. Applied grotesk-20px inline style (same as "Lead Software Engineer") with `color: var(--text-secondary)`. Small-caps is a distinct typographic treatment; the Figma uses the same grotesk weight as the level name but in the secondary color.

---

### Item 5 — Personal Dev stage labels color

**Figma node 357:59039:** Container class `text-[color:var(--text/primary, black)]` — labels inherit `--text-primary` (black).

**Fix:** Changed stage label `color` from `var(--text-secondary)` → `var(--text-primary)`.

---

### Item 6 — Personal Dev button label

Changed `label="full review"` → `label="More info"`. Matches `Btn` atom's default label value.

---

### Item 7 — Mentoring first-profile yellow card token

**Figma node 357:59063:** `bg-[var(--surface/card/yellow, #e0e2a4)]` — token is `--surface-card-yellow` (CSS `var(--color-yellow-200)`, fallback `#e0e2a4` = muted olive yellow-green), NOT `--surface-card-on-card-yellow` (`var(--color-yellow-100)` = bright/acid yellow `#fffd9e`).

**Fix:** Changed `MENTORING[0].bg` from `var(--surface-card-on-card-yellow)` → `var(--surface-card-yellow)`.

---

### Item 8 — Remove Org. chart button from Mentoring

Figma node 357:59060 (Mentoring frame) has no button child — only title + profiles row. Removed `<Btn type="secondary" label="Org. chart" />` and its associated `marginBottom: var(--space-24)` from the profiles div (trailing margin with nothing after it).

Reports to block retains its Org. chart button as per Figma node 357:59053.

---

### Build result — page2-fix

- **Modules:** 76
- **CSS:** 14.95 kB (gzip 3.72 kB)
- **JS:** 254.45 kB (gzip 71.55 kB)
- `✓ built in 628ms` — zero errors, zero warnings

---

## page2-fix-2 — 2026-06-24

Eight corrective items across Dropdown atom, CardTop, Profile molecule, and Page2.

---

### Item 1 — Arrow stays put (no horizontal shift on open)

**Root cause:** Trigger button used `justify-content: space-between`, which distributed free space between the label and arrow spans. When font/layout resolved differently between closed and open (due to `marginRight: -5` on label and `paddingLeft: 8px` on arrow span), the arrow drifted.

**Fix (Dropdown.jsx):** Removed `justify-content: space-between` and `marginRight: -5`. Button now uses `gap: var(--space-8)` between label and arrow. Label span: `flex: '1 1 auto'` (fills available space without shifting arrow). Arrow span: fixed `width: 16, height: 16, flexShrink: 0` — a reserved slot matching icon dimensions. `transform: rotate(180deg)` affects visual only; zero layout change. Arrow position is now identical between open and closed states.

---

### Item 2 — Open state overlay via `::after` mechanism

**Token used:** `var(--state-pressed)` = `rgba(0,0,0,0.12)` (existing token, no new color).

**Mechanism:** `data-open='true'` attribute set on trigger button when `panelOpen` is true. Added one CSS rule to `tokens.css` (no existing value changed; rule appended after the `:active::after` block):
```css
.ds-interactive:not([aria-disabled='true'])[data-open='true']::after {
  background: var(--state-pressed);
}
```
**Specificity:** `.ds-interactive` (0,1,0) + `:not([aria-disabled])` (0,1,0) + `[data-open]` (0,1,0) = 0,3,0 + `::after` (0,0,1) = 0,3,1. Matches the `:hover::after` rule specificity (also 0,3,1). Since this rule is placed AFTER the `:hover` rule in the file, cascade order wins on hover-while-open → shows `state-pressed` independently of hover.

**Result:** closed=default, hover=state-hover, open=state-pressed (persisted), open+hover=state-pressed, active=state-pressed, disabled=unchanged.

---

### Item 3 — Open state shown in /ds-dev Dropdown showcase

Added to AtomsPage.jsx dropdown section:
- `initialOpen` prop (boolean): initializes `isOpen` state to `true`, user can close via click-outside or ESC.
- `forceOpen` prop (boolean): overrides `panelOpen = true` always; skips toggle and click-outside. Used for always-visible reference.
- Added `options` to the interactive "states" row (`['Option A', 'Option B', 'Option C']`).
- Added new `VariantRow label="open"` with:
  - `initialOpen` live instance (starts open, can be closed)
  - `forceOpen` pinned-open instance (panel always visible)

---

### Item 4 — GoldAdd as interactive button in CardTop

**Change (CardTop.jsx):** `GoldAdd` component changed from `<div>` to `<button type="button" className="ds-interactive">` with `onClick={() => {}}`. `ds-interactive` provides hover/pressed/focus states via `::after` overlay. `border: none`, `cursor: pointer` added. No dropdown panel — it's an intentionally non-opening action button.

---

### Item 5 — Person card paddings (Profile.jsx short variant)

**Figma verification (node 357:59063):**
- Container: `p-[var(--space/14,14px)]` = `padding: var(--space-14)` all sides ✓ (already correct)
- Outer gap: `gap-[var(--space/14,14px)]` = `gap: var(--space-14)` ✓ (already correct)
- Inner text gap: `gap-[var(--space/8,8px)]` = `gap: var(--space-8)` ✓ (already correct)
- Avatar size: `size-[30px]` = 30×30px ✓ (Avatar.jsx: `const SIZE = 30`)

No padding changes needed — all values already match Figma. Only the blend-mode was missing (item 6).

---

### Item 6 — Avatar blend-mode in person card

**Figma (357:59063):** Avatar container has `mix-blend-multiply` — blends avatar image with the colored card background, making the avatar photo feel embedded in the card rather than opaque.

**Fix (Profile.jsx):** Wrapped `<Avatar>` in a `<div style={{ flexShrink: 0, mixBlendMode: 'multiply' }}>` in the `short`/`thumbnail` variant only. The `long` variant (page1 list view) uses a white background so blend-mode isn't needed there; left unchanged.

---

### Item 7 — Next Level → Lead Software Engineer gap

**Figma (node 357:59035, Frame 1378 at y=133, h=78):**
- Frame 1377 (y=0, h=36): `gap-[var(--space/8,8px)]` between "Next Level" + "Lead Software Engineer" — inner gap **8px**
- Frame 1376 (y=50, h=28): `gap-[var(--space/8,8px)]` between "Prediction:" + date — inner gap 8px
- Outer (Frame 1378) gap between Frame1377 and Frame1376: y=50–36=14px → `gap-[var(--space/14,14px)]`

**Fix (Page2.jsx):** Changed outer container gap from `var(--space-8)` → `var(--space-14)`. Inner pair gaps remain `var(--space-8)`. Now "Next Level" and "Lead Software Engineer" read as a paired block (8px inner gap) visually separated from the "Prediction" block (14px outer gap).

---

### Item 8 — "All achievements" interactive button

**Fix (Page2.jsx):** Changed the yellow pill from `<div>` to `<button type="button" className="ds-interactive">` with `onClick={() => {}}`. `border: none`, `cursor: pointer` added. `ds-interactive` provides hover/pressed/focus states via `::after` overlay with `var(--state-hover)` and `var(--state-pressed)` (semi-transparent dark overlays compatible with yellow bg).

---

### Build result — page2-fix-2

- **Modules:** 76
- **CSS:** 15.15 kB (gzip 3.78 kB) — +0.20 kB for new open-state CSS rule
- **JS:** 255.42 kB (gzip 71.80 kB)
- `✓ built in 624ms` — zero errors, zero warnings

---

## pages-new-tab — 2026-06-24

Added `newTab: true` to the `page1` and `page2` entries in `NAV_CONFIG` (Sidebar.jsx); subsection render now checks `sub.newTab` first and uses `<a href={sub.path} target="_blank" rel="noopener noreferrer">` for those two links. All other nav links (Styles/Atoms/Molecules/Organisms `<Link>` and anchor `<a>` subsections) unchanged.

---

## vercel-spa-rewrite — 2026-06-24

Added `vercel.json` with catch-all SPA rewrite (`/(.*) → /index.html`) so `/page1` and `/page2` (and all client-side routes) are served by `index.html` on direct load instead of returning a 404.

---

## page4-banner — 2026-06-24

Added Page 4 (HiringCampaignAdd, node 357:59085). Reused CardTop organism — added 5 optional props (all backwards-compatible, defaults preserve page 2 behaviour): `showDropdowns` (bool, default true — hides TEAMS/access top row + dropdown-pills bottom row), `title` (string), `subtitle` (string), `imgSrc` (URL override for main bg photo), `screenOverlaySrc` (optional extra mix-blend-screen layer present in page 4 Figma but not page 2). Page 4 banner: title="New Campaign Start", subtitle="Active campaign", `showBtnsGroup={false}`, `showDropdowns={false}`, page-4-specific CDN images. Route /page4 added to pagesConfig.js + App.jsx; sidebar link added (newTab).

---

## page3-engineering-team — 2026-06-24

Added Page 3 (EngineeringTeam, node 357:58993). Full-bleed hero pattern mirrors Page 1: `position:relative` wrapper with CardTop Variant2 inside + Topmenu/SecondRow overlaid `position:absolute top:0 zIndex:10`.

**CardTop Variant2 — 4 new props (all backwards-compatible, defaults preserve OrganismsPage behaviour):**
- `imgSrc` — now wired in Variant2 (was ignored; defaults to `IMG_V2`)
- `imgPlusLighter` — optional `mix-blend-mode:plus-lighter` overlay image (mirrors Page 1's allteams hero)
- `switchOptions` — array passed to SwitchGroup (default `['Team','Projects','Reports']`)
- `fullBleed` — bool (default false); when true removes `maxWidth:830` and `borderRadius:12` from Variant2 outer container, making it edge-to-edge like Page 1's hero. OrganismsPage passes no props so unaffected.
- Also wired `title` and `subtitle` props into Variant2 text (were hardcoded "Sarah Mitchell"/"Senior Software Engineer")
- Exports added: `IMG_P3_BG`, `IMG_P3_OVERLAY` (refreshed 2026-06-24, expire 7 days)

**Profile — 1 new prop:** `noBorderBottom` bool (default false) — removes bottom border on last list item.

**Page 3 sections (from Figma node reads):**
1. Full-bleed hero: CardTop Variant2 — title "Engineering Team", subtitle "Detailed team overview\nand performance metrics", switchOptions `['Team','Campaigns','Access']`, showBtnsGroup=false, plus-lighter overlay image
2. Notify (green): "Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event."
3. Team card (white, padding 30px): "Team" antiqa-40 header + 10 Profile long-variant rows; last row noBorderBottom

**10 profiles** (all from Figma node reads, barValue=default): Sarah Johnson (green), Michael Smith (purple), Emily Davis (green), David Brown (purple), Linda Garcia (green), James Wilson (red), Alice Thompson (green), Robert Martinez (red), Jessica Taylor (green), Charles Lee (red/last-no-border).

Route /page3 added to pagesConfig.js (node 357:58993) + App.jsx PAGE_COMPONENTS; sidebar entry added between Page 2 and Page 4 (newTab).

---

## page4-fix — 2026-06-24

**Corrective pass** against Figma node 357:59066 (Page 4 screenshot read).

### What was missing / wrong

| Item | Before | After |
|------|--------|-------|
| Header progress bar | always rendered | hidden via `showProgressBar={false}` prop on OrgHeader |
| Banner title | "New Campaign Start" | "Senior Frontend Developer Campaign" (from Figma) |
| Banner buttons | `showBtnsGroup={false}` — none shown | `showBtnsGroup` + `ctaBtns={['finish','cancel']}` — Finish (selected) + Cancel |
| Banner images | stale URLs from prior session | fresh URLs from node 357:59066 read (`36a01fb5`, `49c1cc42`) |
| Task section | missing entirely | 6 TaskRow instances (3 Default, 3 Variant2/done) in white card |
| Applications/In-Progress/Conversion row | missing | 3 CardsMetrica cards (142 total, 28 active, 19.7% conversion) |
| Funnel section | missing | full-width section: 5 large antiqa numbers (142/89/28/31/4) with labels |
| Pipeline section | missing | Canban organism (full-width) |

### Component changes (all backwards-compatible)

- **OrgHeader**: `showProgressBar = true` prop — wraps Bar+stages in conditional. Default true keeps Pages 2, 3 unchanged.
- **CardTop Default**: `ctaBtns` prop (null = use default `CTA_BTNS_ON_COLOR`). When provided, overrides button labels; first button is selected. Existing `selected={label === 'promote'}` replaced by `selected={i === 0}`.
- **TaskRow**: `width = 692` prop — defaults keep OrganismsPage unchanged; Page4 passes `"100%"`.
- **CardsMetrica**: `width = 202` prop — defaults keep MoleculesPage unchanged; Page4 passes `"100%"`.

### Self-verify vs Figma node 357:59066 screenshot

- [x] Header: Topmenu + SecondRow + Back row visible; no dotted stage bar
- [x] Banner: gold blend hero, sunflower image, correct title, Finish+Cancel buttons
- [x] Task section: white card, Task heading, 6 task rows
- [x] Applications row: 3 side-by-side metric cards
- [x] Funnel: 5 large numbers full-width below metrics
- [x] Pipeline: full-width Canban with Applied/Screening/Interview/Offer columns

Note: Funnel values (142, 89, 28, 31, 4) and labels read from screenshot — Figma design-context output was truncated at 100 KB (Bar atom expanded all 200 dots inline). Values appear correct; re-verify if labels need adjusting.

---

## page3-fix — 2026-06-24

**Corrective pass** — three reported issues against Figma node 357:58993.

### Root-cause analysis (via curl + Figma screenshot)

| Issue | Root cause | Fix |
|-------|-----------|-----|
| Avatars broken | Reported: page3 using raw `<img src=...>` for avatars. **Actual**: current code already uses `Profile → Avatar` atom correctly (`person="katya"`). Avatar CDN URL `37977747` returns HTTP 200 — not expired, accessible. No code change needed; removed unused `OrgHeader` import from Page3.jsx. | Confirmed atom already used; dead import removed |
| Hero bg missing | `IMG_P3_BG` Figma CDN URL (`5c804742`) returns HTTP 202 + CloudFront WAF challenge for browser `<img>` GET requests (blocked). curl GET works fine — image downloadable (2884×1264 PNG, 1.8 MB). Overlay (`cd8499b0`) returns 200 and is accessible, downloaded for consistency. | Downloaded both images to `public/images/`; updated CardTop.jsx exports to `/images/hero-p3-bg.png` and `/images/hero-p3-overlay.png` (served by Vite dev server and built output, no expiry) |
| Subtitle duplicate | Reported: two subtitles rendered on top of each other. **Actual**: Figma screenshot of 357:58993 shows single subtitle "DETAILED TEAM OVERVIEW AND PERFORMANCE METRICS" — exactly matching current `subtitle="Detailed team overview\nand performance metrics"` prop. CardTop Variant2 has one `<p>` for subtitle. Duplication likely from a pre-session version of Page3 that rendered `<OrgHeader>` (which has its own text) alongside the hero. Current code is correct. | No change needed; verified |

### Files changed

- `src/ds-dev/organisms/CardTop.jsx` — `IMG_P3_BG` and `IMG_P3_OVERLAY` constants changed from Figma CDN URLs to `/images/hero-p3-bg.png` and `/images/hero-p3-overlay.png`
- `src/pages/Page3.jsx` — removed unused `OrgHeader` import
- `public/images/hero-p3-bg.png` — new file, 1.8 MB PNG (2884×1264), hero background
- `public/images/hero-p3-overlay.png` — new file, 286 KB PNG (512×288), plus-lighter blend overlay

---

## header-img-optimization — 2026-06-24

### Problem
All 4 pages used remote Figma CDN URLs (`https://www.figma.com/api/mcp/asset/...`) for header/hero background images. CDN URLs expire after 7 days. Several were already dead: `IMG_BG2` (P1 overlay), `IMG_DEFAULT` (P2 CardTop bg), `IMG_P4_BG`, `IMG_P4_SCREEN` returned 0B, 159B placeholders, or CloudFront WAF challenges on browser `<img>` requests. All remote URLs are `Case A` — no Vite bundling, no content hash, browser re-fetches every render, breaks entirely when URL expires.

### Step 0 — Junk cleaned
Previous session had downloaded these stale/junk files:
- `/tmp/p1-overlay-raw.png` — 0B (dead CDN) — deleted
- `/tmp/p2-bg-raw.png` — 0B (dead CDN) — deleted
- `/tmp/p4-bg-raw.png` — 159B (32×32 WAF placeholder) — deleted
- `/tmp/p4-bg-retry.png` — 159B (same junk) — deleted
- `/tmp/p4-screen-raw.png` — 0B (dead CDN) — deleted
- `/tmp/v2-fallback-raw.png` — 9.7 MB (valid, but duplicate of p1-bg) — deleted

`src/ds-dev/assets/headers/` was empty; `public/images/` had P3 files from prior session.

### Step 1 — Source resolution

Re-exported from Figma via `download_assets` on each page node (read one at a time). Images identified by downloading all fills in each page's subtree, then matching by dimension/size/content-diff against known assets.

| Asset | Source | Original size | How identified |
|---|---|---|---|
| P1 bg (`IMG_BG1`) | `/tmp/p1-bg-raw.png` — kept from prior session (only valid file) | 9.7 MB PNG, 4096×2304 | Confirmed valid — matches prior session |
| P1 overlay (`IMG_BG2`) | `download_assets` node 357:58932, img01.png | 1.8 MB PNG, 2884×1264 | Confirmed identical to P3-bg; shared Figma asset, different usage (plus-lighter blend on P1 vs main bg on P3) |
| P2 bg (`IMG_DEFAULT`) | `download_assets` node 357:59014, img02.png | 1.4 MB PNG, 1536×864 | Largest distinct non-avatar non-texture image in P2 subtree |
| P3 bg (`IMG_P3_BG`) | `public/images/hero-p3-bg.png` — already local | 1.8 MB PNG, 2884×1264 | Existing valid file from prior session |
| P3 overlay (`IMG_P3_OVERLAY`) | `public/images/hero-p3-overlay.png` — already local | 286 KB PNG, 512×288 | Existing valid file |
| P4 bg (`IMG_P4_BG`) | `download_assets` node 357:59066, img00.png | 2.0 MB PNG, 1536×864 | Largest distinct non-avatar non-texture image in P4 subtree |
| P4 screen (`IMG_P4_SCREEN`) | `download_assets` node 357:59066, img01.png | 140 KB PNG, 384×216 | Small 16:9 image consistent with UI screen mockup overlay |

Note: The shared texture (2884×1264) appears in all pages' Figma subtrees as a background fill. In Figma: same asset UUID, used as plus-lighter overlay on P1, main bg on P3, and appears in OrgHeader subtree on P2/P4.

### Step 2 — Optimization

All 7 source images converted to WebP q=80 with dimension reduction to actual render context:

| Final file | Source dims | Target dims | Rationale | Before | After |
|---|---|---|---|---|---|
| `header-p1-bg.webp` | 4096×2304 | 1920×1080 | Full-bleed hero, 2× 1440 display = 2880px max; 1920 sufficient | 9.7 MB PNG | 34 KB WebP |
| `header-p1-overlay.webp` | 2884×1264 | 1920×842 | Same full-bleed, plus-lighter texture | 1.8 MB PNG | 260 KB WebP |
| `header-p2-bg.webp` | 1536×864 | 1660×934 | CardTop maxWidth 830 × 2× retina | 1.4 MB PNG | 22 KB WebP |
| `header-p3-bg.webp` | 2884×1264 | 1920×842 | Full-bleed hero (same dims as P1-overlay — IDENTICAL file) | 1.8 MB PNG | 260 KB WebP |
| `header-p3-overlay.webp` | 512×288 | 512×288 (kept) | Texture already small | 286 KB PNG | 22 KB WebP |
| `header-p4-bg.webp` | 1536×864 | 1660×934 | CardTop maxWidth 830 × 2× retina | 2.0 MB PNG | 53 KB WebP |
| `header-p4-screen.webp` | 384×216 | 384×216 (kept) | Screen mockup overlay, already small | 140 KB PNG | 8 KB WebP |

Tool: `cwebp -resize W 0 -q 80` (libwebp 1.6.0).

**Note on deduplication**: `header-p1-overlay.webp` and `header-p3-bg.webp` are byte-for-byte identical (same Figma source asset). Vite correctly deduplicates them: both imports resolve to the same content-hashed file `header-p3-bg-B6rEZrtu.webp` in dist. Only 6 distinct files are emitted, not 7.

`public/images/hero-p3-bg.png` and `public/images/hero-p3-overlay.png` are now unused (code switched to static imports from `src/ds-dev/assets/headers/`). Left in place — not deleted without explicit authorization.

### Step 3 — Code changes

**`src/ds-dev/organisms/CardTop.jsx`**:
- Removed all Figma CDN URL constants and all exports (`IMG_P3_BG`, `IMG_P3_OVERLAY`, `IMG_P4_BG`, `IMG_P4_SCREEN`)
- Added static ES imports: `headerP1Bg` and `headerP2Bg` for the two internal fallbacks
- `IMG_DEFAULT = headerP2Bg` (CardTop Default fallback — also used by DS showcase)
- `IMG_V2 = headerP1Bg` (CardTop Variant2 fallback — also used by DS showcase)
- Added `loading="eager" fetchPriority="high" decoding="async"` to primary bg `<img>` in both Default and Variant2 branches
- Added `decoding="async"` to secondary overlay `<img>` elements

**`src/pages/Page1.jsx`**:
- Removed `const IMG_BG1/IMG_BG2 = 'https://...'`
- Added `import IMG_BG1 from '../ds-dev/assets/headers/header-p1-bg.webp'`
- Added `import IMG_BG2 from '../ds-dev/assets/headers/header-p1-overlay.webp'`
- Added `loading="eager" fetchPriority="high" decoding="async"` to `IMG_BG1` img; `decoding="async"` to `IMG_BG2` img

**`src/pages/Page2.jsx`**:
- Added `import headerP2Bg from '../ds-dev/assets/headers/header-p2-bg.webp'`
- Changed `<CardTop />` to `<CardTop imgSrc={headerP2Bg} />` (prop already existed)

**`src/pages/Page3.jsx`**:
- Changed `import CardTop, { IMG_P3_BG, IMG_P3_OVERLAY } from '...CardTop.jsx'` to plain `import CardTop from '...CardTop.jsx'`
- Added `import IMG_P3_BG from '../ds-dev/assets/headers/header-p3-bg.webp'`
- Added `import IMG_P3_OVERLAY from '../ds-dev/assets/headers/header-p3-overlay.webp'`
- JSX unchanged (props unchanged, only import source changed)

**`src/pages/Page4.jsx`**:
- Changed `import CardTop, { IMG_P4_BG, IMG_P4_SCREEN } from '...CardTop.jsx'` to plain `import CardTop from '...CardTop.jsx'`
- Added `import IMG_P4_BG from '../ds-dev/assets/headers/header-p4-bg.webp'`
- Added `import IMG_P4_SCREEN from '../ds-dev/assets/headers/header-p4-screen.webp'`
- JSX unchanged

### Step 4 — Verification

`npm run build` — ✓ built in 811ms, no errors.

**Content-hashed dist output** (all immutable, browser-cacheable):
```
dist/assets/header-p1-bg-B_33kj8p.webp        34 KB   ← Page 1 hero bg
dist/assets/header-p2-bg-B_fK1XxO.webp        22 KB   ← Page 2 & DS showcase CardTop Default
dist/assets/header-p3-bg-B6rEZrtu.webp       266 KB   ← Page 3 bg AND Page 1 overlay (shared asset, deduped)
dist/assets/header-p3-overlay-oqIOodeu.webp   22 KB   ← Page 3 overlay
dist/assets/header-p4-bg-B1byWzg2.webp        53 KB   ← Page 4 bg
dist/assets/header-p4-screen-DY4tanEm.webp     8 KB   ← Page 4 screen overlay
```

Zero remaining `https://` image URLs in CardTop.jsx or any page file. Each page still uses its own distinct image. CardTop DS showcase fallbacks updated to local files — no broken images anywhere.

---

## page5-automation-builder — 2026-06-24

### Figma inventory (node 357:59152)

Three-column flex row inside a 100vh page with fixed 350px panels and a fluid center canvas.

| Zone | Figma node | Width | Content |
|------|------------|-------|---------|
| Left panel | 357:59156 | 350px | Automation heading, name input, 7 node library items, 3 template pills |
| Canvas | 357:59175 | flex-1 | Draggable NodeCard instances + SVG bezier edges |
| Right panel | 357:59182 | 350px | Node Properties heading, node name input, tab control, 4 text fields, Save btn |

**Canvas nodes (from Figma — node ids 357:59176–59178):**

| Node | x | y | bg token |
|------|---|---|----------|
| Applicant Screening | 133 | 156 | `var(--surface-card-red)` |
| Interview Stage | 161 | 483 | `var(--surface-card-violet)` |
| Final Decision | 473 | 268 | `var(--surface-card-pink)` |

**Edges:** Applicant Screening → Final Decision; Interview Stage → Final Decision.

**Node library bg tokens:**

| Items | Token |
|-------|-------|
| Start Trigger, Application Review, Interview | `var(--surface-card-on-card-red)` |
| Email Notification, Conditional Logic | `var(--surface-card-yellow)` |
| Training Module | `var(--surface-card-on-card-pink)` |
| Progress Tracker | `var(--surface-card-on-card-violet)` |

### Component mapping

| Figma element | DS component | Decision |
|---|---|---|
| Top bar | `Topmenu property1="all"` | AS-IS |
| Sub-header row | `SecondRow type="builder"` | AS-IS |
| Canvas node cards | `NodeCard` molecule | Added optional `bg` prop (default `var(--surface-card-red)` unchanged) |
| Node library items | `Btn type="node"` | Added optional `bg` prop (default `var(--surface-card-on-card-red)` unchanged) |
| Template pills | `Btn type="secondary"` | AS-IS |
| Tab control | `Switch size="small"` (×2) | NOT SwitchGroup — accent-default background is wrong here; two standalone Switch atoms in a flex row |
| Save button | `Btn type="small"` | AS-IS |
| Text inputs / textareas | Native `<input>` / `<textarea>` | DS Input/TextArea atoms have their own wrapper layout; Page5 form fields built inline from tokens (`--control-secondary` bg, `--font-family-pixel`, `--radius-4`) |

### Structural values (not DS tokens)

| Value | Used for |
|---|---|
| `left: 0; top: 0; transform: translate(x,y)` | Canvas node absolute positioning — inherently positional |
| `HDX_IN=19, HDX_OUT=261, HDY=106` | SVG edge source/target point offsets — derived from NodeCard layout geometry |
| `c = max(40, |tx-sx| × 0.5)` | Cubic bezier tangent length — canvas coordinate math |

### Typo (Figma source, reproduced verbatim)

- Tab label: **"PARAMETRS"** (should be "PARAMETERS"). Reproduced as-is. Do not auto-correct.

### Flags

- `FLAG` — Sidebar not updated: `/page5` route added to `pagesConfig.js` + `App.jsx`. `Sidebar.jsx` NAV_CONFIG not updated (constraint: do NOT touch /ds-dev showcase). Navigate to `/page5` directly to view.
- `FLAG` — Canvas node drag targets use plain div wrapper (no `ds-interactive` class). `ds-interactive` is designed for `<button>` elements; applying to draggable divs conflicts with pointer-capture event handling. Custom `cursor: grab/grabbing` + selection outline (`--accent-default` gold) used instead.
- `FLAG` — HDY (handle y offset ≈ 106px) is estimated from NodeCard layout. Actual rendered value depends on font line-heights at runtime. SVG edges connect "near" the handle dots; pixel-perfect alignment not guaranteed without runtime measurement.

---

## sidebar-page5 — 2026-06-24

**File:** `src/components/Sidebar.jsx`, line 82.

**Pattern (Pages 1–4):** `NAV_CONFIG` array, `id: 'pages'` entry, `subsections` array. Each page: `{ id: 'pageN', label: 'Page N', path: '/pageN', newTab: true }`. Rendered via `sub.path && sub.newTab` branch → `<a href={sub.path} target="_blank" rel="noopener noreferrer">`.

**Change:** Added `{ id: 'page5', label: 'Page 5', path: '/page5', newTab: true }` as the fifth entry in `subsections`, immediately after Page 4. One line added; nothing else touched.

**Build:** ✅ 86 modules, 269.83 kB JS, 15.15 kB CSS — zero errors.

---

## batch-9-fixes — 2026-06-25

Nine corrective fixes across atoms, molecules, organisms, Page 4, and Page 5.

### FIX 1 — DS showcase: dropdown ON COLOR FILLED opens on click
**File:** `src/pages/AtomsPage.jsx` line 156.
**Root cause:** `<Dropdown variant="On color" value="frontend-team" />` had no `options` prop → panel never renders.
**Change:** Added `options={['Option A', 'Option B', 'Option C']}`.

### FIX 2 — DS molecule: Attemt status block top-aligned
**File:** `src/ds-dev/molecules/Attemt.jsx` line 53.
**Root cause:** `alignSelf: 'center'` overrode the outer row's `alignItems: 'flex-start'`.
**Change:** `alignSelf: 'center'` → `alignSelf: 'flex-start'`.

### FIX 3 — Page 3: hero subtitle lines not overlapping
**File:** `src/ds-dev/organisms/CardTop.jsx`, Variant2 subtitle.
**Root cause:** `.text-text-pixel` has `line-height: 9px` (absolute). At `font-size: 30px` this causes lines to collapse.
**Change:** Added `lineHeight: 1.2` to subtitle inline style.

### FIX 4 — Page 4: banner image saturation restored
**File:** `src/ds-dev/organisms/CardTop.jsx` + `src/pages/Page4.jsx`.
**Root cause:** `black + mixBlendMode:color` layer fully desaturates the image for all CardTop Default usages.
**Change:** Added `noDesaturate = false` prop to CardTop; skip the black+color blend div when `noDesaturate` is true. Page4 passes `noDesaturate`.

### FIX 5 — Page 4: task section corrections
**Files:** `src/ds-dev/atoms/Flag.jsx`, `src/ds-dev/organisms/TaskRow.jsx`, `src/pages/Page4.jsx`.
- **5a:** First two tasks: `showError: false` (error banners removed).
- **5b (flag colors):** Added `colorScheme = 'default'` prop to Flag. `'inverted'` → active=filled-gray, inactive=outline-black. TaskRow gains `flagScheme = 'default'` prop; Page4 passes `flagScheme="inverted"` to all rows.
- **5c:** TaskRow gains `btnLabel = 'job description'` prop. 'Review applications' row: `btnLabel: 'review'`.
- **5d:** 'Conduct initial interviews': `showBtn: false`.
- **5e:** TaskRow gains `noBorderBottom = false` prop. 'Onboarding paperwork': `btnLabel: 'generate'`, `noBorderBottom: true`.

### FIX 6 — Page 4: funnel section
**File:** `src/pages/Page4.jsx`.
- **6a:** Wrapped funnel items in card (`backgroundColor: var(--surface-card-default)`, `borderRadius: var(--radius-12)`, `padding: var(--space-30)`).
- **6b:** "Funnel" heading changed from `font-size-84` centered to `font-size-40` left-aligned, `letterSpacing: -0.4px` (matches CardsMetrica title style).

### FIX 7 — Page 5: Node Properties panel
**Files:** `src/pages/Page5.jsx`, `src/ds-dev/atoms/Switch.jsx`.
- **7a:** Wrapped `<Btn type="small" label="save" />` in `<div style={{ alignSelf: 'flex-start' }}>` to prevent button stretching in flex column.
- **7b:** Added `alignSelf: 'flex-start'` to `PANEL_STYLE` — panels now hug content height rather than stretching to row height. Matches Figma node 357:59181 `items-start`.
- **7c:** Added `letterSpacing: '1.6px'` to Switch inline style when `!isBig`. Figma (node 357:59152) shows Switch text with `tracking-[1.6px]`; `text-caps` class has no tracking.

### FIX 8 — Page 5: canvas edge z-order and handle dot colors
**Files:** `src/pages/Page5.jsx`, `src/ds-dev/molecules/NodeCard.jsx`.
- **8a:** Added `zIndex: 30` to SVG style — edges now render above nodes (z-index 10/20).
- **8b/c:** Added `inConnected = false` and `outConnected = true` props to NodeCard. Left dot: black if inConnected, gray otherwise. Right dot: black if outConnected, gray otherwise. Added `OUT_NODES` and `IN_NODES` Sets computed from `EDGES` at module level. DraggableNode accepts and passes these props. Result: Final Decision has black left dot + gray right dot; outgoing nodes have gray left + black right.

### FIX 9 — Page 5: sub-nav bar background
**Files:** `src/ds-dev/organisms/SecondRow.jsx`, `src/pages/Page5.jsx`.
Added optional `bg` prop to SecondRow builder branch. Page5 passes `bg="transparent"` for explicit transparent background.

**Build:** ✅ 86 modules, 270.78 kB JS, 15.19 kB CSS — zero errors.

---

## batch-4-fixes — 2026-06-26

Four corrective fixes: Page 4 banner image, Page 4 funnel, Page 3 hero spacing, and sidebar rename/reorder/routes.

### FIX A — Page 4: banner replaced with flat Figma export

**Problem:** The CSS blend stack (`base img + black/color blend + #ffb700/hard-light div + screen-mode img + noDesaturate override`) cannot reproduce Figma's lemon-yellow grainy composite. The `noDesaturate` workaround from batch-9 (FIX 4) only partially corrected the issue.

**Fix:**
- `download_assets` on Figma node 357:59069 (card top, 830×480), format=jpg, scale=2 → `header-p4-flat.jpg` (1660×960, 2 MB) saved to `src/ds-dev/assets/headers/`.
- Added `flatSrc` optional prop (default `undefined`) to `CardTop.jsx`. When provided on the Default variant, renders ONLY `<img>` with `object-fit:cover` — no blend stack, no text overlay, no buttons. All visual content baked into the flat image.
- `Page4.jsx`: replaced `import IMG_P4_BG` + `import IMG_P4_SCREEN` with `import IMG_P4_FLAT`; replaced all CardTop props with just `flatSrc={IMG_P4_FLAT}`.
- Deleted `header-p4-bg.webp` and `header-p4-screen.webp` (explicitly authorized, no longer referenced anywhere).

**Prop contract:** `flatSrc` only affects Default variant. Default behavior (blend stack) unchanged — no regression on Page 2 or DS showcase.

### FIX B — Page 4: funnel section corrections

Three sub-fixes on `Page4.jsx`:

**B(a) — gap between metrics row and funnel card:** Funnel outer div had `paddingTop: 'var(--font-size-84)'` (84px). Gap to metrics row was `var(--space-4)` (4px, from the centered column's `paddingBottom`) + 84px = 88px. Changed `paddingTop: 'var(--font-size-84)'` → `paddingTop: 0`. Gap is now `var(--space-4)` — same as the three metric cards' gap.

**B(b) — funnel label rename:** `FUNNEL` array:
- Screened → Rejected
- Shortlisted → Final Round
- Hired → Offers Sent
(Labels applied via `.uppercase` CSS class; exact case in data is visual-only.)

**B(c) — funnel label color:** `color: 'var(--text-secondary)'` → `color: 'var(--text-primary)'` on funnel `<p>` label elements.

### FIX C — Page 3: hero text block below nav overlay

**Root cause:** FIX 3 from batch-9 added `lineHeight: 1.2` to the CardTop Variant2 subtitle (correct — matches Figma `leading-[normal]` at 30px). This increased the text block height by ~54px (from ~18px 2-line height at 9px line-height to ~72px at 1.2 × 30px). With `justifyContent: 'flex-end'` and `gap: 160` in the 480px Variant2 container, `textBlockTop = 480 - 30 (paddingBottom) - (textBlockH + gap + switchH) = 232 - gap`. Before fix: gap=160 → top=72px (behind 88px nav overlay). After fix: gap=106 → top=126px (38px below nav overlay).

**Why gap ≠ 160:** Figma's `gap: 160` was designed with the CardTop frame at y=178 in the page (below a separate header section). In the React implementation the CardTop is the full-bleed hero starting at y=0 with the nav overlaid on top. The layout is structurally different — the gap must be reduced to compensate.

**Fix:**
- Added `gapToTabs = 160` optional prop to CardTop Variant2 outer container (default 160 preserves Figma spec and all existing usages including DS showcase).
- `Page3.jsx`: passes `gapToTabs={106}` → title top = 126px, 38px below 88px nav overlay.

### FIX D — Sidebar: rename, reorder, update routes

**Files changed:** `src/pagesConfig.js`, `src/App.jsx`, `src/components/Sidebar.jsx`.

**New routes and labels:**

| ID | Old route | New route | Label |
|----|-----------|-----------|-------|
| 1  | /page1    | /all_teams              | All teams              |
| 2  | /page2    | /candidate              | Candidate              |
| 3  | /page3    | /team                   | Team                   |
| 4  | /page4    | /hiring_campaign        | Hiring campaign        |
| 5  | /page5    | /automation_mail_editor | Automation mail editor |

**Sidebar order** (new): All teams → Team → Candidate → Hiring campaign → Automation mail editor (reordered P1, P3, P2, P4, P5).

**`pagesConfig.js`:** Updated all 5 route/label values.

**`App.jsx`:** Route definitions auto-update via `PAGES_CONFIG.map()`. Updated hardcoded `/preview-page/*` redirect from `/page1` → `/all_teams`.

**`Sidebar.jsx` NAV_CONFIG:** Updated pages L1 `path: '/page1'` → `/all_teams`; replaced all 5 subsection entries with new ids/labels/paths in new order.

**No redirects from old /pageN paths** — vercel.json catch-all serves the SPA on any path; old /pageN paths simply 404 (or navigate to fallback) if bookmarked.

### Build result — batch-4-fixes

- **Modules:** 85 (−1 — `header-p4-bg.webp` and `header-p4-screen.webp` deleted, `header-p4-flat.jpg` added)
- **JS:** 271.03 kB (gzip 75.39 kB)
- **CSS:** 15.19 kB — unchanged
- `✓ built in 677ms` — zero errors, zero warnings

---

## showcase-dropdown-hide-empty — 2026-06-26

**File:** `src/pages/AtomsPage.jsx`, dropdown section (lines 155–160).

**Change:** Removed two `<StateLabel>` entries from the `<VariantRow label="variants">` block in the dropdown `<AtomSection>`:
- `<SLabel>On color, empty</SLabel>` + `<Dropdown variant="On color" value="" />`
- `<SLabel>default, empty</SLabel>` + `<Dropdown variant="default" value="" />`

**Kept unchanged:** On color filled, default filled (variants row); states (default interactive, disabled); open (live starts open, pinned open).

**Scope:** AtomsPage.jsx only. Dropdown component (`src/ds-dev/atoms/Dropdown.jsx`) not touched.

**Build:** ✅ 85 modules, 270.81 kB JS — zero errors.
