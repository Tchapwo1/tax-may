import React from 'react';
import Link from 'next/link';
import { canonicalRoutes } from '@/shared/utils/internal-links';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/60 py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4F00] to-orange-600 flex items-center justify-center text-white font-black text-sm">
                T
              </div>
              <span className="text-xl font-bold tracking-tight text-white italic">
                TaxCalculator<span className="text-[#FF4F00]">365</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The UK's definitive tax modelling platform. 
              Precision-engineered for clarity.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Modelling Instruments</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href={canonicalRoutes.calculators.paye} className="text-slate-500 hover:text-[#FF4F00] transition-colors">PAYE Calculator</Link></li>
              <li><Link href={canonicalRoutes.calculators.landlord} className="text-slate-500 hover:text-[#FF4F00] transition-colors">Landlord Calculator</Link></li>
              <li><Link href={canonicalRoutes.calculators.selfAssessment} className="text-slate-500 hover:text-[#FF4F00] transition-colors">Self-Assessment Flagship</Link></li>
              <li><Link href={canonicalRoutes.calculators.soleTraderVsLtd} className="text-slate-500 hover:text-[#FF4F00] transition-colors">Sole Trader vs Limited</Link></li>
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Knowledge Hub</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href={canonicalRoutes.guides.hub} className="text-slate-500 hover:text-[#FF4F00] transition-colors">Guide Index</Link></li>
              <li><Link href={canonicalRoutes.guides.section24} className="text-slate-500 hover:text-[#FF4F00] transition-colors">Section 24 Guide</Link></li>
              <li><Link href={canonicalRoutes.guides.payeMasterclass} className="text-slate-500 hover:text-[#FF4F00] transition-colors">PAYE Masterclass</Link></li>
              <li><Link href={canonicalRoutes.guides.saChecklist} className="text-slate-500 hover:text-[#FF4F00] transition-colors">SA Filing Checklist</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="text-slate-500 hover:text-white transition-colors">About TaxCalculator365</Link></li>
              <li><Link href="/" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs">
            © 2025 TaxCalculator365. All calculations are for illustrative purposes only.
          </p>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Production Sealed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
