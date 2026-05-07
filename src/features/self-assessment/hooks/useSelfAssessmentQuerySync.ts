import { useQueryState, parseAsFloat } from 'nuqs';
import { useEffect } from 'react';
import { useSelfAssessmentStore } from '../store/useSelfAssessmentStore';

export function useSelfAssessmentQuerySync() {
  const store = useSelfAssessmentStore();

  const [employment, setEmployment] = useQueryState('employment', parseAsFloat);
  const [se, setSe] = useQueryState('se', parseAsFloat);
  const [property, setProperty] = useQueryState('property', parseAsFloat);
  const [dividends, setDividends] = useQueryState('dividends', parseAsFloat);
  const [savings, setSavings] = useQueryState('savings', parseAsFloat);
  const [pension, setPension] = useQueryState('pension', parseAsFloat);
  const [giftAid, setGiftAid] = useQueryState('giftaid', parseAsFloat);

  // Sync from URL to Store
  useEffect(() => {
    if (employment !== null) store.setEmploymentIncomeRaw(employment.toString());
    if (se !== null) store.setSelfEmployedProfitRaw(se.toString());
    if (property !== null) store.setPropertyProfitRaw(property.toString());
    if (dividends !== null) store.setDividendIncomeRaw(dividends.toString());
    if (savings !== null) store.setSavingsInterestRaw(savings.toString());
    if (pension !== null) store.setPensionContributionsRaw(pension.toString());
    if (giftAid !== null) store.setGiftAidRaw(giftAid.toString());
  }, []);

  // Sync from Store to URL
  useEffect(() => {
    const e = parseFloat(store.employmentIncomeRaw);
    setEmployment(e > 0 ? e : null);
  }, [store.employmentIncomeRaw]);

  useEffect(() => {
    const s = parseFloat(store.selfEmployedProfitRaw);
    setSe(s > 0 ? s : null);
  }, [store.selfEmployedProfitRaw]);

  useEffect(() => {
    const p = parseFloat(store.propertyProfitRaw);
    setProperty(p > 0 ? p : null);
  }, [store.propertyProfitRaw]);

  useEffect(() => {
    const d = parseFloat(store.dividendIncomeRaw);
    setDividends(d > 0 ? d : null);
  }, [store.dividendIncomeRaw]);

  useEffect(() => {
    const sa = parseFloat(store.savingsInterestRaw);
    setSavings(sa > 0 ? sa : null);
  }, [store.savingsInterestRaw]);

  useEffect(() => {
    const pen = parseFloat(store.pensionContributionsRaw);
    setPension(pen > 0 ? pen : null);
  }, [store.pensionContributionsRaw]);

  useEffect(() => {
    const ga = parseFloat(store.giftAidRaw);
    setGiftAid(ga > 0 ? ga : null);
  }, [store.giftAidRaw]);
}
