/**
 * components/inputs/EmploymentTypeToggle.tsx
 *
 * Segmented control for employment type.
 * Affects which NI class is applied (Class 1 vs Class 4).
 */

'use client'

import React from 'react'
import { SegmentedControl } from './SegmentedControl'
import { useCalculatorStore } from '@/shared/store/calculator.store'
import type { EmploymentType } from '@/features/sole-trader/calculator/sole-trader-calculator'

const OPTIONS = [
  { label: 'Employed',      value: 'employed',      hint: 'PAYE — Class 1 NI' },
  { label: 'Self-employed', value: 'self_employed',  hint: 'Class 4 NI' },
  { label: 'Mixed',         value: 'mixed',          hint: 'PAYE + self-employed' },
]

export function EmploymentTypeToggle() {
  const employmentType    = useCalculatorStore(s => s.input.employmentType)
  const setEmploymentType = useCalculatorStore(s => s.setEmploymentType)

  return (
    <SegmentedControl
      id="employment-type"
      label="Employment type"
      options={OPTIONS}
      value={employmentType}
      onChange={v => setEmploymentType(v as EmploymentType)}
      className="employment-type-toggle"
    />
  )
}
