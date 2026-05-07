'use client';

import React from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#1E1E2F]">
      <FadeSlide className="max-w-xl flex flex-col items-center">
        <div className="w-24 h-24 rounded-3xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00] mb-10 shadow-2xl shadow-orange-500/5 border border-orange-500/20">
          <AlertCircle className="w-12 h-12" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          We hit a snag.
        </h1>
        
        <p className="text-slate-400 text-xl mb-10 leading-relaxed">
          The calculation engine encountered an unexpected error, but <span className="text-white font-semibold">your modelling data is safe</span> in the URL.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#FF4F00] text-black font-bold hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20"
          >
            <RefreshCcw className="w-5 h-5" />
            Resume Modelling
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-all border border-slate-700"
          >
            <Home className="w-5 h-5" />
            Return Home
          </motion.a>
        </div>

        {error.digest && (
          <p className="mt-12 text-xs text-slate-600 font-mono uppercase tracking-widest">
            ID: {error.digest}
          </p>
        )}
      </FadeSlide>
    </div>
  );
}
