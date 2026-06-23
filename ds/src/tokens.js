/**
 * Token manifest — the structure of the design system (which tokens exist,
 * their Figma names, and how to group them). The *values* are NOT duplicated
 * here: tokens.css is the single source of truth, and the /ds-dev/ page reads
 * each value live from the CSS custom property at render time (see useCssVar).
 *
 * `figma` is the original Figma token / style name (shown verbatim on the page).
 * `cssVar` is the CSS custom property it maps to in tokens.css.
 */

export const colorTokens = [
  { figma: 'color/primary', cssVar: '--color-primary' },
  { figma: 'color/primary-hover', cssVar: '--color-primary-hover' },
  { figma: 'color/secondary', cssVar: '--color-secondary' },
  { figma: 'color/bg', cssVar: '--color-bg' },
  { figma: 'color/surface', cssVar: '--color-surface' },
  { figma: 'color/text-strong', cssVar: '--color-text-strong' },
  { figma: 'color/text-muted', cssVar: '--color-text-muted' },
  { figma: 'color/border', cssVar: '--color-border' },
  { figma: 'color/success', cssVar: '--color-success' },
  { figma: 'color/danger', cssVar: '--color-danger' },
]

export const spacingTokens = [
  { figma: 'spacing/space-2', cssVar: '--spacing-space-2' },
  { figma: 'spacing/space-3', cssVar: '--spacing-space-3' },
  { figma: 'spacing/space-4', cssVar: '--spacing-space-4' },
  { figma: 'spacing/space-5', cssVar: '--spacing-space-5' },
  { figma: 'spacing/space-6', cssVar: '--spacing-space-6' },
]

export const radiusTokens = [
  { figma: 'radius/radius-sm', cssVar: '--radius-sm' },
  { figma: 'radius/radius-md', cssVar: '--radius-md' },
  { figma: 'radius/radius-lg', cssVar: '--radius-lg' },
]

export const effectTokens = [
  { figma: 'effect/card-shadow', cssVar: '--effect-card-shadow', note: 'Card/Default' },
  { figma: 'effect/focus-ring', cssVar: '--effect-focus-ring', note: 'Input · Focus' },
]

/**
 * Text styles. The sample text is rendered with `className` (which lives in
 * tokens.css), so it always reflects the real font/size/weight/line-height.
 * `specs` is the human-readable summary shown beside each sample.
 */
export const typographyTokens = [
  { figma: 'Display', className: 'ds-text-display', specs: 'Inter · 40 / 48 · Bold (700)' },
  { figma: 'Heading', className: 'ds-text-heading', specs: 'Inter · 28 / 36 · Bold (700)' },
  { figma: 'Subheading', className: 'ds-text-subheading', specs: 'Inter · 20 / 28 · SemiBold (600)' },
  { figma: 'Body', className: 'ds-text-body', specs: 'Inter · 16 / 24 · Regular (400)' },
  { figma: 'Label', className: 'ds-text-label', specs: 'Inter · 14 / 20 · Medium (500)' },
  { figma: 'Caption', className: 'ds-text-caption', specs: 'Inter · 12 / 18 · Regular (400)' },
]
