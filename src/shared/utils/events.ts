/**
 * Analytics Event Schema — taxcalculator365.com
 * Cluster 2: Self-Employed / Sole Traders
 *
 * Tool-agnostic: works with GA4, Segment, Amplitude, Mixpanel, RudderStack.
 * Implementation: call track(event.name, event.properties) in your analytics wrapper.
 *
 * UPGRADES vs original document:
 * - Finer income bucketing around tax thresholds (not just "0-10k, 10k+")
 * - Threshold-aware buckets: bands around £12,570, £50,270, £100k, £125,140
 * - Session ID for funnel stitching (no PII)
 * - Calculator version for A/B testing
 * - Experiment context for future split tests
 * - Scroll depth tracking for content pages
 * - Exit intent reason captured
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type Device = "mobile" | "tablet" | "desktop";
export type TrafficSource = "organic" | "paid" | "direct" | "referral" | "email" | "social";
export type TaxYear = "2024-25" | "2025-26" | "2026-27";

/**
 * Threshold-aware income buckets.
 * Boundaries align with tax events that drive conversions.
 */
export type IncomeBucket =
  | "0"
  | "1-5k"
  | "5-10k"
  | "10-12.5k"   // below personal allowance — no tax due
  | "12.5-20k"   // basic rate starts
  | "20-30k"
  | "30-50k"
  | "50-50.3k"   // near higher rate threshold
  | "50.3-60k"   // just crossed into higher rate
  | "60-100k"
  | "100-125k"   // personal allowance taper zone
  | "125k+";     // additional rate / PA fully lost

export type TaxBucket = "0" | "0-500" | "500-2k" | "2-5k" | "5-10k" | "10k+";
export type ExpenseRatio = "<10%" | "10-30%" | "30-50%" | "50%+";
export type TaxBand = "none" | "basic" | "higher" | "additional";
export type CTAVariant = "selfAssessment" | "mtd" | "cisRefund" | "expenses";
export type LeadMagnetTrigger = "inline_banner" | "exit_intent" | "result_screen" | "sticky_bar";

// ── Shared context (attach to every event) ────────────────────────────────────

export interface EventContext {
  sessionId: string;          // anonymous UUID, not tied to user
  device: Device;
  taxYear: TaxYear;
  calculatorVersion: string;  // semver e.g. "1.2.0" — for A/B test attribution
  experiment?: string;        // e.g. "cta-position-test-v2"
  variant?: string;           // e.g. "control" | "treatment"
}

// ── Event definitions ─────────────────────────────────────────────────────────

/** 1. User types first character into any input */
export interface CalculatorStarted {
  name: "calculator_started";
  properties: EventContext & {
    source: TrafficSource;
    landingIncomeBucket: IncomeBucket | null; // pre-fill from URL params?
  };
}

/** 2. Results card becomes visible (first calculation) */
export interface CalculatorResultViewed {
  name: "calculator_result_viewed";
  properties: EventContext & {
    incomeBucket: IncomeBucket;
    taxBucket: TaxBucket;
    taxBand: TaxBand;
    usedTradingAllowance: boolean;
    cisPresent: boolean;
    employmentIncomePresent: boolean;
    expenseRatio: ExpenseRatio;
    mtdRequired: boolean;
    crossesHigherRate: boolean;
    paTapered: boolean;
    needsSelfAssessment: boolean;
  };
}

/** 3. User refines calculation (second+ calculation) */
export interface CalculatorRefined {
  name: "calculator_refined";
  properties: EventContext & {
    refinementNumber: number;
    fieldsChanged: string[];     // e.g. ["totalExpenses", "mileageMiles"]
    advancedExpensesOpened: boolean;
    incomeBucket: IncomeBucket;
  };
}

/** 4. Advanced expenses accordion opened */
export interface AdvancedExpensesOpened {
  name: "advanced_expenses_opened";
  properties: EventContext & {
    incomeBucket: IncomeBucket;
    previousExpenseRatio: ExpenseRatio;
  };
}

/** 5. CIS refund detected */
export interface CISRefundDetected {
  name: "cis_refund_detected";
  properties: EventContext & {
    incomeBucket: IncomeBucket;
    refundBucket: TaxBucket;
  };
}

/** 6. Lead magnet shown */
export interface LeadMagnetShown {
  name: "lead_magnet_shown";
  properties: EventContext & {
    magnet: "expenses_checklist" | "mtd_guide" | "sa_guide";
    trigger: LeadMagnetTrigger;
    expenseRatio: ExpenseRatio;
    incomeBucket: IncomeBucket;
    exitIntentReason?: "cursor_leave" | "back_button" | "idle_20s";
  };
}

/** 7. Lead magnet email submitted */
export interface LeadMagnetSubmitted {
  name: "lead_magnet_submitted";
  properties: EventContext & {
    magnet: "expenses_checklist" | "mtd_guide" | "sa_guide";
    trigger: LeadMagnetTrigger;
    incomeBucket: IncomeBucket;
    taxBand: TaxBand;
    // No email address — hash only if you need deduplication:
    // emailHash: sha256(normalised_email)
  };
}

