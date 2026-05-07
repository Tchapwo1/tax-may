/**
 * components/inputs/TaxYearSelect.tsx
 *
 * Tax year selector. Options derived from available tax year files.
 * Changing the year reloads config server-side via URL navigation
 * (handled by the page router, not the store directly).
 */

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Select } from './Select'
import { useCalculatorStore } from '@/shared/store/calculator.store'
import { encodeStateToURL } from '@/shared/store/url'

interface TaxYearSelectProps {
  availableYears: string[]   // passed from server component
}

function yearToLabel(year: string): string {
  // "2026_2027" → "2026/27"
  const [from, to] = year.split('_')
  return `${from}/${to.slice(2)}`
}

export function TaxYearSelect({ availableYears }: TaxYearSelectProps) {
  const taxYear = useCalculatorStore(s => s.input.taxYear)
  const input   = useCalculatorStore(s => s.input)
  const router  = useRouter()

  const options = availableYears.map(y => ({ label: yearToLabel(y), value: y }))

  const handleChange = (year: string) => {
    // Changing tax year navigates to the new year's URL, preserving inputs
    const params = encodeStateToURL({ ...input, taxYear: year })
    const yearSlug = year.replace('_', '-')
    router.push(`/tax-year/${yearSlug}${params ? `?${params}` : ''}`)
  }

  return (
    <Select
      id="tax-year"
      label="Tax year"
      options={options}
      value={taxYear}
      onChange={handleChange}
      className="tax-year-select"
    />
  )
}
