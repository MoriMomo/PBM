import React, { useState } from 'react';
import { TrendingUp, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import SectionReveal from './SectionReveal';

export default function CaseStudySection() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'before' | 'after'>('comparison');

  return (
    <section id="case-study" className="py-10 sm:py-14 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              BUKTI HASIL CRO NYATA
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Studi Kasus: Pembedahan Landing Page Klien
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Lihat langsung transformasi landing page dari versi awal yang sepi konversi menjadi versi teroptimasi yang menghasilkan kenaikan sales hingga 2x lipat.
            </p>
          </div>
        </SectionReveal>

        {/* Tab Switcher */}
        <SectionReveal delay={100}>
          <div className="flex justify-center mb-8">
            <div className="bg-dark-900 border border-white/10 p-1.5 rounded-2xl inline-flex gap-2 text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'comparison'
                    ? 'bg-gradient-to-r from-brand-600 to-accent-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Perbandingan Sebelum & Sesudah
              </button>
              <button
                onClick={() => setActiveTab('before')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'before'
                    ? 'bg-red-500/20 border border-red-500/40 text-red-400 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Versi Sebelum (1.2% Conversion)
              </button>
              <button
                onClick={() => setActiveTab('after')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'after'
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Versi Sesudah (3.8% Conversion)
              </button>
            </div>
          </div>
        </SectionReveal>

        {/* Active Display Panel */}
        <SectionReveal delay={150}>
          <div className="glass-card-featured rounded-3xl p-4 sm:p-6 relative overflow-hidden border border-white/10 shadow-2xl">
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
        </SectionReveal>
      </div>
    </section>
  );
}
