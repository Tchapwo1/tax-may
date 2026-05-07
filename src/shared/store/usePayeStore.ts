import { create } from 'zustand';

export type PayPeriod = 'annual' | 'monthly' | 'weekly' | 'daily';
export type StudentLoanPlan = 'none' | '1' | '2' | '4' | '5' | 'pg';
export type CalculatorMode = 'legacy-parity' | 'hmrc-corrected';

export interface PayeStoreState {
  salaryRaw: string;
  period: PayPeriod;
  isScottish: boolean;
  pensionPercent: string;
  studentLoanPlan: StudentLoanPlan;
  blindAllowance: boolean;
  mode: CalculatorMode;

  // setters
  setSalaryRaw: (v: string) => void;
  setPeriod: (v: PayPeriod) => void;
  setIsScottish: (v: boolean) => void;
  setPensionPercent: (v: string) => void;
  setStudentLoanPlan: (v: StudentLoanPlan) => void;
  setBlindAllowance: (v: boolean) => void;
  setMode: (v: CalculatorMode) => void;

  // hydration
  hydrateFromQuery: (q: Partial<PayeStoreState>) => void;
}

export const usePayeStore = create<PayeStoreState>((set) => ({
  salaryRaw: '',
  period: 'annual',
  isScottish: false,
  pensionPercent: '0',
  studentLoanPlan: 'none',
  blindAllowance: false,
  mode: 'legacy-parity',

  setSalaryRaw: (v) => set({ salaryRaw: v }),
  setPeriod: (v) => set({ period: v }),
  setIsScottish: (v) => set({ isScottish: v }),
  setPensionPercent: (v) => set({ pensionPercent: v }),
  setStudentLoanPlan: (v) => set({ studentLoanPlan: v }),
  setBlindAllowance: (v) => set({ blindAllowance: v }),
  setMode: (v) => set({ mode: v }),

  hydrateFromQuery: (q) =>
    set((s) => ({
      ...s,
      ...q,
      salaryRaw: q.salaryRaw ?? s.salaryRaw,
      pensionPercent: q.pensionPercent ?? s.pensionPercent,
    })),
}));
