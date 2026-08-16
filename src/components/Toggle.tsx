import { useState } from 'react'
import type { ReactNode } from 'react'

/**
 * NOVA 2 · Toggle (switch).
 * Full-radius pill, 40x24px. On = Nova Green track with white knob.
 */

export interface ToggleProps {
  label?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export default function Toggle({ label, checked, defaultChecked = false, disabled, onChange }: ToggleProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isOn = onChange ? Boolean(checked) : internal

  const toggle = () => {
    const next = !isOn
    if (onChange) onChange(next)
    else setInternal(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={typeof label === 'string' ? label : undefined}
      onClick={toggle}
      disabled={disabled}
      className={`inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        aria-hidden="true"
        className={`w-10 h-6 rounded-full relative shrink-0 transition-colors ${
          isOn ? 'bg-nova-600' : disabled ? 'bg-border-strong dark:bg-neutral-200' : 'bg-border-strong group-hover:bg-text-muted'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full transition-all ${disabled ? 'bg-white dark:bg-neutral-400' : 'bg-white'}`}
          style={{ left: isOn ? '22px' : '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}
        />
      </span>
      {label && <span className={`text-sm ${disabled ? 'text-text-disabled' : 'text-text'}`}>{label}</span>}
    </button>
  )
}