'use client';

import React from 'react';
import { usePayeCalculator } from '@/features/paye/hooks/usePayeCalculator';
import { usePayeQuerySync } from '@/features/paye/hooks/usePayeQuerySync';
import { useComparisonQuerySync } from '@/features/paye/hooks/useComparisonQuerySync';
import { useComparisonStore } from '@/shared/store/useComparisonStore';
import { ComparisonPanel } from '@/features/paye/components/ComparisonPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';
import { AnimatedNumber } from '@/shared/components/motion/AnimatedNumber';
import { 
  Calculator, 
  Info, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  ChevronDown,
  PieChart,
  Wallet,
  Copy
} from 'lucide-react';

import { Suspense } from 'react';

function QuerySync() {
  usePayeQuerySync();
  useComparisonQuerySync();
  return null;
}

function PayeCalculatorContent() {
  const {
    state,
    result,
    setSalaryRaw,
    setPeriod,
    setIsScottish,
    setPensionPercent,
    setStudentLoanPlan,
    setBlindAllowance,
    setMode,
  } = usePayeCalculator();

  const { saveScenarioA, saveScenarioB, scenarioA, scenarioB } = useComparisonStore();

  const buildInput = () => ({
    gross: result?.annual.gross || 0,
    isScottish: state.isScottish,
    pensionPercent: parseFloat(state.pensionPercent) || 0,
    studentLoanPlan: state.studentLoanPlan,
    blindAllowance: state.blindAllowance,
  });

  const formatCurrency = (val: number) => 
    `£${Math.round(val).toLocaleString('en-GB')}`;

  return (
    <FadeSlide className="min-h-screen bg-[#1E1E2F] text-slate-200 font-sans selection:bg-[#FF4F00] selection:text-white pb-20">
      <Suspense fallback={null}>
        <QuerySync />
      </Suspense>
      <div className="max-w-6xl mx-auto px-6 pt-12">
        
        {/* Breadcrumb / Header */}
        <FadeSlide delay={0.1} className="mb-12">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <a href="/" className="hover:text-slate-300 transition-colors">Home</a>
            <ArrowRight className="w-3 h-3" />
            <span className="text-slate-300">Calculators</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-[#FF4F00] font-medium">PAYE Salary</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            PAYE Salary <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] to-orange-400">Calculator</span>
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Determine your precise take-home pay, income tax liabilities, and National Insurance contributions for the 2024/25 and 2025/26 tax years.
          </p>
        </FadeSlide>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Inputs */}
          <FadeSlide delay={0.2} className="lg:col-span-7 space-y-8">
            
            {/* Main Salary Input Card */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
                  <Wallet className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Gross Income</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Annual Salary / Rate</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">£</span>
                    <input
                      type="number"
                      value={state.salaryRaw}
                      onChange={(e) => setSalaryRaw(e.target.value)}
                      className="w-full bg-[#1E1E2F] border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-[#FF4F00] transition-colors"
                      placeholder="35,000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Pay Period</label>
                  <div className="relative">
                    <select
                      value={state.period}
                      onChange={(e) => setPeriod(e.target.value as any)}
                      className="w-full bg-[#1E1E2F] border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#FF4F00] transition-colors cursor-pointer"
                    >
                      <option value="annual">Annual</option>
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Settings Card */}
            <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Tax Configuration</h2>
              </div>

              <div className="space-y-6">
                {/* Scottish Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#1E1E2F] border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-400">
                      <Info className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Scottish Taxpayer</p>
                      <p className="text-xs text-slate-500">Apply Scottish income tax bands and rates</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsScottish(!state.isScottish)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${state.isScottish ? 'bg-[#FF4F00]' : 'bg-slate-700'}`}
                  >
                    <motion.div 
                      layout
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white ${state.isScottish ? 'right-1' : 'left-1'}`} 
                    />
                  </button>
                </div>

                {/* Pension Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Pension Contribution (%)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="0.5"
                      value={state.pensionPercent}
                      onChange={(e) => setPensionPercent(e.target.value)}
                      className="flex-grow accent-[#FF4F00] cursor-pointer"
                    />
                    <div className="w-20 bg-[#1E1E2F] border border-slate-700 rounded-lg px-3 py-2 text-center font-mono text-[#FF4F00]">
                      {state.pensionPercent}%
                    </div>
                  </div>
                </div>

                {/* Student Loan */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Student Loan Plan</label>
                  <div className="relative">
                    <select
                      value={state.studentLoanPlan}
                      onChange={(e) => setStudentLoanPlan(e.target.value as any)}
                      className="w-full bg-[#1E1E2F] border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#FF4F00] transition-colors cursor-pointer"
                    >
                      <option value="none">No Student Loan</option>
                      <option value="1">Plan 1</option>
                      <option value="2">Plan 2 (Most common)</option>
                      <option value="4">Plan 4 (Scottish)</option>
                      <option value="5">Plan 5</option>
                      <option value="pg">Postgraduate Loan</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </FadeSlide>

          {/* Right Column: Summary Panel */}
          <div className="lg:col-span-5 sticky top-28">
            <FadeSlide delay={0.3} className="bg-[#FF4F00] rounded-2xl p-8 text-white shadow-2xl shadow-orange-500/20 overflow-hidden relative group">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>
              
              <div className="relative z-10">
                <p className="text-orange-100 font-medium mb-1">Estimated Annual Take-Home</p>
                <h2 className="text-5xl font-black mb-8">
                  <AnimatedNumber value={result?.annual.takeHome || 0} />
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-orange-100 flex items-center gap-2">
                      <PieChart className="w-4 h-4" />
                      Income Tax
                    </span>
                    <AnimatedNumber value={result?.annual.incomeTax || 0} className="font-bold" />
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-orange-100 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      National Insurance
                    </span>
                    <AnimatedNumber value={result?.annual.nationalInsurance || 0} className="font-bold" />
                  </div>
                  {result && result.annual.studentLoan > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-orange-100">Student Loan</span>
                      <AnimatedNumber value={result.annual.studentLoan} className="font-bold" />
                    </div>
                  )}
                  <div className="flex justify-between items-center py-3 text-lg pt-2">
                    <span className="text-orange-500 font-black bg-white px-2 py-0.5 rounded text-xs uppercase tracking-widest">Effective Rate</span>
                    <span className="font-black text-2xl">
                      <AnimatedNumber 
                        value={result ? result.annual.effectiveTaxRate * 100 : 0} 
                        format={(n) => `${n.toFixed(1)}%`}
                      />
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-orange-100 text-xs uppercase font-bold tracking-wider mb-1">Monthly</p>
                    <AnimatedNumber value={result?.monthly.takeHome || 0} className="text-xl font-bold" />
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <p className="text-orange-100 text-xs uppercase font-bold tracking-wider mb-1">Weekly</p>
                    <AnimatedNumber value={result?.weekly.takeHome || 0} className="text-xl font-bold" />
                  </div>
                </div>

                {/* Scenario Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => saveScenarioA(buildInput())}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                      scenarioA.input 
                        ? 'bg-white/10 text-white hover:bg-white/20' 
                        : 'bg-white text-[#FF4F00] hover:bg-orange-50'
                    }`}
                  >
                    <Copy className="w-4 h-4" />
                    {scenarioA.input ? 'Update A' : 'Set as A'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => saveScenarioB(buildInput())}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                      scenarioB.input 
                        ? 'bg-white/10 text-white hover:bg-white/20' 
                        : 'bg-white text-[#FF4F00] hover:bg-orange-50'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    {scenarioB.input ? 'Update B' : 'Set as B'}
                  </motion.button>
                </div>
              </div>
            </FadeSlide>

            {/* Disclaimer */}
            <div className="mt-6 flex gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-800/50">
              <Info className="w-5 h-5 text-slate-500 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Calculations are based on 2025/26 tax year parameters. These figures are estimates and do not constitute financial advice. HMRC may apply different rounding rules.
              </p>
            </div>
          </div>

        </div>

        {/* Comparison Section */}
        <AnimatePresence>
          {(scenarioA.input || scenarioB.input) && (
            <div className="mt-16 sticky bottom-4 z-50">
              <ComparisonPanel />
            </div>
          )}
        </AnimatePresence>
      </div>
    </FadeSlide>
  );
}

export default function PayeCalculatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#1E1E2F] flex items-center justify-center">
        <div className="text-orange-500 animate-pulse font-bold tracking-widest uppercase">Initializing Engine...</div>
      </div>
    }>
      <PayeCalculatorContent />
    </Suspense>
  );
}
