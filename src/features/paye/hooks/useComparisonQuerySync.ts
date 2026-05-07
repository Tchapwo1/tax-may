'use client';

import { useEffect } from 'react';
import { useQueryState, parseAsString } from 'nuqs';
import { useComparisonStore } from '@/shared/store/useComparisonStore';
import type { PayeInput } from '@/features/paye/payeEngine';

function decodeScenario(encoded: string | null): PayeInput | null {
  if (!encoded) return null;
  const parts = encoded.split(',');
  if (parts.length !== 5) return null;

  const [gross, scottish, pension, loan, blind] = parts;

  return {
    gross: parseFloat(gross) || 0,
    isScottish: scottish === 'true',
    pensionPercent: parseFloat(pension) || 0,
    studentLoanPlan: loan as any,
    blindAllowance: blind === 'true',
  };
}

function encodeScenario(input: PayeInput | null): string | null {
  if (!input) return null;
  return [
    input.gross,
    input.isScottish,
    input.pensionPercent,
    input.studentLoanPlan,
    input.blindAllowance,
  ].join(',');
}

export function useComparisonQuerySync() {
  const store = useComparisonStore();

  const [aParam, setAParam] = useQueryState('a', parseAsString.withDefault(''));
  const [bParam, setBParam] = useQueryState('b', parseAsString.withDefault(''));

  // 1. Hydrate from URL on mount
  useEffect(() => {
    const aDecoded = decodeScenario(aParam);
    const bDecoded = decodeScenario(bParam);

    if (aDecoded) store.saveScenarioA(aDecoded);
    if (bDecoded) store.saveScenarioB(bDecoded);
  }, []);

  // 2. Sync Zustand → URL
  useEffect(() => {
    setAParam(encodeScenario(store.scenarioA.input) || null);
    setBParam(encodeScenario(store.scenarioB.input) || null);
  }, [store.scenarioA.input, store.scenarioB.input]);
}
