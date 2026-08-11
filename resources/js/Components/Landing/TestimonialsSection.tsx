import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, TrendingUp, Quote, CheckCircle2, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionReveal from './SectionReveal';

const TESTIMONIALS = [
  {
    name: 'Fullbright Participant',
    role: 'Digital Business Owner & Agency Partner',
    quote:
      'Kelihatan banget bedanya pas landing page diperbaiki pake checklist CRO! Konversi registrasi naik 2,4x lipat dalam minggu pertama dan biaya CPA turun drastis.',
    metric: 'Closing Rate ➔ 2.4x Lipat',
    metricDetail: 'Bukti Chat WA Live Session',
    avatar: 'FB',
    highlight: true,
    image: '/images/fullbright.jpeg',
  },
  {
    name: 'Tsania Latheefa',
    role: 'Content Creator (52.8K Followers)',
    quote:
      'Setelah bedah dan optimasi landing page bareng Justin, omset naik dari Rp20 juta jadi Rp30 juta per bulan. Perbedaannya terasa banget di alur pesan yang jauh lebih jelas buat audiens.',
    metric: 'Omset Rp20Jt ➔ Rp30Jt/Bln',
    metricDetail: '+50% Kenaikan Omset',
    avatar: 'TL',
    highlight: false,
    image: null,
  },
  {
    name: 'Klien E-Commerce PBM',
    role: 'Pemilik Bisnis E-Commerce',
    quote:
      'ROAS naik jadi 5x, purchase meningkat langsung terlihat dari landing page checkout. Kenaikan ini di luar pola musiman biasa, memang murni hasil dari optimasi landing page.',
    metric: 'ROAS Naik ➔ 5.0x',
    metricDetail: 'Hasil Konfirmasi Chat WA',
    avatar: 'KP',
    highlight: false,
    image: null,
  },
  {
    name: 'Alumni Lead Gen Agency',
    role: 'Digital Marketing Lead',
    quote:
      'Dulu CPA iklan mahal banget 90rb per lead. Pas landing page di-audit & diperbaiki hirarki penawarannya, CPA turun ke 32rb per lead. Hemat puluhan juta budget iklan!',
    metric: 'CPA Iklan ➔ Turun -64%',
    metricDetail: 'Optimasi Lead Gen Funnel',
    avatar: 'AL',
    highlight: false,
    image: null,
  },
] as const;

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = TESTIMONIALS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }

    touchStartX.current = null;
  };

  return (
    <section id="testimonials" className="py-10 sm:py-16 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-mono mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              BUKTI KREDIBILITAS & CHAT WA REAL
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
              Hasil Nyata Dari Optimasi Landing Page
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Geser kartu di bawah ini untuk melihat bukti chat WhatsApp dan hasil nyata yang dirasakan oleh alumni & klien kami.
            </p>
          </div>
        </SectionReveal>

        {/* Carousel Outer Container */}
        <div
          className="relative px-0 sm:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrow Buttons (Desktop & Tablet) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-dark-900/90 border border-white/15 text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-xl hidden sm:flex items-center justify-center cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-dark-900/90 border border-white/15 text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-xl hidden sm:flex items-center justify-center cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Cards Viewport */}
          <div className="overflow-hidden py-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2 sm:px-3">
                  <div
                    className={`glass-card rounded-3xl p-6 sm:p-8 h-full flex flex-col justify-between max-w-2xl mx-auto relative overflow-hidden transition-all duration-300 ${
                      item.highlight
                        ? 'border-orange-500/40 bg-gradient-to-b from-orange-500/10 via-dark-900/90 to-dark-950 shadow-2xl shadow-orange-500/10 ring-1 ring-orange-500/20'
                        : 'border-white/10'
                    }`}
                  >
                    <div>
                      {/* Top Screenshot Banner if available */}
                      {item.image && (
                        <div className="mb-5 rounded-2xl overflow-hidden border border-orange-500/30 shadow-lg relative group max-h-56">
                          <img
                            src={item.image}
                            alt={`Bukti Chat WhatsApp Testimoni ${item.name}`}
                            className="w-full h-52 object-cover object-top transform group-hover:scale-103 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                            width={600}
                            height={300}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
                          <span className="absolute bottom-3 left-3 bg-emerald-500/90 text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow backdrop-blur-sm">
                            💬 Bukti Chat WA Real
                          </span>
                        </div>
                      )}

                      {/* Rating stars */}
                      <div className="flex items-center gap-1 mb-4 text-gold-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4.5 h-4.5 fill-gold-400 text-gold-400" />
                        ))}
                        <span className="ml-2 font-mono text-xs font-bold text-slate-300">5.0 / 5.0</span>
                      </div>

                      {/* Quote */}
                      <div className="relative mb-6">
                        <Quote className="w-10 h-10 text-white/5 absolute -top-3 -left-3 pointer-events-none" />
                        <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic relative z-10 font-normal">
                          "{item.quote}"
                        </p>
                      </div>
                    </div>

                    <div>
                      {/* Metric Pill */}
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 mb-6 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-sm text-emerald-400 font-bold block">
                            {item.metric}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {item.metricDetail}
                          </span>
                        </div>
                        <TrendingUp className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                      </div>

                      {/* Author Bio */}
                      <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
                        <div className="w-11 h-11 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center font-mono text-xs font-bold text-orange-300 flex-shrink-0">
                          {item.avatar}
                        </div>
                        <div>
                          <h4 className="font-display text-base font-bold text-white flex items-center gap-1.5">
                            <span>{item.name}</span>
                            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-400 leading-snug">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Pagination Dots & Controls */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-orange-400 to-amber-500'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
