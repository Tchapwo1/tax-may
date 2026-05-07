/**
 * SEO Schema Pack — taxcalculator365.com
 * Cluster 2: Self-Employed / Sole Traders
 *
 * Usage: inject each schema as a <script type="application/ld+json"> in page <head>
 * Next.js: use next/head or the generateMetadata API
 *
 * Schemas included:
 * 1. Calculator page — SoftwareApplication + FAQPage + BreadcrumbList + HowTo
 * 2. Guide pages — Article + BreadcrumbList + FAQPage
 * 3. Service pages — Service + FAQPage + BreadcrumbList
 * 4. Organization (site-wide, in root layout)
 * 5. Sitelinks SearchBox (site-wide)
 */

const SITE = "https://taxcalculator365.com";
const SITE_NAME = "Tax Calculator 365";
const LOGO = `${SITE}/images/logo.png`;

// ── 1a. Calculator page: SoftwareApplication ─────────────────────────────────

export const soleTraderCalculatorSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Self-Employed Tax Calculator (2025-26)",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "url": `${SITE}/calculators/sole-trader`,
  "description":
    "Free online calculator for UK self-employed workers, freelancers, and sole traders. " +
    "Estimate income tax, Class 4 NI, allowable expenses, and take-home pay for 2025-26.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP",
  },
  "provider": {
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE,
  },
  "screenshot": `${SITE}/images/og/sole-trader-calculator.png`,
};

// ── 1b. Calculator page: FAQPage ─────────────────────────────────────────────

export const soleTraderCalculatorFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need to file a Self Assessment tax return as a sole trader?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Yes, if your total self-employed income exceeds £1,000 in a tax year, you must " +
          "register for Self Assessment and file a tax return. This applies even if no tax is " +
          "due. You must also file if your combined income pushes you into a higher tax band, " +
          "or if you want to claim a CIS refund.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I still pay Class 2 National Insurance as a sole trader?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "No. Class 2 National Insurance was abolished from 6 April 2024 (tax year 2024-25 " +
          "onwards). Self-employed workers now only pay Class 4 NI on profits above £12,570. " +
          "The Class 4 rate is 6% on profits between £12,570 and £50,270, and 2% above that.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the £1,000 trading allowance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "The trading allowance is a £1,000 tax-free allowance for self-employed income. If " +
          "your total self-employed income is £1,000 or less, you do not need to file a Self " +
          "Assessment return or pay tax. If your income is higher, you can either claim the " +
          "£1,000 allowance or deduct your actual expenses — whichever gives a better result.",
      },
    },
    {
      "@type": "Question",
      "name": "What counts as an allowable expense for a sole trader?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Allowable expenses must be 'wholly and exclusively' for business. Common examples " +
          "include business mileage (45p per mile for the first 10,000 miles), a proportion of " +
          "your home running costs if you work from home, equipment and tools, software " +
          "subscriptions, professional fees, advertising, and business insurance.",
      },
    },
    {
      "@type": "Question",
      "name": "What is Making Tax Digital (MTD) for sole traders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Making Tax Digital for Income Tax Self Assessment (MTD for ITSA) requires sole " +
          "traders and landlords with annual income above £10,000 to keep digital records and " +
          "submit quarterly updates to HMRC using MTD-compatible software. MTD for sole traders " +
          "with income over £50,000 is mandatory from April 2026, and from April 2027 for income " +
          "over £30,000.",
      },
    },
    {
      "@type": "Question",
      "name": "How does CIS tax work for self-employed construction workers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Under the Construction Industry Scheme (CIS), contractors deduct money from " +
          "subcontractors' payments and pass it to HMRC. The standard deduction rate is 20% for " +
          "registered subcontractors, or 30% if unregistered. These deductions count as advance " +
          "payments towards your tax and NI. If too much is deducted, you can claim a refund " +
          "through your Self Assessment return.",
      },
    },
    {
      "@type": "Question",
      "name": "If I have a PAYE job and self-employed income, how is tax calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Your personal allowance is first applied to your employment income via PAYE. Your " +
          "self-employed profit is then stacked on top, and taxed at your marginal rate. This " +
          "means if your employment income already uses your basic rate band, your SE profit may " +
          "be taxed at 40%. Our calculator handles this correctly — enter both figures for an " +
          "accurate result.",
      },
    },
    {
      "@type": "Question",
      "name": "When is the Self Assessment filing deadline for sole traders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "The online Self Assessment filing deadline is 31 January following the end of the " +
          "tax year. For tax year 2024-25, the deadline is 31 January 2026. Paper returns must " +
          "be filed by 31 October. Any tax due must also be paid by 31 January. Payments on " +
          "account may be required if your tax bill exceeds £1,000.",
      },
    },
  ],
};

