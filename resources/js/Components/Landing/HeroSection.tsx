import React from 'react';
import {
  Star,
  Check,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldCheck,
  Users,
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import SectionReveal from './SectionReveal';

interface HeroSectionProps {
  onCtaClick: () => void;
}

// Webinar date: 6 September 2026, 19:00 WIB (UTC+7)
const WEBINAR_DATE = new Date('2026-09-06T12:00:00Z');

export default function HeroSection({ onCtaClick }: HeroSectionProps) {
  const scrollToTestimonials = () => {
    const el = document.getElementById('testimonials');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-radial-top pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column — Content & Copy (c2-hero layout with Orange Palette) */}
          <div className="lg:col-span-6 text-left">
            <SectionReveal>
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 text-orange-400 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold uppercase tracking-normal sm:tracking-wider mb-5 max-w-full leading-tight">
                🗓️ LIVE ZOOM • 6 SEPTEMBER 2026, 19:00 WIB
              </div>
            </SectionReveal>

            <SectionReveal delay={100}>
              {/* C2-Hero Headline */}
              <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight sm:leading-none mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 block">THE SILENT CONVERSION LEAK</span>
                <span className="text-white block font-extrabold text-2xl sm:text-4xl md:text-5xl mt-1">Temukan Kebocoran Konversi Iklanmu</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={150}>
              {/* C2-Hero Subheadline Orange Pill Highlight */}
              <div className="inline-block bg-gradient-to-r from-brand-600 via-accent-500 to-amber-600 text-white font-display font-bold text-sm sm:text-xl px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl mb-6 shadow-lg shadow-orange-600/30 max-w-full leading-snug">
                Capai Closing 2x Lipat Tanpa Boros Budget Iklan
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              {/* Sub-paragraph */}
              <p className="text-sm sm:text-lg text-slate-300 mb-6 sm:mb-8 leading-relaxed font-normal max-w-xl">
                CTR bagus tapi closing seret? Dalam <strong className="text-white font-semibold">90 menit live Zoom</strong>, diagnosa sendiri 4 penyebab utama kebocoran konversi di landing page kamu & terapkan strategi CRO presisi tanpa tebak-tebakan.
              </p>
            </SectionReveal>

            <SectionReveal delay={300}>
              {/* Dual Action Buttons (Orange Theme) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8">
                <button
                  id="hero-cta"
                  onClick={onCtaClick}
                  className="bg-gradient-to-r from-brand-600 to-accent-500 hover:from-brand-500 hover:to-accent-400 text-white font-display font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl shadow-brand-600/30 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer transform-gpu"
                >
                  <span>Daftar Early Bird (Rp79.000)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={scrollToTestimonials}
                  className="bg-white/5 hover:bg-white/10 border border-white/15 text-white font-display font-bold text-sm sm:text-base px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lihat Testimoni Klien</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </button>
              </div>
            </SectionReveal>

            <SectionReveal delay={350}>
              {/* Micro-Proof Trust Checkmark Bar */}
              <div className="inline-flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl font-medium w-full sm:w-auto">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>Dipercaya 100+ Bisnis</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>Kenaikan Konversi 1,5–2x</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>Garansi Kepuasan Sesi 100%</span>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right Column — Prominent Showcase Image (6-span wide + Ambient Glow) */}
          <div className="lg:col-span-6 relative">
            <SectionReveal delay={200}>
              <div className="relative group">
                {/* Ambient glow behind card */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-orange-600/30 via-red-600/20 to-amber-500/30 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/40 bg-dark-900/95 p-3.5 sm:p-5 shadow-2xl shadow-orange-500/25 transition-transform duration-500 transform-gpu group-hover:scale-[1.02]">
                  {/* Floating Rating Tag on top right */}
                  <div className="absolute top-6 right-6 z-20 bg-dark-950/90 border border-amber-500/40 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300 shadow-xl">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>4.9 / 5 Rating</span>
                  </div>

                  <div className="rounded-2xl overflow-hidden relative">
                    <img
                      src="/images/checklist.webp"
                      alt="Template Checklist CRO Audit & Ebook Guide"
                      className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-700"
                      loading="eager"
                      decoding="async"
                      width={800}
                      height={533}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Feature Popover Callout */}
                  <div className="mt-4 bg-gradient-to-r from-slate-900 to-dark-950 border border-orange-500/30 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0 shadow-lg">
                      <TrendingUp className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                        Termasuk Template Checklist CRO Audit Siap Pakai
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Biasa digunakan konsultan PBM Agency untuk membedah landing page klien.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
