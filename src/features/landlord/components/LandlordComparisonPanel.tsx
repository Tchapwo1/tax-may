'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { computeLandlordDelta } from '../hooks/useLandlordComparisonEngine';
import { useLandlordComparisonStore } from '../store/useLandlordComparisonStore';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';
import { AnimatedNumber } from '@/shared/components/motion/AnimatedNumber';
import { RefreshCcw, X, TrendingUp, TrendingDown, Home } from 'lucide-react';

export function LandlordComparisonPanel() {
  const { scenarioA, scenarioB, clearScenarios } = useLandlordComparisonStore();

  if (!scenarioA.input || !scenarioB.input) return null;

  const { a, b, diff } = computeLandlordDelta(
    scenarioA.input,
    scenarioB.input,
  );

  const deltaClass = (n: number, inverse = false) => {
    const isPositive = n > 0;
    if (n === 0) return 'text-slate-300';
    if (inverse) return isPositive ? 'text-red-400' : 'text-green-400';
    return isPositive ? 'text-green-400' : 'text-red-400';
  };

  const DeltaIcon = ({ value, inverse = false }: { value: number, inverse?: boolean }) => {
    if (value === 0) return null;
    const isUp = value > 0;
    const color = inverse ? (isUp ? 'text-red-400' : 'text-green-400') : (isUp ? 'text-green-400' : 'text-red-400');
    return isUp ? <TrendingUp className={`w-4 h-4 ${color}`} /> : <TrendingDown className={`w-4 h-4 ${color}`} />;
  };

  return (
    <FadeSlide className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden mb-12">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4F00]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
            <Home className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-white">Investment Comparison</h2>
        </div>
        <button 
          onClick={clearScenarios}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Scenario A */}
        <FadeSlide delay={0.1} className="p-6 rounded-xl bg-[#1E1E2F] border border-slate-800 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{scenarioA.label}</p>
          <AnimatedNumber 
            value={a.netIncome} 
            className="text-3xl font-black text-white block" 
          />
          <p className="text-sm text-slate-400 mt-1">Net Cash in Pocket</p>
        </FadeSlide>

        {/* Delta */}
        <motion.div 
          className="flex flex-col items-center justify-center py-4 relative"
          animate={{ scale: diff.netIncome !== 0 ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatedNumber 
            value={diff.netIncome} 
            className={`text-4xl font-black tracking-tighter ${deltaClass(diff.netIncome)}`}
            format={(n) => `${n > 0 ? '+' : n < 0 ? '-' : ''}£${Math.round(Math.abs(n)).toLocaleString()}`}
          />
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-2">
            <DeltaIcon value={diff.netIncome} />
            Net Variance
          </p>
        </motion.div>

        {/* Scenario B */}
        <FadeSlide delay={0.2} className="p-6 rounded-xl bg-[#1E1E2F] border border-[#FF4F00]/30 shadow-lg shadow-orange-500/5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF4F00] mb-2">{scenarioB.label}</p>
          <AnimatedNumber 
            value={b.netIncome} 
            className="text-3xl font-black text-white block" 
          />
          <p className="text-sm text-slate-400 mt-1">Net Cash in Pocket</p>
        </FadeSlide>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/50 pt-8">
        <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-800">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Tax Liability</span>
          <AnimatedNumber 
            value={diff.totalTax} 
            className={`text-lg font-bold ${deltaClass(diff.totalTax, true)}`}
            format={(n) => `${n > 0 ? '+' : n < 0 ? '-' : ''}£${Math.round(Math.abs(n)).toLocaleString()}`}
          />
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-800">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">S24 Tax Credit</span>
          <AnimatedNumber 
            value={diff.section24Credit} 
            className={`text-lg font-bold ${deltaClass(diff.section24Credit)}`}
            format={(n) => `${n > 0 ? '+' : n < 0 ? '-' : ''}£${Math.round(Math.abs(n)).toLocaleString()}`}
          />
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-800">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Effective Rate</span>
          <AnimatedNumber 
            value={diff.effectiveRate} 
            className={`text-lg font-bold ${deltaClass(diff.effectiveRate, true)}`}
            format={(n) => `${n > 0 ? '+' : n < 0 ? '-' : ''}${(Math.abs(n) * 100).toFixed(1)}%`}
          />
        </div>
      </div>
    </FadeSlide>
  );
}
