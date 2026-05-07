/**
 * components/ui/Select.tsx
 *
 * Native <select> — best keyboard/screen reader support across all devices.
 * No custom dropdown JS — native semantics are correct by default.
 */

import React from 'react'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectGroup {
  groupLabel: string
  options: SelectOption[]
}

export interface SelectProps {
  id:        string
  label:     string
  options:   (SelectOption | SelectGroup)[]
  value:     string
  onChange:  (value: string) => void
  disabled?: boolean
  hint?:     string
  error?:    string
  className?: string
}

function isGroup(opt: SelectOption | SelectGroup): opt is SelectGroup {
  return 'groupLabel' in opt
}

export function Select({ id, label, options, value, onChange, disabled, hint, error, className = '' }: SelectProps) {
  const errorId = `${id}-error`
  const hintId  = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className={`select-root ${className}`} data-disabled={disabled}>
      <label htmlFor={id} className="select-label">
        {label}
      </label>

      {hint && !error && (
        <span id={hintId} className="select-hint">{hint}</span>
      )}

      <div className={`select-wrapper ${error ? 'select-wrapper--error' : ''}`}>
        <select
          id={id}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className="select-input"
          onChange={e => onChange(e.target.value)}
        >
          {options.map((opt, i) =>
            isGroup(opt) ? (
              <optgroup key={i} label={opt.groupLabel}>
                {opt.options.map(o => (
                  <option key={o.value} value={o.value} disabled={o.disabled}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            )
          )}
        </select>

        {/* Custom chevron — purely decorative */}
        <span className="select-chevron" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {error && (
        <span id={errorId} role="alert" className="select-error">{error}</span>
      )}
    </div>
  )
}
