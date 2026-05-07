import { create } from 'zustand';
import type { PayeInput } from '@/features/paye/payeEngine';

export interface ComparisonScenario {
  label: string;
  input: PayeInput | null;
}

export interface ComparisonStoreState {
  scenarioA: ComparisonScenario;
  scenarioB: ComparisonScenario;
  isLocked: boolean;

  saveScenarioA: (input: PayeInput) => void;
  saveScenarioB: (input: PayeInput) => void;
  clearScenarios: () => void;
  toggleLock: () => void;

  serializeScenario: (input: PayeInput | null) => string | null;
  deserializeScenario: (str: string | null) => PayeInput | null;
}

export const useComparisonStore = create<ComparisonStoreState>((set) => ({
  scenarioA: { label: 'Scenario A', input: null },
  scenarioB: { label: 'Scenario B', input: null },
  isLocked: false,

  saveScenarioA: (input) =>
    set((s) => ({
      scenarioA: { ...s.scenarioA, input },
      isLocked: true,
    })),

  saveScenarioB: (input) =>
    set((s) => ({
      scenarioB: { ...s.scenarioB, input },
      isLocked: true,
    })),

  clearScenarios: () =>
    set({
      scenarioA: { label: 'Scenario A', input: null },
      scenarioB: { label: 'Scenario B', input: null },
      isLocked: false,
    }),

  toggleLock: () => set((s) => ({ isLocked: !s.isLocked })),

  serializeScenario: (input) =>
    input
      ? [
          input.gross,
          input.isScottish,
          input.pensionPercent,
          input.studentLoanPlan,
          input.blindAllowance,
        ].join(',')
      : null,

  deserializeScenario: (str) => {
    if (!str) return null;
    const parts = str.split(',');
    if (parts.length !== 5) return null;

    const [gross, scottish, pension, loan, blind] = parts;

    return {
      gross: parseFloat(gross) || 0,
      isScottish: scottish === 'true',
      pensionPercent: parseFloat(pension) || 0,
      studentLoanPlan: loan as any,
      blindAllowance: blind === 'true',
    };
  },
}));
