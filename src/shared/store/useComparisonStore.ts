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

  // actions
  saveScenarioA: (input: PayeInput) => void;
  saveScenarioB: (input: PayeInput) => void;
  clearScenarios: () => void;
  toggleLock: () => void;
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
}));
