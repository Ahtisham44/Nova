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

export const typeScale = {
  display: { fontFamily: 'Inter', fontWeight: 700, fontSize: 40, lineHeight: 40 },
  h1: { fontFamily: 'Inter', fontWeight: 700, fontSize: 32, lineHeight: 32 },
  h2: { fontFamily: 'Inter', fontWeight: 600, fontSize: 24, lineHeight: 31 },
  h3: { fontFamily: 'Inter', fontWeight: 600, fontSize: 20, lineHeight: 26 },
  h4: { fontFamily: 'Inter', fontWeight: 600, fontSize: 18, lineHeight: 23 },
  bodyLg: { fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 21 },
  bodySm: { fontFamily: 'Inter', fontWeight: 400, fontSize: 14, lineHeight: 18 },
  caption: { fontFamily: 'Inter', fontWeight: 400, fontSize: 12, lineHeight: 16 },
} as const

export type TypeKey = keyof typeof typeScale

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