/**
 * NOVA 2 · Primitive color scales.
 * Raw design values — never reference these directly from components;
 * use the semantic aliases in `./colors` where one exists.
 */

export const nova = {
  50: '#F0FDF4',
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',
} as const

export type NovaStep = keyof typeof nova

export const neutral = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
  950: '#0A0A0A',
} as const

export type NeutralStep = keyof typeof neutral

/** Base white used for inverse text and raised surfaces. */
export const white = '#FFFFFF'

/** Amber scale — warning intent (dark-friendly at the 400 step). */
export const amber = {
  400: '#FBBF24',
  500: '#F59E0B',
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
} as const

/** Red scale — error intent (dark-friendly at the 400 step). */
export const red = {
  100: '#FEF2F2',
  200: '#FEE2E2',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444',
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
} as const

/** Blue scale — info intent (dark-friendly at the 400 step). */
export const blue = {
  100: '#DBEAFE',
  200: '#BFDBFE',
  300: '#93C5FD',
  400: '#60A5FA',
  500: '#3B82F6',
  600: '#2563EB',
  700: '#1D4ED8',
  800: '#1E40AF',
} as const

/** Status accent colors (outside the green nova scale). */
export const status = {
  warning: '#F59E0B',
  error: '#DC2626',
  info: '#2563EB',
} as const