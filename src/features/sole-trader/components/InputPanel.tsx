/**
 * components/inputs/InputPanel.tsx
 *
 * Left column — all user inputs.
 * Composes: GrossIncomeInput → TaxYearSelect → EmploymentTypeToggle → AdvancedAccordion
 *
 * Receives availableYears from the server component (CalculatorShell)
 * so TaxYearSelect can show the right options without a client-side fetch.
 */

'use client'

import React from 'react'
import { GrossIncomeInput }    from './GrossIncomeInput'
import { TaxYearSelect }       from './TaxYearSelect'
import { EmploymentTypeToggle }from './EmploymentTypeToggle'
import { AdvancedAccordion }   from './advanced/AdvancedAccordion'

interface InputPanelProps {
  availableYears: string[]
}

export function InputPanel({ availableYears }: InputPanelProps) {
  return (
    <aside className="input-panel" aria-label="Calculator inputs">
      <div className="input-panel-inner">

        {/* Primary input — always visible, auto-focused */}
        <section className="input-panel-section input-panel-section--primary">
          <GrossIncomeInput />
        </section>

        {/* Secondary inputs — visible but lower hierarchy */}
        <section className="input-panel-section">
          <TaxYearSelect availableYears={availableYears} />
        </section>

        <section className="input-panel-section">
          <EmploymentTypeToggle />
        </section>

        {/* Advanced options — collapsed by default */}
        <section className="input-panel-section input-panel-section--accordion">
          <AdvancedAccordion />
        </section>

      </div>
    </aside>
  )
}
