import React from 'react';
import { Star, TrendingUp, Quote, CheckCircle2, MessageSquare, ShieldCheck, Sparkles, Presentation } from 'lucide-react';
import SectionReveal from './SectionReveal';

// Optional: Jika menggunakan TypeScript, ini sangat membantu. Jika murni JS, bisa diabaikan.
interface Testimonial {
  name: string;
  role: string;
  quote: string;
  metric: string;
  metricDetail: string;
  avatar: string;
  highlight: boolean;
  image: string | null;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Fullbright Participant',
    role: 'Digital Business Owner & Agency Partner',
    quote:
      'Kelihatan banget bedanya pas landing page diperbaiki pake checklist CRO! Konversi registrasi naik 2,4x lipat dalam minggu pertama dan biaya CPA turun drastis.',
    metric: 'Closing Rate ➔ Naik 2.4x',
    metricDetail: 'Bukti Chat WA Live Session',
    avatar: 'FB',
    highlight: true,
    image: '/images/fullbright.jpeg',
  },
  {
    name: 'Tsania Latheefa',
    role: 'Content Creator (52.8K Followers)',
    quote:
      'Setelah bedah dan optimasi landing page, omset naik dari Rp20 juta jadi Rp30 juta per bulan. Perbedaannya terasa di alur pesan yang jauh lebih jelas buat audiens.',
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
      'ROAS naik jadi 5x, purchase meningkat langsung terlihat dari landing page checkout. Ini murni hasil optimasi hierarki landing page, bukan sekadar faktor musiman.',
    metric: 'ROAS Iklan ➔ Tembus 5.0x',
    metricDetail: 'Hasil Konfirmasi Chat WA',
    avatar: 'KP',
    highlight: false,
    image: null,
  },
  {
    name: 'Alumni Lead Gen Agency',
    role: 'Digital Marketing Lead',
    quote:
      'Dulu CPA iklan mahal banget, 90rb per lead. Pas landing page di-audit & diperbaiki penawarannya, CPA turun ke 32rb per lead. Hemat puluhan juta budget iklan!',
    metric: 'CPA Iklan ➔ Turun -64%',
    metricDetail: 'Optimasi Lead Gen Funnel',
    avatar: 'AL',
    highlight: false,
    image: null,
  },
];

export default function TestimonialsSection() {
  const highlightCard = TESTIMONIALS.find(t => t.highlight) || TESTIMONIALS[0];
  const secondaryCards = TESTIMONIALS.filter(t => !t.highlight);

  return (
    <section id="study-cases" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background dark section tone */}
      <div className="absolute inset-0 bg-dark-950/80 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Presentation className="w-3.5 h-3.5" />
              STUDY CASE & TESTIMONI REAL
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Hasil Nyata Dari <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Optimasi Landing Page</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Kami tidak sekadar berteori. Berikut adalah kompilasi <strong className="text-white font-medium">study case dan testimoni nyata</strong> dari klien yang berhasil menurunkan CPA dan melipatgandakan konversi mereka.
            </p>
          </div>
        </SectionReveal>

        {/* Layout: Main Highlight Card (7 cols) + 3 Supporting Cards (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Main Hero Highlight Card (Study Case Utama) */}
          <div className="lg:col-span-7 flex flex-col group">
            <SectionReveal className="h-full">
              <div className="glass-card-featured rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden border border-white/10 bg-dark-900/90 shadow-2xl hover:border-orange-500/40 transition-all duration-300">

                {/* Hero Feature Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-gold-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-1 font-mono text-xs font-bold text-slate-200">5.0 / 5.0</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-orange-300 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full shadow-sm">
                    <Sparkles className="w-3 h-3 text-orange-400" /> HIGHLIGHT STUDY CASE
                  </span>
                </div>

                {/* Featured Image Banner */}
                {highlightCard.image && (
                  <div className="mb-6 rounded-2xl overflow-hidden border border-white/10 shadow-xl relative bg-dark-950">
                    <img
                      src={highlightCard.image}
                      alt={`Bukti Chat WhatsApp Testimoni ${highlightCard.name}`}
                      className="w-full h-64 sm:h-80 object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
                    <span className="absolute bottom-4 left-4 bg-dark-950/80 text-orange-400 font-mono text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-orange-500/20 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" /> BUKTI CHAT LIVE SESSION
                    </span>
                  </div>
                )}

                {/* Main Quote */}
                <div className="relative mb-8 flex-grow">
                  <Quote className="w-12 h-12 text-white/5 absolute -top-4 -left-4 pointer-events-none" />
                  <p className="text-slate-100 text-base sm:text-lg leading-relaxed italic relative z-10 font-medium">
                    "{highlightCard.quote}"
                  </p>
                </div>

                {/* Metric & Author Footer */}
                <div className="mt-auto pt-5 border-t border-white/10">
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mb-5 flex items-center justify-between group-hover:bg-orange-500/15 transition-colors">
                    <div>
                      <span className="font-mono text-sm sm:text-base text-orange-400 font-black block mb-0.5">
                        {highlightCard.metric}
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        {highlightCard.metricDetail}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-400" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-mono text-sm font-bold text-orange-400 shadow-inner">
                      {highlightCard.avatar}
                    </div>
                    <div>
                      <h4 className="font-display text-base font-bold text-white flex items-center gap-1.5">
                        {highlightCard.name}
                        <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{highlightCard.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* 3 Secondary Cards Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryCards.map((item, idx) => (
              <SectionReveal key={idx} delay={idx * 150} className="flex-1">
                <div className="glass-card rounded-3xl p-6 sm:p-7 border border-white/10 bg-dark-900/90 hover:bg-dark-900 hover:border-orange-500/30 transition-all duration-300 h-full flex flex-col justify-between shadow-xl">
                  <div>
                    {/* Stars & Verified */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex text-gold-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-full">
                        <ShieldCheck className="w-3 h-3 text-orange-400" /> VERIFIED CASE
                      </span>
                    </div>

                    {/* Quote */}
                    <p className="text-slate-200 text-sm leading-relaxed italic mb-5 font-normal">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Metric & Author */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-3">
                      <div className="bg-orange-500/20 p-2 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-orange-400" />
                      </div>
                      <div>
                        <span className="font-mono text-sm text-orange-400 font-bold block">
                          {item.metric}
                        </span>
                        <span className="text-[11px] text-slate-300">
                          {item.metricDetail}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-mono text-xs font-bold text-orange-400">
                        {item.avatar}
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-bold text-white flex items-center gap-1">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{item.role}</p>
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