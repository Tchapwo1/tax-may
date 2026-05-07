import { create } from 'zustand';
import type { LandlordInputs } from '../landlordEngine';

export interface LandlordScenario {
  label: string;
  input: LandlordInputs | null;
}

export interface LandlordComparisonState {
  scenarioA: LandlordScenario;
  scenarioB: LandlordScenario;
  isLocked: boolean;

  saveScenarioA: (input: LandlordInputs) => void;
  saveScenarioB: (input: LandlordInputs) => void;
  clearScenarios: () => void;
  toggleLock: () => void;

  serializeScenario: (input: LandlordInputs | null) => string | null;
  deserializeScenario: (str: string | null) => LandlordInputs | null;
}

export const useLandlordComparisonStore = create<LandlordComparisonState>((set) => ({
  scenarioA: { label: 'Current Plan', input: null },
  scenarioB: { label: 'New Scenario', input: null },
  isLocked: false,

  saveScenarioA: (input) => set((s) => ({ scenarioA: { ...s.scenarioA, input }, isLocked: true })),
  saveScenarioB: (input) => set((s) => ({ scenarioB: { ...s.scenarioB, input }, isLocked: true })),
  
  clearScenarios: () => set({
    scenarioA: { label: 'Current Plan', input: null },
    scenarioB: { label: 'New Scenario', input: null },
    isLocked: false,
  }),

  toggleLock: () => set((s) => ({ isLocked: !s.isLocked })),

  serializeScenario: (input) => {
    if (!input) return null;
    return [
      input.rentalIncome,
      input.expenses,
      input.mortgageInterest,
      input.employmentIncome
    ].join(',');
  },

  deserializeScenario: (str) => {
    if (!str) return null;
    const parts = str.split(',');
    if (parts.length !== 4) return null;
    return {
      rentalIncome: parseFloat(parts[0]) || 0,
      expenses: parseFloat(parts[1]) || 0,
      mortgageInterest: parseFloat(parts[2]) || 0,
      employmentIncome: parseFloat(parts[3]) || 0,
    };
  }
}));
