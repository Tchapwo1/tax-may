/**
 * components/ui/InputField.tsx
 *
 * Base input primitive. Handles currency, percentage, number, and text.
 * All business logic lives in the store — this component is purely presentational.
 *
 * Accessibility:
 *   - Always uses <label> associated via htmlFor
 *   - Error state announced via aria-describedby
 *   - No placeholder-as-label
 *   - Visible focus ring using token border_active
 */

import React from 'react'

export type InputFieldType = 'text' | 'number' | 'currency' | 'percentage'

export interface InputFieldProps {
  id:           string
  label:        string
  type:         InputFieldType
  value:        string | number
  onChange:     (value: string) => void
  min?:         number
  max?:         number
  step?:        number
  hint?:        string
  error?:       string
  disabled?:    boolean
  prefix?:      string   // e.g. "£"
  suffix?:      string   // e.g. "%"
  ariaLabel?:   string
  className?:   string
  autoFocus?:   boolean
}

export function InputField({
  id, label, type, value, onChange,
  min, max, step, hint, error, disabled,
  prefix, suffix, ariaLabel, className = '', autoFocus,
}: InputFieldProps) {

  const inputType = type === 'currency' || type === 'percentage' || type === 'number'
    ? 'number'
    : 'text'

  const derivedPrefix = prefix ?? (type === 'currency' ? '£' : undefined)
  const derivedSuffix = suffix ?? (type === 'percentage' ? '%' : undefined)
  const derivedStep   = step   ?? (type === 'currency' ? 1 : type === 'percentage' ? 0.1 : 1)
  const errorId       = `${id}-error`
  const hintId        = `${id}-hint`
  const describedBy   = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ')

  return (
    <div className={`input-field-root ${className}`} data-disabled={disabled}>
      <label htmlFor={id} className="input-field-label">
        {label}
      </label>

      {hint && !error && (
        <span id={hintId} className="input-field-hint">
          {hint}
        </span>
      )}

      <div className={`input-field-wrapper ${error ? 'input-field-wrapper--error' : ''}`}>
        {derivedPrefix && (
          <span className="input-field-affix input-field-prefix" aria-hidden="true">
            {derivedPrefix}
          </span>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          min={min}
          max={max}
          step={derivedStep}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-label={ariaLabel ?? label}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          className={`input-field-input ${derivedPrefix ? 'input-field-input--has-prefix' : ''} ${derivedSuffix ? 'input-field-input--has-suffix' : ''}`}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => {
            // Prevent 'e', '+', '-' in number fields (avoids scientific notation)
            if (inputType === 'number' && ['e', 'E', '+', '-'].includes(e.key) && type !== 'text') {
              e.preventDefault()
            }
          }}
        />

        {derivedSuffix && (
          <span className="input-field-affix input-field-suffix" aria-hidden="true">
            {derivedSuffix}
          </span>
        )}
      </div>

      {error && (
        <span id={errorId} role="alert" className="input-field-error">
          {error}
        </span>
      )}
    </div>
  )
}
