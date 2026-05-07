import React from 'react';
import { Calculator, BookOpen, Home, FileText, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1E1E2F] text-slate-200 font-sans selection:bg-[#FF4F00] selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800/60 bg-[#1E1E2F]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4F00] to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
              T
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">TaxCalculator<span className="text-[#FF4F00]">365</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="/self-employed-guides.html" className="hover:text-white transition-colors">Guides</a>
            <a href="/paye-calculator.html" className="hover:text-white transition-colors">PAYE</a>
            <a href="/landlord-calculator.html" className="hover:text-white transition-colors">Landlords</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4F00]/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-medium text-slate-300 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF4F00] animate-pulse"></span>
            Updated for 2024/25 Tax Year
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            UK Tax Precision. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F00] to-orange-400">
              Simplified.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Professional-grade tax calculators and definitive guides for Sole Traders, Landlords, and PAYE employees. No jargon, just exact numbers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/paye-calculator.html" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FF4F00] text-white font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0">
              Calculate PAYE Tax
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/self-employed-guides.html" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600">
              Read the Guides
            </a>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 bg-slate-900/50 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Professional Instruments</h2>
            <p className="text-slate-400">Select the specific calculator for your income profile.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* PAYE Card */}
            <a href="/paye-calculator.html" className="group p-8 rounded-2xl bg-[#1E1E2F] border border-slate-800 hover:border-[#FF4F00]/50 transition-all hover:shadow-[0_0_30px_rgba(255,79,0,0.1)] relative overflow-hidden flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00] mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">PAYE Salary</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow">
                Calculate your precise take-home pay, Income Tax, and National Insurance as an employee. Includes student loan and pension options.
              </p>
              <div className="flex items-center text-[#FF4F00] font-medium text-sm mt-auto">
                Open Calculator <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Landlord Card */}
            <a href="/landlord-calculator.html" className="group p-8 rounded-2xl bg-[#1E1E2F] border border-slate-800 hover:border-[#FF4F00]/50 transition-all hover:shadow-[0_0_30px_rgba(255,79,0,0.1)] relative overflow-hidden flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00] mb-6 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Landlord Property</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow">
                Model your rental yield and tax liabilities. Fully accounts for the Section 24 mortgage interest relief restrictions.
              </p>
              <div className="flex items-center text-[#FF4F00] font-medium text-sm mt-auto">
                Open Calculator <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* Self Assessment Card */}
            <a href="/self-assessment-service.html" className="group p-8 rounded-2xl bg-[#1E1E2F] border border-slate-800 hover:border-[#FF4F00]/50 transition-all hover:shadow-[0_0_30px_rgba(255,79,0,0.1)] relative overflow-hidden flex flex-col h-full">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-[#FF4F00] mb-6 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Self Assessment</h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-grow">
                Need help filing? Explore our professional self-assessment filing service to ensure compliance and avoid HMRC penalties.
              </p>
              <div className="flex items-center text-[#FF4F00] font-medium text-sm mt-auto">
                View Service <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Guide Hub Section */}
      <section className="py-24 border-t border-slate-800/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-800/30 p-8 md:p-12 rounded-3xl border border-slate-700/50">
            <div className="flex-1">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 text-slate-300 mb-6 shadow-inner border border-slate-700">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">The Definitive Guide Hub</h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                Stop guessing. Learn exactly how the UK tax system works with our comprehensive, video-enhanced guides. Master the Personal Allowance, National Insurance, and the hidden 60% tax trap.
              </p>
              <a href="/self-employed-guides.html" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-600">
                Explore the Guides
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            {/* Visual Element */}
            <div className="flex-1 w-full max-w-md relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4F00]/20 to-transparent blur-2xl rounded-3xl"></div>
              <div className="bg-[#1E1E2F] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden relative">
                <div className="border-b border-slate-800 bg-slate-900/50 p-4 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <div className="ml-4 text-xs text-slate-500 font-mono">Personal Allowance Guide</div>
                </div>
                <div className="p-6">
                  <div className="w-full h-32 bg-slate-800/50 rounded-xl mb-4 flex items-center justify-center border border-slate-700/50">
                     <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                       <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                     </div>
                  </div>
                  <div className="w-3/4 h-4 bg-slate-800 rounded-full mb-3"></div>
                  <div className="w-full h-4 bg-slate-800 rounded-full mb-3"></div>
                  <div className="w-5/6 h-4 bg-slate-800 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-12 bg-slate-950 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#FF4F00] to-orange-600 flex items-center justify-center text-white font-bold text-xs">
              T
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">TaxCalculator<span className="text-[#FF4F00]">365</span></span>
          </div>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Professional tax modeling instruments for the UK. Data provided is for informational purposes only and does not constitute financial advice.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="/legal.html" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/legal.html" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookie-consent.html" className="text-slate-400 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
