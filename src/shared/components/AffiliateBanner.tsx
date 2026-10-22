'use client';

import React from 'react';
import { 
  Building2, 
  CreditCard, 
  Home, 
  PiggyBank, 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

export type AffiliateType = 'tide' | 'xero' | 'habito' | 'pensionbee';

interface AffiliateConfig {
  tag: string;
  badge: string;
  title: string;
  description: string;
  bulletPoints: string[];
  ctaText: string;
  ctaUrl: string;
  icon: React.ReactNode;
  brandColor: string;
  highlightText?: string;
}

const AFFILIATE_DATA: Record<AffiliateType, AffiliateConfig> = {
  tide: {
    tag: 'Recommended Business Bank',
    badge: '£50 Bonus Offer',
    title: 'Tide Business Bank Account',
    description: 'Set up a dedicated UK business account in under 5 minutes. No monthly fees, automatic categorization of allowable expenses, and easy integration with accounting software.',
    bulletPoints: [
      'Free business current account with no monthly fee',
      '£50 cashback bonus upon funding account',
      'Instant invoice creation & automated expense tracking',
      'Seamless sync with Xero, FreeAgent & Sage'
    ],
    ctaText: 'Claim £50 Bonus with Tide',
    ctaUrl: process.env.NEXT_PUBLIC_AFFILIATE_TIDE_URL || 'https://www.tide.co/',
    icon: <CreditCard className="w-5 h-5" />,
    brandColor: '#002C6C',
    highlightText: 'Fast 5-min digital approval'
  },
  xero: {
    tag: 'HMRC-Recognised Software',
    badge: 'Save Hours on Tax',
    title: 'Xero & FreeAgent Accounting',
    description: 'Eliminate manual spreadsheet stress. Automatically calculate Self-Assessment liabilities, track allowable deductible expenses, and submit returns directly to HMRC.',
    bulletPoints: [
      'Making Tax Digital (MTD) compliant for HMRC',
      'Automatic bank feeds & receipt capture via mobile app',
      'Real-time tax liability forecasting',
      '30-day free trial with no upfront payment'
    ],
    ctaText: 'Start 30-Day Free Trial',
    ctaUrl: process.env.NEXT_PUBLIC_AFFILIATE_XERO_URL || 'https://www.xero.com/uk/',
    icon: <Building2 className="w-5 h-5" />,
    brandColor: '#13B5EA',
    highlightText: '30-day free trial'
  },
  habito: {
    tag: 'Specialist Landlord Mortgages',
    badge: 'Section 24 Relief',
    title: 'Habito Buy-to-Let Mortgage Broker',
    description: 'Are Section 24 mortgage restrictions wiping out your rental yield? Compare thousands of Buy-to-Let and SPV Limited Company mortgage rates across 90+ lenders.',
    bulletPoints: [
      'Compare rates from 90+ UK lenders in minutes',
      'Specialist advice on SPV Limited Company mortgages',
      'No hidden broker fees on standard BTL products',
      'Over 9,000+ 5-star Trustpilot reviews'
    ],
    ctaText: 'Compare Landlord Mortgages',
    ctaUrl: process.env.NEXT_PUBLIC_AFFILIATE_HABITO_URL || 'https://www.habito.com/',
    icon: <Home className="w-5 h-5" />,
    brandColor: '#10B981',
    highlightText: 'Free impartial advice'
  },
  pensionbee: {
    tag: 'Tax Efficiency Hack',
    badge: 'Up to 60% Tax Relief',
    title: 'PensionBee & SIPP Tax Relief',
    description: 'Caught in the £100k–£125k 60% tax trap? Salary sacrifice or personal pension contributions can recover your Personal Allowance and secure up to 40%–60% statutory relief.',
    bulletPoints: [
      'Automatic 20% basic rate top-up from HMRC',
      'Reclaim extra 20%–25% via Self-Assessment',
      'Restore lost Personal Allowance above £100,000',
      'Combine all old workplace pensions into one plan'
    ],
    ctaText: 'Explore Pension Tax Savings',
    ctaUrl: process.env.NEXT_PUBLIC_AFFILIATE_PENSION_URL || 'https://www.pensionbee.com/',
    icon: <PiggyBank className="w-5 h-5" />,
    brandColor: '#F59E0B',
    highlightText: 'Beat the 60% tax trap'
  }
};

export interface AffiliateBannerProps {
  type: AffiliateType;
  layout?: 'card' | 'inline' | 'compact';
  className?: string;
}

export function AffiliateBanner({ type, layout = 'card', className = '' }: AffiliateBannerProps) {
  const config = AFFILIATE_DATA[type];
  if (!config) return null;

  if (layout === 'compact') {
    return (
      <div className={`p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {config.tag}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded">
            Partner
          </span>
        </div>
        <h4 className="text-sm font-bold text-white mb-1">{config.title}</h4>
        <p className="text-xs text-slate-400 mb-3">{config.description}</p>
        <a 
          href={config.ctaUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4F00] hover:text-orange-400 transition-colors"
        >
          {config.ctaText} <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 p-6 md:p-8 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all ${className}`}>
      {/* Decorative background glow */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-10 rounded-full blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity"
        style={{ backgroundColor: config.brandColor }}
      />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
          {config.icon}
          {config.tag}
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FF4F00]/10 text-[#FF4F00] border border-[#FF4F00]/20">
            {config.badge}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Sponsored
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 mb-6">
        <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">
          {config.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* Feature Bullet Points */}
      <ul className="space-y-2.5 mb-6 relative z-10 text-xs md:text-sm text-slate-300">
        {config.bulletPoints.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3" />
            </div>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80 relative z-10">
        {config.highlightText && (
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4F00]" />
            <span>{config.highlightText}</span>
          </div>
        )}
        <a
          href={config.ctaUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF4F00] hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-95"
        >
          {config.ctaText}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* ASA Compliance Footer */}
      <p className="text-[10px] text-slate-600 mt-4 text-center sm:text-left relative z-10">
        We may earn a commission when you register via our partner links at no additional cost to you.
      </p>
    </div>
  );
}
