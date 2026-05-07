'use client';

import React from 'react';
import { useLandlordCalculator } from '@/features/landlord/hooks/useLandlordCalculator';
import { useLandlordQuerySync } from '@/features/landlord/hooks/useLandlordQuerySync';
import { useLandlordComparisonStore } from '@/features/landlord/store/useLandlordComparisonStore';
import { LandlordComparisonPanel } from '@/features/landlord/components/LandlordComparisonPanel';
import { InputField } from '@/shared/components/InputField';
import { StickySummary } from '@/shared/components/StickySummary';
import { AnimatedNumber } from '@/shared/components/motion/AnimatedNumber';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';
import { Home, PoundSterling, TrendingDown, Receipt, Save, Lock, Unlock, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandlordCalculatorPage() {
  // Sync URL params to store
  useLandlordQuerySync();
  
  const { state, result } = useLandlordCalculator();
  const comparison = useLandlordComparisonStore();

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-slate-200 pb-32">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Hero */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF4F00] text-sm font-bold mb-4">
            <Home className="w-4 h-4" />
            Property Modelling
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Landlord Tax <span className="text-[#FF4F00]">Instrument</span>
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Model your property portfolio tax liabilities with Section 24 precision. 
            Account for marginal tax stacking and interest relief restrictions in real-time.
          </p>
        </header>

        <LandlordComparisonPanel />

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Input Panel */}
          <div className="lg:col-span-7 space-y-8">
            <FadeSlide className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
                  <PoundSterling className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Rental Portfolio</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <InputField
                  label="Annual Rental Income"
                  value={state.rentalIncomeRaw}
                  onChange={state.setRentalIncomeRaw}
                  placeholder="e.g. 24000"
                  icon={<PoundSterling className="w-4 h-4" />}
                />
                <InputField
                  label="Allowable Expenses"
                  value={state.expensesRaw}
                  onChange={state.setExpensesRaw}
                  placeholder="e.g. 3000"
                  icon={<TrendingDown className="w-4 h-4" />}
                />
              </div>
            </FadeSlide>

            <FadeSlide delay={0.1} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
                  <Receipt className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Finance Costs (S24)</h2>
              </div>
              
              <InputField
                label="Annual Mortgage Interest"
                value={state.mortgageInterestRaw}
                onChange={state.setMortgageInterestRaw}
                placeholder="e.g. 8000"
                helperText="Interest is not an expense but generates a 20% tax credit."
                icon={<TrendingDown className="w-4 h-4" />}
              />
            </FadeSlide>

            <FadeSlide delay={0.2} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
                  <Calculator className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Marginal Stacking</h2>
              </div>
              
              <InputField
                label="Employment Income (PAYE)"
                value={state.employmentIncomeRaw}
                onChange={state.setEmploymentIncomeRaw}
                placeholder="e.g. 45000"
                helperText="Property profit is taxed on top of your employment income."
                icon={<PoundSterling className="w-4 h-4" />}
              />
            </FadeSlide>
          </div>

          {/* Results Side (Desktop) / Summary (Mobile) */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <StickySummary
                items={[
                  {
                    label: 'Net Cash Position',
                    value: result.netIncome,
                    isPrimary: true,
                  },
                  {
                    label: 'Property Tax Liability',
                    value: result.incomeTaxOnProperty,
                  },
                  {
                    label: 'S24 Tax Credit',
                    value: result.section24Credit,
                    isPositive: true,
                  },
                  {
                    label: 'Effective Tax Rate',
                    value: `${(result.effectiveTaxRate * 100).toFixed(1)}%`,
                    isRaw: true,
                  }
                ]}
              />

              {/* Scenario Controls */}
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col gap-3">
                <button
                  onClick={() => comparison.saveScenarioA({
                    rentalIncome: parseFloat(state.rentalIncomeRaw) || 0,
                    expenses: parseFloat(state.expensesRaw) || 0,
                    mortgageInterest: parseFloat(state.mortgageInterestRaw) || 0,
                    employmentIncome: parseFloat(state.employmentIncomeRaw) || 0,
                  })}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700"
                >
                  <Save className="w-4 h-4" />
                  Save as Scenario A
                </button>
                <button
                  onClick={() => comparison.saveScenarioB({
                    rentalIncome: parseFloat(state.rentalIncomeRaw) || 0,
                    expenses: parseFloat(state.expensesRaw) || 0,
                    mortgageInterest: parseFloat(state.mortgageInterestRaw) || 0,
                    employmentIncome: parseFloat(state.employmentIncomeRaw) || 0,
                  })}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#FF4F00] hover:bg-orange-600 text-white font-bold transition-all shadow-lg shadow-orange-500/20"
                >
                  <Save className="w-4 h-4" />
                  Save as Scenario B
                </button>
                
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={comparison.toggleLock}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-xs text-slate-400 border border-slate-800"
                  >
                    {comparison.isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                    {comparison.isLocked ? 'Comparison Locked' : 'Unlocked'}
                  </button>
                  <button
                    onClick={state.reset}
                    className="px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-xs text-slate-400 border border-slate-800"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
