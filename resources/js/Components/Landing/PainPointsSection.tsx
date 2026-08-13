import React from 'react';
import { AlertCircle, CheckCircle2, X, Sparkles, ArrowDownRight, ShieldAlert } from 'lucide-react';
import SectionReveal from './SectionReveal';

const PAIN_POINTS = [
  'Iklan kelihatan sehat (CTR bagus, CPC murah), tapi biaya per pembelian (CPA) tetap mahal mencekik',
  'Landing page menahan calon pembeli, bukan mendorong mereka untuk checkout',
  'Sudah ganti kreatif iklan & landing page berkali-kali, tapi belum ada perubahan berarti',
  'Bingung harus mulai membenahi dari mana & dapat saran yang berbeda-beda tanpa diagnosa pasti',
] as const;

const ROOT_CAUSES = [
  {
    num: '01',
    title: 'Iklan Belum Tervalidasi',
    desc: 'Kreatif & angle iklan belum menarik audiens yang benar-benar tepat',
  },
  {
    num: '02',
    title: 'Landing Page Menahan, Bukan Mendorong',
    desc: 'Tampilan & alur halaman buat visitor ragu, bukan makin yakin beli',
  },
  {
    num: '03',
    title: 'Penawaran Belum Pas (Offer Misalignment)',
    desc: 'Harga atau bentuk penawaran belum sesuai ekspektasi audiens yang mendarat',
  },
  {
    num: '04',
    title: 'Kualitas Traffic Menurun',
    desc: 'Yang menglik iklan makin ramai, tapi yang benar-benar butuh makin sedikit',
  },
] as const;

const UNFIXED_CONSEQUENCES = [
  'Conversion rate tidak bergerak & stagnan bulan demi bulan',
  'Target sales terus meleset sementara budget iklan makin membengkak',
  'Burnt out karena harus selalu perbaiki LP sendiri tanpa acuan pasti',
  'Budget perbaikan sudah keluar banyak, tapi hasil tetap boncos',
] as const;

export default function PainPointsSection() {
  return (
    <section id="pain-points" className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <ShieldAlert className="w-3.5 h-3.5" />
              PEMBEDAHAN KEBOCORAN FUNNEL
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
              Mengapa Budget Iklan Kamu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">
                Terus Bocor Tanpa Hasil?
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
              Pahami keterhubungan antara gejala yang kamu alami, 4 akar penyebab utamanya, serta solusi presisi untuk menghentikan kebocoran konversi di bisnismu.
            </p>
          </div>
        </SectionReveal>

        {/* Unified Grid Part 1: Gejala vs 4 Akar Penyebab */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-10">
          
          {/* Left Box: Gejala Yang Kamu Rasakan */}
          <div className="lg:col-span-6 flex flex-col">
            <SectionReveal className="h-full">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-red-500/20 bg-dark-900/90 h-full flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500/40 via-orange-500/40 to-transparent" />
                
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      GEJALA YANG KAMU ALAMI
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">Kondisi Funnel Saat Ini</span>
                  </div>

                  <div className="space-y-4">
                    {PAIN_POINTS.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3.5 pb-3.5 ${
                          idx !== PAIN_POINTS.length - 1 ? 'border-b border-white/[0.06]' : ''
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-slate-400">
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                  <span>Ini menandakan ada kebocoran konversi di titik kritis funnel kamu.</span>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right Box: 4 Akar Penyebab Utama */}
          <div className="lg:col-span-6 flex flex-col">
            <SectionReveal delay={100} className="h-full">
              <div className="glass-card-featured rounded-3xl p-6 sm:p-8 border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-dark-900/90 to-dark-950 h-full flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-transparent" />

                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      4 AKAR PENYEBAB UTAMA
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">Data Landing Page</span>
                  </div>

                  <div className="space-y-3">
                    {ROOT_CAUSES.map((cause, idx) => (
                      <div key={idx} className="bg-dark-900/80 border border-white/10 rounded-2xl p-3.5 transition-all duration-300 hover:border-orange-500/30">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 rounded-lg">
                            {cause.num}
                          </span>
                          <h4 className="font-display text-xs sm:text-sm font-bold text-white">
                            {cause.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 pl-9 font-normal">
                          {cause.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-[11px] text-slate-400 italic">
                  *Semua penyebab ini dapat didiagnosa langsung dari data landing page kamu sendiri.
                </p>
              </div>
            </SectionReveal>
          </div>

        </div>

        {/* Connected Banner Part 2: Dampak Jika Dibiarkan ➔ Solusi Presisi 90 Menit */}
        <SectionReveal delay={200}>
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden relative shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Side: Dampak Jika Dibiarkan */}
              <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <span>Kalau kebocoran ini</span>
                  <span className="text-red-400 underline decoration-red-500/40">dibiarkan terus...</span>
                </h3>

                <div className="space-y-3.5">
                  {UNFIXED_CONSEQUENCES.map((consequence, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-400">
                        <X className="w-3 h-3" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                        {consequence}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Solusi Presisi — Funnel Kamu Capable */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                  Padahal Funnel Kamu{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                    SANGAT CAPABLE!
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  Yang kurang bukan budget iklan kamu. Yang kurang hanya <strong className="text-white">framework CRO & diagnosa presisi</strong> untuk membaca data landing page kamu sendiri — tanpa perlu tebak-tebakan lagi.
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-orange-400 tracking-wider uppercase bg-orange-500/15 border border-orange-500/30 px-4 py-2.5 rounded-2xl w-fit shadow-lg">
                  <Sparkles className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>DAN SEMUA INI BISA KAMU PELAJARI DALAM 90 MENIT.</span>
                </div>
              </div>

            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
