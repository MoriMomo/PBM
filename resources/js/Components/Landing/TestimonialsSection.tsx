import React from 'react';
import { Star, TrendingUp, Quote, CheckCircle2, MessageSquare } from 'lucide-react';
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
    highlight: false,
    image: null,
  },
  {
    name: 'Fullbright Participant',
    role: 'Digital Business Owner & Agency Partner',
    quote:
      'Kelihatan banget bedanya pas landing page diperbaiki pake checklist CRO! Konversi registrasi naik 2,4x lipat dalam minggu pertama dan biaya CPA turun drastis.',
    metric: 'Closing Rate ➔ 2.4x Lipat',
    metricDetail: 'Bukti Chat WA Live Session',
    avatar: 'FB',
    highlight: true,
    image: '/images/fullbright.jpeg',
  },
  {
    name: 'Klien E-Commerce PBM',
    role: 'Pemilik Bisnis E-Commerce',
    quote:
      'ROAS naik jadi 5x, purchase meningkat langsung terlihat dari landing page checkout. Kenaikan ini di luar pola musiman biasa, memang murni hasil dari optimasi landing page.',
    metric: 'ROAS Naik ➔ 5.0x',
    metricDetail: 'Hasil Konfirmasi Chat WA',
    avatar: 'KP',
    highlight: false,
    image: null,
  },
] as const;

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-10 sm:py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              BUKTI KREDIBILITAS & CHAT WA REAL
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Hasil Nyata Dari Optimasi Landing Page
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Bukan cuma sekadar teori, berikut bukti chat WhatsApp dan hasil nyata yang dirasakan oleh alumni dan klien kami.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TESTIMONIALS.map((item, index) => (
            <SectionReveal key={index} delay={index * 120}>
              <div
                className={`glass-card rounded-3xl p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  item.highlight
                    ? 'border-orange-500/40 bg-gradient-to-b from-orange-500/10 via-dark-900/90 to-dark-950 shadow-2xl shadow-orange-500/10 ring-1 ring-orange-500/20'
                    : 'border-white/10'
                }`}
              >
                <div>
                  {/* Top Screenshot Banner if available (Middle Card) */}
                  {item.image && (
                    <div className="mb-5 rounded-2xl overflow-hidden border border-orange-500/30 shadow-lg relative group">
                      <img
                        src={item.image}
                        alt={`Bukti Chat WhatsApp Testimoni ${item.name}`}
                        className="w-full h-44 object-cover object-top transform group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={225}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-2 left-2 bg-emerald-500/90 text-white font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow backdrop-blur-sm">
                        💬 Bukti Chat WA Real
                      </span>
                    </div>
                  )}

                  {/* Rating stars */}
                  <div className="flex items-center gap-1 mb-4 text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-white/5 absolute -top-2 -left-2 pointer-events-none" />
                    <p className="text-slate-200 text-sm leading-relaxed italic relative z-10">
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
                    <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  </div>

                  {/* Author Bio */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-mono text-xs font-bold text-orange-300 flex-shrink-0">
                      {item.avatar}
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                      </h4>
                      <p className="text-xs text-slate-400 leading-snug">{item.role}</p>
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
