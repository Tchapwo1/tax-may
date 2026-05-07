'use client';

import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#1E1E2F]">
      <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-8 shadow-lg shadow-red-500/5">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        System Malfunction
      </h1>
      <p className="text-slate-400 max-w-md mb-10 text-lg">
        An unexpected error occurred in the calculation engine. Our team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-all border border-slate-700"
      >
        <RefreshCcw className="w-5 h-5" />
        Attempt Recovery
      </button>
    </div>
  );
}
