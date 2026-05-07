import { computePaye, PayeInput, PayeResult } from '@/features/paye/payeEngine';

export interface ComparisonDelta {
  a: PayeResult;
  b: PayeResult;
  diff: {
    takeHome: number;
    incomeTax: number;
    nationalInsurance: number;
    studentLoan: number;
    effectiveTaxRate: number;
  };
}

export function computeComparisonDelta(
  aInput: PayeInput,
  bInput: PayeInput,
): ComparisonDelta {
  const aRes = computePaye(aInput);
  const bRes = computePaye(bInput);
  const a = aRes.annual;
  const b = bRes.annual;

  return {
    a: aRes,
    b: bRes,
    diff: {
      takeHome: b.takeHome - a.takeHome,
      incomeTax: b.incomeTax - a.incomeTax,
      nationalInsurance: b.nationalInsurance - a.nationalInsurance,
      studentLoan: b.studentLoan - a.studentLoan,
      effectiveTaxRate: b.effectiveTaxRate - a.effectiveTaxRate,
    },
  };
}
