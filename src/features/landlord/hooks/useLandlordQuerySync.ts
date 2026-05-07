'use client';

import { useEffect } from 'react';
import { useQueryState, parseAsString } from 'nuqs';
import { useLandlordStore } from '@/shared/store/useLandlordStore';

export function useLandlordQuerySync() {
  const store = useLandlordStore();

  const [rent, setRent] = useQueryState('rent', parseAsString.withDefault(''));
  const [expenses, setExpenses] = useQueryState('expenses', parseAsString.withDefault(''));
  const [interest, setInterest] = useQueryState('interest', parseAsString.withDefault(''));
  const [employment, setEmployment] = useQueryState('employment', parseAsString.withDefault(''));

  // 1. Hydrate Zustand from URL on first mount
  useEffect(() => {
    store.setRentalIncomeRaw(rent);
    store.setExpensesRaw(expenses);
    store.setMortgageInterestRaw(interest);
    store.setEmploymentIncomeRaw(employment);
  }, []);

  // 2. Sync Zustand → URL
  useEffect(() => {
    setRent(store.rentalIncomeRaw || null);
    setExpenses(store.expensesRaw || null);
    setInterest(store.mortgageInterestRaw || null);
    setEmployment(store.employmentIncomeRaw || null);
  }, [
    store.rentalIncomeRaw,
    store.expensesRaw,
    store.mortgageInterestRaw,
    store.employmentIncomeRaw,
  ]);
}
