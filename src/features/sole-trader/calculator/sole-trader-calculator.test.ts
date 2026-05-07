/**
 * Sole Trader Calculator — Test Suite
 * Run: npx jest sole-trader-calculator.test.ts
 *
 * Tests are anchored to 2025-26 tax year config.
 * Expected values verified against HMRC manual calculations.
 */

import { calculateSoleTrader, SoleTraderInputs } from "../lib/sole-trader-calculator";
import { TAX_YEARS } from "@/shared/config/tax-config";

const BASE = "2025-26" as const;

// ── Helper ───────────────────────────────────────────────────────────────────

const calc = (overrides: Partial<SoleTraderInputs>) =>
  calculateSoleTrader({ selfIncome: 0, useTradingAllowance: false, taxYear: BASE, ...overrides });

// ── Zero / edge states ───────────────────────────────────────────────────────

describe("Zero and edge inputs", () => {
  test("Zero income returns all-zero outputs", () => {
    const r = calc({ selfIncome: 0, totalExpenses: 0 });
    expect(r.taxableProfit).toBe(0);
    expect(r.totalTax).toBe(0);
    expect(r.takeHome).toBe(0);
    expect(r.effectiveRate).toBe(0);
  });

  test("Income exactly at trading allowance: profit is zero", () => {
    const r = calc({ selfIncome: 1000, useTradingAllowance: true });
    expect(r.taxableProfit).toBe(0);
    expect(r.totalTax).toBe(0);
    expect(r.flags.needsSelfAssessment).toBe(false);
  });

  test("Income below personal allowance: no income tax", () => {
    // profit £8,000 < personal allowance £12,570
    const r = calc({ selfIncome: 8000, totalExpenses: 0 });
    expect(r.incomeTaxOnSelfEmployment).toBe(0);
    expect(r.class4NI).toBe(0); // profit below Class 4 lower limit
    expect(r.totalTax).toBe(0);
  });
});

// ── Class 2 abolition ────────────────────────────────────────────────────────

describe("Class 2 NI abolished", () => {
  test("No Class 2 NI on any 2024-25+ calculation", () => {
    const r = calc({ selfIncome: 50000, totalExpenses: 5000, taxYear: "2024-25" });
    // There is no class2 field in outputs anymore
    expect("class2NI" in r).toBe(false);
  });

  test("Class 4 rate is 6% not 9% from 2024-25", () => {
    // Profit = £30,000 (above £12,570 lower limit, below upper limit)
    // Expected Class 4: (30000 - 12570) * 0.06 = £1,045.80
    const r = calc({ selfIncome: 30000, totalExpenses: 0 });
    expect(r.class4NI).toBeCloseTo(1045.80, 1);
  });
});

// ── Income tax — marginal stacking ───────────────────────────────────────────

describe("Income tax: SE profit stacked on employment income", () => {
  test("SE income alone within basic rate band", () => {
    // Profit £25,000, no employment. Taxable = 25000 - 12570 = 12430. IT = 12430 * 0.20 = £2,486
    const r = calc({ selfIncome: 25000, totalExpenses: 0 });
    expect(r.incomeTaxOnSelfEmployment).toBeCloseTo(2486, 0);
  });

  test("SE profit on top of employment income hits higher rate", () => {
    // Employment £45,000 (just under higher threshold)
    // SE profit £10,000
    // Total = £55,000 — crosses £50,270
    // Tax on £55,000: IT on (55000-12570) = 42430 — first 37700 @ 20% = 7540, remaining 4730 @ 40% = 1892 → total £9,432
    // Tax on employment £45,000: IT on (45000-12570) = 32430 @ 20% = £6,486
    // Marginal IT on SE = 9432 - 6486 = £2,946
    const r = calc({ selfIncome: 10000, totalExpenses: 0, employmentIncome: 45000 });
    expect(r.incomeTaxOnSelfEmployment).toBeCloseTo(2946, 0);
    expect(r.flags.crossesHigherRateBand).toBe(true);
  });

  test("SE income alone does not generate employment tax", () => {
    const r = calc({ selfIncome: 30000, totalExpenses: 5000 });
    expect(r.incomeTaxOnEmployment).toBe(0);
  });

  test("Personal allowance taper above £100k", () => {
    // Income £110,000: PA tapers by (110000-100000)/2 = £5,000 → PA = 12570 - 5000 = £7,570
    const r = calc({ selfIncome: 110000, totalExpenses: 0 });
    expect(r.effectivePersonalAllowance).toBe(7570);
    expect(r.flags.personalAllowanceTapered).toBe(true);
  });

  test("Personal allowance fully extinguished above £125,140", () => {
    const r = calc({ selfIncome: 130000, totalExpenses: 0 });
    expect(r.effectivePersonalAllowance).toBe(0);
  });
});

// ── Trading allowance ────────────────────────────────────────────────────────

describe("Trading allowance logic", () => {
  test("Trading allowance capped at income (cannot create loss)", () => {
    const r = calc({ selfIncome: 600, useTradingAllowance: true });
    expect(r.taxableProfit).toBe(0);
  });

  test("Trading allowance = £1,000 when income >= £1,000", () => {
    const r = calc({ selfIncome: 5000, useTradingAllowance: true });
    expect(r.taxableProfit).toBe(4000);
  });

  test("Expenses override trading allowance when disabled", () => {
    const r = calc({ selfIncome: 20000, totalExpenses: 6000, useTradingAllowance: false });
    expect(r.taxableProfit).toBe(14000);
  });

  test("Advanced expenses override simple expenses when higher", () => {
    const r = calc({
      selfIncome: 20000,
      totalExpenses: 1000,
      useTradingAllowance: false,
      advancedExpenses: { equipment: 6000 },
    });
    expect(r.taxableProfit).toBe(14000);
  });
});

