// src/shared/config/metadata.ts

import type { Metadata } from 'next';

const BASE_URL = 'https://www.taxcalculator365.com';

export const siteMetadata = {
  siteName: 'TaxCalculator365',
  brandTagline: 'Modern UK Tax Modelling',
  defaultTitle: 'TaxCalculator365 — Modern UK Tax Modelling',
  defaultDescription:
    'Model your UK taxes with precision. Compare scenarios, calculate PAYE, NI, Student Loans, and take-home pay with a premium modelling interface.',
  baseUrl: BASE_URL,
};

export function buildCanonical(path: string) {
  return `${BASE_URL}${path}`;
}

export function buildOgImage(path: string) {
  return `${BASE_URL}/og?path=${encodeURIComponent(path)}`;
}

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${siteMetadata.siteName}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: buildCanonical(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url: buildCanonical(path),
      siteName: siteMetadata.siteName,
      images: [
        {
          url: buildOgImage(path),
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [buildOgImage(path)],
    },
  };
}

/* PAYE Calculator Metadata */
export function payeMetadata(): Metadata {
  return buildMetadata({
    title: 'PAYE Calculator 2025–26 — Model Your Take-Home Pay',
    description:
      'Calculate your UK PAYE tax, National Insurance, Student Loan repayments, and take-home pay. Compare scenarios and share deep-linked modelling results.',
    path: '/calculators/paye',
  });
}

/* Landlord Calculator Metadata */
export function landlordMetadata(): Metadata {
  return buildMetadata({
    title: 'Landlord Tax Calculator 2025–26 — Section 24 Modelling',
    description:
      'Model your UK rental profit and tax liabilities. Fully accounts for Section 24 mortgage interest relief and marginal tax stacking on employment income.',
    path: '/calculators/landlord',
  });
}
/* Self-Assessment Calculator Metadata */
export function selfAssessmentMetadata(): Metadata {
  return buildMetadata({
    title: 'Self-Assessment Tax Calculator 2025/26 — Flagship Modelling',
    description:
      'The definitive UK tax instrument. Model employment, self-employment, property, dividends, and interest in a single report. Accurate PA Taper & HICBC logic.',
    path: '/calculators/self-assessment',
  });
}

/* Comparison Matrix Metadata */
export function soleTraderVsLtdMetadata(): Metadata {
  return buildMetadata({
    title: 'Sole Trader vs Limited Company Calculator 2025/26',
    description:
      'The definitive comparison for UK founders. Model your business profits and extraction strategy to find the most tax-efficient structure for your growth.',
    path: '/calculators/sole-trader-vs-limited',
  });
}

/* Knowledge Hub Metadata */
export function guidesMetadata(): Metadata {
  return buildMetadata({
    title: 'Tax Knowledge Hub — Interactive Guides & Modelling',
    description:
      'Professional-grade guides and interactive modelling instruments to help you navigate the UK tax landscape with total confidence.',
    path: '/guides',
  });
}
