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
    title: 'Cara Membaca Letak Masalah Funnel',
    description:
      'Menemukan di mana letak masalah yang membuat traffic terbuang sia-sia selama ini. Kamu akan belajar membaca data dasar visitor landing page untuk langsung menemukan lokasi kebocoran.',
    color: 'from-brand-600 to-accent-500',
    highlight: 'Diagnosa Masalah',
    takeaways: [
      'Menemukan titik kebocoran traffic secara presisi',
      'Format membaca data visitor tanpa tebak-tebakan',
      'Membedakan masalah iklan vs masalah landing page',
    ],
  },
  {
    number: 'MODUL 02',
    icon: Wrench,
    title: 'Cara Efektif Perbaiki Kebocoran Landing Page',
    description:
      'Framework praktis untuk memperbaiki kebocoran funnel. Menata ulang alur pesan, headline, value proposition, dan CTA agar halaman mendorong visitor untuk makin yakin membeli.',
    color: 'from-orange-500 to-amber-500',
    highlight: 'Framework Perbaikan',
    takeaways: [
      'Menyusun ulang Headline, Value Prop & CTA',
      'Alur pesan yang menepis keraguan calon pembeli',
      'Formula mengurangi friksi di proses checkout',
    ],
  },
  {
    number: 'MODUL 03',
    icon: FlaskConical,
    title: 'Bedah Studi Kasus & Tools Diagnosis Kebocoran',
    description:
      'Bedah studi kasus nyata cara diagnosa & perbaiki kebocoran landing page bisnis alumni/klien, serta penggunaan tools diagnosa kebocoran konversi yang siap kamu pakai.',
    color: 'from-amber-500 to-yellow-500',
    highlight: 'Studi Kasus & Tools',
    takeaways: [
      'Bedah studi kasus nyata kenaikan konversi 1,5–2x',
      'Demo tools diagnosa kebocoran konversi',
      'Template checklist audit yang langsung bisa dipakai',
    ],
  },
] as const;

export default function ModulesSection({ onCtaClick }: ModulesSectionProps) {
  return (
    <section id="modules" className="py-10 sm:py-14 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-950/90 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto z-10">
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
          <div className="mb-8 rounded-3xl overflow-hidden border border-orange-500/30 bg-dark-900/90 p-2.5 sm:p-4 shadow-2xl group">
            <div className="rounded-2xl overflow-hidden relative shadow-lg">
              <img
                src="/images/cuplikan-webinar.png"
                alt="Cuplikan Sesi Live Webinar Pembedahan Landing Page"
                className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500 rounded-2xl"
                loading="lazy"
                decoding="async"
                width={900}
                height={506}
              />
            </div>
            <div className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-dark-950/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 bg-brand-600/90 text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow w-fit">
                🔴 CUPLIKAN SESI LIVE WEBINAR
              </span>
              <h3 className="font-display text-xs sm:text-base font-bold text-white leading-snug">
                Bedah Kasus Real-Time & Pembedahan Anatomi Funnel Landing Page
              </h3>
            </div>
          </div>
        </SectionReveal>

        <div className="space-y-4 sm:space-y-5">
          {MODULES.map((mod, index) => {
            const Icon = mod.icon;
            return (
              <SectionReveal key={index} delay={index * 120}>
                <div className="glass-card rounded-3xl p-6 sm:p-7 md:p-8 border border-white/10 transition-all duration-300 transform-gpu hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 group hover:border-orange-500/40">
                  <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6">
                    {/* Module Icon & Badge */}
                    <div className="flex items-center md:flex-col md:items-center gap-3 flex-shrink-0">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105 transform-gpu`}
                      >
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-slate-300 uppercase tracking-widest md:mt-1">
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

                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-5 font-normal">
                        {mod.description}
                      </p>

                      {/* Bottom Key Takeaways Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t border-white/10 items-start">
                        {mod.takeaways.map((item, tIdx) => (
                          <div
                            key={tIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
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
