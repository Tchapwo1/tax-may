'use client';

import React from 'react';
import { PayeInstrument } from '@/features/paye/components/PayeInstrument';
import { Briefcase } from 'lucide-react';

export default function PayeCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#1E1E2F] text-slate-200 pb-32">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Hero */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF4F00] text-sm font-bold mb-4">
            <Briefcase className="w-4 h-4" />
            PAYE Modelling
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 italic">
            Salary <span className="text-[#FF4F00]">Instrument</span>
          </h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Model your UK take-home pay with precision. Account for student loans, 
            pension contributions, and marginal tax bands in real-time.
          </p>
        </header>

        <PayeInstrument />
      </div>
    </div>
  );
}
