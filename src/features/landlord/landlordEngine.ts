/**
 * Landlord Tax Engine (Headless & Deterministic)
 * 
 * KEY ARCHITECTURE:
 * 1. Section 24 Compliance: Mortgage interest is NOT deductible from profit.
 * 2. 20% Tax Credit: A basic-rate tax reduction is applied to finance costs.
 * 3. Marginal Stacking: Property income is stacked on top of PAYE income.
 * 4. PA Taper: Handles the £100k+ Personal Allowance reduction.
 */

import { TaxYearKey, getTaxYearConfig } from "@/shared/config/tax-config";
import { 
  clamp, 
  roundPence, 
  applyIncomeTaxBands, 
  effectivePersonalAllowance,
  getTaxBand
} from "@/shared/utils/utils";

export interface LandlordInputs {
  rentalIncome: number;
  expenses: number;
  mortgageInterest: number;
  employmentIncome: number;
  taxYear?: TaxYearKey;
}

export interface LandlordOutputs {
  // Profit calculations
  grossProfit: number;       // Income - Expenses (Excluding interest)
  taxableProfit: number;     // What HMRC sees (Income - Expenses)
  
  // Tax components
  incomeTaxOnEmployment: number;
  incomeTaxOnProperty: number;
  section24Credit: number;    // 20% of mortgage interest
  totalTaxLiability: number;  // (Employment Tax + Property Tax) - S24 Credit
  
  // Final figures
  netIncome: number;          // Total Cash in pocket (Rental - Expenses - Interest - Tax)
  effectiveTaxRate: number;   // Against property profit
  
  // Flags for UI
  flags: {
    section24Impacted: boolean;
    higherRateTrap: boolean;
    personalAllowanceTapered: boolean;
    mtdRequired: boolean;
  };
}

export const calculateLandlordTax = (inputs: LandlordInputs): LandlordOutputs => {
  const config = getTaxYearConfig(inputs.taxYear);
  const {
    rentalIncome,
    expenses,
    mortgageInterest,
    employmentIncome = 0,
  } = inputs;

  // 1. Calculate Taxable Profit (Section 24: Interest is NOT an expense)
  const taxableProfit = clamp(rentalIncome - expenses);
  const grossProfit = taxableProfit; // For UI clarity

  // 2. Total Taxable Income
  const totalIncome = employmentIncome + taxableProfit;

  // 3. Effective Personal Allowance
  const effPA = effectivePersonalAllowance(totalIncome, config);

  // 4. Calculate Income Tax (Marginal Approach)
  // Tax on total income
  const taxableTotal = clamp(totalIncome - effPA);
  const { total: taxOnTotal } = applyIncomeTaxBands(taxableTotal, config.incomeTaxBands);

  // Tax on employment alone
  const effPAEmployment = effectivePersonalAllowance(employmentIncome, config);
  const taxableEmployment = clamp(employmentIncome - effPAEmployment);
  const { total: taxOnEmployment } = applyIncomeTaxBands(taxableEmployment, config.incomeTaxBands);

  // Property Tax (before credit)
  const propertyTaxBeforeCredit = roundPence(taxOnTotal - taxOnEmployment);

  // 5. Section 24 Tax Credit (20% of mortgage interest)
  // Limited to the lower of: interest, property profit, or taxable income above PA
  const s24CreditBasis = Math.min(mortgageInterest, taxableProfit, taxableTotal);
  const section24Credit = roundPence(s24CreditBasis * 0.20);

  // 6. Total Tax Liability
  const incomeTaxOnProperty = clamp(propertyTaxBeforeCredit - section24Credit);
  const totalTaxLiability = roundPence(taxOnEmployment + incomeTaxOnProperty);

  // 7. Net Income (Actual Cash)
  const netIncome = clamp(rentalIncome - expenses - mortgageInterest - incomeTaxOnProperty);

  // 8. Flags & Analytics
  const flags = {
    section24Impacted: mortgageInterest > 0,
    higherRateTrap: totalIncome > config.higherRateThreshold,
    personalAllowanceTapered: totalIncome > config.personalAllowanceTaperStart,
    mtdRequired: rentalIncome > config.mtdThreshold,
  };

  return {
    grossProfit,
    taxableProfit,
    incomeTaxOnEmployment: roundPence(taxOnEmployment),
    incomeTaxOnProperty: roundPence(incomeTaxOnProperty),
    section24Credit,
    totalTaxLiability,
    netIncome,
    effectiveTaxRate: taxableProfit > 0 ? roundPence(incomeTaxOnProperty / taxableProfit) : 0,
    flags,
  };
};
