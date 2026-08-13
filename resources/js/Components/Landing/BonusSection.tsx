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
    value: 'Rp150.000',
  },
  {
    icon: BookOpen,
    title: 'Ebook "Iklan Jalan, Kok Boncos?" & Checklist Audit CRO',
    description:
      'Panduan praktik memperbaiki alur penawaran, dilengkapi dengan lembar checklist acuan kerja siap pakai yang biasa digunakan tim konsultan PBM Agency.',
    tag: 'Ebook & Template',
    color: 'text-accent-400',
    bgColor: 'bg-accent-500/10',
    value: 'Rp399.000',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Sesi Tanya Jawab & Konsultasi Langsung',
    description:
      'Bawa langsung studi kasus atau landing page bisnismu untuk ditanyakan dan didiagnosa langsung oleh mentor secara spesifik saat live.',
    tag: 'Sesi Interaktif',
    color: 'text-gold-400',
    bgColor: 'bg-gold-500/10',
    value: 'Rp199.000',
  },
  {
    icon: Microscope,
    title: 'Kesempatan Booking Sesi LP Audit Personal (GRATIS)',
    description:
      'Kesempatan eksklusif untuk mengajukan audit landing page secara privat oleh tim CRO PBM Agency untuk mendapatkan rekomendasi perbaikan spesifik.',
    tag: 'Bonus Spesial',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    value: 'Rp300.000',
  },
] as const;

export default function BonusSection() {
  return (
    <section id="bonuses" className="pt-6 sm:pt-10 pb-14 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-14">
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

        {/* Divided list instead of a card grid */}
        <div className="border-t border-white/[0.08]">
          {BONUSES.map((bonus, index) => {
            const Icon = bonus.icon;
            return (
              <SectionReveal key={index} delay={index * 100}>
                <div className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 py-6 sm:py-7 border-b border-white/[0.08]">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-2xl ${bonus.bgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`w-5 h-5 ${bonus.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5">
                      <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                        {bonus.title}
                      </h3>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-widest ${bonus.bgColor} ${bonus.color} px-2.5 py-1 rounded-full`}
                      >
                        {bonus.tag}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                      {bonus.description}
                    </p>
                  </div>

                  {/* Value + status */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1.5 flex-shrink-0 sm:w-36 sm:text-right pt-1">
                    <span className="font-mono text-slate-500 text-xs">
                      Value: {bonus.value}
                    </span>
                    <span className="text-emerald-400 font-semibold font-mono text-xs whitespace-nowrap">
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