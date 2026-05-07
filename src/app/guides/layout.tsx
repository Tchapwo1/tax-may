import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#1E1E2F] pb-32">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-[#FF4F00] font-bold text-sm transition-colors mb-12 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Knowledge Hub
        </Link>
        
        <article className="prose prose-invert max-w-none">
          {children}
        </article>
      </div>
    </div>
  );
}
