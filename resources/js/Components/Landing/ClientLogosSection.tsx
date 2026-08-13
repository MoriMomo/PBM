import React from 'react';
import SectionReveal from './SectionReveal';
import { Building2 } from 'lucide-react';

export default function ClientLogosSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 border-y border-white/10 bg-dark-950/80 relative overflow-hidden">
      {/* Subtle ambient lighting backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <SectionReveal>
          {/* Section Header Title */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-slate-300 uppercase tracking-[0.25em] mb-10 sm:mb-12 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-orange-400" />
            <span>DIPERCAYA OLEH BUSINESS OWNER & AGENCY</span>
          </div>

          {/* Client Logos Grid / Row — Much Larger & Prominent Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center justify-center">
            
            {/* 1. Full Bright Indonesia Logo */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-orange-500/40 bg-dark-900/80 transition-all duration-300 transform-gpu hover:-translate-y-1 shadow-lg group flex items-center justify-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center font-display font-black text-orange-400 text-sm sm:text-base flex-shrink-0 group-hover:scale-105 transition-transform">
                FB
              </div>
              <div className="text-left font-display leading-tight">
                <span className="block text-sm sm:text-base font-black tracking-widest text-white uppercase group-hover:text-orange-300 transition-colors">
                  FULL BRIGHT
                </span>
                <span className="block text-xs text-slate-400 font-mono tracking-wider">
                  INDONESIA
                </span>
              </div>
            </div>

            {/* 2. GACF Growth Agency Logo */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-orange-500/40 bg-dark-900/80 transition-all duration-300 transform-gpu hover:-translate-y-1 shadow-lg group flex items-center justify-center gap-3">
              <svg
                className="w-9 h-9 sm:w-11 sm:h-11 text-slate-300 group-hover:text-orange-400 transition-colors flex-shrink-0"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M16 4C9.37 4 4 9.37 4 16s5.37 12 12 12 12-5.37 12-12S22.63 4 16 4zm0 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M18 10l-6 6 6 6v-4h4v-4h-4z" />
              </svg>
              <div className="text-left font-mono leading-none">
                <span className="block text-base sm:text-lg font-black tracking-wider text-white group-hover:text-orange-300 transition-colors">
                  GACF
                </span>
                <span className="block text-[11px] text-slate-400 font-bold mt-0.5">
                  GROWTH AGENCY
                </span>
              </div>
            </div>

            {/* 3. Shaundju Academy Logo */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-orange-500/40 bg-dark-900/80 transition-all duration-300 transform-gpu hover:-translate-y-1 shadow-lg group flex items-center justify-center gap-3">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-slate-300 group-hover:text-orange-400 transition-colors flex-shrink-0"
                viewBox="0 0 32 32"
                fill="currentColor"
              >
                <path d="M4 8l12-4 12 4-12 14L4 8z" />
                <path d="M12 22l4 6 4-6" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div className="text-left font-sans leading-none">
                <span className="block text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-orange-300 transition-colors">
                  shaundju
                </span>
                <span className="block text-xs font-light text-slate-400 tracking-wider mt-0.5">
                  academy
                </span>
              </div>
            </div>

            {/* 4. Pondok Grafis Logo */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-orange-500/40 bg-dark-900/80 transition-all duration-300 transform-gpu hover:-translate-y-1 shadow-lg group flex items-center justify-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center font-display font-black text-amber-300 text-xs sm:text-sm flex-shrink-0 group-hover:scale-105 transition-transform shadow-md">
                OG
              </div>
              <div className="text-left font-display leading-none">
                <span className="block text-sm sm:text-base font-black tracking-wider text-white uppercase group-hover:text-amber-300 transition-colors">
                  PONDOK
                </span>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  GRAFIS
                </span>
              </div>
            </div>

          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
