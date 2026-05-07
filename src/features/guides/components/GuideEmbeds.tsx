'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Decouple heavy instruments from static build worker
const PayeInstrument = dynamic(() => import('@/features/paye/components/PayeInstrument').then(m => m.PayeInstrument), {
  ssr: false,
  loading: () => <EmbedLoading />
});

function EmbedLoading() {
  return (
    <div className="h-[400px] flex items-center justify-center bg-slate-900/20 rounded-2xl border border-slate-800 animate-pulse">
      <p className="text-slate-500 font-bold italic tracking-widest uppercase text-xs">Initializing Modelling Instrument...</p>
    </div>
  );
}

export function PayeEmbed() {
  return (
    <div className="my-12">
      <Suspense fallback={<EmbedLoading />}>
        <div className="p-1 bg-slate-800/20 rounded-[2rem] border border-slate-800 shadow-inner">
          <div className="scale-[0.9] origin-top">
            <PayeInstrument />
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export function LandlordEmbed() {
  return (
    <div className="my-12 p-8 bg-slate-900/50 rounded-2xl border border-slate-800 text-center">
      <p className="text-slate-500 italic">Landlord modelling instrument coming soon.</p>
    </div>
  );
}
