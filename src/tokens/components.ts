import { radius, spacing } from './scale'
import { semantic } from './colors'
import { typeScale, fontWeight } from './typography'

/** Convert a hex color to an rgba() string at the given alpha. */
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

/**
 * NOVA 2 · Component-level tokens.
 * Usage-specific tokens that reference semantic/primitive tiers.
 * Components should prefer these over raw values.
 */

export const componentTokens = {
  button: {
    height: { sm: spacing[8], md: spacing[10], lg: spacing[12] },
    radius: radius.md,
    fontWeight: fontWeight.medium,
    primary: semantic.primary,
    primaryHover: semantic.primaryHover,
    primaryActive: semantic.primaryActive,
    primaryDisabled: semantic.primaryDisabled,
  },
  input: {
    height: { sm: spacing[8], md: spacing[10], lg: spacing[12] },
    radius: radius.md,
    focusRing: `0 0 0 3px ${hexToRgba(semantic.focusRing, 0.12)}`,
    borderFocus: semantic.borderFocus,
  },
  card: {
    radius: radius.lg,
    padding: { sm: spacing[4], md: spacing[6] },
  },
  badge: {
    radius: radius.full,
    height: spacing[5],
    fontSize: typeScale.caption.fontSize,
  },
  avatar: {
    size: {
      xs: spacing[6],
      sm: spacing[8],
      md: spacing[10],
      lg: spacing[12],
      xl: spacing[14],
    },
  },
} as const