import type { ReactNode } from 'react'

/**
 * NOVA 2 · Badge.
 * Full-radius pill. Status badges pair a tinted surface with a dot
 * indicator. Heights: 20px default, 24px with content.
 */

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral'

const VARIANTS: Record<BadgeVariant, string> = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  info: 'bg-info/10 text-info border-info/20',
  neutral: 'bg-surface-active text-text-muted border-border',
}

const DOTS: Record<BadgeVariant, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
  neutral: 'bg-text-disabled',
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