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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column — Content & Copy (c2-hero layout with Orange Palette) */}
          <div className="lg:col-span-7 text-left">
            <SectionReveal>
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 text-orange-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-6">
                SALES & MARKETING WEBINAR • CRO SPECIALIST
              </div>
            </SectionReveal>

            <SectionReveal delay={100}>
              {/* C2-Hero Headline */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 block">BANGUN LANDING PAGE</span>
                <span className="text-white block">TINGGI KONVERSI</span>
              </h1>
            </SectionReveal>

            <SectionReveal delay={150}>
              {/* C2-Hero Subheadline Orange Pill Highlight */}
              <div className="inline-block bg-gradient-to-r from-brand-600 via-accent-500 to-amber-600 text-white font-display font-bold text-lg sm:text-xl px-5 py-2.5 rounded-xl mb-6 shadow-lg shadow-orange-600/30">
                Capai Closing 2x Lipat Tanpa Boros Budget Iklan
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              {/* Sub-paragraph */}
              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed font-normal max-w-xl">
                Iklan sudah jalan tapi closing masih seret? Dalam <strong className="text-white font-semibold">90 menit</strong> intensif, bedah langsung titik kebocoran di landing page kamu dan terapkan strategi CRO teruji untuk menaikkan profit.
              </p>
            </SectionReveal>

            <SectionReveal delay={250}>
              {/* Integrated Countdown Timer in Left Column */}
              <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <CountdownTimer
                  targetDate={WEBINAR_DATE}
                  label="⏳ Promo early bird berakhir dalam:"
                />
              </div>
            </SectionReveal>

            <SectionReveal delay={300}>
              {/* Dual Action Buttons (Orange Theme) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <button
                  id="hero-cta"
                  onClick={onCtaClick}
                  className="bg-gradient-to-r from-brand-600 to-accent-500 hover:from-brand-500 hover:to-accent-400 text-white font-display font-bold text-base px-8 py-4 rounded-xl shadow-xl shadow-brand-600/30 hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Amankan Seat Sekarang</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={scrollToTestimonials}
                  className="bg-white/5 hover:bg-white/10 border border-white/15 text-white font-display font-bold text-base px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lihat Testimoni</span>
                  <ArrowRight className="w-4 h-4 opacity-60" />
                </button>
              </div>
            </SectionReveal>

            <SectionReveal delay={350}>
              {/* Micro-Proof Trust Checkmark Bar */}
              <div className="inline-flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-300 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-400" />
                  <span>1.000.000+ Orang Terinspirasi</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-400" />
                  <span>Telah Melatih 100.000+ Sales</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-orange-400" />
                  <span>Dipercaya 100+ Bisnis</span>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right Column — Showcase Image (checklist.webp) */}
          <div className="lg:col-span-5 relative">
            <SectionReveal delay={200}>
              <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/30 bg-dark-900/90 p-3 sm:p-4 shadow-2xl shadow-orange-500/20 group">
                {/* Floating Rating Tag on top right */}
                <div className="absolute top-6 right-6 z-20 bg-dark-950/80 border border-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-mono font-bold text-white shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span>4.9 / 5 Rating</span>
                </div>

                <div className="rounded-2xl overflow-hidden relative">
                  <img
                    src="/images/checklist.webp"
                    alt="Template Checklist CRO Audit & Ebook Guide"
                    className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-500"
                    loading="eager"
                    decoding="async"
                    width={600}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Feature Popover Callout */}
                <div className="mt-3 bg-white text-dark-950 rounded-2xl p-3.5 shadow-2xl flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600 flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Termasuk Template Checklist CRO Audit Siap Pakai
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Biasa digunakan konsultan PBM Agency untuk membedah landing page klien.
                    </p>
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
