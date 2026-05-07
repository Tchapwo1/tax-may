/**
 * components/inputs/advanced/StudentLoanSelect.tsx
 *
 * Student loan plan selector + postgraduate toggle.
 * Groups plans logically so users can identify their plan quickly.
 */

'use client'

import React from 'react'
import { Select }  from '../../ui/Select'
import { Toggle }  from '../../ui/Toggle'
import { useCalculatorStore } from '../../../lib/store/calculator.store'

export function StudentLoanSelect() {
  const { studentLoan } = useCalculatorStore(s => s.input)
  const setStudentLoan  = useCalculatorStore(s => s.setStudentLoan)

  return (
    <div className="advanced-section">
      <Select
        id="student-loan-plan"
        label="Student loan plan"
        value={studentLoan.plan}
        onChange={v => setStudentLoan({ plan: v as typeof studentLoan.plan })}
        hint="Check your loan statement or student finance account"
        options={[
          { label: 'None', value: 'None' },
          {
            groupLabel: 'Undergraduate',
            options: [
              { label: 'Plan 1 — started before Sept 2012 (England/Wales) or any time (NI)', value: 'Plan1' },
              { label: 'Plan 2 — started Sept 2012 or later (England/Wales)', value: 'Plan2' },
              { label: 'Plan 4 — Scotland', value: 'Plan4' },
              { label: 'Plan 5 — started Aug 2023 or later (England)', value: 'Plan5' },
            ],
          },
        ]}
      />

      <Toggle
        id="include-postgraduate"
        label="Also repaying a Postgraduate loan"
        checked={studentLoan.includePostgraduate}
        onToggle={v => setStudentLoan({ includePostgraduate: v })}
        hint="Doctoral or Master's loan — 6% above £21,000"
        className="advanced-toggle"
      />
    </div>
  )
}
