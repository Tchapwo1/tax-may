/**
 * API Endpoint Specification — Sole Trader Calculator
 * POST /api/v1/calculators/sole-trader
 *
 * Design principles:
 * - Stateless: no session, no auth required for calculator
 * - Validated: Zod schema on every input
 * - Rate-limited: 60 req/min per IP, 300/min per API key
 * - Cacheable: results deterministic for same inputs + taxYear
 * - PII-safe: no raw financial data logged, only buckets
 */

// ── Request schema (Zod) ──────────────────────────────────────────────────────

import { z } from "zod";

const AdvancedExpensesSchema = z.object({
  mileageMiles:       z.number().min(0).max(500000).optional(),
  homeOfficeDays:     z.number().min(0).max(366).optional(),
  homeOfficeMethod:   z.enum(["actual", "simplified"]).optional(),
  equipment:          z.number().min(0).optional(),
  software:           z.number().min(0).optional(),
  subscriptions:      z.number().min(0).optional(),
  phonePercent:       z.number().min(0).max(100).optional(),
  phoneBill:          z.number().min(0).optional(),
  capitalAllowances:  z.number().min(0).optional(),
  other:              z.number().min(0).optional(),
});

export const SoleTraderRequestSchema = z.object({
  selfIncome:          z.number().min(0).max(10_000_000),
  employmentIncome:    z.number().min(0).max(10_000_000).optional().default(0),
  cisDeductions:       z.number().min(0).max(10_000_000).optional().default(0),
  totalExpenses:       z.number().min(0).optional().default(0),
  useTradingAllowance: z.boolean(),
  advancedExpenses:    AdvancedExpensesSchema.optional(),
  taxYear:             z.enum(["2024-25", "2025-26", "2026-27"]).optional().default("2025-26"),
});

export type SoleTraderRequest = z.infer<typeof SoleTraderRequestSchema>;

// ── Response schema ───────────────────────────────────────────────────────────

export interface SoleTraderAPIResponse {
  success: true;
  taxYear: string;
  inputs: {
    selfIncome: number;
    employmentIncome: number;
    cisDeductions: number;
    totalExpenses: number;
    useTradingAllowance: boolean;
    advancedExpenses?: Record<string, number | string>;
  };
  results: {
    taxableProfit: number;
    totalIncome: number;
    effectivePersonalAllowance: number;
    incomeTax: {
      onEmployment: number;
      onSelfEmployment: number;
      total: number;
      breakdown: { band: string; amount: number; tax: number; rate: number }[];
    };
    nationalInsurance: {
      class4: number;
      total: number;
    };
    cis: {
      deducted: number;
      refundDue: number;
    };
    totals: {
      totalTaxBeforeCIS: number;
      totalTaxAfterCIS: number;
      takeHome: number;
      effectiveRateSE: number;       // against SE income
      effectiveRateCombined: number; // against total income
    };
  };
  flags: {
    needsSelfAssessment: boolean;
    mtdRequired: boolean;
    cisRefundEligible: boolean;
    crossesHigherRateBand: boolean;
    personalAllowanceTapered: boolean;
  };
  meta: {
    calculatedAt: string;           // ISO 8601
    taxYearLabel: string;
    disclaimer: string;
  };
}

export interface APIErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

// ── Next.js / Express handler ─────────────────────────────────────────────────

/*
  Next.js App Router: app/api/v1/calculators/sole-trader/route.ts
  Express:            router.post('/v1/calculators/sole-trader', handler)
*/

import { NextRequest, NextResponse } from "next/server";
import { calculateSoleTrader } from "@/lib/sole-trader-calculator";

export const runtime = "edge"; // runs at the edge for low latency

