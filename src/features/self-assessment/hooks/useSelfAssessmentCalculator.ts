import { useMemo } from 'react';
import { useSelfAssessmentStore } from '../store/useSelfAssessmentStore';
import { calculateSelfAssessment } from '../selfAssessmentEngine';

export function useSelfAssessmentCalculator() {
  const state = useSelfAssessmentStore();

  const result = useMemo(() => {
    return calculateSelfAssessment({
      employmentIncome: parseFloat(state.employmentIncomeRaw) || 0,
      selfEmployedProfit: parseFloat(state.selfEmployedProfitRaw) || 0,
      propertyProfit: parseFloat(state.propertyProfitRaw) || 0,
      dividendIncome: parseFloat(state.dividendIncomeRaw) || 0,
      savingsInterest: parseFloat(state.savingsInterestRaw) || 0,
      pensionContributions: parseFloat(state.pensionContributionsRaw) || 0,
      giftAid: parseFloat(state.giftAidRaw) || 0,
    });
  }, [
    state.employmentIncomeRaw,
    state.selfEmployedProfitRaw,
    state.propertyProfitRaw,
    state.dividendIncomeRaw,
    state.savingsInterestRaw,
    state.pensionContributionsRaw,
    state.giftAidRaw
  ]);

  return { state, result };
}
