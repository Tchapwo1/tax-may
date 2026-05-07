import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  ArrowRight, 
  Briefcase, 
  Home, 
  Calculator, 
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { FadeSlide } from '@/shared/components/motion/FadeSlide';

const categories = [
  {
    id: 'paye',
    title: 'PAYE & Employment',
    description: 'Master your take-home pay, student loans, and pension reliefs.',
    icon: <Briefcase className="w-6 h-6" />,
    link: '/guides/personal-allowance-guide',
    count: 4
  },
  {
    id: 'landlord',
    title: 'Property & Section 24',
    description: 'Deep-dives into mortgage interest restrictions and rental profit.',
    icon: <Home className="w-6 h-6" />,
    link: '/guides/section-24-guide',
    count: 2
  },
  {
    id: 'sa',
    title: 'Self-Assessment',
    description: 'The definitive checklists for filing and composite tax year modelling.',
    icon: <Calculator className="w-6 h-6" />,
    link: '/guides/self-assessment-checklist',
    count: 4
  }
];

export default function GuidesHubPage() {
  return (
    <div className="min-h-screen bg-[#1E1E2F] pb-32">
      <div className="max-w-6xl mx-auto px-6 pt-16">
        {/* Hero */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF4F00] text-sm font-bold mb-4">
            <BookOpen className="w-4 h-4" />
            Knowledge Hub
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 italic">
            Tax <span className="text-[#FF4F00]">Clarified.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Professional-grade guides and interactive modelling instruments to help you 
            navigate the UK tax landscape with total confidence.
          </p>
        </header>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {categories.map((cat, idx) => (
            <FadeSlide key={cat.id} delay={idx * 0.1} className="group">
              <Link href={cat.link} className="block h-full bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-[#FF4F00]/50 transition-all hover:bg-slate-900/80">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00] mb-6 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                  {cat.title}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {cat.description}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-800">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                    {cat.count} Interactive Guides
                  </span>
                </div>
              </Link>
            </FadeSlide>
          ))}
        </div>

        {/* Stats / Proof */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-green-500/50" />
            <div>
              <p className="text-white font-bold">HMRC Compliant</p>
              <p className="text-xs text-slate-500">2025/26 Regulations</p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 flex items-center gap-4">
            <Zap className="w-8 h-8 text-orange-500/50" />
            <div>
              <p className="text-white font-bold">Real-time Logic</p>
              <p className="text-xs text-slate-500">Instant Modelling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
