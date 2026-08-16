import { nova, neutral, status, white, amber } from './primitives'

/**
 * NOVA 2 · Semantic tokens.
 * Role-based aliases that map to primitive values. Components consume
 * these so intent travels through the system instead of raw colors.
 */

export const semantic = {
  /* Brand */
  primary: nova[700],
  primaryHover: nova[800],
  primaryActive: nova[900],
  primaryDisabled: nova[300],
  primarySurface: nova[50],
  primaryBorder: nova[100],

  /* Status */
  success: nova[700],
  warning: amber[700],
  error: status.error,
  info: status.info,

  /* Text */
  text: neutral[950],
  'text.hover': neutral[900],
  'text.muted': neutral[500],
  'text.disabled': neutral[400],
  'text.onPrimary': white,

  /* Surface */
  surface: neutral[50],
  'surface.hover': neutral[100],
  'surface.active': neutral[200],
  'surface.elevated': white,
  'surface.overlay': neutral[100],

  /* Border */
  border: neutral[200],
  borderStrong: neutral[300],
  borderFocus: nova[700],
  focusRing: nova[700],
} as const

export type SemanticToken = keyof typeof semantic

/** Intent colors for status surfaces (background / text / border / dot). */
export const intentPalette = {
  success: { bg: 'var(--ds-intent-success-bg)', text: 'var(--ds-intent-success-text)', border: 'var(--ds-intent-success-border)', dot: 'var(--ds-intent-success-dot)' },
  warning: { bg: 'var(--ds-intent-warning-bg)', text: 'var(--ds-intent-warning-text)', border: 'var(--ds-intent-warning-border)', dot: 'var(--ds-intent-warning-dot)' },
  error: { bg: 'var(--ds-intent-error-bg)', text: 'var(--ds-intent-error-text)', border: 'var(--ds-intent-error-border)', dot: 'var(--ds-intent-error-dot)' },
  info: { bg: 'var(--ds-intent-info-bg)', text: 'var(--ds-intent-info-text)', border: 'var(--ds-intent-info-border)', dot: 'var(--ds-intent-info-dot)' },
  neutral: { bg: 'var(--ds-intent-neutral-bg)', text: 'var(--ds-intent-neutral-text)', border: 'var(--ds-intent-neutral-border)', dot: 'var(--ds-intent-neutral-dot)' },
} as const

export const gradients = {
  hero: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
  surface: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
  card: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
  accent: 'linear-gradient(90deg, #16A34A 0%, #22C55E 100%)',
} as const