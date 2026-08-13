import React from 'react';
import { Award, Users, TrendingUp } from 'lucide-react';
import SectionReveal from './SectionReveal';

const CREDENTIALS = [
  {
    icon: Award,
    stat: '5+ Tahun',
    title: 'Pengalaman Practical',
    description: 'Fokus Digital Business & Conversion Rate Optimization (CRO)',
    gradient: 'from-amber-400 via-orange-400 to-amber-500',
    borderColor: 'border-amber-500/30 hover:border-amber-400/60',
    bgColor: 'bg-amber-500/5 hover:bg-amber-500/10',
    iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: TrendingUp,
    stat: '1,5x – 2x',
    title: 'Uplift Konversi Klien',
    description: 'Rata-rata kenaikan konversi landing page klien PBM Agency',
    gradient: 'from-emerald-400 via-teal-400 to-emerald-500',
    borderColor: 'border-emerald-500/30 hover:border-emerald-400/60',
    bgColor: 'bg-emerald-500/5 hover:bg-emerald-500/10',
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Users,
    stat: '20K+',
    title: 'Followers Instagram',
    description: 'Aktif mendukasi CRO & optimasi website di @justinwijaya_',
    gradient: 'from-brand-400 via-indigo-400 to-brand-500',
    borderColor: 'border-brand-500/30 hover:border-brand-400/60',
    bgColor: 'bg-brand-500/5 hover:bg-brand-500/10',
    iconColor: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
  },
] as const;

export default function SpeakerSection() {
  return (
    <section id="speaker" className="py-10 sm:py-14 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              PEMBICARA WEBINAR
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Belajar Langsung Dari Praktisi CRO
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Membangun website yang benar-benar menjual, bukan sekadar enak dilihat.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={100}>
          <div className="glass-card-featured rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Speaker Portrait */}
              <div className="flex-shrink-0 relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-orange-500/40 shadow-2xl shadow-orange-500/20 relative">
                  <img
                    src="/images/justin.jpg"
                    alt="Justin Wijaya, Founder PBM Agency & CRO Specialist"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={224}
                    height={224}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
                </div>
                {/* Co-host thumbnail pill */}
                <div className="absolute -bottom-3 -right-2 w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl bg-dark-900">
                  <img src="/images/tsan-thumb.png" alt="Tsan - Co-Practitioner PBM" className="w-full h-full object-cover" loading="lazy" decoding="async" width={56} height={56} />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-3 left-2 bg-gradient-to-r from-brand-600 to-accent-500 text-white font-mono text-[11px] font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                  CRO SPECIALIST
                </div>
              </div>

              {/* Bio Details */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                    Justin Wijaya
                  </h3>
                  <a
                    href="https://instagram.com/justinwijaya_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-brand-400 transition-colors bg-white/5 border border-white/10 px-3 py-1.5 rounded-full font-mono"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @justinwijaya_
                  </a>
                </div>

                <p className="text-brand-400 font-mono text-xs font-bold uppercase tracking-wider mb-4">
                  Founder PBM Agency • 19 Tahun • 5 Thn Digital Business & Web Dev
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Justin Wijaya (19 tahun) memiliki <span className="text-white font-bold underline decoration-brand-500/50 underline-offset-4">5 tahun pengalaman</span> di bidang digital business & freelance web development. Berfokus pada <span className="bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-md font-semibold border border-brand-500/30">Conversion Rate Optimization (CRO)</span> — membangun website yang benar-benar menjual, bukan cuma enak dilihat. Klien PBM Agency rata-rata mengalami <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-semibold border border-emerald-500/30">kenaikan konversi 1,5x hingga 2x</span>.
                </p>

                {/* Highlighted Credentials Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-white/10">
                  {CREDENTIALS.map((cred, idx) => {
                    const Icon = cred.icon;
                    return (
                      <div
                        key={idx}
                        className={`rounded-2xl p-4 text-left border ${cred.borderColor} ${cred.bgColor} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] shadow-lg group relative overflow-hidden`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-xl border ${cred.iconColor}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Large Standout Stat Number */}
                        <div className={`font-display text-2xl sm:text-3xl font-black bg-gradient-to-r ${cred.gradient} bg-clip-text text-transparent tracking-tight mb-1`}>
                          {cred.stat}
                        </div>

                        <h4 className="font-display text-xs font-bold text-white mb-1">
                          {cred.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {cred.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
