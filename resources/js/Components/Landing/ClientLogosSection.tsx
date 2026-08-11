import React from 'react';
import SectionReveal from './SectionReveal';

export default function ClientLogosSection() {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 border-y border-white/5 bg-dark-950/60 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <SectionReveal>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.25em] font-semibold mb-8">
            DIPERCAYA OLEH BUSINESS OWNER
          </p>

          {/* Client Logos Row */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-70 hover:opacity-100 transition-opacity">
            {/* Full Bright Indonesia Logo */}
            <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group cursor-default">
              <div className="text-left font-display leading-tight">
                <span className="block text-xs font-black tracking-widest uppercase">FULL BRIGHT</span>
                <span className="block text-[10px] tracking-wider text-slate-400 font-mono">INDONESIA</span>
              </div>
            </div>

            {/* GACF Logo */}
            <div className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group cursor-default">
              <svg className="w-7 h-7 text-slate-400 group-hover:text-brand-400 transition-colors" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm0 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M18 10l-6 6 6 6v-4h4v-4h-4z" />
              </svg>
              <div className="text-left font-mono leading-none">
                <span className="block text-sm font-black tracking-wider text-slate-200">GACF</span>
                <span className="block text-[8px] text-slate-500">GROWTH AGENCY</span>
              </div>
            </div>

            {/* Shaundju Academy Logo */}
            <div className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group cursor-default">
              <svg className="w-8 h-8 text-slate-400 group-hover:text-brand-400 transition-colors" viewBox="0 0 32 32" fill="currentColor">
                <path d="M4 8l12-4 12 4-12 14L4 8z" />
                <path d="M12 22l4 6 4-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div className="text-left font-sans leading-none">
                <span className="block text-xs font-bold tracking-tight text-slate-300">shaundju</span>
                <span className="block text-[11px] font-light text-slate-400 tracking-wider">academy</span>
              </div>
            </div>

            {/* Pondok Grafis Logo */}
            <div className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group cursor-default">
              <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-display font-black text-xs text-brand-400 group-hover:border-brand-500 transition-colors">
                OG
              </div>
              <div className="text-left font-display leading-none">
                <span className="block text-xs font-black tracking-wider text-slate-300 uppercase">PONDOK</span>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">GRAFIS</span>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
