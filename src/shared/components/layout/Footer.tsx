import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/60 py-12 bg-slate-950 text-center">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-[#FF4F00] to-orange-600 flex items-center justify-center text-white font-bold text-xs">
            T
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            TaxCalculator<span className="text-[#FF4F00]">365</span>
          </span>
        </div>
        <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
          Professional tax modeling instruments for the UK. Data provided is for informational purposes only and does not constitute financial advice.
        </p>
        <div className="flex justify-center gap-6 text-sm">
          <Link href="/legal.html" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/legal.html" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/cookie-consent.html" className="text-slate-400 hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};
