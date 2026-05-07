/**
 * Canonical Internal Linking Map — TaxCalculator365
 * 
 * This registry defines the authoritative PageRank flow for the platform.
 */

export interface InternalLink {
  from: string;
  to: string;
  anchorText: string;
  context: string;
  priority: 1 | 2 | 3;
}

export const canonicalRoutes = {
  calculators: {
    paye: '/calculators/paye',
    landlord: '/calculators/landlord',
    selfAssessment: '/calculators/self-assessment',
    soleTraderVsLtd: '/calculators/sole-trader-vs-limited',
  },
  guides: {
    hub: '/guides',
    section24: '/guides/section-24-guide',
    payeMasterclass: '/guides/paye-masterclass',
    saChecklist: '/guides/self-assessment-checklist',
  }
};

export const globalLinks: InternalLink[] = [
  // Flagship Integration
  {
    from: canonicalRoutes.calculators.paye,
    to: canonicalRoutes.calculators.selfAssessment,
    anchorText: "Full Self-Assessment Modelling",
    context: "Related: 'Have other income sources?'",
    priority: 1
  },
  {
    from: canonicalRoutes.calculators.landlord,
    to: canonicalRoutes.guides.section24,
    anchorText: "Section 24 Survival Guide",
    context: "Mortgage interest helper text",
    priority: 1
  },
  {
    from: canonicalRoutes.calculators.paye,
    to: canonicalRoutes.calculators.soleTraderVsLtd,
    anchorText: "Sole Trader vs Limited Company",
    context: "Related: 'Starting a business?'",
    priority: 2
  },
  // Guide Cross-Linking
  {
    from: canonicalRoutes.guides.section24,
    to: canonicalRoutes.calculators.landlord,
    anchorText: "Landlord Tax Modeller",
    context: "Embedded Instrument CTA",
    priority: 1
  },
  {
    from: canonicalRoutes.guides.hub,
    to: canonicalRoutes.calculators.selfAssessment,
    anchorText: "Flagship Self-Assessment Calculator",
    context: "Hero CTA",
    priority: 1
  }
];
