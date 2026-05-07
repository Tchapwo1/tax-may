'use client';

import React, { useState, Suspense } from 'react';
import { useSelfAssessmentCalculator } from '@/features/self-assessment/hooks/useSelfAssessmentCalculator';
import { useSelfAssessmentQuerySync } from '@/features/self-assessment/hooks/useSelfAssessmentQuerySync';
import { InputField } from '@/shared/components/InputField';
import { StickySummary } from '@/shared/components/StickySummary';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';
import { 
  Calculator, 
  PoundSterling, 
  Briefcase, 
  Home, 
  TrendingUp, 
  PiggyBank, 
  Heart, 
  GraduationCap, 
  ArrowRight,
  Info,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

function SelfAssessmentInstrument() {
  useSelfAssessmentQuerySync();
  const { state, result } = useSelfAssessmentCalculator();
  const [activeTab, setActiveTab] = useState<'income' | 'deductions'>('income');

  const incomeStreams = [
    { id: 'employment', label: 'Employment', value: state.employmentIncomeRaw, setter: state.setEmploymentIncomeRaw, icon: <Briefcase className="w-5 h-5" /> },
    { id: 'se', label: 'Self-Employed', value: state.selfEmployedProfitRaw, setter: state.setSelfEmployedProfitRaw, icon: <Calculator className="w-5 h-5" /> },
    { id: 'property', label: 'Property', value: state.propertyProfitRaw, setter: state.setPropertyProfitRaw, icon: <Home className="w-5 h-5" /> },
    { id: 'dividends', label: 'Dividends', value: state.dividendIncomeRaw, setter: state.setDividendIncomeRaw, icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'savings', label: 'Savings Interest', value: state.savingsInterestRaw, setter: state.setSavingsInterestRaw, icon: <PiggyBank className="w-5 h-5" /> },
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      {/* Main Input Area */}
      <div className="lg:col-span-7 space-y-8">
        {/* Tab Navigation */}
        <div className="flex gap-4 p-1 bg-slate-900/50 rounded-xl border border-slate-800 w-fit">
          <button 
            onClick={() => setActiveTab('income')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'income' ? 'bg-[#FF4F00] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Income Sources
          </button>
          <button 
            onClick={() => setActiveTab('deductions')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'deductions' ? 'bg-[#FF4F00] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Deductions & Relief
          </button>
        </div>

        {activeTab === 'income' ? (
          <div className="space-y-6">
            {incomeStreams.map((stream, idx) => (
              <FadeSlide key={stream.id} delay={idx * 0.05} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00] group-hover:scale-110 transition-transform">
                      {stream.icon}
                    </div>
                    <h3 className="font-bold text-white">{stream.label}</h3>
                  </div>
                </div>
                <InputField
                  label={`Annual ${stream.label} Income`}
                  value={stream.value}
                  onChange={stream.setter}
                  placeholder="0"
                  icon={<PoundSterling className="w-4 h-4" />}
                />
              </FadeSlide>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <FadeSlide className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Pension & Charity</h2>
              </div>
              
              <div className="space-y-6">
                <InputField
                  label="Gross Pension Contributions"
                  value={state.pensionContributionsRaw}
                  onChange={state.setPensionContributionsRaw}
                  placeholder="0"
                  helperText="Reduces your Adjusted Net Income for PA Tapering."
                  icon={<ArrowRight className="w-4 h-4" />}
                />
                <InputField
                  label="Gift Aid Donations"
                  value={state.giftAidRaw}
                  onChange={state.setGiftAidRaw}
                  placeholder="0"
                  helperText="Extends your basic rate band."
                  icon={<Heart className="w-4 h-4" />}
                />
              </div>
            </FadeSlide>
          </div>
        )}
      </div>

      {/* Side Summary */}
      <div className="lg:col-span-5">
        <div className="sticky top-8 space-y-6">
          <StickySummary
            items={[
              { label: 'Net Take-Home', value: result.netTakeHome, isPrimary: true },
              { label: 'Total Tax Liability', value: result.totalTaxLiability },
              { label: 'Adjusted Net Income', value: result.adjustedNetIncome },
              { label: 'Effective Tax Rate', value: `${(result.effectiveTaxRate * 100).toFixed(1)}%`, isRaw: true }
            ]}
          />

          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Tax Threshold Analysis</h4>
            <div className="space-y-2">
              <StatusItem active={result.flags.paTapered} label="Personal Allowance Taper" />
              <StatusItem active={result.flags.higherRate} label="Higher Rate Taxpayer" />
              <StatusItem active={result.flags.additionalRate} label="Additional Rate Taxpayer" />
              <StatusItem active={result.flags.hicbcApplied} label="Child Benefit Charge" />
            </div>
            <div className="mt-6 p-4 bg-orange-500/5 rounded-xl border border-orange-500/10">
              <div className="flex gap-3">
                <Info className="w-4 h-4 text-[#FF4F00] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Your Personal Allowance is <span className="text-white font-bold">£{result.personalAllowance.toLocaleString()}</span> based on your Adjusted Net Income.
                </p>
              </div>
            </div>
          </div>
          <button onClick={state.reset} className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold transition-all text-sm border border-slate-700">
            Reset Modelling Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SelfAssessmentPage() {
  return (
    <div className="min-h-screen bg-[#1E1E2F] text-slate-200 pb-32">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF4F00] text-sm font-bold mb-4">
            <Calculator className="w-4 h-4" />
            Full Tax Year Modelling
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 italic">
            Self-Assessment <span className="text-[#FF4F00]">Flagship</span>
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            The definitive UK tax instrument. Model your entire income portfolio, apply pension relief, 
            and see your exact tax liability with total precision.
          </p>
        </header>

        <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-slate-500">Initializing Modelling Instrument...</div>}>
          <SelfAssessmentInstrument />
        </Suspense>
      </div>
    </div>
  );
}

function StatusItem({ active, label }: { active: boolean; label: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${active ? 'text-[#FF4F00]' : 'text-slate-600'}`}>
      <CheckCircle2 className={`w-4 h-4 ${active ? 'opacity-100' : 'opacity-20'}`} />
      <span className={active ? 'font-bold' : ''}>{label}</span>
    </div>
  );
}
