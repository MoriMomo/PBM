import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import SectionReveal from './SectionReveal';

type Tab = 'comparison' | 'before' | 'after';

const TABS: { id: Tab; label: string; shortLabel: string }[] = [
  { id: 'comparison', label: 'Perbandingan Sebelum & Sesudah', shortLabel: 'Perbandingan' },
  { id: 'before',     label: 'Versi Sebelum (1.2% Conversion)', shortLabel: 'Sebelum' },
  { id: 'after',      label: 'Versi Sesudah (3.8% Conversion)', shortLabel: 'Sesudah' },
];

const AUTO_INTERVAL_MS = 5000; // cycle every 5 s

export default function CaseStudySection() {
  const [activeTab, setActiveTab] = useState<Tab>('comparison');
  const [progress, setProgress]   = useState(0);
  const [paused,   setPaused]     = useState(false);
  const [animKey,  setAnimKey]    = useState(0);   // triggers fade-in on change

  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
    setProgress(0);
    setAnimKey((k) => k + 1);
  }, []);

  const advance = useCallback(() => {
    setActiveTab((cur) => {
      const next = TABS[(TABS.findIndex((t) => t.id === cur) + 1) % TABS.length];
      setAnimKey((k) => k + 1);
      return next.id;
    });
    setProgress(0);
  }, []);

  // --- auto cycle ---
  const startCycle = useCallback(() => {
    if (intervalRef.current)  clearInterval(intervalRef.current);
    if (progressRef.current)  clearInterval(progressRef.current);

    setProgress(0);

    intervalRef.current = setInterval(advance, AUTO_INTERVAL_MS);

    // progress bar ticks every 50 ms
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (50 / AUTO_INTERVAL_MS) * 100, 100));
    }, 50);
  }, [advance]);

  const stopCycle = useCallback(() => {
    if (intervalRef.current)  clearInterval(intervalRef.current);
    if (progressRef.current)  clearInterval(progressRef.current);
  }, []);

  useEffect(() => {
    if (!paused) {
      startCycle();
    } else {
      stopCycle();
    }
    return stopCycle;
  }, [paused, startCycle, stopCycle]);

  // reset progress when tab changes manually
  const handleTabClick = (tab: Tab) => {
    goToTab(tab);
    if (!paused) startCycle(); // restart timer from 0
  };

  // tab ring colours
  const tabStyle = (tab: Tab) => {
    if (tab === activeTab) {
      if (tab === 'comparison') return 'bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-lg';
      if (tab === 'before')     return 'bg-red-500/20 border border-red-500/40 text-red-400 font-bold';
      if (tab === 'after')      return 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold';
    }
    return 'text-slate-400 hover:text-white';
  };

  return (
    <section id="case-study" className="py-10 sm:py-14 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-950/40 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto z-10">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              BUKTI HASIL CRO NYATA
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Studi Kasus: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Pembedahan Landing Page Klien</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Lihat langsung transformasi landing page dari versi awal yang sepi konversi menjadi versi teroptimasi yang menghasilkan kenaikan sales hingga 2x lipat.
            </p>
          </div>
        </SectionReveal>

        {/* Tab Switcher */}
        <SectionReveal delay={100}>
          <div className="flex justify-center mb-8">
            <div 
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="bg-dark-900 border border-white/10 p-1.5 rounded-2xl inline-flex flex-wrap justify-center gap-2 text-xs sm:text-sm font-semibold relative"
            >
              {TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${tabStyle(tab.id)}`}
                  >
                    <span className="hidden sm:inline relative z-10">{tab.label}</span>
                    <span className="sm:hidden relative z-10">{tab.shortLabel}</span>

                    {/* Integrated smooth progress indicator line inside active tab button */}
                    {isActive && !paused ? (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 overflow-hidden">
                        <div
                          className="h-full bg-white transition-none"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        {/* Active Display Panel */}
        <SectionReveal delay={150}>
          <div className="glass-card-featured rounded-3xl p-4 sm:p-6 relative overflow-hidden border border-white/10 shadow-2xl">

            {/* Fade wrapper — key changes force a remount = fresh fade-in */}
            <div
              key={animKey}
              style={{ animation: 'caseFadeIn 0.45s ease both' }}
            >
              {activeTab === 'comparison' && (
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-dark-950">
                    <img
                      src="/images/before-after.png"
                      alt="Perbandingan Sebelum dan Sesudah Optimasi CRO"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      decoding="async"
                      width={1000}
                      height={562}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-4">
                      <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider block mb-1">❌ SEBELUM AUDIT CRO</span>
                      <p className="text-sm text-slate-300">Tampilan generik, hirarki pesan membingungkan, CTA tidak kontras, mengakibatkan 88% visitor langsung kabur (bounce rate tinggi).</p>
                    </div>
                    <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-2xl p-4">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">✅ SESUDAH OPTIMASI CRO</span>
                      <p className="text-sm text-slate-300">Headline berbasis value proposition, kontras CTA tinggi, penataan social proof di area above-the-fold, sukses menaikkan closing 2,1x lipat.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'before' && (
                <div className="space-y-3 text-center">
                  <div className="inline-block bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs font-bold px-3 py-1 rounded-full mb-2">
                    ⚠️ VERSI SEBELUM OPTIMASI (KONVERSI RENDAH)
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-red-500/20 max-h-[600px] overflow-y-auto">
                    <img src="/images/before.webp" alt="Tampilan Landing Page Sebelum Optimasi" className="w-full h-auto" loading="lazy" decoding="async" width={1000} height={1800} />
                  </div>
                </div>
              )}

              {activeTab === 'after' && (
                <div className="space-y-3 text-center">
                  <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold px-3 py-1 rounded-full mb-2">
                    🚀 VERSI SESUDAH OPTIMASI (KONVERSI TINGGI +210%)
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-emerald-500/20 max-h-[600px] overflow-y-auto">
                    <img src="/images/after.webp" alt="Tampilan Landing Page Sesudah Optimasi" className="w-full h-auto" loading="lazy" decoding="async" width={1000} height={1800} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Keyframe injected once */}
      <style>{`
        @keyframes caseFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
