import React from 'react';
import { X, Sparkles } from 'lucide-react';
import SectionReveal from './SectionReveal';

const UNFIXED_CONSEQUENCES = [
  'Conversion rate tidak bergerak bulan demi bulan',
  'Target sales terus meleset, budget iklan makin membengkak',
  'Burnt out karena Anda harus selalu turun tangan & perbaiki LP sendiri',
  'Budget iklan & perbaikan sudah keluar, tapi hasil tidak berubah',
] as const;

export default function RootCauseSection() {
  return (
    <section id="root-cause" className="py-10 sm:py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column — Negative Consequences List */}
              <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-6">
                  Kalau ini tidak <span className="text-red-400">diperbaiki...</span>
                </h3>

                <div className="space-y-4">
                  {UNFIXED_CONSEQUENCES.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3.5 pb-3.5 ${
                        idx !== UNFIXED_CONSEQUENCES.length - 1 ? 'border-b border-white/[0.06]' : ''
                      }`}
                    >
                      <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-400 font-bold">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column — Positive Value Mechanism Callout */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                  Padahal Funnel Anda{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                    CAPABLE.
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  Yang kurang bukan budget iklan Anda. Yang kurang hanya framework CRO dan anatomi landing page yang belum Anda terapkan di bisnis Anda.
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-400 tracking-wider uppercase bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-xl w-fit">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span>DAN ITU BISA DIPELAJARI DALAM 90 MENIT.</span>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
