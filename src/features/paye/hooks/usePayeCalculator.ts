import { useMemo, useState } from 'react';
import {
  computePaye,
  computePayeHmrcCorrected,
  PayeInput,
  PayeResult,
  StudentLoanPlan,
} from '../payeEngine';

export type CalculatorMode = 'legacy-parity' | 'hmrc-corrected';

export interface UsePayeCalculatorState {
  salaryRaw: string;              // user input as string
  period: 'annual' | 'monthly' | 'weekly' | 'daily';
  isScottish: boolean;
  pensionPercent: string;
  studentLoanPlan: StudentLoanPlan;
  blindAllowance: boolean;
  mode: CalculatorMode;
}

export interface UsePayeCalculatorReturn {
  state: UsePayeCalculatorState;
  result: PayeResult | null;
  setSalaryRaw: (v: string) => void;
  setPeriod: (p: UsePayeCalculatorState['period']) => void;
  setIsScottish: (v: boolean) => void;
  setPensionPercent: (v: string) => void;
  setStudentLoanPlan: (p: StudentLoanPlan) => void;
  setBlindAllowance: (v: boolean) => void;
  setMode: (m: CalculatorMode) => void;
}

function normaliseToAnnual(salaryRaw: string, period: UsePayeCalculatorState['period']) {
  const raw = parseFloat(salaryRaw) || 0;
  if (period === 'monthly') return raw * 12;
  if (period === 'weekly') return raw * 52;
  if (period === 'daily') return raw * 260;
  return raw;
}

export function usePayeCalculator(
  initial?: Partial<UsePayeCalculatorState>,
): UsePayeCalculatorReturn {
  const [state, setState] = useState<UsePayeCalculatorState>({
    salaryRaw: initial?.salaryRaw ?? '',
    period: initial?.period ?? 'annual',
    isScottish: initial?.isScottish ?? false,
    pensionPercent: initial?.pensionPercent ?? '0',
    studentLoanPlan: initial?.studentLoanPlan ?? 'none',
    blindAllowance: initial?.blindAllowance ?? false,
    mode: initial?.mode ?? 'legacy-parity',
  });

  const result = useMemo<PayeResult | null>(() => {
    const annualGross = normaliseToAnnual(state.salaryRaw, state.period);
    if (annualGross <= 0) return null;

    const pensionPercent = parseFloat(state.pensionPercent) || 0;

    const input: PayeInput = {
      gross: annualGross,
      isScottish: state.isScottish,
      pensionPercent,
      studentLoanPlan: state.studentLoanPlan,
      blindAllowance: state.blindAllowance,
    };

    return state.mode === 'hmrc-corrected'
      ? computePayeHmrcCorrected(input)
      : computePaye(input);
  }, [state]);

  return {
    state,
    result,
    setSalaryRaw: (v) => setState((s) => ({ ...s, salaryRaw: v })),
    setPeriod: (p) => setState((s) => ({ ...s, period: p })),
    setIsScottish: (v) => setState((s) => ({ ...s, isScottish: v })),
    setPensionPercent: (v) => setState((s) => ({ ...s, pensionPercent: v })),
    setStudentLoanPlan: (p) => setState((s) => ({ ...s, studentLoanPlan: p })),
    setBlindAllowance: (v) => setState((s) => ({ ...s, blindAllowance: v })),
    setMode: (m) => setState((s) => ({ ...s, mode: m })),
  };
}
