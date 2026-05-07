/**
 * components/ui/Toggle.tsx
 *
 * Accessible boolean toggle. role="switch" with aria-checked.
 * Keyboard: Space or Enter toggles.
 * Fully controlled — no internal state.
 */

import React from 'react'

export interface ToggleProps {
  id:        string
  label:     string
  checked:   boolean
  onToggle:  (checked: boolean) => void
  disabled?: boolean
  hint?:     string
  className?: string
}

export function Toggle({ id, label, checked, onToggle, disabled, hint, className = '' }: ToggleProps) {
  return (
    <div className={`toggle-root ${className}`} data-disabled={disabled}>
      <div className="toggle-row">
        <label htmlFor={id} className="toggle-label">
          {label}
          {hint && <span className="toggle-hint">{hint}</span>}
        </label>

        <button
          id={id}
          role="switch"
          type="button"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          className={`toggle-track ${checked ? 'toggle-track--on' : 'toggle-track--off'}`}
          onClick={() => !disabled && onToggle(!checked)}
          onKeyDown={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              !disabled && onToggle(!checked)
            }
          }}
        >
          <span className="toggle-thumb" aria-hidden="true" />
          <span className="sr-only">{checked ? 'On' : 'Off'}</span>
        </button>
      </div>
    </div>
  )
}
