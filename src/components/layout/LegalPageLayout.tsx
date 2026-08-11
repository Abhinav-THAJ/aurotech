import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, description, lastUpdated = 'August 11, 2026', children }: LegalPageLayoutProps) {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="bg-zinc-950 pt-32 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-zinc-950 to-zinc-950 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.05]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl mb-8 ring-1 ring-white/10 backdrop-blur-sm shadow-xl shadow-orange-900/20">
            <ShieldCheck className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
            {title}
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Document Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-20 max-w-4xl">
        <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-16 mb-8 transform transition-all hover:shadow-orange-500/5 duration-500">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-8 mb-10 gap-4">
            <div>
              <p className="text-sm font-bold text-orange-600 tracking-widest uppercase mb-1">Last Updated</p>
              <p className="text-slate-800 font-semibold">{lastUpdated}</p>
            </div>
            <div className="px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-100 text-sm font-bold text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Official Document
            </div>
          </div>
          
          <div className="prose prose-slate prose-orange max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-100
            prose-p:text-slate-600 prose-p:leading-loose prose-p:mb-6 prose-p:text-lg
            prose-a:text-orange-600 hover:prose-a:text-orange-700
            prose-li:text-slate-600 prose-li:text-lg prose-ul:mb-6 prose-ul:list-disc prose-ul:pl-6
            prose-strong:text-slate-900 prose-strong:font-bold">
            {children}
          </div>
        </div>
        
        <div className="text-center text-slate-500 text-sm md:text-base font-medium">
          If you have any questions regarding this document, please contact our support team at <a href="mailto:aurogpsindia@gmail.com" className="text-orange-600 hover:underline">aurogpsindia@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
