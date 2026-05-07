import React from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#1E1E2F]">
      <FadeSlide className="max-w-xl flex flex-col items-center">
        <div className="w-24 h-24 rounded-3xl bg-slate-800/50 flex items-center justify-center text-slate-500 mb-10 border border-slate-800">
          <Search className="w-12 h-12" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Page not found.
        </h1>
        
        <p className="text-slate-400 text-xl mb-10 leading-relaxed">
          The link you followed may be broken or the calculator has moved. We've migrated to a <span className="text-[#FF4F00] font-semibold">new modelling instrument</span>.
        </p>

        <a
          href="/calculators/paye"
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#FF4F00] text-black font-bold hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to PAYE Calculator
        </a>
      </FadeSlide>
    </div>
  );
}
