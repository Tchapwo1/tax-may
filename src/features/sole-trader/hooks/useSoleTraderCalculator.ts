/**
 * useSoleTraderCalculator — React hook
 * Wires inputs → calculation engine → analytics → CTA logic
 */

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { calculateSoleTrader, SoleTraderInputs, SoleTraderOutputs } from "@/lib/sole-trader-calculator";
import { track } from "@/analytics/events";
const generateSessionId = () => Math.random().toString(36).substring(2, 15);

const DEFAULT_INPUTS: SoleTraderInputs = {
  selfIncome: 0,
  employmentIncome: 0,
  cisDeductions: 0,
  totalExpenses: 0,
  useTradingAllowance: false,
  taxYear: "2025-26",
};

export type CalculatorState = "idle" | "first_result" | "refined";

export interface UseSoleTraderCalculatorReturn {
  inputs: SoleTraderInputs;
  results: SoleTraderOutputs | null;
  state: CalculatorState;
  calculationCount: number;
  updateField: <K extends keyof SoleTraderInputs>(field: K, value: SoleTraderInputs[K]) => void;
  reset: () => void;
  sessionId: string;
}

export const useSoleTraderCalculator = (): UseSoleTraderCalculatorReturn => {
  const [inputs, setInputs] = useState<SoleTraderInputs>(DEFAULT_INPUTS);
  const [state, setState] = useState<CalculatorState>("idle");
  const [calculationCount, setCalculationCount] = useState(0);
  const sessionId = useRef(generateSessionId()).current;
  const hasTrackedStart = useRef(false);
  const changedFields = useRef<string[]>([]);

  const results = useMemo<SoleTraderOutputs | null>(() => {
    if (inputs.selfIncome <= 0) return null;
    return calculateSoleTrader(inputs);
  }, [inputs]);

  // Track state transitions and analytics
  useEffect(() => {
    if (!results) return;

    if (state === "idle") {
      setState("first_result");
      setCalculationCount(1);

      // Track first result
      track({
        name: "calculator_result_viewed",
        properties: {
          sessionId,
          device: getDevice(),
          taxYear: inputs.taxYear ?? "2025-26",
          calculatorVersion: "2.0.0",
          incomeBucket: results.analytics.incomeBucket as any,
          taxBucket: results.analytics.taxBucket as any,
          taxBand: results.analytics.taxBand as any,
          usedTradingAllowance: inputs.useTradingAllowance,
          cisPresent: (inputs.cisDeductions ?? 0) > 0,
          employmentIncomePresent: (inputs.employmentIncome ?? 0) > 0,
          expenseRatio: results.analytics.expenseRatio as any,
          mtdRequired: results.flags.mtdRequired,
          crossesHigherRate: results.flags.crossesHigherRateBand,
          paTapered: results.flags.personalAllowanceTapered,
          needsSelfAssessment: results.flags.needsSelfAssessment,
        },
      });
    } else if (state === "first_result") {
      setState("refined");
      setCalculationCount(c => c + 1);

      track({
        name: "calculator_refined",
        properties: {
          sessionId,
          device: getDevice(),
          taxYear: inputs.taxYear ?? "2025-26",
          calculatorVersion: "2.0.0",
          refinementNumber: calculationCount + 1,
          fieldsChanged: changedFields.current,
          advancedExpensesOpened: !!inputs.advancedExpenses,
          incomeBucket: results.analytics.incomeBucket as any,
        },
      });
      changedFields.current = [];
    }
  }, [results]);

  const updateField = useCallback(<K extends keyof SoleTraderInputs>(
    field: K,
    value: SoleTraderInputs[K]
  ) => {
    // Track first interaction
    if (!hasTrackedStart.current && field === "selfIncome" && (value as number) > 0) {
      hasTrackedStart.current = true;
      track({
        name: "calculator_started",
        properties: {
          sessionId,
          device: getDevice(),
          taxYear: inputs.taxYear ?? "2025-26",
          calculatorVersion: "2.0.0",
          source: getTrafficSource() as any,
          landingIncomeBucket: null,
        },
      });
    }

    changedFields.current = [...new Set([...changedFields.current, field])];
    setInputs(prev => ({ ...prev, [field]: value }));
  }, [inputs.taxYear, sessionId]);

  const reset = useCallback(() => {
    setInputs(DEFAULT_INPUTS);
    setState("idle");
    setCalculationCount(0);
    hasTrackedStart.current = false;
    changedFields.current = [];
  }, []);

  return { inputs, results, state, calculationCount, updateField, reset, sessionId };
};

// ── Utilities ─────────────────────────────────────────────────────────────────

const getDevice = (): "mobile" | "tablet" | "desktop" => {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
};

const getTrafficSource = (): string => {
  if (typeof document === "undefined") return "direct";
  const ref = document.referrer;
  if (!ref) return "direct";
  if (ref.includes("google") || ref.includes("bing") || ref.includes("yahoo")) return "organic";
  if (ref.includes("facebook") || ref.includes("twitter") || ref.includes("linkedin")) return "social";
  return "referral";
};
