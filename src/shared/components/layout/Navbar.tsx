import React from 'react';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="border-b border-slate-800/60 bg-[#1E1E2F]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4F00] to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-all">
            T
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">
            TaxCalculator<span className="text-[#FF4F00]">365</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link href="/calculators/paye" className="hover:text-white transition-colors">PAYE</Link>
          <Link href="/calculators/landlord" className="hover:text-white transition-colors">Landlords</Link>
          <Link href="/calculators/self-assessment" className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-[#FF4F00] hover:text-white transition-all border border-slate-700">Flagship SA</Link>
        </div>
      </div>
    </nav>
  );
};
