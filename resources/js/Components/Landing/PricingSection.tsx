import React from 'react';
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import SectionReveal from './SectionReveal';
import CTAButton from './CTAButton';
import CountdownTimer from './CountdownTimer';

interface PricingSectionProps {
  onCtaClick: () => void;
}

// Webinar date: 6 September 2026, 19:00 WIB (UTC+7)
const WEBINAR_DATE = new Date('2026-09-06T12:00:00Z');

const INCLUDED_ITEMS = [
  'Live Session 90 Menit via Zoom (6 September 2026, 19:00 WIB)',
  'Rekaman Video HD Akses Selamanya (Bisa ditonton ulang kapan pun)',
  'Ebook Pelengkap: "Iklan Sudah Jalan, Tapi Kok Tetap Boncos?"',
  'Akses Q&A Langsung dengan Mentor (Bawa kondisi funnel bisnismu)',
  'Bonus Kesempatan Booking Sesi Personal Landing Page Audit (GRATIS)',
  'Semua Bonus Terhitung Termasuk Dalam Harga Early Bird Ini',
] as const;

export default function PricingSection({ onCtaClick }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-10 sm:py-14 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial-top pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              INVESTASI HEMAT EARLY BIRD
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Amankan Slot Early Bird{' '}
              <span className="text-gradient-brand">Sebelum Kuota Habis</span>
            </h2>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <div className="glass-card-featured rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent" />

            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 text-brand-300 px-4 py-2 rounded-full text-xs sm:text-sm font-mono font-bold">
                <Zap className="w-4 h-4 text-brand-400" />
                HARGA PROMO EARLY BIRD: HEMAT Rp220.000!
              </span>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="font-mono text-lg sm:text-xl text-slate-500 line-through font-medium">
                  Rp299.000
                </span>
                <span className="font-mono bg-brand-500/20 border border-brand-500/30 text-brand-400 text-xs font-bold px-3 py-1 rounded-full">
                  DISKON 73%
                </span>
              </div>
              <div className="font-mono text-5xl sm:text-6xl font-black text-white tracking-tight text-gradient-silver">
                Rp79.000
              </div>
              <p className="text-sm text-slate-400 mt-2">
                Sekali bayar • Akses rekaman selamanya • Tanpa biaya tersembunyi
              </p>
            </div>

            <div className="space-y-3 mb-8 bg-dark-900/60 border border-white/10 rounded-2xl p-5">
              {INCLUDED_ITEMS.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Mandatory CTA Button + Social Proof Subtext */}
            <CTAButton
              onClick={onCtaClick}
              size="lg"
              id="pricing-cta"
              className="w-full"
              socialProof="🔒 Pembayaran Aman • Garansi Kepuasan Sesi 100%"
            >
              Daftar Sekarang (Rp79.000)
            </CTAButton>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garansi kepuasan 100% — materi praktis teruji dari pengalaman 100+ projek CRO</span>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={200}>
          <div className="mt-10 sm:mt-12">
            <CountdownTimer
              targetDate={WEBINAR_DATE}
              label="⏳ Promo early bird berakhir dalam:"
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
