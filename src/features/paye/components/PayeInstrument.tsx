'use client';

import React from 'react';
import { usePayeCalculator } from '../hooks/usePayeCalculator';
import { usePayeQuerySync } from '../hooks/usePayeQuerySync';
import { useComparisonStore } from '@/shared/store/useComparisonStore';
import { ComparisonPanel } from './ComparisonPanel';
import { InputField } from '@/shared/components/InputField';
import { StickySummary } from '@/shared/components/StickySummary';
import { AnimatedNumber } from '@/shared/components/motion/AnimatedNumber';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';
import { 
  PoundSterling, 
  TrendingUp, 
  PieChart, 
  Copy, 
  Info 
} from 'lucide-react';
import { motion } from 'framer-motion';

export function PayeInstrument() {
  usePayeQuerySync();
  const { state, result, buildInput } = usePayeCalculator();
  const { scenarioA, scenarioB, saveScenarioA, saveScenarioB } = useComparisonStore();

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-8">
        <ComparisonPanel />
        <FadeSlide className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00]">
              <PoundSterling className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Earnings Portfolio</h2>
          </div>
          <InputField
            label="Annual Gross Salary"
            value={state.salaryRaw}
            onChange={state.setSalaryRaw}
            placeholder="e.g. 50000"
            icon={<PoundSterling className="w-4 h-4" />}
          />
        </FadeSlide>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-8">
          <StickySummary
            items={[
              { label: 'Annual Take-Home', value: result?.annual.takeHome || 0, isPrimary: true },
              { label: 'Income Tax', value: result?.annual.incomeTax || 0 },
              { label: 'National Insurance', value: result?.annual.nationalInsurance || 0 },
              { label: 'Effective Rate', value: `${(result ? result.annual.effectiveTaxRate * 100 : 0).toFixed(1)}%`, isRaw: true }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
