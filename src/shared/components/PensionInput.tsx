/**
 * components/inputs/advanced/PensionInput.tsx
 *
 * Pension contribution input with type toggle (percentage vs fixed).
 * Salary sacrifice assumed — see blueprint Part 2 notes.
 */

'use client'

import React from 'react'
import { SegmentedControl } from '../../ui/SegmentedControl'
import { InputField }       from '../../ui/InputField'
import { useCalculatorStore } from '../../../lib/store/calculator.store'

const TYPE_OPTIONS = [
  { label: '% of salary', value: 'percentage' },
  { label: 'Fixed £',     value: 'fixed' },
]

export function PensionInput() {
  const { pension }    = useCalculatorStore(s => s.input)
  const setPension     = useCalculatorStore(s => s.setPension)

  const handleTypeChange = (type: string) => {
    setPension({ type: type as 'percentage' | 'fixed', value: 0 })
  }

  const handleValueChange = (raw: string) => {
    const n = parseFloat(raw)
    if (!isNaN(n) && n >= 0) {
      setPension({ value: pension.type === 'percentage' ? Math.min(n, 100) : n })
    } else if (raw === '') {
      setPension({ value: 0 })
    }
  }

  const error = pension.type === 'percentage' && pension.value > 100
    ? 'Cannot exceed 100%'
    : undefined

  return (
    <div className="advanced-section">
      <SegmentedControl
        id="pension-type"
        label="Pension contribution type"
        options={TYPE_OPTIONS}
        value={pension.type}
        onChange={handleTypeChange}
        className="advanced-segmented"
      />

      <InputField
        id="pension-value"
        label={pension.type === 'percentage' ? 'Contribution (% of gross)' : 'Contribution (annual £)'}
        type={pension.type === 'percentage' ? 'percentage' : 'currency'}
        value={pension.value === 0 ? '' : pension.value}
        onChange={handleValueChange}
        min={0}
        max={pension.type === 'percentage' ? 100 : 60000}
        hint="Treated as salary sacrifice — reduces income tax and NI"
        error={error}
        className="advanced-input"
      />
    </div>
  )
}
