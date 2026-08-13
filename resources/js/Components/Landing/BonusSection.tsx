import React from 'react';
import {
  Video,
  BookOpen,
  MessageCircleQuestion,
  Microscope,
  Gift,
} from 'lucide-react';
import SectionReveal from './SectionReveal';

const BONUSES = [
  {
    icon: Video,
    title: 'Akses Live Session 90 Menit + Rekaman Selamanya',
    description:
      'Dapatkan akses penuh ke sesi live Zoom serta rekaman video HD berkualitas tinggi yang dapat kamu tonton ulang kapan pun tanpa batas waktu.',
    tag: 'Fasilitas Utama',
    color: 'text-brand-400',
    bgColor: 'bg-brand-500/10',
    value: 'Value: Rp150.000',
  },
  {
    icon: BookOpen,
    title: 'Ebook "Iklan Sudah Jalan, Tapi Kok Tetap Boncos?"',
    description:
      'Ebook pelengkap panduan digital pendamping webinar berisi materi praktik memperbaiki konversi & alur penawaran di landing page.',
    tag: 'Ebook Pelengkap',
    color: 'text-accent-400',
    bgColor: 'bg-accent-500/10',
    value: 'Value: Rp99.000',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Sesi Tanya Jawab & Konsultasi Langsung',
    description:
      'Bawa langsung studi kasus atau landing page bisnismu untuk ditanyakan dan didiagnosa langsung oleh mentor secara spesifik saat live.',
    tag: 'Sesi Interaktif',
    color: 'text-gold-400',
    bgColor: 'bg-gold-500/10',
    value: 'Value: Rp199.000',
  },
  {
    icon: Microscope,
    title: 'Kesempatan Booking Sesi LP Audit Personal (GRATIS)',
    description:
      'Kesempatan eksklusif untuk mengajukan audit landing page secara privat oleh tim CRO PBM Agency untuk mendapatkan rekomendasi perbaikan spesifik.',
    tag: 'Bonus Spesial',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    value: 'Value: Rp300.000',
  },
] as const;

export default function BonusSection() {
  return (
    <section id="bonuses" className="pt-6 sm:pt-10 pb-14 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 text-gold-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              <Gift className="w-3.5 h-3.5" />
              TERMASUK DALAM INVESTASI RP79.000
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Semua Paket Pembelajaran Yang Kamu Dapatkan
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Bukan hanya sekadar webinar biasa, kamu mendapatkan materi lengkap,
              panduan eksekusi, serta kesempatan konsultasi langsung.
            </p>
          </div>
        </SectionReveal>

        {/* Checklist & Material Preview Banner */}
        <SectionReveal delay={50}>
          <div className="glass-card-featured rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <img
                src="/images/checklist.webp"
                alt="Template Checklist CRO Audit & Ebook Guide"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                width={600}
                height={380}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="w-full md:w-1/2 text-left">
              <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 px-3 py-1 rounded-full text-xs font-mono font-bold mb-3">
                🎁 DIBAGIKAN SAAT WEBINAR
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white mb-2">
                Checklist Audit CRO & Template Pembedahan Landing Page
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Kamu tidak perlu bingung mulai dari mana. Dapatkan lembar acuan kerja (*checklist*) siap pakai yang biasa digunakan tim konsultan PBM Agency untuk membedah landing page klien.
              </p>
              <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold">
                <span>✓ Value Rp300.000+ (Gratis untuk Peserta)</span>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {BONUSES.map((bonus, index) => {
            const Icon = bonus.icon;
            return (
              <SectionReveal key={index} delay={index * 100}>
                <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 transition-all duration-300 h-full group relative flex flex-col justify-between">
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-11 h-11 rounded-2xl ${bonus.bgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className={`w-5 h-5 ${bonus.color}`} />
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest ${bonus.bgColor} ${bonus.color} px-2.5 py-1 rounded-full`}
                      >
                        {bonus.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2.5 leading-snug">
                      {bonus.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {bonus.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 font-semibold">
                      {bonus.value}
                    </span>
                    <span className="text-emerald-400 font-semibold font-mono">
                      ✓ SUDAH TERMASUK
                    </span>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
