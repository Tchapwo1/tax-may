/**
 * Core calculation utilities
 * Pure functions — no side effects, fully testable
 */

import { IncomeTaxBand, TaxYearConfig } from "@/shared/config/tax-config";

/** Clamp a number to a minimum (default 0) */
export const clamp = (n: number, min = 0): number => Math.max(n, min);

/** Round to 2 decimal places (pence accuracy) */
export const roundPence = (n: number): number => Math.round(n * 100) / 100;

/**
 * Apply income tax bands to a given taxable income amount.
 * bands are relative (each band's range starts from 0, i.e. the first band covers 0→37700 of taxable income)
 */
export const applyIncomeTaxBands = (
  taxableIncome: number,
  bands: IncomeTaxBand[]
): { total: number; breakdown: { name: string; amount: number; tax: number; rate: number }[] } => {
  let remaining = clamp(taxableIncome);
  let totalTax = 0;
  const breakdown: { name: string; amount: number; tax: number; rate: number }[] = [];

  for (const band of bands) {
    if (remaining <= 0) break;
    const bandWidth = band.to === Infinity ? remaining : band.to - band.from;
    const taxable = Math.min(remaining, bandWidth);
    const tax = roundPence(taxable * band.rate);
    totalTax += tax;
    breakdown.push({ name: band.name, amount: taxable, tax, rate: band.rate });
    remaining -= taxable;
  }

  return { total: roundPence(totalTax), breakdown };
};

/**
 * Calculate effective personal allowance.
 * Tapers by £1 for every £2 over £100,000.
 * Fully extinguished at £125,140.
 */
export const effectivePersonalAllowance = (
  totalIncome: number,
  config: TaxYearConfig
): number => {
  if (totalIncome <= config.personalAllowanceTaperStart) {
    return config.personalAllowance;
  }
  const excess = totalIncome - config.personalAllowanceTaperStart;
  const reduction = Math.floor(excess / 2);
  return clamp(config.personalAllowance - reduction);
};

/**
 * Calculate Class 4 NI on self-employed profit.
 * Class 2 was abolished April 2024.
 */
export const calculateClass4NI = (
  profit: number,
  config: TaxYearConfig
): number => {
  let ni = 0;
  for (const band of config.class4.bands) {
    if (profit <= band.from) break;
    const taxable = Math.min(profit, band.to === Infinity ? profit : band.to) - band.from;
    if (taxable > 0) {
      ni += roundPence(taxable * band.rate);
    }
  }
  return roundPence(ni);
};

/**
 * Bucket a number into readable ranges for analytics.
 * NEVER send raw financial data to analytics.
 */
export const bucketIncome = (amount: number): string => {
  if (amount <= 0) return "none";
  if (amount <= 10000) return "0-10k";
  if (amount <= 20000) return "10-20k";
  if (amount <= 30000) return "20-30k";
  if (amount <= 50270) return "30-50k";
  if (amount <= 100000) return "50-100k";
  return "100k+";
};

export const bucketTax = (amount: number): string => {
  if (amount <= 0) return "zero";
  if (amount <= 500) return "0-500";
  if (amount <= 2000) return "500-2k";
  if (amount <= 5000) return "2-5k";
  if (amount <= 10000) return "5-10k";
  return "10k+";
};

export const bucketExpenseRatio = (expenses: number, income: number): string => {
  if (income <= 0) return "unknown";
  const ratio = expenses / income;
  if (ratio < 0.10) return "<10%";
  if (ratio < 0.30) return "10-30%";
  if (ratio < 0.50) return "30-50%";
  return "50%+";
};

/** Determine tax band name for a given income level */
export const getTaxBand = (
  income: number,
  config: TaxYearConfig
): "none" | "basic" | "higher" | "additional" => {
  const taxable = clamp(income - effectivePersonalAllowance(income, config));
  if (taxable <= 0) return "none";
  if (income <= config.higherRateThreshold) return "basic";
  if (income <= config.additionalRateThreshold) return "higher";
  return "additional";
};
