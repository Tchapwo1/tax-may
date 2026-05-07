'use client';

import React from 'react';
import { AnimatedNumber } from './motion/AnimatedNumber';
import { FadeSlide } from './motion/FadeSlide';

export interface SummaryItem {
  label: string;
  value: number | string;
  isPrimary?: boolean;
  isPositive?: boolean;
  isRaw?: boolean; // if true, don't format as currency
}

export interface StickySummaryProps {
  items: SummaryItem[];
  className?: string;
}

export function StickySummary({ items, className = '' }: StickySummaryProps) {
  const primary = items.find(i => i.isPrimary) || items[0];
  const secondaries = items.filter(i => !i.isPrimary);

  return (
    <FadeSlide className={`bg-[#FF4F00] rounded-2xl p-8 text-white shadow-2xl shadow-orange-500/20 overflow-hidden relative group ${className}`}>
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all"></div>
      
      <div className="relative z-10">
        <p className="text-orange-100 font-medium mb-1 uppercase tracking-widest text-xs">{primary.label}</p>
        <h2 className="text-5xl font-black mb-8">
          {typeof primary.value === 'number' ? (
            <AnimatedNumber value={primary.value} />
          ) : (
            primary.value
          )}
        </h2>

        <div className="space-y-4">
          {secondaries.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 last:pb-0">
              <span className="text-orange-100 text-sm font-medium">{item.label}</span>
              <span className="font-bold">
                {typeof item.value === 'number' && !item.isRaw ? (
                  <AnimatedNumber value={item.value} />
                ) : (
                  item.value
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FadeSlide>
  );
}
