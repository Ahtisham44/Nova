import type { ReactNode } from 'react'

/**
 * NOVA 2 · Badge.
 * Full-radius pill. Status badges pair a tinted surface with a dot
 * indicator. Heights: 20px default, 24px with content.
 */

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral'

const VARIANTS: Record<BadgeVariant, string> = {
  success: 'bg-primary-surface text-nova-700 border-primary-border',
  warning: 'bg-amber-50 text-amber-800 border-amber-100',
  error: 'bg-red-50 text-red-700 border-red-100',
  info: 'bg-blue-50 text-blue-700 border-blue-100',
  neutral: 'bg-neutral-100 text-neutral-600 border-neutral-200',
}

const DOTS: Record<BadgeVariant, string> = {
  success: 'bg-nova-600',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
  neutral: 'bg-neutral-400',
}

export interface BadgeProps {
  variant?: BadgeVariant
  dot?: boolean
  className?: string
  children: ReactNode
}

export default function Badge({ variant = 'neutral', dot = false, className = '', children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${VARIANTS[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOTS[variant]}`} />}
      {children}
    </span>
  )
}