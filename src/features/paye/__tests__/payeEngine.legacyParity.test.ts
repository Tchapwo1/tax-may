import { describe, test, expect } from 'vitest';
import {
  computePaye,
  PayeInput,
} from '../payeEngine';

describe('computePaye (legacy parity)', () => {
  const cases: Array<{ name: string; input: PayeInput; snapshotKey: string }> = [
    {
      name: 'Basic rate, England, no pension, no loans',
      input: {
        gross: 35_000,
        isScottish: false,
        pensionPercent: 0,
        studentLoanPlan: 'none',
        blindAllowance: false,
      },
      snapshotKey: 'eng_basic_35k',
    },
    {
      name: 'Higher rate, England, 5% pension, Plan 2 loan',
      input: {
        gross: 60_000,
        isScottish: false,
        pensionPercent: 5,
        studentLoanPlan: '2',
        blindAllowance: false,
      },
      snapshotKey: 'eng_hr_60k_p5_plan2',
    },
    {
      name: 'Scottish, mid band, no pension, Plan 1 loan',
      input: {
        gross: 40_000,
        isScottish: true,
        pensionPercent: 0,
        studentLoanPlan: '1',
        blindAllowance: false,
      },
      snapshotKey: 'scot_mid_40k_plan1',
    },
    {
      name: 'High income, PA taper, blind allowance, no loans',
      input: {
        gross: 130_000,
        isScottish: false,
        pensionPercent: 0,
        studentLoanPlan: 'none',
        blindAllowance: true,
      },
      snapshotKey: 'eng_taper_130k_blind',
    },
  ];

  test.each(cases)('$name', ({ input }) => {
    const result = computePaye(input);
    expect(result.annual).toMatchSnapshot();
  });
});
