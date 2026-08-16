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
        className="sr-only"
        checked={isChecked}
        disabled={disabled}
        onChange={toggle}
        aria-checked={isChecked}
      />
      <span
        aria-hidden="true"
        className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center shrink-0 transition-colors ${
          isChecked
            ? 'border-nova-600 bg-nova-600'
            : disabled
              ? 'border-neutral-200 bg-neutral-50'
              : 'border-neutral-300 bg-white hover:border-neutral-400'
        }`}
      >
        {isChecked && <Icon name="check" size={9} strokeWidth={3} className="text-white" />}
      </span>
      {label && <span className={`text-sm ${disabled ? 'text-neutral-400' : 'text-neutral-700'}`}>{label}</span>}
    </label>
  )
}