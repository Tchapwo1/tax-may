/**
 * Sole Trader / Self-Employed Tax Calculator
 *
 * KEY FIXES vs original document:
 * 1. Class 2 NI abolished April 2024 — removed entirely
 * 2. Class 4 rate corrected: 6% (not 9%) from April 2024
 * 3. Employment income handled correctly:
 *    - Employment uses its own PAYE personal allowance
 *    - Self-employed profit stacked ON TOP of employment income
 *    - This means SE profit often falls in the higher rate band when combined
 *    - We calculate MARGINAL tax on SE profit (incremental approach)
 * 4. Personal allowance taper applied for incomes over £100k
 * 5. CIS deduction refund logic corrected
 */

import { TaxYearKey, getTaxYearConfig } from "@/shared/config/tax-config";
import {
  clamp,
  roundPence,
  applyIncomeTaxBands,
  effectivePersonalAllowance,
  calculateClass4NI,
  bucketIncome,
  bucketTax,
  bucketExpenseRatio,
  getTaxBand,
} from "@/shared/utils/utils";

export interface AdvancedExpenses {
  mileageMiles?: number;         // business miles driven
  mileageRate?: number;          // HMRC approved rate (default 0.45 first 10k, 0.25 after)
  homeOfficeDays?: number;       // days worked from home
  homeOfficeMethod?: "actual" | "simplified"; // simplified = flat rate
  equipment?: number;
  software?: number;
  subscriptions?: number;
  phonePercent?: number;         // % of phone bill that is business (0-100)
  phoneBill?: number;
  capitalAllowances?: number;
  other?: number;
}

export interface SoleTraderInputs {
  selfIncome: number;
  employmentIncome?: number;
  cisDeductions?: number;        // CIS tax already deducted at source
  totalExpenses?: number;        // simple expenses total
  useTradingAllowance: boolean;
  advancedExpenses?: AdvancedExpenses;
  taxYear?: TaxYearKey;
}

export interface IncomeTaxBreakdownItem {
  name: string;
  amount: number;
  tax: number;
  rate: number;
}

export interface SoleTraderOutputs {
  // Core figures
  taxableProfit: number;
  totalIncome: number;
  effectivePersonalAllowance: number;

  // Tax components
  incomeTaxOnEmployment: number;
  incomeTaxOnSelfEmployment: number; // marginal tax on SE profit
  incomeTaxTotal: number;
  class4NI: number;
  totalTax: number;

  // After CIS
  taxAfterCIS: number;
  cisRefund: number;

  // Take-home
  takeHome: number;
  effectiveRate: number; // against SE income only
  combinedEffectiveRate: number; // against total income

  // Breakdowns for UI
  incomeTaxBreakdown: IncomeTaxBreakdownItem[];

  // Flags for CTA logic
  flags: {
    needsSelfAssessment: boolean;
    mtdRequired: boolean;
    cisRefundEligible: boolean;
    crossesHigherRateBand: boolean;
    personalAllowanceTapered: boolean;
    underclamedExpenses: boolean; // expenses < 30% of income (heuristic)
  };

  // Analytics-safe buckets
  analytics: {
    incomeBucket: string;
    taxBucket: string;
    expenseRatio: string;
    taxBand: string;
  };
}

/** Calculate mileage allowance from business miles */
const calcMileageAllowance = (miles: number): number => {
  const firstTenK = Math.min(miles, 10000) * 0.45;
  const remainder = Math.max(0, miles - 10000) * 0.25;
  return roundPence(firstTenK + remainder);
};

/** Calculate home office flat rate deduction */
const calcHomeOfficeSimplified = (days: number): number => {
  // HMRC simplified: up to 25 days = £10/month, 26-50 = £18/month, 51+ = £26/month
  const months = Math.ceil(days / 30);
  const perMonth = days / months <= 25 ? 10 : days / months <= 50 ? 18 : 26;
  return roundPence(months * perMonth);
};

/** Resolve all expenses to a single deductible amount */
const resolveDeductible = (inputs: SoleTraderInputs, tradingAllowance: number): number => {
  const { selfIncome, useTradingAllowance, totalExpenses = 0, advancedExpenses } = inputs;

  if (useTradingAllowance) {
    // Use trading allowance: minimum of £1,000 or actual income (can't create a loss)
    return Math.min(tradingAllowance, selfIncome);
  }

  if (!advancedExpenses) {
    return totalExpenses;
  }

  // Build up advanced expenses total
  let advanced = 0;
  advanced += calcMileageAllowance(advancedExpenses.mileageMiles ?? 0);
  advanced += advancedExpenses.homeOfficeMethod === "simplified"
    ? calcHomeOfficeSimplified(advancedExpenses.homeOfficeDays ?? 0)
    : 0; // actual method: user enters amount directly
  advanced += advancedExpenses.equipment ?? 0;
  advanced += advancedExpenses.software ?? 0;
  advanced += advancedExpenses.subscriptions ?? 0;
  advanced += roundPence(
    (advancedExpenses.phoneBill ?? 0) * ((advancedExpenses.phonePercent ?? 0) / 100)
  );
  advanced += advancedExpenses.capitalAllowances ?? 0;
  advanced += advancedExpenses.other ?? 0;

  // Take the higher of simple or advanced (user may have both partially filled)
  return Math.max(totalExpenses, advanced);
};