// ── 1c. Calculator page: HowTo ────────────────────────────────────────────────

export const soleTraderCalculatorHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to calculate your self-employed tax",
  "description":
    "A step-by-step guide to estimating your income tax, National Insurance, and take-home " +
    "pay as a sole trader using the Tax Calculator 365 self-employed calculator.",
  "totalTime": "PT3M",
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Self-Employed Tax Calculator",
    },
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Enter your total self-employed income",
      "text":
        "Enter your total gross self-employed income for the tax year before deducting any expenses.",
      "url": `${SITE}/calculators/sole-trader#income`,
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Add your expenses or use the trading allowance",
      "text":
        "Enter your total allowable business expenses, or toggle the £1,000 trading allowance " +
        "if your expenses are low. Use the advanced expenses section for mileage, home office, " +
        "and other itemised costs.",
      "url": `${SITE}/calculators/sole-trader#expenses`,
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Add employment income if applicable",
      "text":
        "If you also have a PAYE job, add your employment income so the calculator can correctly " +
        "determine your marginal tax rate on self-employed profit.",
      "url": `${SITE}/calculators/sole-trader#employment`,
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Review your tax breakdown",
      "text":
        "Your estimated income tax, Class 4 National Insurance, take-home pay, and effective " +
        "tax rate are shown instantly. The calculator highlights if you need to file a Self " +
        "Assessment return or comply with MTD.",
      "url": `${SITE}/calculators/sole-trader#results`,
    },
  ],
};

// ── 1d. Calculator page: BreadcrumbList ──────────────────────────────────────

export const soleTraderBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE },
    { "@type": "ListItem", "position": 2, "name": "Calculators", "item": `${SITE}/calculators` },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Self-Employed Tax Calculator",
      "item": `${SITE}/calculators/sole-trader`,
    },
  ],
};

// ── 2. Trading allowance guide: Article + BreadcrumbList ─────────────────────

export const tradingAllowanceGuideSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The £1,000 Trading Allowance Explained (2025-26)",
  "description":
    "A complete guide to the £1,000 trading allowance for self-employed workers and side " +
    "hustlers. Covers who can claim it, how it works, and when you must file a Self Assessment.",
  "url": `${SITE}/guides/self-employed/trading-allowance`,
  "datePublished": "2024-04-06",
  "dateModified": "2025-04-06",
  "author": {
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE,
  },
  "publisher": {
    "@type": "Organization",
    "name": SITE_NAME,
    "logo": { "@type": "ImageObject", "url": LOGO },
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE}/guides/self-employed/trading-allowance`,
  },
};

export const tradingAllowanceBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE },
    { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${SITE}/guides` },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Self-Employed Guides",
      "item": `${SITE}/guides/self-employed`,
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Trading Allowance",
      "item": `${SITE}/guides/self-employed/trading-allowance`,
    },
  ],
};

// ── 3. Self Assessment service page ──────────────────────────────────────────

export const selfAssessmentServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Self Assessment Tax Return Filing for Sole Traders",
  "description":
    "Professional Self Assessment filing service for UK sole traders, freelancers, and gig " +
    "workers. Handled by qualified accountants from £119.",
  "url": `${SITE}/services/self-assessment-sole-traders`,
  "provider": {
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE,
  },
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom",
  },
  "offers": {
    "@type": "Offer",
    "price": "119",
    "priceCurrency": "GBP",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "minPrice": "119",
      "priceCurrency": "GBP",
      "description": "Starting price for straightforward sole trader returns",
    },
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tax Return Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sole Trader Self Assessment Filing",
          "description": "Income tax, Class 4 NI, CIS, expenses — full return",
        },
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "CIS Refund Claim",
          "description": "Claim back CIS tax overpaid via Self Assessment",
        },
      },
    ],
  },
};

// ── 4. Organization (site-wide, root layout) ──────────────────────────────────

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_NAME,
  "url": SITE,
  "logo": LOGO,
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": "English",
    "areaServed": "GB",
  },
  "sameAs": [
    // Add social profiles when live:
    // "https://twitter.com/taxcalculator365",
    // "https://linkedin.com/company/taxcalculator365",
  ],
};

// ── 5. Sitelinks SearchBox (site-wide, root layout) ──────────────────────────

export const searchBoxSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Renders a schema as an inline <script> tag (for use in Next.js page components) */
export const schemaScript = (schema: object): string =>
  `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;

/** All schemas for the sole trader calculator page */
export const soleTraderCalculatorPageSchemas = [
  soleTraderCalculatorSchema,
  soleTraderCalculatorFAQSchema,
  soleTraderCalculatorHowToSchema,
  soleTraderBreadcrumbSchema,
];
