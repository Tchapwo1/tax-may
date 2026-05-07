/**
 * components/inputs/advanced/ChildBenefitInput.tsx
 *
 * Child benefit toggle + children count input.
 * Only shows count input when hasChildren is true.
 */

'use client'

import React from 'react'
import { Toggle }     from '../../ui/Toggle'
import { InputField } from '../../ui/InputField'
import { useCalculatorStore } from '../../../lib/store/calculator.store'

export function ChildBenefitInput() {
  const { childBenefit }  = useCalculatorStore(s => s.input)
  const setChildBenefit   = useCalculatorStore(s => s.setChildBenefit)

  const handleCountChange = (raw: string) => {
    const n = parseInt(raw, 10)
    if (!isNaN(n) && n >= 0 && n <= 20) {
      setChildBenefit({ childrenCount: n })
    } else if (raw === '') {
      setChildBenefit({ childrenCount: 0 })
    }
  }

  return (
    <div className="advanced-section">
      <Toggle
        id="has-children"
        label="Claiming Child Benefit"
        checked={childBenefit.hasChildren}
        onToggle={v => setChildBenefit({ hasChildren: v, childrenCount: v ? Math.max(1, childBenefit.childrenCount) : 0 })}
        hint="Needed to calculate the High Income Child Benefit Charge"
      />

      {childBenefit.hasChildren && (
        <InputField
          id="children-count"
          label="Number of children"
          type="number"
          value={childBenefit.childrenCount === 0 ? '' : childBenefit.childrenCount}
          onChange={handleCountChange}
          min={1}
          max={20}
          step={1}
          hint="Qualifying children under 16 (or under 20 in approved education)"
          className="advanced-input"
        />
      )}
    </div>
  )
}
