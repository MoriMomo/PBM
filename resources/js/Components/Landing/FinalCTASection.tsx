import React from 'react';
import { Clock, Zap } from 'lucide-react';
import SectionReveal from './SectionReveal';
import CTAButton from './CTAButton';

interface FinalCTASectionProps {
  onCtaClick: () => void;
}

export default function FinalCTASection({ onCtaClick }: FinalCTASectionProps) {
  return (
    <section id="final-cta" className="py-10 sm:py-14 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial-top pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <SectionReveal>
          <div className="glass-card-featured rounded-3xl p-8 sm:p-14 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-6">
              <Clock className="w-3.5 h-3.5" />
              SLOT EARLY BIRD TERBATAS
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4 leading-tight">
              Sampai Kapan Mau Biarkan Budget Iklan Kamu{' '}
              <span className="text-gradient-brand">Bocor Setiap Hari?</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Makin lama kamu tunda, makin banyak budget iklan yang terbuang tanpa hasil optimal.
              Luangkan 90 menit dan investasi Rp79.000 sekarang buat menghentikan kebocoran konversi di bisnismu.
            </p>

            {/* Mandatory CTA Button + Social Proof Subtext */}
            <CTAButton
              onClick={onCtaClick}
              size="lg"
              id="final-cta-btn"
              socialProof="⭐ Dipercaya 100+ Bisnis • Rating 4,9/5 • Garansi Kepuasan Sesi 100%"
            >
              Ikut Webinar & Perbaiki LP Saya
            </CTAButton>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              <span>Cuma Rp79.000, hemat Rp220.000 dari harga normal Rp299.000</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
