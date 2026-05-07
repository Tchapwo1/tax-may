/**
 * Tax Year Configuration
 * Sources: HMRC, gov.uk/government/collections/tax-rates-and-allowances
 *
 * IMPORTANT CORRECTIONS vs original document:
 * - Class 2 NI was abolished from 6 April 2024 (tax year 2024-25 onwards)
 * - Class 4 lower rate changed from 9% to 6% from April 2024
 * - Personal allowance frozen at £12,570 through 2027-28
 * - Scottish taxpayers use separate bands (handled in ScottishTaxConfig)
 */

export type TaxYearKey = "2024-25" | "2025-26" | "2026-27";

export interface IncomeTaxBand {
  name: string;
  from: number;
  to: number; // Infinity for top rate
  rate: number;
}

export interface Class4Band {
  from: number;
  to: number;
  rate: number;
}

export interface TaxYearConfig {
  label: string;
  personalAllowance: number;
  personalAllowanceTaperStart: number; // £100k taper
  incomeTaxBands: IncomeTaxBand[];
  class2: {
    abolished: boolean;
    weeklyRate?: number;
    smallProfitsThreshold?: number;
  };
  class4: {
    lowerProfitsLimit: number;
    upperProfitsLimit: number;
    bands: Class4Band[];
  };
  tradingAllowance: number;
  higherRateThreshold: number; // point at which 40% kicks in (PA + basic rate band)
  additionalRateThreshold: number;
  mtdThreshold: number; // MTD for ITSA self-employed income threshold
  savingsStarterRate: number;
  savingsStarterRateLimit: number;
  personalSavingsAllowanceBasicRate: number;
  personalSavingsAllowanceHigherRate: number;
  dividendAllowance: number;
  dividendRates: { basic: number; higher: number; additional: number };
  cgtRates: {
    basicRateAssets: number;
    higherRateAssets: number;
    basicRateProperty: number;
    higherRateProperty: number;
    annualExemptAmount: number;
  };
}

export const TAX_YEARS: Record<TaxYearKey, TaxYearConfig> = {
  "2024-25": {
    label: "2024-25",
    personalAllowance: 12570,
    personalAllowanceTaperStart: 100000,
    incomeTaxBands: [
      { name: "Basic rate", from: 0, to: 37700, rate: 0.20 },
      { name: "Higher rate", from: 37700, to: 125140, rate: 0.40 },
      { name: "Additional rate", from: 125140, to: Infinity, rate: 0.45 },
    ],
    class2: {
      abolished: true, // abolished April 2024
    },
    class4: {
      lowerProfitsLimit: 12570,
      upperProfitsLimit: 50270,
      bands: [
        { from: 12570, to: 50270, rate: 0.06 }, // reduced from 9% in April 2024
        { from: 50270, to: Infinity, rate: 0.02 },
      ],
    },
    tradingAllowance: 1000,
    higherRateThreshold: 50270, // 12570 + 37700
    additionalRateThreshold: 125140,
    mtdThreshold: 10000,
    savingsStarterRate: 0.0,
    savingsStarterRateLimit: 5000,
    personalSavingsAllowanceBasicRate: 1000,
    personalSavingsAllowanceHigherRate: 500,
    dividendAllowance: 500,
    dividendRates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 },
    cgtRates: {
      basicRateAssets: 0.10,
      higherRateAssets: 0.20,
      basicRateProperty: 0.18,
      higherRateProperty: 0.24,
      annualExemptAmount: 3000,
    },
  },

  "2025-26": {
    label: "2025-26",
    personalAllowance: 12570,
    personalAllowanceTaperStart: 100000,
    incomeTaxBands: [
      { name: "Basic rate", from: 0, to: 37700, rate: 0.20 },
      { name: "Higher rate", from: 37700, to: 125140, rate: 0.40 },
      { name: "Additional rate", from: 125140, to: Infinity, rate: 0.45 },
    ],
    class2: {
      abolished: true,
    },
    class4: {
      lowerProfitsLimit: 12570,
      upperProfitsLimit: 50270,
      bands: [
        { from: 12570, to: 50270, rate: 0.06 },
        { from: 50270, to: Infinity, rate: 0.02 },
      ],
    },
    tradingAllowance: 1000,
    higherRateThreshold: 50270,
    additionalRateThreshold: 125140,
    mtdThreshold: 10000,
    savingsStarterRate: 0.0,
    savingsStarterRateLimit: 5000,
    personalSavingsAllowanceBasicRate: 1000,
    personalSavingsAllowanceHigherRate: 500,
    dividendAllowance: 500,
    dividendRates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 },
    cgtRates: {
      basicRateAssets: 0.18, // changed in Autumn 2024 budget
      higherRateAssets: 0.24,
      basicRateProperty: 0.18,
      higherRateProperty: 0.24,
      annualExemptAmount: 3000,
    },
  },

  "2026-27": {
    label: "2026-27",
    personalAllowance: 12570,
    personalAllowanceTaperStart: 100000,
    incomeTaxBands: [
      { name: "Basic rate", from: 0, to: 37700, rate: 0.20 },
      { name: "Higher rate", from: 37700, to: 125140, rate: 0.40 },
      { name: "Additional rate", from: 125140, to: Infinity, rate: 0.45 },
    ],
    class2: {
      abolished: true,
    },
    class4: {
      lowerProfitsLimit: 12570,
      upperProfitsLimit: 50270,
      bands: [
        { from: 12570, to: 50270, rate: 0.06 },
        { from: 50270, to: Infinity, rate: 0.02 },
      ],
    },
    tradingAllowance: 1000,
    higherRateThreshold: 50270,
    additionalRateThreshold: 125140,
    mtdThreshold: 10000, // mandatory from April 2026 if income > £10k
    savingsStarterRate: 0.0,
    savingsStarterRateLimit: 5000,
    personalSavingsAllowanceBasicRate: 1000,
    personalSavingsAllowanceHigherRate: 500,
    dividendAllowance: 500,
    dividendRates: { basic: 0.0875, higher: 0.3375, additional: 0.3935 },
    cgtRates: {
      basicRateAssets: 0.18,
      higherRateAssets: 0.24,
      basicRateProperty: 0.18,
      higherRateProperty: 0.24,
      annualExemptAmount: 3000,
    },
  },
};

export const DEFAULT_TAX_YEAR: TaxYearKey = "2025-26";

export const getTaxYearConfig = (year: TaxYearKey = DEFAULT_TAX_YEAR): TaxYearConfig =>
  TAX_YEARS[year];
