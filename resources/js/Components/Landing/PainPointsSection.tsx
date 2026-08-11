import React from 'react';
import {
  TrendingDown,
  RefreshCw,
  Target,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import SectionReveal from './SectionReveal';

const PAIN_POINTS = [
  {
    icon: TrendingDown,
    title: 'CTR Iklan Bagus, Tapi Pas Dihitung CPA Malah Mencekik',
    description:
      'Di dashboard iklan angkanya kelihatan bagus dan hijau. Tapi begitu dihitung biaya dapet 1 pembeli (CPA), harganya mahal banget sampai profit bisnismu habis.',
    color: 'text-brand-400',
    bgColor: 'bg-brand-500/10',
    borderColor: 'border-brand-500/20',
    badge: 'Masalah #1',
  },
  {
    icon: RefreshCw,
    title: 'Sudah Ganti Desain & Copy LP Berulang Kali, Hasil Tetap Sama',
    description:
      'Sudah coba ganti angle iklan, ubah warna tombol, sampai tulis ulang teks di landing page. Tapi angka konversi tetap stagnan tanpa ada peningkatan.',
    color: 'text-accent-400',
    bgColor: 'bg-accent-500/10',
    borderColor: 'border-accent-500/20',
    badge: 'Masalah #2',
  },
  {
    icon: Target,
    title: 'Traffic Masuk Ramai, Tapi Cuma Numpang Lewat Tanpa Beli',
    description:
      'Visitor yang klik iklan lumayan banyak tiap hari. Tapi begitu masuk website, mereka cuma scroll sebentar lalu keluar lagi tanpa pernah menekan tombol order.',
    color: 'text-gold-400',
    bgColor: 'bg-gold-500/10',
    borderColor: 'border-gold-500/20',
    badge: 'Masalah #3',
  },
  {
    icon: HelpCircle,
    title: 'Bingung Mau Perbaiki Bagian Mana Dulu Tanpa Data',
    description:
      'Banyak dengar saran acak dari luar, tapi kamu sendiri bingung bagian mana di landing page yang sebenarnya bikin calon pembeli kabur.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    badge: 'Masalah #4',
  },
] as const;

export default function PainPointsSection() {
  return (
    <section id="pain-points" className="py-10 sm:py-14 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              <AlertCircle className="w-3.5 h-3.5" />
              CEK KONDISI FUNNEL KAMU
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Pernah Mengalami Salah Satu Dari Hal Ini?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Kalau kamu ngerasain salah satu dari 4 kondisi di bawah ini, kemungkinan besar
              landing page kamu punya titik bocor yang belum terdeteksi.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {PAIN_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <SectionReveal key={index} delay={index * 100}>
                <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 transition-all duration-300 h-full group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${point.bgColor} border ${point.borderColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg`}
                    >
                      <Icon className={`w-6 h-6 ${point.color}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {point.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-2.5 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
