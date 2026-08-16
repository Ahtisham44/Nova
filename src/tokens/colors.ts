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
  success: { bg: nova[50], text: nova[700], border: nova[100], dot: nova[600] },
  warning: { bg: '#FFFBEB', text: '#92400E', border: '#FEF3C7', dot: '#F59E0B' },
  error: { bg: '#FEF2F2', text: '#B91C1C', border: '#FEE2E2', dot: '#DC2626' },
  info: { bg: '#EFF6FF', text: '#1E40AF', border: '#DBEAFE', dot: '#2563EB' },
  neutral: { bg: neutral[100], text: neutral[600], border: neutral[200], dot: neutral[400] },
} as const

export const gradients = {
  hero: 'linear-gradient(135deg, #15803D 0%, #166534 100%)',
  surface: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
  card: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
  accent: 'linear-gradient(90deg, #16A34A 0%, #22C55E 100%)',
} as const