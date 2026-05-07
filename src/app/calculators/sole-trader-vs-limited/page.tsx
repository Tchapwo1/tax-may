'use client';

import React, { useState, useMemo } from 'react';
import { calculateSoleTraderVsLtd } from '@/features/comparison-matrix/soleTraderVsLtdEngine';
import { InputField } from '@/shared/components/InputField';
import { StickySummary } from '@/shared/components/StickySummary';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';
import { AnimatedNumber } from '@/shared/components/motion/AnimatedNumber';
import { 
  Scale, 
  Briefcase, 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function ComparisonMatrixPage() {
  const [revenue, setRevenue] = useState('60000');
  const [expenses, setExpenses] = useState('5000');
  const [otherIncome, setOtherIncome] = useState('0');

  const result = useMemo(() => {
    return calculateSoleTraderVsLtd({
      revenue: parseFloat(revenue) || 0,
      expenses: parseFloat(expenses) || 0,
      otherIncome: parseFloat(otherIncome) || 0,
    });
  }, [revenue, expenses, otherIncome]);

  const isLtdBetter = result.delta > 0;

  return (
    <div className="min-h-screen bg-[#1E1E2F] text-slate-200 pb-32">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF4F00] text-sm font-bold mb-4">
            <Scale className="w-4 h-4" />
            Decision Matrix
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 italic">
            Sole Trader vs <span className="text-[#FF4F00]">Limited Company</span>
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            The definitive comparison for UK founders. Model your business profits and extraction 
            strategy to find the most tax-efficient structure for your growth.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-8">
            <FadeSlide className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-white">Business Financials</h2>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <InputField
                  label="Annual Revenue"
                  value={revenue}
                  onChange={setRevenue}
                  placeholder="e.g. 80000"
                />
                <InputField
                  label="Business Expenses"
                  value={expenses}
                  onChange={setExpenses}
                  placeholder="e.g. 10000"
                />
              </div>
              <div className="mt-6">
                <InputField
                  label="Other Income (e.g. PAYE)"
                  value={otherIncome}
                  onChange={setOtherIncome}
                  placeholder="0"
                />
              </div>
            </FadeSlide>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Sole Trader Summary */}
              <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 relative overflow-hidden">
                <Briefcase className="absolute top-4 right-4 w-12 h-12 text-slate-800 opacity-20" />
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  Sole Trader
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">Tax Liability</span>
                    <span className="text-red-400 font-bold">£{result.soleTrader.totalTax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-slate-800">
                    <span className="text-white font-bold">Net Income</span>
                    <span className="text-white font-black text-xl">£{result.soleTrader.netIncome.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Ltd Summary */}
              <div className={`p-8 rounded-2xl bg-slate-900/30 border ${isLtdBetter ? 'border-[#FF4F00]/50 shadow-lg shadow-orange-500/5' : 'border-slate-800'} relative overflow-hidden`}>
                <Building2 className={`absolute top-4 right-4 w-12 h-12 ${isLtdBetter ? 'text-[#FF4F00]' : 'text-slate-800'} opacity-20`} />
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  Limited Company
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-sm">Corp + Personal Tax</span>
                    <span className="text-red-400 font-bold">£{(result.limitedCompany.corpTax + result.limitedCompany.personalTax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-slate-800">
                    <span className="text-white font-bold">Net Income</span>
                    <span className="text-white font-black text-xl">£{result.limitedCompany.netIncome.toLocaleString()}</span>
                  </div>
                </div>
                {isLtdBetter && (
                  <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded border border-green-500/20">
                    Most Efficient
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Result Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <StickySummary
                items={[
                  {
                    label: 'Net Variance',
                    value: result.delta,
                    isPrimary: true,
                  },
                  {
                    label: 'Sole Trader Net',
                    value: result.soleTrader.netIncome,
                  },
                  {
                    label: 'Ltd Company Net',
                    value: result.limitedCompany.netIncome,
                  },
                  {
                    label: 'Tax Efficiency',
                    value: isLtdBetter ? 'Limited Company' : 'Sole Trader',
                    isRaw: true,
                  }
                ]}
              />

              <div className="p-8 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/50 relative overflow-hidden">
                <div className="relative z-10 text-center">
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">Annual Savings with {isLtdBetter ? 'Limited' : 'Sole Trader'}</p>
                  <AnimatedNumber 
                    value={Math.abs(result.delta)} 
                    className="text-5xl font-black text-white block mb-4" 
                  />
                  <p className="text-slate-400 text-sm leading-relaxed">
                    By choosing the {isLtdBetter ? 'Limited Company' : 'Sole Trader'} structure, you retain more of your hard-earned profit every year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
