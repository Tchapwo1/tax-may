/**
 * components/ui/StickySummary.tsx
 *
 * Mobile-only sticky bar fixed to top of viewport.
 * Shows net pay so user can always see the result while editing inputs.
 * Hidden on desktop (CSS handles this — no JS needed).
 *
 * Only rendered when output exists (netPay > 0 or explicitly provided).
 */

import React from 'react'

export interface StickySummaryProps {
  netPay:     number
  taxYear:    string
  className?: string
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-GB', {
    style:    'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n)
}

export function StickySummary({ netPay, taxYear, className = '' }: StickySummaryProps) {
  const yearDisplay = taxYear.replace('_', '/')

  return (
    <div
      className={`sticky-summary ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`Take-home pay: ${formatCurrency(netPay)} per year`}
    >
      <span className="sticky-summary-label">Take-home</span>
      <span className="sticky-summary-value">{formatCurrency(netPay)}</span>
      <span className="sticky-summary-period">/ year · {yearDisplay}</span>
    </div>
  )
}
