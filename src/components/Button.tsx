import type { ButtonHTMLAttributes } from 'react'
import Icon from './Icon'
import Spinner from './Spinner'

/**
 * NOVA 2 · Button.
 * Seven variants, three sizes, five interactive states (default, hover,
 * active, disabled, loading). Radius MD (8px), weight 500, 8px grid.
 */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive'
  | 'black'
  | 'white'

export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:bg-nova-800',
  secondary: 'bg-primary-surface text-nova-700 border border-primary-border hover:bg-nova-100 hover:border-nova-200 active:bg-nova-200',
  ghost: 'bg-transparent text-nova-600 hover:bg-primary-surface active:bg-nova-100',
  outline: 'bg-transparent text-neutral-900 border border-border hover:bg-neutral-50 active:bg-neutral-100',
  destructive: 'bg-error text-white hover:bg-red-700 active:bg-red-800',
  black: 'bg-neutral-950 text-white hover:bg-neutral-800 active:bg-neutral-700',
  white: 'bg-white text-neutral-900 border border-border hover:bg-neutral-50 active:bg-neutral-100',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-5 text-[15px] gap-2',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: string
  iconSize?: number
  loading?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconSize,
  loading = false,
  className = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors shrink-0'
  const states = 'disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400 disabled:border-neutral-200 disabled:pointer-events-none'

  return (
    <button
      className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${states} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Spinner size={iconSize ?? 14} /> : icon ? <Icon name={icon} size={iconSize ?? 14} /> : null}
      {children}
    </button>
  )
}