/** 8. CTA shown */
export interface CTAShown {
  name: "cta_shown";
  properties: EventContext & {
    ctaVariant: CTAVariant;
    reason: string;             // e.g. "profit_over_1000", "income_over_10k"
    incomeBucket: IncomeBucket;
    taxBucket: TaxBucket;
    position: "results_panel" | "sticky_bar" | "below_fold";
  };
}

/** 9. CTA clicked */
export interface CTAClicked {
  name: "cta_clicked";
  properties: EventContext & {
    ctaVariant: CTAVariant;
    incomeBucket: IncomeBucket;
    taxBucket: TaxBucket;
    taxBand: TaxBand;
    position: "results_panel" | "sticky_bar" | "below_fold";
    destination: string;        // URL path e.g. "/services/self-assessment-sole-traders"
  };
}

/** 10. Service page viewed */
export interface ServicePageViewed {
  name: "service_page_viewed";
  properties: EventContext & {
    service: "self_assessment" | "mtd" | "cis_refund" | "bookkeeping";
    source: "calculator_cta" | "nav" | "guide_link" | "direct" | "email";
  };
}

/** 11. Booking initiated */
export interface BookingInitiated {
  name: "booking_initiated";
  properties: EventContext & {
    service: "self_assessment" | "mtd" | "cis_refund" | "bookkeeping";
    source: "service_page" | "calculator_cta";
    incomeBucket: IncomeBucket; // from session context if available
  };
}

/** 12. Booking completed */
export interface BookingCompleted {
  name: "booking_completed";
  properties: EventContext & {
    service: "self_assessment" | "mtd" | "cis_refund" | "bookkeeping";
    cluster: "self_employed" | "landlord" | "director" | "paye";
    revenueValue: number; // service price (not income) — e.g. 119 for SA filing
  };
}

/** 13. Content page scroll depth */
export interface ContentScrollDepth {
  name: "content_scroll_depth";
  properties: EventContext & {
    page: string;               // URL path
    depth: 25 | 50 | 75 | 100; // % scrolled
  };
}

/** 14. Newsletter signup */
export interface NewsletterSignup {
  name: "newsletter_signup";
  properties: EventContext & {
    source: "calculator_footer" | "guide_inline" | "dedicated_page" | "exit_intent";
    cluster: string;
  };
}

// ── Union type ─────────────────────────────────────────────────────────────────

export type AnalyticsEvent =
  | CalculatorStarted
  | CalculatorResultViewed
  | CalculatorRefined
  | AdvancedExpensesOpened
  | CISRefundDetected
  | LeadMagnetShown
  | LeadMagnetSubmitted
  | CTAShown
  | CTAClicked
  | ServicePageViewed
  | BookingInitiated
  | BookingCompleted
  | ContentScrollDepth
  | NewsletterSignup;

// ── Tracker implementation ────────────────────────────────────────────────────

export type AnalyticsAdapter = (name: string, properties: Record<string, unknown>) => void;

let _adapter: AnalyticsAdapter = () => {};

export const initAnalytics = (adapter: AnalyticsAdapter): void => {
  _adapter = adapter;
};

export const track = (event: AnalyticsEvent): void => {
  // Debounce guard — prevent duplicate fires on double renders
  const key = `${event.name}_${Date.now()}`;
  if (typeof window !== "undefined") {
    const last = sessionStorage.getItem(event.name);
    if (last && Date.now() - parseInt(last) < 500) return;
    sessionStorage.setItem(event.name, Date.now().toString());
  }

  _adapter(event.name, event.properties as Record<string, unknown>);

  if (process.env.NODE_ENV === "development") {
    console.group(`[analytics] ${event.name}`);
    console.log(event.properties);
    console.groupEnd();
  }
};

// ── GA4 adapter example ───────────────────────────────────────────────────────

export const ga4Adapter: AnalyticsAdapter = (name, properties) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, properties);
};

// ── Segment adapter example ───────────────────────────────────────────────────

export const segmentAdapter: AnalyticsAdapter = (name, properties) => {
  if (typeof window === "undefined" || !window.analytics) return;
  window.analytics.track(name, properties);
};

// ── Funnel query (reference) ──────────────────────────────────────────────────
/*
Full attribution funnel — query in BigQuery / Amplitude / Mixpanel:

calculator_started
  → calculator_result_viewed      [conversion: % who see results]
  → lead_magnet_shown             [exposure rate]
  → lead_magnet_submitted         [lead conversion rate]
  → cta_clicked                   [intent rate]
  → service_page_viewed           [landing rate]
  → booking_initiated             [funnel entry rate]
  → booking_completed             [close rate]

Key metrics to monitor weekly:
- calculator_started → calculator_result_viewed  (target: >85%)
- calculator_result_viewed → cta_clicked         (target: >15%)
- cta_clicked → booking_initiated                (target: >10%)
- booking_initiated → booking_completed          (target: >40%)
- lead_magnet_shown → lead_magnet_submitted      (target: >8%)

Segment by:
- incomeBucket (which income band converts best?)
- taxBand (do higher-rate users convert better?)
- device (mobile vs desktop drop-off)
- ctaVariant (SA vs MTD vs CIS)
- experiment/variant (A/B test results)
*/
