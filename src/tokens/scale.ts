/** NOVA 2 · 8px base grid spacing scale. */

export const spacing = {
  0: '0px',
  '0.5': '2px',
  1: '4px',
  '1.5': '6px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const

export type SpacingStep = keyof typeof spacing

/** NOVA 2 · 4-step radius scale. */
export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '9999px',
} as const

export type RadiusStep = keyof typeof radius

/** NOVA 2 · 5-level elevation scale (flat-first). */
export const shadow = {
  none: 'none',
  xs: '0 1px 2px rgba(0,0,0,0.06)',
  sm: '0 4px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)',
  md: '0 10px 20px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.05)',
  lg: '0 20px 40px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.05)',
} as const

export type ShadowLevel = keyof typeof shadow