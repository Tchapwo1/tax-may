/**
 * components/ui/SegmentedControl.tsx
 *
 * Segmented control — for mutually exclusive options (e.g. Employed / Self-employed).
 * Better than a Select for 2–3 options because all choices are visible simultaneously.
 *
 * Accessibility: role="radiogroup" with role="radio" children.
 * Keyboard: arrow keys cycle through options.
 */

import React, { useRef } from 'react'

export interface SegmentedOption {
  label:    string
  value:    string
  hint?:    string
}

export interface SegmentedControlProps {
  id:         string
  label:      string
  options:    SegmentedOption[]
  value:      string
  onChange:   (value: string) => void
  disabled?:  boolean
  className?: string
}

export function SegmentedControl({
  id, label, options, value, onChange, disabled, className = ''
}: SegmentedControlProps) {
  const groupRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const buttons = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
    if (!buttons) return

    let next = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      next = (index + 1) % options.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      next = (index - 1 + options.length) % options.length
    } else {
      return
    }

    buttons[next].focus()
    onChange(options[next].value)
  }

  return (
    <div className={`segmented-root ${className}`}>
      <span className="segmented-label" id={`${id}-label`}>{label}</span>

      <div
        ref={groupRef}
        role="radiogroup"
        aria-labelledby={`${id}-label`}
        aria-disabled={disabled}
        className="segmented-group"
      >
        {options.map((opt, i) => {
          const isSelected = opt.value === value
          return (
            <button
              key={opt.value}
              role="radio"
              type="button"
              aria-checked={isSelected}
              aria-label={opt.hint ? `${opt.label} — ${opt.hint}` : opt.label}
              disabled={disabled}
              tabIndex={isSelected ? 0 : -1}
              className={`segmented-option ${isSelected ? 'segmented-option--selected' : ''}`}
              onClick={() => !disabled && onChange(opt.value)}
              onKeyDown={e => handleKeyDown(e, i)}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
