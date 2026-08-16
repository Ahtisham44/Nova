/**
 * NOVA 2 · Typography tokens.
 * Inter across all weights. Line height rule: 100% for sizes >= 32px,
 * 130% for sizes below 32px.
 */

export interface TypeToken {
  fontFamily: string
  fontWeight: number
  fontSize: number
  lineHeight: number
}

/** Dimension primitives — font sizes (matching tokens.json dimension.font.size.*) */
export const fontSize = {
  display: 40,
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLg: 16,
  bodySm: 14,
  caption: 12,
} as const

/** Dimension primitives — line heights (matching tokens.json dimension.lineHeight.*) */
export const lineHeight = {
  display: 40,
  h1: 32,
  h2: 31,
  h3: 26,
  h4: 23,
  bodyLg: 21,
  bodySm: 18,
  caption: 16,
} as const

export const typeScale = {
  display: { fontFamily: 'Inter', fontWeight: 700, fontSize: fontSize.display, lineHeight: lineHeight.display },
  h1: { fontFamily: 'Inter', fontWeight: 700, fontSize: fontSize.h1, lineHeight: lineHeight.h1 },
  h2: { fontFamily: 'Inter', fontWeight: 600, fontSize: fontSize.h2, lineHeight: lineHeight.h2 },
  h3: { fontFamily: 'Inter', fontWeight: 600, fontSize: fontSize.h3, lineHeight: lineHeight.h3 },
  h4: { fontFamily: 'Inter', fontWeight: 600, fontSize: fontSize.h4, lineHeight: lineHeight.h4 },
  bodyLg: { fontFamily: 'Inter', fontWeight: 400, fontSize: fontSize.bodyLg, lineHeight: lineHeight.bodyLg },
  bodySm: { fontFamily: 'Inter', fontWeight: 400, fontSize: fontSize.bodySm, lineHeight: lineHeight.bodySm },
  caption: { fontFamily: 'Inter', fontWeight: 400, fontSize: fontSize.caption, lineHeight: lineHeight.caption },
} as const

export type TypeKey = keyof typeof typeScale

/** NOVA 2 · Font weight tokens. */
export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export type FontWeightToken = keyof typeof fontWeight

/** NOVA 2 · Motion tokens. */
export const duration = {
  instant: '100ms',
  fast: '200ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
} as const

export const ease = {
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const