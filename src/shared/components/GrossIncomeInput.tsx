/**
 * components/inputs/GrossIncomeInput.tsx
 *
 * The primary input — gross annual income in GBP.
 * Debounced via the store's updateInput. Auto-focuses on mount.
 *
 * Validates: must be a non-negative number, max £10,000,000.
 * Shows inline error for out-of-range values.
 */

'use client'

import React, { useState } from 'react'
import { InputField } from '../ui/InputField'
import { useCalculatorStore } from '../../lib/store/calculator.store'

export function GrossIncomeInput() {
  const grossIncome    = useCalculatorStore(s => s.input.grossIncome)
  const setGrossIncome = useCalculatorStore(s => s.setGrossIncome)
  const [localValue, setLocalValue] = useState<string>(grossIncome > 0 ? String(grossIncome) : '')

  const error =
    localValue !== '' && (isNaN(Number(localValue)) || Number(localValue) < 0)
      ? 'Enter a valid annual income'
      : Number(localValue) > 10_000_000
      ? 'Maximum income is £10,000,000'
      : undefined

  const handleChange = (raw: string) => {
    setLocalValue(raw)
    const n = parseFloat(raw)
    if (!isNaN(n) && n >= 0 && n <= 10_000_000) {
      setGrossIncome(n)
    }
  }

  return (
    <InputField
      id="gross-income"
      label="Annual gross income"
      type="currency"
      value={localValue}
      onChange={handleChange}
      min={0}
      max={10_000_000}
      step={1000}
      hint="Your salary or income before tax and deductions"
      error={error}
      autoFocus
      className="gross-income-input"
    />
  )
}
