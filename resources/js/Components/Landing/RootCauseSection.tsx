import React from 'react';
import {
  Megaphone,
  LayoutTemplate,
  Tag,
  Users,
  Lightbulb,
} from 'lucide-react';
import SectionReveal from './SectionReveal';

const ROOT_CAUSES = [
  {
    number: '01',
    icon: Megaphone,
    title: 'Pesan di Iklan & Landing Page Nggak Nyambung',
    description:
      'Apa yang dijanjiin di iklan sering kali beda dengan apa yang pertama kali dilihat visitor pas baru masuk landing page, bikin mereka bingung dan kabur.',
    color: 'from-brand-500 to-brand-600',
  },
  {
    number: '02',
    icon: LayoutTemplate,
    title: 'Landing Page Bikin Ragu, Bukan Bikin Yakin',
    description:
      'Susunan informasi, visual, dan bukti sosial belum cukup kuat buat ngilangin rasa ragu calon pembeli pas mau ambil keputusan.',
    color: 'from-accent-500 to-accent-600',
  },
  {
    number: '03',
    icon: Tag,
    title: 'Penawaran Kamu Belum Kelihatan Jelas Bedanya',
    description:
      'Visitor belum nangkap kenapa produk kamu jauh lebih berharga dan worth it dibanding opsi lain yang ada di pasar.',
    color: 'from-gold-400 to-gold-500',
  },
  {
    number: '04',
    icon: Users,
    title: 'Proses Order Terlalu Panjang & Membingungkan',
    description:
      'Langkah buat checkout atau hubungi admin terlalu ribet, bikin calon pembeli batal beli padahal niatnya udah ada.',
    color: 'from-purple-400 to-purple-500',
  },
] as const;

export default function RootCauseSection() {
  return (
    <section id="root-cause" className="py-10 sm:py-14 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-accent-500/10 border border-accent-500/20 text-accent-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              AKAR MASALAH
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              4 Penyebab Utama Kenapa{' '}
              <span className="text-gradient-brand">Konversi Landing Page Bocor</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Kebocoran konversi itu ada pola dan jejak datanya. Begitu kamu tahu cara bacanya,
              perbaikannya jadi jauh lebih gampang dan tepat sasaran.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {ROOT_CAUSES.map((cause, index) => {
            const Icon = cause.icon;
            return (
              <SectionReveal key={index} delay={index * 100}>
                <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 transition-all duration-300 h-full group relative overflow-hidden">
                  <span className="absolute top-2 right-4 font-mono text-6xl font-black text-white/[0.04] select-none">
                    {cause.number}
                  </span>

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cause.color} flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                        {cause.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {cause.description}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        {/* Key insight callout */}
        <SectionReveal delay={500}>
          <div className="mt-10 sm:mt-14 max-w-2xl mx-auto">
            <div className="glass-card-featured rounded-3xl p-6 sm:p-8 text-center border-l-4 border-l-brand-500">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-gold-400" />
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                Semua titik bocor ini bisa{' '}
                <strong className="text-white font-semibold">
                  didiagnosa dari data analitik landing page kamu sendiri
                </strong>
                . Nggak perlu tebak-tebakan lagi bagian mana yang harus diperbaiki.
              </p>
              <p className="text-xs font-mono text-brand-400 mt-3 font-semibold uppercase tracking-wider">
                Inilah Yang Akan Kita Bedah Tuntas Di Webinar ↓
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
