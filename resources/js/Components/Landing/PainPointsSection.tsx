import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import SectionReveal from './SectionReveal';

const PAIN_POINTS_LIST = [
  'Sudah ganti desain & copy LP berkali-kali, tapi hasilnya tetap seret',
  'Iklan kelihatan hijau, tapi pas dihitung CPA malah mencekik',
  'Traffic masuk ramai, tapi cuma numpang lewat tanpa pernah beli',
  'Anda masih harus turun tangan sendiri agar target omset tercapai',
] as const;

const ESSENTIAL_MASTERY_LIST = [
  'Seberapa kuat Value Proposition di atas lipatan layar',
  'Seberapa efektif alur pesan menanggulangi keraguan calon pembeli',
  'Seberapa besar trust & bukti konversi yang dibangun sejak awal',
] as const;

export default function PainPointsSection() {
  return (
    <section id="pain-points" className="py-10 sm:py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column — Dark Glass Card for Pain Points */}
          <div className="lg:col-span-6">
            <SectionReveal>
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 h-full flex flex-col justify-between relative overflow-hidden">
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-6 pb-4 border-b border-white/10">
                    PERNAH ADA DI POSISI INI?
                  </h3>

                  <div className="space-y-4">
                    {PAIN_POINTS_LIST.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3.5 pb-4 ${
                          idx !== PAIN_POINTS_LIST.length - 1 ? 'border-b border-white/[0.06]' : ''
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed font-medium">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right Column — Fact & Core Question Callout */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <SectionReveal delay={150}>
              <div className="pl-0 lg:pl-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-400 block mb-3">
                  FAKTANYA
                </span>

                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-6">
                  Terus mengawasi dan menekan budget iklan tidak akan membuat{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                    closing jadi konsisten
                  </span>
                </h2>

                <p className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  TAPI SEBERAPA DALAM LANDING PAGE ANDA MENGUASAI:
                </p>

                <div className="space-y-3">
                  {ESSENTIAL_MASTERY_LIST.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-orange-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-sm sm:text-base text-slate-200 font-medium">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
