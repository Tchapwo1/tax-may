/**
 * Self-Assessment Composite Engine Implementation
 */

import { TaxYearKey, getTaxYearConfig } from "@/shared/config/tax-config";
import { 
  clamp, 
  roundPence, 
  applyIncomeTaxBands, 
  effectivePersonalAllowance,
  calculateClass4NI
} from "@/shared/utils/utils";
import { SelfAssessmentInputs, SelfAssessmentOutputs, TaxComponent } from "./selfAssessmentEngine";

export const calculateSelfAssessment = (inputs: SelfAssessmentInputs): SelfAssessmentOutputs => {
  const config = getTaxYearConfig(inputs.taxYear);
  
  const {
    employmentIncome = 0,
    selfEmployedProfit = 0,
    propertyProfit = 0,
    dividendIncome = 0,
    savingsInterest = 0,
    pensionContributions = 0,
    giftAid = 0,
  } = inputs;

  // 1. Calculate Adjusted Net Income (Used for PA Taper & HICBC)
  const totalIncome = employmentIncome + selfEmployedProfit + propertyProfit + dividendIncome + savingsInterest;
  const adjustedNetIncome = clamp(totalIncome - pensionContributions - (giftAid * 1.25));

  // 2. Personal Allowance (Tapered if ANI > £100k)
  const personalAllowance = effectivePersonalAllowance(adjustedNetIncome, config);

  // 3. INCOME TAX - NON-SAVINGS STACK (Employment + SE + Property)
  const nonSavingsIncome = employmentIncome + selfEmployedProfit + propertyProfit;
  const taxableNonSavings = clamp(nonSavingsIncome - personalAllowance);
  
  const { total: totalNonSavingsTax, breakdown: nonSavingsBreakdown } = applyIncomeTaxBands(
    taxableNonSavings,
    config.incomeTaxBands
  );

  // Marginal distribution (for reporting)
  const employmentTax = roundPence((employmentIncome / nonSavingsIncome) * totalNonSavingsTax) || 0;
  const selfEmployedTax = roundPence((selfEmployedProfit / nonSavingsIncome) * totalNonSavingsTax) || 0;
  const propertyTax = roundPence((propertyProfit / nonSavingsIncome) * totalNonSavingsTax) || 0;

  // 4. SAVINGS TAX (Personal Savings Allowance & Starter Rate)
  // Determine if higher rate taxpayer to set PSA
  const isHigherRate = adjustedNetIncome > config.higherRateThreshold;
  const isAdditionalRate = adjustedNetIncome > config.additionalRateThreshold;
  const psa = isAdditionalRate ? 0 : isHigherRate ? config.personalSavingsAllowanceHigherRate : config.personalSavingsAllowanceBasicRate;
  
  const taxableSavings = clamp(savingsInterest - psa);
  const { total: savingsTax } = applyIncomeTaxBands(
    clamp(taxableNonSavings + taxableSavings) - taxableNonSavings,
    config.incomeTaxBands // Savings use same bands but different allowances
  );

  // 5. DIVIDEND TAX (Dividend Allowance)
  const taxableDividends = clamp(dividendIncome - config.dividendAllowance);
  const dividendTax = roundPence(taxableDividends * (isAdditionalRate ? config.dividendRates.additional : isHigherRate ? config.dividendRates.higher : config.dividendRates.basic));

  // 6. NI & ADDITIONAL CHARGES
  const class4NI = calculateClass4NI(selfEmployedProfit, config);
  
  // HICBC (Child Benefit Charge) - Simplified for demo (starts at £60k, 100% at £80k)
  const hicbc = adjustedNetIncome > 60000 ? Math.min(2500, (adjustedNetIncome - 60000) * 0.125) : 0; 

  // 7. TOTALS
  const totalTaxLiability = roundPence(totalNonSavingsTax + savingsTax + dividendTax + hicbc);
  const netTakeHome = totalIncome - totalTaxLiability - class4NI;

  return {
    totalIncome,
    adjustedNetIncome,
    personalAllowance,
    employment: { name: "Employment", taxableAmount: employmentIncome, tax: employmentTax, effectiveRate: employmentIncome > 0 ? employmentTax / employmentIncome : 0 },
    selfEmployment: { name: "Self-Employment", taxableAmount: selfEmployedProfit, tax: selfEmployedTax, effectiveRate: selfEmployedProfit > 0 ? selfEmployedTax / selfEmployedProfit : 0, class4NI },
    property: { name: "Property", taxableAmount: propertyProfit, tax: propertyTax, effectiveRate: propertyProfit > 0 ? propertyTax / propertyProfit : 0, section24Credit: 0 },
    savings: { name: "Savings", taxableAmount: savingsInterest, tax: savingsTax, effectiveRate: savingsInterest > 0 ? savingsTax / savingsInterest : 0 },
    dividends: { name: "Dividends", taxableAmount: dividendIncome, tax: dividendTax, effectiveRate: dividendIncome > 0 ? dividendTax / dividendIncome : 0 },
    hicbc,
    totalTaxLiability,
    totalNILiability: class4NI,
    netTakeHome,
    effectiveTaxRate: totalIncome > 0 ? (totalTaxLiability + class4NI) / totalIncome : 0,
    flags: {
      paTapered: personalAllowance < config.personalAllowance,
      higherRate: isHigherRate,
      additionalRate: isAdditionalRate,
      hicbcApplied: hicbc > 0
    }
  };
};
