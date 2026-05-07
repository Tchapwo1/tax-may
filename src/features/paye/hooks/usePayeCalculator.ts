import { useMemo } from 'react';
import { usePayeStore } from '@/shared/store/usePayeStore';
import {
  computePaye,
  computePayeHmrcCorrected,
  PayeResult,
} from '../payeEngine';

function normaliseToAnnual(salaryRaw: string, period: string) {
  const raw = parseFloat(salaryRaw) || 0;
  if (period === 'monthly') return raw * 12;
  if (period === 'weekly') return raw * 52;
  if (period === 'daily') return raw * 260;
  return raw;
}

export function usePayeCalculator() {
  const store = usePayeStore();

  const result = useMemo<PayeResult | null>(() => {
    const annualGross = normaliseToAnnual(store.salaryRaw, store.period);
    if (annualGross <= 0) return null;

    const input = {
      gross: annualGross,
      isScottish: store.isScottish,
      pensionPercent: parseFloat(store.pensionPercent) || 0,
      studentLoanPlan: store.studentLoanPlan,
      blindAllowance: store.blindAllowance,
    };

    return store.mode === 'hmrc-corrected'
      ? computePayeHmrcCorrected(input)
      : computePaye(input);
  }, [
    store.salaryRaw,
    store.period,
    store.isScottish,
    store.pensionPercent,
    store.studentLoanPlan,
    store.blindAllowance,
    store.mode,
  ]);

  return {
    state: store,
    result,
    setSalaryRaw: store.setSalaryRaw,
    setPeriod: store.setPeriod,
    setIsScottish: store.setIsScottish,
    setPensionPercent: store.setPensionPercent,
    setStudentLoanPlan: store.setStudentLoanPlan,
    setBlindAllowance: store.setBlindAllowance,
    setMode: store.setMode,
  };
}
