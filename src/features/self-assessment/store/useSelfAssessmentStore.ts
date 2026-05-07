import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SelfAssessmentState {
  // Inputs (Raw Strings for UI)
  employmentIncomeRaw: string;
  selfEmployedProfitRaw: string;
  propertyProfitRaw: string;
  dividendIncomeRaw: string;
  savingsInterestRaw: string;
  pensionContributionsRaw: string;
  giftAidRaw: string;

  // Setters
  setEmploymentIncomeRaw: (val: string) => void;
  setSelfEmployedProfitRaw: (val: string) => void;
  setPropertyProfitRaw: (val: string) => void;
  setDividendIncomeRaw: (val: string) => void;
  setSavingsInterestRaw: (val: string) => void;
  setPensionContributionsRaw: (val: string) => void;
  setGiftAidRaw: (val: string) => void;

  // Actions
  reset: () => void;
}

export const useSelfAssessmentStore = create<SelfAssessmentState>()(
  persist(
    (set) => ({
      employmentIncomeRaw: '',
      selfEmployedProfitRaw: '',
      propertyProfitRaw: '',
      dividendIncomeRaw: '',
      savingsInterestRaw: '',
      pensionContributionsRaw: '',
      giftAidRaw: '',

      setEmploymentIncomeRaw: (val) => set({ employmentIncomeRaw: val }),
      setSelfEmployedProfitRaw: (val) => set({ selfEmployedProfitRaw: val }),
      setPropertyProfitRaw: (val) => set({ propertyProfitRaw: val }),
      setDividendIncomeRaw: (val) => set({ dividendIncomeRaw: val }),
      setSavingsInterestRaw: (val) => set({ savingsInterestRaw: val }),
      setPensionContributionsRaw: (val) => set({ pensionContributionsRaw: val }),
      setGiftAidRaw: (val) => set({ giftAidRaw: val }),

      reset: () => set({
        employmentIncomeRaw: '',
        selfEmployedProfitRaw: '',
        propertyProfitRaw: '',
        dividendIncomeRaw: '',
        savingsInterestRaw: '',
        pensionContributionsRaw: '',
        giftAidRaw: '',
      }),
    }),
    { name: 'self-assessment-storage' }
  )
);
