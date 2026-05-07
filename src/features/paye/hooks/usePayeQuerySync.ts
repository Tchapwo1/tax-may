'use client';

import { useEffect } from 'react';
import { useQueryState, parseAsString, parseAsBoolean } from 'nuqs';
import { usePayeStore } from '@/shared/store/usePayeStore';

export function usePayeQuerySync() {
  const store = usePayeStore();

  // Bind URL params
  const [salary, setSalary] = useQueryState('salary', parseAsString.withDefault(''));
  const [period, setPeriod] = useQueryState('period', parseAsString.withDefault('annual'));
  const [scottish, setScottish] = useQueryState('scottish', parseAsBoolean.withDefault(false));
  const [pension, setPension] = useQueryState('pension', parseAsString.withDefault('0'));
  const [loan, setLoan] = useQueryState('loan', parseAsString.withDefault('none'));
  const [blind, setBlind] = useQueryState('blind', parseAsBoolean.withDefault(false));
  const [mode, setMode] = useQueryState('mode', parseAsString.withDefault('legacy-parity'));

  // 1. Hydrate Zustand from URL on first mount
  useEffect(() => {
    store.hydrateFromQuery({
      salaryRaw: salary,
      period: period as any,
      isScottish: scottish,
      pensionPercent: pension,
      studentLoanPlan: loan as any,
      blindAllowance: blind,
      mode: mode as any,
    });
  }, []);

  // 2. Sync Zustand → URL whenever state changes
  useEffect(() => {
    setSalary(store.salaryRaw || null);
    setPeriod(store.period);
    setScottish(store.isScottish || null);
    setPension(store.pensionPercent !== '0' ? store.pensionPercent : null);
    setLoan(store.studentLoanPlan !== 'none' ? store.studentLoanPlan : null);
    setBlind(store.blindAllowance || null);
    setMode(store.mode !== 'legacy-parity' ? store.mode : null);
  }, [
    store.salaryRaw,
    store.period,
    store.isScottish,
    store.pensionPercent,
    store.studentLoanPlan,
    store.blindAllowance,
    store.mode,
  ]);
}
