import { radius } from './scale'

/**
 * NOVA 2 · Component-level tokens.
 * Usage-specific tokens that reference semantic/primitive tiers.
 * Components should prefer these over raw values.
 */

export const componentTokens = {
  button: {
    height: { sm: '32px', md: '40px', lg: '48px' },
    radius: radius.md,
    fontWeight: 500,
  },
  input: {
    height: { sm: '32px', md: '40px', lg: '48px' },
    radius: radius.md,
    focusRing: '0 0 0 3px rgba(22,163,74,0.12)',
  },
  card: {
    radius: radius.lg,
    padding: { sm: '16px', md: '24px' },
  },
  badge: {
    radius: radius.full,
    height: '20px',
    fontSize: '11px',
  },
  avatar: {
    size: { xs: '24px', sm: '32px', md: '40px', lg: '48px', xl: '56px' },
  },
} as const