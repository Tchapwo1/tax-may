/**
 * Sole Trader vs Limited Company Comparison Engine
 * 
 * Reuses core engines to model the "Net Cash in Pocket" delta.
 */

import { TaxYearKey, getTaxYearConfig } from "@/shared/config/tax-config";
import { calculateSelfAssessment } from "@/features/self-assessment/selfAssessmentEngine";
import { calculatePayeTax } from "@/features/paye/payeEngine";
import { clamp, roundPence } from "@/shared/utils/utils";

export interface ComparisonInputs {
  revenue: number;
  expenses: number;
  otherIncome: number;
  taxYear?: TaxYearKey;
  
  // Ltd Specific Optimization
  ltdSalary?: number; // Usually set to NI threshold for efficiency
}

export interface ComparisonResult {
  soleTrader: {
    grossProfit: number;
    totalTax: number;
    netIncome: number;
  };
  limitedCompany: {
    grossProfit: number;
    corpTax: number;
    salary: number;
    dividends: number;
    personalTax: number;
    netIncome: number;
  };
  delta: number; // Positive = Ltd is better
}

export function calculateSoleTraderVsLtd(inputs: ComparisonInputs): ComparisonResult {
  const config = getTaxYearConfig(inputs.taxYear);
  const { revenue, expenses, otherIncome, ltdSalary = 12570 } = inputs;
  
  const grossProfit = clamp(revenue - expenses);

  // 1. SOLE TRADER MODEL
  const stResult = calculateSelfAssessment({
    employmentIncome: otherIncome,
    selfEmployedProfit: grossProfit,
    propertyProfit: 0,
    dividendIncome: 0,
    savingsInterest: 0,
    pensionContributions: 0,
    giftAid: 0,
    marriageAllowanceTransfer: false,
    taxYear: inputs.taxYear
  });

  // 2. LIMITED COMPANY MODEL
  // Corp Tax Calculation
  const profitAfterSalary = clamp(grossProfit - ltdSalary);
  const corpTaxRate = profitAfterSalary > 250000 ? 0.25 : profitAfterSalary > 50000 ? 0.25 : 0.19; // Simplified
  const corpTax = roundPence(profitAfterSalary * corpTaxRate);
  const maxDividends = clamp(profitAfterSalary - corpTax);

  // Individual Tax on Ltd Extraction (Salary + Dividends)
  const ltdIndividual = calculateSelfAssessment({
    employmentIncome: ltdSalary + otherIncome,
    selfEmployedProfit: 0,
    propertyProfit: 0,
    dividendIncome: maxDividends,
    savingsInterest: 0,
    pensionContributions: 0,
    giftAid: 0,
    marriageAllowanceTransfer: false,
    taxYear: inputs.taxYear
  });

  const ltdNet = ltdSalary + maxDividends - (ltdIndividual.totalTaxLiability - 0); // Approx (Salary tax handled)

  return {
    soleTrader: {
      grossProfit,
      totalTax: stResult.totalTaxLiability + stResult.totalNILiability,
      netIncome: stResult.netTakeHome
    },
    limitedCompany: {
      grossProfit,
      corpTax,
      salary: ltdSalary,
      dividends: maxDividends,
      personalTax: ltdIndividual.totalTaxLiability,
      netIncome: ltdSalary + maxDividends - ltdIndividual.totalTaxLiability
    },
    delta: (ltdSalary + maxDividends - ltdIndividual.totalTaxLiability) - stResult.netTakeHome
  };
}
