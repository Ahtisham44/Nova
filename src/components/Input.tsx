import type { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'
import Icon from './Icon'

/**
 * NOVA 2 · Form inputs.
 * Radius MD (8px), 1px border, 40px (h-10) default height, explicit
 * focus/error rings. Inline input + button pairs must both keep h-10.
 */

export type InputSize = 'sm' | 'md' | 'lg'

const INPUT_SIZES: Record<InputSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-[15px]',
}

const INPUT_STATES = {
  base: 'w-full rounded-md border px-3 text-neutral-800 placeholder:text-neutral-400 outline-none transition-colors bg-white',
  border: 'border-neutral-200',
  focus: 'focus:border-nova-600 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.12)]',
  error: 'border-error focus:border-error focus:shadow-[0_0_0_3px_rgba(220,38,38,0.08)]',
  disabled: 'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
}

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  icon?: string
  iconSize?: number
  error?: string
  hint?: string
  size?: InputSize
}

export default function TextInput({
  label,
  icon,
  iconSize = 15,
  error,
  hint,
  size = 'md',
  className = '',
  id,
  ...rest
}: TextInputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
  const border = error ? INPUT_STATES.error : `${INPUT_STATES.border} ${INPUT_STATES.focus}`

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-neutral-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
            <Icon name={icon} size={iconSize} />
          </span>
        )}
        <input
          id={inputId}
          className={`${INPUT_SIZES[size]} ${INPUT_STATES.base} ${border} ${INPUT_STATES.disabled} ${icon ? 'pl-9' : ''}`}
          {...rest}
        />
      </div>
      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
      {!error && hint && <p className="text-xs text-neutral-500 mt-1.5">{hint}</p>}
    </div>
  )
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  size?: InputSize
  children: ReactNode
}

export function Select({ label, size = 'md', className = '', id, children, ...rest }: SelectProps) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-neutral-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`${INPUT_SIZES[size]} ${INPUT_STATES.base} ${INPUT_STATES.border} ${INPUT_STATES.focus} appearance-none pr-8 cursor-pointer`}
          {...rest}
        >
          {children}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
          <Icon name="chevron-down" size={14} />
        </span>
      </div>
    </div>
  )
}