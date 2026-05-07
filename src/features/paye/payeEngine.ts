export type PayPeriod = 'annual' | 'monthly' | 'weekly' | 'daily';

export type StudentLoanPlan = 'none' | '1' | '2' | '4' | '5' | 'pg';

export interface PayeInput {
  gross: number;              // annual gross salary
  isScottish: boolean;
  pensionPercent: number;     // 0–100
  studentLoanPlan: StudentLoanPlan;
  blindAllowance: boolean;
}

export interface PayeBreakdown {
  gross: number;
  pensionContribution: number;
  taxableSalary: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  nationalInsurance: number;
  studentLoan: number;
  takeHome: number;
  effectiveTaxRate: number;   // total deductions / gross
}

export interface PayeResult {
  annual: PayeBreakdown;
  monthly: PayeBreakdown;
  weekly: PayeBreakdown;
  daily: PayeBreakdown;
}

/* ── Tax constants 2025-26 (legacy-aligned) ───── */
const PA = 12_570;
const HRT = 50_270;
const ART = 125_140;
const PA_TAPER = 100_000;

const SCOT_BANDS = [
  { from: 0, to: 2_306, r: 0.19 },
  { from: 2_306, to: 13_991, r: 0.20 },
  { from: 13_991, to: 31_092, r: 0.21 },
  { from: 31_092, to: 62_430, r: 0.42 },
  { from: 62_430, to: 125_140, r: 0.45 },
  { from: 125_140, to: Infinity, r: 0.48 },
];

const ENG_BANDS = [
  { from: 0, to: 37_700, r: 0.20 },
  { from: 37_700, to: ART - PA, r: 0.40 },
  { from: ART - PA, to: Infinity, r: 0.45 },
];

const STUDENT_LOANS: Record<
  Exclude<StudentLoanPlan, 'none'>,
  { threshold: number; rate: number }
> = {
  '1': { threshold: 24_990, rate: 0.09 },
  '2': { threshold: 27_295, rate: 0.09 },
  '4': { threshold: 31_395, rate: 0.09 },
  '5': { threshold: 25_000, rate: 0.09 },
  pg: { threshold: 21_000, rate: 0.06 },
};

const NI_PT = 12_570;
const NI_UEL = 50_270;
const NI_LOW = 0.08;
const NI_HIGH = 0.02;

/* ── Helpers ───── */

export function effPersonalAllowance(income: number): number {
  if (income <= PA_TAPER) return PA;
  return Math.max(0, PA - Math.floor((income - PA_TAPER) / 2));
}

export function calcEnglishIncomeTax(taxable: number): number {
  let tax = 0;
  let rem = Math.max(0, taxable);

  const b1 = Math.min(rem, ENG_BANDS[0].to - ENG_BANDS[0].from);
  tax += b1 * ENG_BANDS[0].r;
  rem -= b1;

  const b2Width = ENG_BANDS[1].to - ENG_BANDS[1].from;
  const b2 = Math.min(rem, b2Width);
  tax += b2 * ENG_BANDS[1].r;
  rem -= b2;

  if (rem > 0) {
    tax += rem * ENG_BANDS[2].r;
  }

  return tax;
}

export function calcScottishIncomeTax(grossIncome: number, pa: number): number {
  const taxable = Math.max(0, grossIncome - pa);
  let tax = 0;
  let rem = taxable;

  for (const b of SCOT_BANDS) {
    if (rem <= 0) break;
    const width = b.to === Infinity ? rem : b.to - b.from;
    const slice = Math.min(rem, width);
    tax += slice * b.r;
    rem -= slice;
  }

  return tax;
}

export function calcNI(salary: number): number {
  if (salary <= NI_PT) return 0;
  const lower = Math.min(salary, NI_UEL) - NI_PT;
  const upper = Math.max(0, salary - NI_UEL);
  return lower * NI_LOW + upper * NI_HIGH;
}

export function calcStudentLoan(salary: number, plan: StudentLoanPlan): number {
  if (plan === 'none') return 0;
  const cfg = STUDENT_LOANS[plan];
  if (!cfg) return 0;
  const { threshold, rate } = cfg;
  return Math.max(0, salary - threshold) * rate;
}

/* ── Core engine (legacy-parity) ───── */

export function computePayeAnnual(input: PayeInput): PayeBreakdown {
  const gross = Math.max(0, input.gross);
  const pensionContribution = gross * (input.pensionPercent / 100);
  const taxableSalary = gross - pensionContribution;

  const basePA = effPersonalAllowance(taxableSalary);
  const blindExtra = input.blindAllowance ? 3_070 : 0;
  const personalAllowance = basePA + blindExtra;

  const taxableIncome = Math.max(0, taxableSalary - personalAllowance);

  const incomeTax = input.isScottish
    ? calcScottishIncomeTax(taxableSalary, personalAllowance)
    : calcEnglishIncomeTax(taxableIncome);

  const nationalInsurance = calcNI(taxableSalary);
  const studentLoan = calcStudentLoan(taxableSalary, input.studentLoanPlan);

  const takeHome = Math.max(
    0,
    gross - pensionContribution - incomeTax - nationalInsurance - studentLoan,
  );

  const totalDeductions =
    pensionContribution + incomeTax + nationalInsurance + studentLoan;

  const effectiveTaxRate = gross > 0 ? totalDeductions / gross : 0;

  return {
    gross,
    pensionContribution,
    taxableSalary,
    personalAllowance,
    taxableIncome,
    incomeTax,
    nationalInsurance,
    studentLoan,
    takeHome,
    effectiveTaxRate,
  };
}

function scaleBreakdown(b: PayeBreakdown, period: PayPeriod): PayeBreakdown {
  const div =
    period === 'monthly' ? 12 : period === 'weekly' ? 52 : period === 'daily' ? 260 : 1;

  const scale = (n: number) => n / div;

  return {
    gross: scale(b.gross),
    pensionContribution: scale(b.pensionContribution),
    taxableSalary: scale(b.taxableSalary),
    personalAllowance: scale(b.personalAllowance),
    taxableIncome: scale(b.taxableIncome),
    incomeTax: scale(b.incomeTax),
    nationalInsurance: scale(b.nationalInsurance),
    studentLoan: scale(b.studentLoan),
    takeHome: scale(b.takeHome),
    effectiveTaxRate: b.effectiveTaxRate, // rate is invariant
  };
}

export function computePaye(input: PayeInput): PayeResult {
  const annual = computePayeAnnual(input);
  return {
    annual,
    monthly: scaleBreakdown(annual, 'monthly'),
    weekly: scaleBreakdown(annual, 'weekly'),
    daily: scaleBreakdown(annual, 'daily'),
  };
}

/* ── HMRC-corrected engine hook point (for future upgrade) ───── */
/**
 * computePayeHmrcCorrected:
 *  - Keep same signature as computePaye
 *  - Swap in fully HMRC-spec-compliant thresholds/bands when ready
 *  - For now, it can simply delegate to computePaye to keep API stable
 */
export function computePayeHmrcCorrected(input: PayeInput): PayeResult {
  // TODO: replace constants with authoritative HMRC 2025–26 spec
  return computePaye(input);
}
