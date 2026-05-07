/**
 * Content Cluster Internal Linking Map — taxcalculator365.com
 *
 * UPGRADED vs original:
 * - All 7 clusters mapped (not just 1)
 * - URL strategy locked in
 * - Anchor text strategy defined
 * - Pillar → spoke → service flow for each cluster
 * - Cross-cluster links (shared users: landlord who is also a director, etc.)
 * - Priority score per link (1 = must-have, 2 = high, 3 = nice-to-have)
 */

export interface InternalLink {
  from: string;       // URL path of source page
  to: string;         // URL path of destination page
  anchorText: string; // exact anchor text — controls PageRank flow signal
  context: string;    // where on the page this link should appear
  priority: 1 | 2 | 3;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 1 — PAYE / Employment
// ─────────────────────────────────────────────────────────────────────────────

export const cluster1Links: InternalLink[] = [
  // Calculator → guides
  {
    from: "/calculators/take-home-pay",
    to: "/guides/paye/tax-codes",
    anchorText: "how to check your tax code for errors",
    context: "Results card: 'Your tax code determines your personal allowance.'",
    priority: 1,
  },
  {
    from: "/calculators/take-home-pay",
    to: "/guides/paye/marriage-allowance",
    anchorText: "marriage allowance",
    context: "Results FAQ: 'You may be able to transfer 10% of your PA to a spouse.'",
    priority: 2,
  },
  {
    from: "/calculators/take-home-pay",
    to: "/calculators/bonus-overtime",
    anchorText: "Bonus & Overtime Calculator",
    context: "Related calculators block",
    priority: 2,
  },
  {
    from: "/calculators/take-home-pay",
    to: "/calculators/multiple-jobs",
    anchorText: "Multiple Jobs Tax Calculator",
    context: "Related calculators block",
    priority: 2,
  },
  {
    from: "/calculators/take-home-pay",
    to: "/calculators/student-loan",
    anchorText: "Student Loan Repayment Calculator",
    context: "Related calculators block",
    priority: 3,
  },
  // Calculator → services
  {
    from: "/calculators/take-home-pay",
    to: "/services/self-assessment-paye",
    anchorText: "file a Self Assessment return",
    context: "CTA: triggered when employment income + side income detected.",
    priority: 1,
  },
  // Guides hub
  {
    from: "/guides/paye",
    to: "/calculators/take-home-pay",
    anchorText: "PAYE Take-Home Pay Calculator",
    context: "Hero CTA and inline mentions",
    priority: 1,
  },
  {
    from: "/guides/paye",
    to: "/guides/paye/tax-codes",
    anchorText: "understanding your tax code",
    context: "Guide grid",
    priority: 1,
  },
  {
    from: "/guides/paye",
    to: "/guides/paye/high-income-child-benefit",
    anchorText: "High Income Child Benefit Charge",
    context: "Guide grid",
    priority: 2,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 2 — Self-Employed / Sole Traders
// ─────────────────────────────────────────────────────────────────────────────

export const cluster2Links: InternalLink[] = [
  // Core calculator outbound links
  {
    from: "/calculators/sole-trader",
    to: "/resources/sole-trader-expenses-checklist",
    anchorText: "Sole Trader Expenses Checklist",
    context: "Inline lead magnet banner + exit intent modal",
    priority: 1,
  },
  {
    from: "/calculators/sole-trader",
    to: "/guides/self-employed/trading-allowance",
    anchorText: "how the £1,000 trading allowance works",
    context: "Trading allowance toggle helper text",
    priority: 1,
  },
  {
    from: "/calculators/sole-trader",
    to: "/guides/self-employed/allowable-expenses",
    anchorText: "allowable expenses for sole traders",
    context: "Expenses input helper text + FAQ",
    priority: 1,
  },
  {
    from: "/calculators/sole-trader",
    to: "/guides/self-employed/cis",
    anchorText: "how CIS deductions work",
    context: "CIS input helper text",
    priority: 2,
  },
  {
    from: "/calculators/sole-trader",
    to: "/services/self-assessment-sole-traders",
    anchorText: "file your Self Assessment return",
    context: "Self Assessment CTA (shown when profit > £1,000)",
    priority: 1,
  },
  {
    from: "/calculators/sole-trader",
    to: "/services/mtd-sole-traders",
    anchorText: "get MTD-ready",
    context: "MTD CTA (shown when income > £10,000)",
    priority: 1,
  },
  {
    from: "/calculators/sole-trader",
    to: "/services/cis-refund",
    anchorText: "claim your CIS refund",
    context: "CIS refund CTA (shown when refund detected)",
    priority: 1,
  },
  // Cross-cluster: sole trader considering going limited
  {
    from: "/calculators/sole-trader",
    to: "/calculators/sole-trader-vs-limited",
    anchorText: "compare sole trader vs limited company tax",
    context: "Below results: 'Earning more? See if a limited company saves you tax.'",
    priority: 2,
  },
  // Expenses checklist lead magnet
  {
    from: "/resources/sole-trader-expenses-checklist",
    to: "/calculators/sole-trader",
    anchorText: "Self-Employed Tax Calculator",
    context: "Hero CTA: 'Calculate your tax with our free calculator'",
    priority: 1,
  },
  {
    from: "/resources/sole-trader-expenses-checklist",
    to: "/guides/self-employed/allowable-expenses",
    anchorText: "full guide to allowable expenses",
    context: "Inline mention: 'For the full rules, see our allowable expenses guide'",
    priority: 2,
  },
  // Trading allowance guide
  {
    from: "/guides/self-employed/trading-allowance",
    to: "/calculators/sole-trader",
    anchorText: "Self-Employed Tax Calculator",
    context: "Inline CTA after every major section",
    priority: 1,
  },
  {
    from: "/guides/self-employed/trading-allowance",
    to: "/guides/self-employed/allowable-expenses",
    anchorText: "allowable expenses guide",
    context: "Section: 'Trading allowance vs actual expenses — which is better?'",
    priority: 2,
  },
  // Allowable expenses guide
  {
    from: "/guides/self-employed/allowable-expenses",
    to: "/calculators/sole-trader",
    anchorText: "calculate your tax after expenses",
    context: "Inline CTA: 'Now enter your expenses into the calculator'",
    priority: 1,
  },
  {
    from: "/guides/self-employed/allowable-expenses",
    to: "/resources/sole-trader-expenses-checklist",
    anchorText: "download the expenses checklist",
    context: "Lead magnet in sidebar and at end of guide",
    priority: 1,
  },
  // Self Assessment service page
  {
    from: "/services/self-assessment-sole-traders",
    to: "/calculators/sole-trader",
    anchorText: "estimate your tax bill",
    context: "Hero subtext: 'Not sure what you owe?'",
    priority: 1,
  },
  {
    from: "/services/self-assessment-sole-traders",
    to: "/guides/self-employed/allowable-expenses",
    anchorText: "allowable expenses",
    context: "What's included section",
    priority: 2,
  },
  // MTD service page
  {
    from: "/services/mtd-sole-traders",
    to: "/calculators/sole-trader",
    anchorText: "check if you're over the MTD threshold",
    context: "Hero: 'If your income is over £10,000'",
    priority: 1,
  },
  {
    from: "/services/mtd-sole-traders",
    to: "/guides/self-employed/mtd",
    anchorText: "MTD for sole traders explained",
    context: "Inline mention",
    priority: 2,
  },
  // Guides hub
  {
    from: "/guides/self-employed",
    to: "/calculators/sole-trader",
    anchorText: "Self-Employed Tax Calculator",
    context: "Hero and guide grid CTA",
    priority: 1,
  },
  {
    from: "/guides/self-employed",
    to: "/guides/self-employed/trading-allowance",
    anchorText: "The £1,000 trading allowance explained",
    context: "Guide grid card",
    priority: 1,
  },
  {
    from: "/guides/self-employed",
    to: "/guides/self-employed/allowable-expenses",
    anchorText: "Allowable expenses for sole traders",
    context: "Guide grid card",
    priority: 1,
  },
  {
    from: "/guides/self-employed",
    to: "/guides/self-employed/mtd",
    anchorText: "Making Tax Digital for sole traders",
    context: "Guide grid card",
    priority: 1,
  },
  {
    from: "/guides/self-employed",
    to: "/guides/self-employed/cis",
    anchorText: "CIS tax for construction workers",
    context: "Guide grid card",
    priority: 2,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 3 — Company Directors / Limited Companies
// ─────────────────────────────────────────────────────────────────────────────

export const cluster3Links: InternalLink[] = [
  {
    from: "/calculators/dividends-director",
    to: "/calculators/sole-trader-vs-limited",
    anchorText: "sole trader vs limited company comparison",
    context: "Related calculators: 'See if you'd save more as a sole trader'",
    priority: 1,
  },
  {
    from: "/calculators/dividends-director",
    to: "/services/company-accounts",
    anchorText: "annual company accounts and tax return",
    context: "CTA: triggered when profit > Corporation Tax threshold",
    priority: 1,
  },
  {
    from: "/calculators/dividends-director",
    to: "/guides/directors/dividend-vs-salary",
    anchorText: "salary vs dividends: the complete guide",
    context: "Results explainer block",
    priority: 1,
  },
  // Cross-cluster: director also a landlord
  {
    from: "/calculators/dividends-director",
    to: "/calculators/landlord-rental-income",
    anchorText: "Landlord Tax Calculator",
    context: "Related calculators — if property income declared",
    priority: 3,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 4 — Landlords & Property
// ─────────────────────────────────────────────────────────────────────────────

export const cluster4Links: InternalLink[] = [
  {
    from: "/calculators/landlord-rental-income",
    to: "/resources/landlord-expenses-checklist",
    anchorText: "Ultimate Landlord Expenses Checklist",
    context: "Inline lead magnet + exit intent",
    priority: 1,
  },
  {
    from: "/calculators/landlord-rental-income",
    to: "/calculators/cgt-property",
    anchorText: "Capital Gains Tax calculator for property sales",
    context: "Related calculators block + CTA if user marks 'sold a property'",
    priority: 1,
  },
  {
    from: "/calculators/landlord-rental-income",
    to: "/guides/landlords/section-24",
    anchorText: "how Section 24 affects your mortgage interest",
    context: "Mortgage interest input helper",
    priority: 1,
  },
  {
    from: "/calculators/landlord-rental-income",
    to: "/services/self-assessment-landlords",
    anchorText: "file your landlord Self Assessment",
    context: "CTA when profit > £2,500",
    priority: 1,
  },
  {
    from: "/calculators/landlord-rental-income",
    to: "/services/mtd-landlords",
    anchorText: "MTD for landlords",
    context: "CTA when rental income > £10,000",
    priority: 1,
  },
  // Cross-cluster: landlord also has capital gain
  {
    from: "/calculators/cgt-property",
    to: "/services/cgt-reporting",
    anchorText: "CGT reporting service — 60-day deadline",
    context: "CTA immediately after result shown",
    priority: 1,
  },
  {
    from: "/calculators/cgt-property",
    to: "/guides/landlords/cgt-property",
    anchorText: "CGT on property sales: step-by-step guide",
    context: "Results explainer block",
    priority: 1,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 5 — Investors & Savings
// ─────────────────────────────────────────────────────────────────────────────

export const cluster5Links: InternalLink[] = [
  {
    from: "/calculators/savings-investment-tax",
    to: "/guides/investors/personal-savings-allowance",
    anchorText: "Personal Savings Allowance explained",
    context: "Bank interest input helper",
    priority: 1,
  },
  {
    from: "/calculators/savings-investment-tax",
    to: "/calculators/cgt-property",
    anchorText: "Capital Gains Tax Calculator",
    context: "Related: 'Also sold a property?'",
    priority: 2,
  },
  {
    from: "/calculators/savings-investment-tax",
    to: "/services/self-assessment-investors",
    anchorText: "file a Self Assessment for investment income",
    context: "CTA when bank interest > PSA or dividends > allowance",
    priority: 1,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CLUSTER 6 — Families & Benefits
// ─────────────────────────────────────────────────────────────────────────────

export const cluster6Links: InternalLink[] = [
  {
    from: "/calculators/high-income-child-benefit",
    to: "/services/self-assessment-paye",
    anchorText: "file a Self Assessment return for the Child Benefit charge",
    context: "CTA: shown when HICBC charge > 0",
    priority: 1,
  },
  {
    from: "/calculators/high-income-child-benefit",
    to: "/guides/families/hicbc-explained",
    anchorText: "High Income Child Benefit Charge explained",
    context: "Results explainer block",
    priority: 1,
  },
  {
    from: "/calculators/high-income-child-benefit",
    to: "/calculators/pension-salary-sacrifice",
    anchorText: "Pension & Salary Sacrifice Calculator",
    context: "Tip: 'Pension contributions can reduce your adjusted net income below £60,000'",
    priority: 1,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CROSS-CLUSTER LINKS (shared user journeys)
// ─────────────────────────────────────────────────────────────────────────────

export const crossClusterLinks: InternalLink[] = [
  // Sole trader → director (growth journey)
  {
    from: "/calculators/sole-trader",
    to: "/calculators/sole-trader-vs-limited",
    anchorText: "sole trader vs limited company tax comparison",
    context: "Below results for incomes > £40k: 'Could a limited company save you tax?'",
    priority: 2,
  },
  // PAYE → self-employed (side hustle)
  {
    from: "/calculators/take-home-pay",
    to: "/calculators/sole-trader",
    anchorText: "Self-Employed Tax Calculator",
    context: "Related: 'Have a side hustle or freelance income?'",
    priority: 2,
  },
  // Landlord → director (property company)
  {
    from: "/calculators/landlord-rental-income",
    to: "/guides/landlords/property-limited-company",
    anchorText: "holding property in a limited company",
    context: "Related: 'Some landlords benefit from incorporating'",
    priority: 3,
  },
  // CGT shared between investors and landlords
  {
    from: "/calculators/savings-investment-tax",
    to: "/calculators/cgt-property",
    anchorText: "property Capital Gains Tax Calculator",
    context: "Related calculators",
    priority: 2,
  },
  // Taxopedia referenced from all FAQs
  {
    from: "/guides/self-employed/trading-allowance",
    to: "/taxopedia/trading-allowance",
    anchorText: "trading allowance — Taxopedia definition",
    context: "Inline mention on first use",
    priority: 3,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FULL URL STRATEGY
// ─────────────────────────────────────────────────────────────────────────────

export const urlStrategy = {
  calculators: {
    // Cluster 1 — PAYE
    takeHomePay:        "/calculators/take-home-pay",
    hourlyWage:         "/calculators/hourly-wage",
    bonusOvertime:      "/calculators/bonus-overtime",
    multipleJobs:       "/calculators/multiple-jobs",
    studentLoan:        "/calculators/student-loan",
    pensionSacrifice:   "/calculators/pension-salary-sacrifice",
    scottishTax:        "/calculators/scottish-income-tax",
    // Cluster 2 — Self-Employed
    soleTrader:         "/calculators/sole-trader",
    // Cluster 3 — Directors
    dividendsDirector:  "/calculators/dividends-director",
    soleTraderVsLtd:    "/calculators/sole-trader-vs-limited",
    // Cluster 4 — Landlords
    landlordRental:     "/calculators/landlord-rental-income",
    cgtProperty:        "/calculators/cgt-property",
    // Cluster 5 — Investors
    savingsInvestment:  "/calculators/savings-investment-tax",
    // Cluster 6 — Families
    hicbc:              "/calculators/high-income-child-benefit",
  },
  guides: {
    paye:               "/guides/paye",
    selfEmployed:       "/guides/self-employed",
    directors:          "/guides/directors",
    landlords:          "/guides/landlords",
    investors:          "/guides/investors",
    families:           "/guides/families",
  },
  services: {
    selfAssessmentPAYE:         "/services/self-assessment-paye",
    selfAssessmentSoleTraders:  "/services/self-assessment-sole-traders",
    selfAssessmentLandlords:    "/services/self-assessment-landlords",
    selfAssessmentInvestors:    "/services/self-assessment-investors",
    mtdSoleTraders:             "/services/mtd-sole-traders",
    mtdLandlords:               "/services/mtd-landlords",
    cisRefund:                  "/services/cis-refund",
    cgtReporting:               "/services/cgt-reporting",
    companyAccounts:            "/services/company-accounts",
    bookkeeping:                "/services/bookkeeping",
  },
  resources: {
    soleTraderExpenses:         "/resources/sole-trader-expenses-checklist",
    landlordExpenses:           "/resources/landlord-expenses-checklist",
  },
  b2b: {
    overview:    "/organisations",
    tools:       "/organisations/tools",
    pricing:     "/organisations/pricing",
    login:       "/organisations/login",
    register:    "/organisations/register",
  },
};
