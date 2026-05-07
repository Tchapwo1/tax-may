/**
 * components/inputs/advanced/ScottishToggle.tsx
 * components/inputs/advanced/BlindAllowanceToggle.tsx
 *
 * Simple toggle wrappers for Scottish rate bands and blind person's allowance.
 * Kept as separate components so they can be reordered in the accordion independently.
 */

'use client'

import React from 'react'
import { Toggle } from '../../ui/Toggle'
import { useCalculatorStore } from '@/shared/store/calculator.store'

export function ScottishToggle() {
  const isScottish    = useCalculatorStore(s => s.input.isScottish)
  const setIsScottish = useCalculatorStore(s => s.setIsScottish)

  return (
    <div className="advanced-section">
      <Toggle
        id="scottish-taxpayer"
        label="Scottish taxpayer"
        checked={isScottish}
        onToggle={setIsScottish}
        hint="Uses Scottish income tax bands (devolved rates)"
      />
    </div>
  )
}

export function BlindAllowanceToggle() {
  const isBlind    = useCalculatorStore(s => s.input.isBlind)
  const setIsBlind = useCalculatorStore(s => s.setIsBlind)

  return (
    <div className="advanced-section">
      <Toggle
        id="blind-persons-allowance"
        label="Blind Person's Allowance"
        checked={isBlind}
        onToggle={setIsBlind}
        hint={`Adds £3,070 to your Personal Allowance`}
      />
    </div>
  )
}