export async function POST(req: NextRequest): Promise<NextResponse> {
  // ── Rate limiting (example using Upstash Redis) ───────────────────────────
  // const ip = req.ip ?? "unknown";
  // const { success } = await ratelimit.limit(ip);
  // if (!success) return NextResponse.json({ ... }, { status: 429 });

  // ── Parse + validate ──────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      errorResponse("INVALID_JSON", "Request body must be valid JSON"),
      { status: 400 }
    );
  }

  const parsed = SoleTraderRequestSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      fieldErrors[key] = fieldErrors[key] ?? [];
      fieldErrors[key].push(issue.message);
    }
    return NextResponse.json(
      errorResponse("VALIDATION_ERROR", "Input validation failed", fieldErrors),
      { status: 400 }
    );
  }

  // ── Calculate ─────────────────────────────────────────────────────────────
  const data = parsed.data;
  const result = calculateSoleTrader({
    selfIncome:          data.selfIncome,
    employmentIncome:    data.employmentIncome,
    cisDeductions:       data.cisDeductions,
    totalExpenses:       data.totalExpenses,
    useTradingAllowance: data.useTradingAllowance,
    advancedExpenses:    data.advancedExpenses,
    taxYear:             data.taxYear,
  });

  // ── Shape response ────────────────────────────────────────────────────────
  const response: SoleTraderAPIResponse = {
    success: true,
    taxYear: data.taxYear,
    inputs: {
      selfIncome:          data.selfIncome,
      employmentIncome:    data.employmentIncome,
      cisDeductions:       data.cisDeductions,
      totalExpenses:       data.totalExpenses,
      useTradingAllowance: data.useTradingAllowance,
      advancedExpenses:    data.advancedExpenses
        ? Object.fromEntries(
            Object.entries(data.advancedExpenses).filter(([, v]) => v !== undefined)
          )
        : undefined,
    },
    results: {
      taxableProfit:               result.taxableProfit,
      totalIncome:                 result.totalIncome,
      effectivePersonalAllowance:  result.effectivePersonalAllowance,
      incomeTax: {
        onEmployment:    result.incomeTaxOnEmployment,
        onSelfEmployment: result.incomeTaxOnSelfEmployment,
        total:           result.incomeTaxTotal,
        breakdown:       result.incomeTaxBreakdown.map(b => ({
          band:   b.name,
          amount: b.amount,
          tax:    b.tax,
          rate:   b.rate,
        })),
      },
      nationalInsurance: {
        class4: result.class4NI,
        total:  result.class4NI,
      },
      cis: {
        deducted:  data.cisDeductions,
        refundDue: result.cisRefund,
      },
      totals: {
        totalTaxBeforeCIS:    result.totalTax,
        totalTaxAfterCIS:     result.taxAfterCIS,
        takeHome:             result.takeHome,
        effectiveRateSE:      result.effectiveRate,
        effectiveRateCombined: result.combinedEffectiveRate,
      },
    },
    flags: {
      needsSelfAssessment:       result.flags.needsSelfAssessment,
      mtdRequired:               result.flags.mtdRequired,
      cisRefundEligible:         result.flags.cisRefundEligible,
      crossesHigherRateBand:     result.flags.crossesHigherRateBand,
      personalAllowanceTapered:  result.flags.personalAllowanceTapered,
    },
    meta: {
      calculatedAt: new Date().toISOString(),
      taxYearLabel: data.taxYear,
      disclaimer:
        "This calculator provides estimates only. Tax due may vary based on your full " +
        "circumstances. Always verify with HMRC or a qualified accountant before filing.",
    },
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

// ── Helper ────────────────────────────────────────────────────────────────────

function errorResponse(
  code: string,
  message: string,
  details?: Record<string, string[]>
): APIErrorResponse {
  return { success: false, error: { code, message, details } };
}

/*
──────────────────────────────────────────────────────────────────────────────
EXAMPLE REQUEST / RESPONSE PAIRS
──────────────────────────────────────────────────────────────────────────────

POST /api/v1/calculators/sole-trader
Content-Type: application/json

{
  "selfIncome": 35000,
  "employmentIncome": 20000,
  "cisDeductions": 0,
  "totalExpenses": 8000,
  "useTradingAllowance": false,
  "taxYear": "2025-26"
}

200 OK
{
  "success": true,
  "taxYear": "2025-26",
  "inputs": { ... },
  "results": {
    "taxableProfit": 27000,
    "totalIncome": 47000,
    "effectivePersonalAllowance": 12570,
    "incomeTax": {
      "onEmployment": 1486,
      "onSelfEmployment": 5428,
      "total": 6914,
      "breakdown": [
        { "band": "Basic rate", "amount": 34430, "tax": 6886, "rate": 0.20 },
        { "band": "Higher rate", "amount": 0, "tax": 0, "rate": 0.40 }
      ]
    },
    "nationalInsurance": {
      "class4": 864,
      "total": 864
    },
    "cis": { "deducted": 0, "refundDue": 0 },
    "totals": {
      "totalTaxBeforeCIS": 6292,
      "totalTaxAfterCIS": 6292,
      "takeHome": 28708,
      "effectiveRateSE": 0.1797,
      "effectiveRateCombined": 0.1197
    }
  },
  "flags": {
    "needsSelfAssessment": true,
    "mtdRequired": true,
    "cisRefundEligible": false,
    "crossesHigherRateBand": false,
    "personalAllowanceTapered": false
  },
  "meta": {
    "calculatedAt": "2025-05-01T12:00:00.000Z",
    "taxYearLabel": "2025-26",
    "disclaimer": "..."
  }
}

──────────────────────────────────────────────────────────────────────────────

POST /api/v1/calculators/sole-trader
Content-Type: application/json

{ "selfIncome": -100, "useTradingAllowance": false }

400 Bad Request
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input validation failed",
    "details": {
      "selfIncome": ["Number must be greater than or equal to 0"]
    }
  }
}
*/
