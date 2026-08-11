import React from 'react';
import { Star, TrendingUp, Quote, CheckCircle2 } from 'lucide-react';
import SectionReveal from './SectionReveal';

const TESTIMONIALS = [
  {
    name: 'Tsania Latheefa',
    role: 'Content Creator (52.8K Followers)',
    quote:
      'Setelah bedah dan optimasi landing page bareng Justin, omset naik dari Rp20 juta jadi Rp30 juta per bulan. Perbedaannya terasa banget di alur pesan yang jauh lebih jelas buat audiens.',
    metric: 'Omset Rp20Jt ➔ Rp30Jt/Bln',
    metricDetail: '+50% Kenaikan Omset',
    avatar: 'TL',
    highlight: true,
  },
  {
    name: 'Klien E-Commerce PBM',
    role: 'Pemilik Bisnis E-Commerce',
    quote:
      'ROAS naik jadi 5x, purchase meningkat langsung terlihat dari landing page checkout. Kenaikan ini di luar pola musiman biasa, memang hasilnya dari optimasi landing page.',
    metric: 'ROAS Naik 5x',
    metricDetail: 'Hasil Konfirmasi Chat WA',
    avatar: 'KP',
    highlight: false,
  },
] as const;

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-10 sm:py-14 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              BUKTI KREDIBILITAS & HASIL
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Hasil Nyata Dari Optimasi Landing Page
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Bukan cuma sekadar teori, berikut hasil nyata yang dirasakan oleh klien dan peserta sebelumnya.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item, index) => (
            <SectionReveal key={index} delay={index * 120}>
              <div
                className={`glass-card rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  item.highlight
                    ? 'border-brand-500/30 bg-gradient-to-b from-brand-500/5 to-transparent'
                    : ''
                }`}
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex items-center gap-1 mb-4 text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-white/5 absolute -top-2 -left-2 pointer-events-none" />
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic relative z-10">
                      "{item.quote}"
                    </p>
                  </div>
                </div>

                <div>
                  {/* Metric Pill */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3.5 mb-5 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-emerald-400 font-bold block">
                        {item.metric}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.metricDetail}
                      </span>
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>

                  {/* Author Bio */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-500/40 flex items-center justify-center font-mono text-xs font-bold text-brand-300">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                      </h4>
                      <p className="text-xs text-slate-400">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
