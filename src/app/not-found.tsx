import React from 'react';
import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#1E1E2F]">
      <div className="w-20 h-20 rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00] mb-8 shadow-lg shadow-orange-500/5">
        <span className="text-4xl font-black">404</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        Route Not Found
      </h1>
      <p className="text-slate-400 max-w-md mb-10 text-lg">
        The precision instrument or guide you're looking for has moved or doesn't exist. Let's get you back to the modeling hub.
      </p>
      <Link href="/" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF4F00] text-white font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25">
        <Home className="w-5 h-5" />
        Return to Hub
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
