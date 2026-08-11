import React from 'react';
import { Search, Wrench, FlaskConical, CheckCircle2 } from 'lucide-react';
import SectionReveal from './SectionReveal';
import CTAButton from './CTAButton';

interface ModulesSectionProps {
  onCtaClick: () => void;
}

const MODULES = [
  {
    number: 'MODUL 01',
    icon: Search,
    title: 'Diagnosa Kebocoran Funnel Tanpa Tools Mahal',
    description:
      'Cara praktis membaca data visitor landing page kamu. Kamu bakal langsung tahu di mana visitor paling banyak kabur, cukup pakai data dasar tanpa perlu langganan software mahal.',
    color: 'from-brand-600 to-accent-500',
    highlight: 'Diagnosa Data',
    takeaways: [
      'Cara baca bounce rate & drop-off secara akurat',
      'Format diagnosa cepat 15 menit',
      'Membedakan masalah iklan vs landing page',
    ],
  },
  {
    number: 'MODUL 02',
    icon: Wrench,
    title: 'Cara Menyusun Ulang Headline, Value Prop & CTA',
    description:
      'Panduan praktis menata ulang alur pesan di landing page. Biar visitor yang mendarat merasa paham nilai produkmu dan langsung yakin buat menekan tombol order.',
    color: 'from-orange-500 to-amber-500',
    highlight: 'Optimasi Konversi',
    takeaways: [
      'Menulis Value Proposition yang jelas & menjual',
      'Formula perbaikan Call-to-Action (CTA)',
      'Mengurangi hambatan di proses checkout',
    ],
  },
  {
    number: 'MODUL 03',
    icon: FlaskConical,
    title: 'Bedah Studi Kasus & Template CRO Audit Siap Pakai',
    description:
      'Lihat langsung studi kasus nyata bisnis yang berhasil menaikkan closing 1,5x–2x setelah perbaikan funnel. Lengkap dengan template checklist audit yang bisa langsung kamu pakai.',
    color: 'from-amber-500 to-yellow-500',
    highlight: 'Studi Kasus & Template',
    takeaways: [
      'Studi kasus nyata peningkatan sales & ROAS',
      'Checklist audit CRO siap pakai',
      'Rekomendasi tools CRO gratisan berkualitas',
    ],
  },
] as const;

export default function ModulesSection({ onCtaClick }: ModulesSectionProps) {
  return (
    <section id="modules" className="py-10 sm:py-14 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-dark-900/60 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 text-gold-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              SILABUS WEBINAR
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Apa Saja Yang Bakal Kamu Pelajari Dalam{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">90 Menit</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Materi praktis dari pengalaman ngelola 100+ projek CRO.
              Dibuat simpel dan langsung bisa kamu praktikin sendiri di bisnis kamu.
            </p>
          </div>
        </SectionReveal>

        {/* Webinar Live Teaser Preview Card */}
        <SectionReveal delay={50}>
          <div className="mb-8 rounded-3xl overflow-hidden border border-orange-500/30 bg-dark-900/80 p-2 sm:p-3 shadow-2xl relative group">
            <div className="relative rounded-2xl overflow-hidden aspect-video">
              <img
                src="/images/cuplikan-webinar.png"
                alt="Cuplikan Sesi Live Webinar Pembedahan Landing Page"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width={900}
                height={506}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent flex flex-col justify-end p-6">
                <span className="inline-flex items-center gap-2 bg-brand-600 text-white text-xs font-mono font-bold px-3 py-1 rounded-full w-fit mb-2 shadow-lg">
                  🔴 CUPLIKAN SESI LIVE WEBINAR
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Bedah Kasus Real-Time & Pembedahan Anatomi Funnel Landing Page
                </h3>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="space-y-4 sm:space-y-5">
          {MODULES.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <SectionReveal key={index} delay={index * 120}>
                <div className="glass-card rounded-3xl p-6 sm:p-7 md:p-8 border border-white/10 transition-all duration-300 group hover:border-orange-500/30">
                  <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6">
                    {/* Module Icon & Badge */}
                    <div className="flex items-center md:flex-col md:items-center gap-3 flex-shrink-0">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-widest md:mt-1">
                        {mod.number}
                      </span>
                    </div>

                    {/* Module Details */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                          {mod.title}
                        </h3>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-full whitespace-nowrap">
                          {mod.highlight}
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5 font-normal">
                        {mod.description}
                      </p>

                      {/* Bottom Key Takeaways Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/10 items-start">
                        {mod.takeaways.map((item, tIdx) => (
                          <div
                            key={tIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* CTA + Mandatory Social Proof Subtext */}
        <SectionReveal delay={500}>
          <div className="mt-8 sm:mt-10 text-center">
            <CTAButton
              onClick={onCtaClick}
              size="md"
              id="modules-cta"
              socialProof="⚡ Sesi Live Zoom + Rekaman HD Akses Selamanya"
            >
              Amankan Kursi Webinar Saya
            </CTAButton>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
