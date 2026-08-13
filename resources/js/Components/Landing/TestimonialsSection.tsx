import React from 'react';
import { Star, TrendingUp, Quote, CheckCircle2, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import SectionReveal from './SectionReveal';

const TESTIMONIALS = [
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
  {
    name: 'Alumni Lead Gen Agency',
    role: 'Digital Marketing Lead',
    quote:
      'Dulu CPA iklan mahal banget 90rb per lead. Pas landing page di-audit & diperbaiki hirarki penawarannya, CPA turun ke 32rb per lead. Hemat puluhan juta budget iklan!',
    metric: 'CPA Iklan ➔ Turun -64%',
    metricDetail: 'Optimasi Lead Gen Funnel',
    avatar: 'AL',
    highlight: false,
    image: null,
  },
] as const;

export default function TestimonialsSection() {
  const highlightCard = TESTIMONIALS[0];
  const secondaryCards = TESTIMONIALS.slice(1);

  return (
    <section id="testimonials" className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-dark-950/60 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              BUKTI KREDIBILITAS & CHAT WA REAL
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
              Hasil Nyata Dari Optimasi Landing Page
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Bukti percakapan WhatsApp real dan hasil nyata kenaikan konversi yang dirasakan oleh alumni & klien kami.
            </p>
          </div>
        </SectionReveal>

        {/* 4 Cards Layout: Main Highlight Card (Full Bright) + 3 Supporting Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Highlight Card — Fullbright Participant (Spans 12 or 7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col">
            <SectionReveal className="h-full">
              <div className="glass-card-featured rounded-3xl p-6 sm:p-8 flex flex-col justify-between flex-1 relative overflow-hidden border-2 border-orange-500/50 bg-gradient-to-b from-orange-500/15 via-dark-900/95 to-dark-950 shadow-2xl shadow-orange-500/20 ring-2 ring-orange-500/30 transform-gpu hover:-translate-y-1 transition-transform duration-300">
                {/* Hero Feature Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                    <span className="ml-1.5 font-mono text-xs font-bold text-slate-200">5.0 / 5.0</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-orange-300 bg-orange-500/20 border border-orange-500/40 px-3 py-1 rounded-full shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" /> HIGHLIGHT UTAMA
                  </span>
                </div>

                {/* Featured Real WhatsApp Proof Image Banner — 100% Full-bleed width, No Black Side Bars */}
                <div className="mb-5 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl relative group bg-emerald-950/20">
                  <img
                    src={highlightCard.image!}
                    alt={`Bukti Chat WhatsApp Testimoni ${highlightCard.name}`}
                    className="w-full h-64 sm:h-80 object-cover object-top transform group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-3 bg-emerald-500 text-dark-950 font-mono text-xs font-black px-3 py-1 rounded-full shadow-xl backdrop-blur-sm flex items-center gap-1.5 border border-emerald-400">
                    💬 BUKTI CHAT WA REAL LIVE SESSION
                  </span>
                </div>

                {/* Main Quote */}
                <div className="relative mb-6">
                  <Quote className="w-10 h-10 text-white/5 absolute -top-3 -left-3 pointer-events-none" />
                  <p className="text-slate-100 text-base sm:text-lg leading-relaxed italic relative z-10 font-normal">
                    "{highlightCard.quote}"
                  </p>
                </div>

                {/* Metric & Author Footer */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 mb-4 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm sm:text-base text-emerald-400 font-extrabold block">
                        {highlightCard.metric}
                      </span>
                      <span className="text-xs text-slate-300 font-mono">
                        {highlightCard.metricDetail}
                      </span>
                    </div>
                    <TrendingUp className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/30 to-amber-500/30 border border-orange-500/50 flex items-center justify-center font-mono text-xs font-bold text-orange-300 flex-shrink-0 shadow-lg">
                      {highlightCard.avatar}
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-white flex items-center gap-1.5">
                        <span>{highlightCard.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-snug">{highlightCard.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* 3 Secondary Cards Column (Spans 5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryCards.map((item, idx) => (
              <SectionReveal key={idx} delay={idx * 100}>
                <div className="glass-card rounded-3xl p-6 border border-white/10 bg-dark-900/80 hover:border-white/20 transition-all duration-300 transform-gpu hover:-translate-y-1 flex flex-col justify-between h-full shadow-lg">
                  <div>
                    {/* Stars & Verified */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1 text-gold-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                        ))}
                        <span className="ml-1 font-mono text-[11px] font-bold text-slate-300">5.0</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> VERIFIED
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic mb-4 font-normal">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Metric & Author */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mb-3 flex items-center justify-between">
                      <div>
                        <span className="font-mono text-xs sm:text-sm text-emerald-400 font-bold block">
                          {item.metric}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {item.metricDetail}
                        </span>
                      </div>
                      <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-mono text-xs font-bold text-orange-300 flex-shrink-0">
                        {item.avatar}
                      </div>
                      <div>
                        <h4 className="font-display text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                          <span>{item.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-snug">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
