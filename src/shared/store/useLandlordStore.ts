import { create } from 'zustand';

export interface LandlordState {
  rentalIncomeRaw: string;
  expensesRaw: string;
  mortgageInterestRaw: string;
  employmentIncomeRaw: string;
  
  // Actions
  setRentalIncomeRaw: (v: string) => void;
  setExpensesRaw: (v: string) => void;
  setMortgageInterestRaw: (v: string) => void;
  setEmploymentIncomeRaw: (v: string) => void;
  reset: () => void;
}

export const useLandlordStore = create<LandlordState>((set) => ({
  rentalIncomeRaw: '',
  expensesRaw: '',
  mortgageInterestRaw: '',
  employmentIncomeRaw: '',

  setRentalIncomeRaw: (v) => set({ rentalIncomeRaw: v }),
  setExpensesRaw: (v) => set({ expensesRaw: v }),
  setMortgageInterestRaw: (v) => set({ mortgageInterestRaw: v }),
  setEmploymentIncomeRaw: (v) => set({ employmentIncomeRaw: v }),
  
  reset: () => set({
    rentalIncomeRaw: '',
    expensesRaw: '',
    mortgageInterestRaw: '',
    employmentIncomeRaw: '',
  }),
}));
