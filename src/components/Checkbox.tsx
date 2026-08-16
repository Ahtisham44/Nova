import { useState } from 'react'
import type { ReactNode } from 'react'
import Icon from './Icon'

/**
 * NOVA 2 · Checkbox.
 * Radius SM (4px), checked = Nova Green fill with white check mark.
 */

export interface CheckboxProps {
  label?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export default function Checkbox({ label, checked, defaultChecked = false, disabled, onChange }: CheckboxProps) {
  const [internal, setInternal] = useState(defaultChecked)
  const isChecked = onChange ? Boolean(checked) : internal

  const toggle = () => {
    const next = !isChecked
    if (onChange) onChange(next)
    else setInternal(next)
  }

  return (
    <label className={`inline-flex items-center gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        aria-checked={isChecked}
      />
      <span
        aria-hidden="true"
        className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-border-focus peer-focus-visible:ring-offset-2 ${
          isChecked
            ? 'border-nova-600 bg-nova-600'
            : disabled
              ? 'border-border bg-surface'
              : 'border-border-strong bg-surface-elevated hover:border-text-muted'
        }`}
      >
        {isChecked && <Icon name="check" size={9} strokeWidth={3} className="text-white" />}
      </span>
      {label && <span className={`text-sm ${disabled ? 'text-text-disabled' : 'text-text'}`}>{label}</span>}
    </label>
  )
}