export const useCalculatorStore = (selector: any) => {
  return selector({
    taxYear: "2025-26",
    setTaxYear: () => {},
    studentLoanPlan: "plan-1",
    setStudentLoanPlan: () => {},
    postgraduateLoan: false,
    setPostgraduateLoan: () => {},
    pensionType: "percentage",
    setPensionType: () => {},
    pensionAmount: 0,
    setPensionAmount: () => {},
    blindPersonsAllowance: false,
    setBlindPersonsAllowance: () => {},
    marriedCoupleAllowance: false,
    setMarriedCoupleAllowance: () => {},
    scottishTax: false,
    setScottishTax: () => {}
  });
};
