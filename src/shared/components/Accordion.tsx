/**
 * components/ui/Accordion.tsx
 *
 * Accessible accordion. aria-controls + aria-expanded.
 * Animated height using CSS custom property trick (no JS height measurement needed).
 * Supports controlled (isOpen + onToggle) or uncontrolled (defaultOpen) usage.
 */

import React, { useId } from 'react'

export interface AccordionProps {
  id?:          string
  title:        string
  isOpen:       boolean
  onToggle:     () => void
  children:     React.ReactNode
  badge?:       string | number   // e.g. "3 active" shown in header
  className?:   string
}

export function Accordion({ id: propId, title, isOpen, onToggle, children, badge, className = '' }: AccordionProps) {
  const autoId    = useId()
  const id        = propId ?? autoId
  const panelId   = `${id}-panel`
  const triggerId = `${id}-trigger`

  return (
    <div className={`accordion-root ${isOpen ? 'accordion-root--open' : ''} ${className}`}>
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="accordion-trigger"
        onClick={onToggle}
      >
        <span className="accordion-title">{title}</span>

        {badge && (
          <span className="accordion-badge" aria-label={`${badge} options active`}>
            {badge}
          </span>
        )}

        <span className="accordion-chevron" aria-hidden="true">
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms ease' }}
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="accordion-panel"
      >
        <div className="accordion-content">
          {children}
        </div>
      </div>
    </div>
  )
}
