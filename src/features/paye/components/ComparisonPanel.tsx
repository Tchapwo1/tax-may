'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { computeComparisonDelta } from '@/features/paye/hooks/useComparisonEngine';
import { useComparisonStore } from '@/shared/store/useComparisonStore';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';
import { AnimatedNumber } from '@/shared/components/motion/AnimatedNumber';
import { RefreshCcw, X, TrendingUp, TrendingDown } from 'lucide-react';

export function ComparisonPanel() {
  const { scenarioA, scenarioB, clearScenarios } = useComparisonStore();

  if (!scenarioA.input || !scenarioB.input) return null;

  const { a, b, diff } = computeComparisonDelta(
    scenarioA.input,
    scenarioB.input,
  );

  const deltaClass = (n: number) =>
    n > 0 ? 'text-green-400' : n < 0 ? 'text-red-400' : 'text-slate-300';

  const DeltaIcon = ({ value }: { value: number }) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return null;
  };

  return (
    <FadeSlide className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4F00]/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
            <RefreshCcw className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-white">Scenario Analysis</h2>
        </div>
        <button 
          onClick={clearScenarios}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
          title="Clear Scenarios"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Scenario A Card */}
        <FadeSlide delay={0.1} className="p-6 rounded-xl bg-[#1E1E2F] border border-slate-800 shadow-lg">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{scenarioA.label}</p>
          <AnimatedNumber 
            value={a.annual.takeHome} 
            className="text-3xl font-black text-white block" 
          />
          <p className="text-sm text-slate-400 mt-1">Net Annual</p>
        </FadeSlide>

        {/* Delta Visualizer */}
        <motion.div 
          className="flex flex-col items-center justify-center py-4 relative"
          animate={{
            scale: diff.takeHome !== 0 ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
             <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
          </div>
          <AnimatedNumber 
            value={diff.takeHome} 
            className={`relative z-10 text-4xl font-black tracking-tighter ${deltaClass(diff.takeHome)}`}
            format={(n) => `${n > 0 ? '+' : n < 0 ? '-' : ''}£${Math.round(Math.abs(n)).toLocaleString()}`}
          />
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-2 flex items-center gap-2">
            <DeltaIcon value={diff.takeHome} />
            Divergence
          </p>
        </motion.div>

        {/* Scenario B Card */}
        <FadeSlide delay={0.2} className="p-6 rounded-xl bg-[#1E1E2F] border border-[#FF4F00]/30 shadow-lg shadow-orange-500/5">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FF4F00] mb-2">{scenarioB.label}</p>
          <AnimatedNumber 
            value={b.annual.takeHome} 
            className="text-3xl font-black text-white block" 
          />
          <p className="text-sm text-slate-400 mt-1">Net Annual</p>
        </FadeSlide>
      </div>

      {/* Detailed Breakdown Diffs */}
      <FadeSlide delay={0.3} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/50 pt-8">
        <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-800">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Income Tax</span>
          <AnimatedNumber 
            value={diff.incomeTax} 
            className={`text-lg font-bold ${deltaClass(-diff.incomeTax)}`}
            format={(n) => `${n > 0 ? '-' : n < 0 ? '+' : ''}£${Math.round(Math.abs(n)).toLocaleString()}`}
          />
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-800">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">National Insurance</span>
          <AnimatedNumber 
            value={diff.nationalInsurance} 
            className={`text-lg font-bold ${deltaClass(-diff.nationalInsurance)}`}
            format={(n) => `${n > 0 ? '-' : n < 0 ? '+' : ''}£${Math.round(Math.abs(n)).toLocaleString()}`}
          />
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl bg-slate-800/30 border border-slate-800">
          <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Effective Rate</span>
          <AnimatedNumber 
            value={diff.effectiveTaxRate} 
            className={`text-lg font-bold ${deltaClass(-diff.effectiveTaxRate)}`}
            format={(n) => `${n > 0 ? '-' : n < 0 ? '+' : ''}${(Math.abs(n) * 100).toFixed(1)}%`}
          />
        </div>
      </FadeSlide>
    </FadeSlide>
  );
}