// ── Mileage ──────────────────────────────────────────────────────────────────

describe("Mileage allowance", () => {
  test("First 10,000 miles at 45p", () => {
    // 5,000 miles @ 0.45 = £2,250
    const r = calc({
      selfIncome: 20000,
      useTradingAllowance: false,
      advancedExpenses: { mileageMiles: 5000 },
    });
    expect(r.taxableProfit).toBe(20000 - 2250);
  });

  test("Miles above 10k at 25p", () => {
    // 12,000 miles: (10000 * 0.45) + (2000 * 0.25) = 4500 + 500 = £5,000
    const r = calc({
      selfIncome: 30000,
      useTradingAllowance: false,
      advancedExpenses: { mileageMiles: 12000 },
    });
    expect(r.taxableProfit).toBe(30000 - 5000);
  });
});

// ── CIS ──────────────────────────────────────────────────────────────────────

describe("CIS deductions", () => {
  test("CIS refund triggered when deductions exceed tax", () => {
    // Tax on profit £10,000 (after PA) = (10000 - 12570) clamped to 0 → no IT
    // Class 4 also nil. Total tax = 0. CIS = 2000. Refund = 2000.
    const r = calc({
      selfIncome: 10000,
      totalExpenses: 0,
      cisDeductions: 2000,
    });
    expect(r.cisRefund).toBe(2000);
    expect(r.flags.cisRefundEligible).toBe(true);
    expect(r.taxAfterCIS).toBe(0);
  });

  test("CIS reduces tax when less than tax due", () => {
    // Profit £40,000: IT on (40000-12570)=27430 @ 20% = £5,486. Class4: (40000-12570)*0.06 = £1,645.80
    // Total ~£7,131. CIS £1,000. Tax after CIS = 6131.
    const r = calc({
      selfIncome: 40000,
      totalExpenses: 0,
      cisDeductions: 1000,
    });
    expect(r.cisRefund).toBe(0);
    expect(r.taxAfterCIS).toBeLessThan(r.totalTax);
    expect(r.flags.cisRefundEligible).toBe(false);
  });

  test("Tax after CIS never negative", () => {
    const r = calc({ selfIncome: 5000, totalExpenses: 0, cisDeductions: 10000 });
    expect(r.taxAfterCIS).toBe(0);
  });
});

// ── Flags ────────────────────────────────────────────────────────────────────

describe("Flags and CTA triggers", () => {
  test("Needs Self Assessment when profit > £1,000", () => {
    const r = calc({ selfIncome: 5000, totalExpenses: 0 });
    expect(r.flags.needsSelfAssessment).toBe(true);
  });

  test("MTD required when income > £10,000", () => {
    const r = calc({ selfIncome: 15000, totalExpenses: 0 });
    expect(r.flags.mtdRequired).toBe(true);
  });

  test("MTD not required when income <= £10,000", () => {
    const r = calc({ selfIncome: 9000, totalExpenses: 0 });
    expect(r.flags.mtdRequired).toBe(false);
  });

  test("Underclaimed expenses flag when expenses < 30% of income", () => {
    const r = calc({ selfIncome: 20000, totalExpenses: 500 });
    expect(r.flags.underclamedExpenses).toBe(true);
  });

  test("No underclaimed flag when using trading allowance", () => {
    const r = calc({ selfIncome: 20000, useTradingAllowance: true });
    expect(r.flags.underclamedExpenses).toBe(false);
  });
});

// ── Analytics ────────────────────────────────────────────────────────────────

describe("Analytics buckets (PII-safe)", () => {
  test("Income buckets are correct", () => {
    expect(calc({ selfIncome: 5000 }).analytics.incomeBucket).toBe("0-10k");
    expect(calc({ selfIncome: 15000 }).analytics.incomeBucket).toBe("10-20k");
    expect(calc({ selfIncome: 55000 }).analytics.incomeBucket).toBe("50-100k");
  });

  test("Tax band correctly identified", () => {
    expect(calc({ selfIncome: 25000 }).analytics.taxBand).toBe("basic");
    expect(calc({ selfIncome: 60000 }).analytics.taxBand).toBe("higher");
    expect(calc({ selfIncome: 130000 }).analytics.taxBand).toBe("additional");
  });
});

// ── Take-home sanity checks ───────────────────────────────────────────────────

describe("Take-home sanity", () => {
  test("Take-home never exceeds self-income", () => {
    const cases = [5000, 20000, 50000, 100000];
    for (const inc of cases) {
      const r = calc({ selfIncome: inc, totalExpenses: 0 });
      expect(r.takeHome).toBeLessThanOrEqual(inc);
    }
  });

  test("Take-home always non-negative", () => {
    const r = calc({ selfIncome: 1000, totalExpenses: 5000, cisDeductions: 2000 });
    expect(r.takeHome).toBeGreaterThanOrEqual(0);
  });

  test("Effective rate is between 0 and 1", () => {
    const r = calc({ selfIncome: 80000, totalExpenses: 10000 });
    expect(r.effectiveRate).toBeGreaterThanOrEqual(0);
    expect(r.effectiveRate).toBeLessThanOrEqual(1);
  });
});
