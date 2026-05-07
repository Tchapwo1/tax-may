'use client';

import { useMemo } from 'react';
import { useLandlordStore } from '@/shared/store/useLandlordStore';
import { calculateLandlordTax } from '../landlordEngine';

export function useLandlordCalculator() {
  const store = useLandlordStore();

  const result = useMemo(() => {
    return calculateLandlordTax({
      rentalIncome: parseFloat(store.rentalIncomeRaw) || 0,
      expenses: parseFloat(store.expensesRaw) || 0,
      mortgageInterest: parseFloat(store.mortgageInterestRaw) || 0,
      employmentIncome: parseFloat(store.employmentIncomeRaw) || 0,
    });
  }, [
    store.rentalIncomeRaw,
    store.expensesRaw,
    store.mortgageInterestRaw,
    store.employmentIncomeRaw,
  ]);

  return {
    state: store,
    result,
  };
}
