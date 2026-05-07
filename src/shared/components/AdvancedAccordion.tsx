/**
 * components/inputs/advanced/AdvancedAccordion.tsx
 *
 * Wraps all optional advanced inputs inside an Accordion.
 * Badge shows count of active advanced options so users know something is set
 * even when collapsed.
 *
 * Wired to the store's openAdvanced / closeAdvanced actions.
 */

'use client'

import React from 'react'
import { Accordion }          from '../../ui/Accordion'
import { StudentLoanSelect }  from './StudentLoanSelect'
import { PensionInput }       from './PensionInput'
import { ChildBenefitInput }  from './ChildBenefitInput'
import { ScottishToggle, BlindAllowanceToggle } from './OtherToggles'
import { useCalculatorStore } from '../../../lib/store/calculator.store'

function useAdvancedActiveCount(): number {
  const input = useCalculatorStore(s => s.input)
  let count = 0
  if (input.studentLoan.plan !== 'None' || input.studentLoan.includePostgraduate) count++
  if (input.pension.value > 0) count++
  if (input.childBenefit.hasChildren) count++
  if (input.isScottish) count++
  if (input.isBlind) count++
  return count
}

export function AdvancedAccordion() {
  const status       = useCalculatorStore(s => s.status)
  const openAdvanced = useCalculatorStore(s => s.openAdvanced)
  const closeAdvanced= useCalculatorStore(s => s.closeAdvanced)
  const activeCount  = useAdvancedActiveCount()

  const isOpen = status === 'advanced_open'

  return (
    <Accordion
      id="advanced-options"
      title="Advanced options"
      isOpen={isOpen}
      onToggle={isOpen ? closeAdvanced : openAdvanced}
      badge={activeCount > 0 ? activeCount : undefined}
      className="input-panel-accordion"
    >
      <StudentLoanSelect />
      <PensionInput />
      <ChildBenefitInput />
      <ScottishToggle />
      <BlindAllowanceToggle />
    </Accordion>
  )
}