export const calculateSoleTrader = (inputs: SoleTraderInputs): SoleTraderOutputs => {
  const config = getTaxYearConfig(inputs.taxYear);
  const {
    selfIncome,
    employmentIncome = 0,
    cisDeductions = 0,
  } = inputs;

  // ── Step 1: Resolve deductible ──────────────────────────────────────────────
  const deductible = resolveDeductible(inputs, config.tradingAllowance);
  const profit = clamp(selfIncome - deductible);

  // ── Step 2: Total income ────────────────────────────────────────────────────
  const totalIncome = employmentIncome + profit;

  // ── Step 3: Effective personal allowance (tapers over £100k) ───────────────
  const effPA = effectivePersonalAllowance(totalIncome, config);

  // ── Step 4: Income tax — marginal approach ──────────────────────────────────
  // Calculate tax on total income, then subtract tax on employment income alone.
  // This correctly places SE profit on top of employment income in the band stack.

  // Tax on total income
  const taxableTotal = clamp(totalIncome - effPA);
  const { total: taxOnTotal, breakdown: totalBreakdown } = applyIncomeTaxBands(
    taxableTotal,
    config.incomeTaxBands
  );

  // Tax on employment income alone
  const effPAEmploymentOnly = effectivePersonalAllowance(employmentIncome, config);
  const taxableEmployment = clamp(employmentIncome - effPAEmploymentOnly);
  const { total: taxOnEmployment } = applyIncomeTaxBands(
    taxableEmployment,
    config.incomeTaxBands
  );

  // Marginal IT on SE income = difference
  const incomeTaxOnSE = roundPence(taxOnTotal - taxOnEmployment);

  // ── Step 5: Class 4 NI (Class 2 abolished April 2024) ─────────────────────
  const class4NI = calculateClass4NI(profit, config);

  // ── Step 6: Total tax liability ─────────────────────────────────────────────
  const totalTax = roundPence(incomeTaxOnSE + class4NI);

  // ── Step 7: CIS ──────────────────────────────────────────────────────────────
  const taxAfterCIS = clamp(totalTax - cisDeductions);
  const cisRefund = cisDeductions > totalTax ? roundPence(cisDeductions - totalTax) : 0;

  // ── Step 8: Take-home ────────────────────────────────────────────────────────
  const takeHome = clamp(selfIncome - taxAfterCIS);

  // ── Step 9: Rates ─────────────────────────────────────────────────────────
  const effectiveRate = selfIncome > 0 ? roundPence(taxAfterCIS / selfIncome) : 0;
  const combinedEffectiveRate = totalIncome > 0
    ? roundPence((taxAfterCIS + taxOnEmployment) / totalIncome)
    : 0;

  // ── Step 10: Flags ──────────────────────────────────────────────────────────
  const totalExpenses = inputs.totalExpenses ?? 0;
  const flags = {
    needsSelfAssessment:
      profit > config.tradingAllowance ||
      selfIncome > config.tradingAllowance ||
      cisDeductions > 0 ||
      totalIncome > config.higherRateThreshold,
    mtdRequired: selfIncome > config.mtdThreshold,
    cisRefundEligible: cisRefund > 0,
    crossesHigherRateBand: totalIncome > config.higherRateThreshold,
    personalAllowanceTapered: totalIncome > config.personalAllowanceTaperStart,
    underclamedExpenses:
      !inputs.useTradingAllowance &&
      selfIncome > 5000 &&
      totalExpenses < selfIncome * 0.30,
  };

  return {
    taxableProfit: profit,
    totalIncome,
    effectivePersonalAllowance: effPA,
    incomeTaxOnEmployment: roundPence(taxOnEmployment),
    incomeTaxOnSelfEmployment: incomeTaxOnSE,
    incomeTaxTotal: roundPence(taxOnTotal),
    class4NI,
    totalTax,
    taxAfterCIS,
    cisRefund,
    takeHome,
    effectiveRate,
    combinedEffectiveRate,
    incomeTaxBreakdown: totalBreakdown,
    flags,
    analytics: {
      incomeBucket: bucketIncome(selfIncome),
      taxBucket: bucketTax(totalTax),
      expenseRatio: bucketExpenseRatio(totalExpenses, selfIncome),
      taxBand: getTaxBand(totalIncome, config),
    },
  };
};
