/**
 * components/inputs/EmploymentTypeToggle.tsx
 *
 * Segmented control for employment type.
 * Affects which NI class is applied (Class 1 vs Class 4).
 */

'use client'

import React from 'react'
import { SegmentedControl } from '../ui/SegmentedControl'
import { useCalculatorStore } from '../../lib/store/calculator.store'
import type { EmploymentType } from '../../lib/calculator/types'

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
