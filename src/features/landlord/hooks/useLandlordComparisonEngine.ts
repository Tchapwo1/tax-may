import { calculateLandlordTax, LandlordInputs, LandlordOutputs } from '../landlordEngine';

export interface LandlordComparisonDelta {
  a: LandlordOutputs;
  b: LandlordOutputs;
  diff: {
    netIncome: number;
    totalTax: number;
    taxableProfit: number;
    section24Credit: number;
    effectiveRate: number;
  };
}

export function computeLandlordDelta(
  inputA: LandlordInputs,
  inputB: LandlordInputs
): LandlordComparisonDelta {
  const a = calculateLandlordTax(inputA);
  const b = calculateLandlordTax(inputB);

  return {
    a,
    b,
    diff: {
      netIncome: b.netIncome - a.netIncome,
      totalTax: b.totalTaxLiability - a.totalTaxLiability,
      taxableProfit: b.taxableProfit - a.taxableProfit,
      section24Credit: b.section24Credit - a.section24Credit,
      effectiveRate: b.effectiveTaxRate - a.effectiveTaxRate,
    },
  };
}
