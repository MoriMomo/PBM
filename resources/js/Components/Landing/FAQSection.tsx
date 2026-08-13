import React, { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionReveal from './SectionReveal';

const FAQS = [
  {
    question: 'Webinar ini cocok untuk siapa?',
    answer:
      'Pemilik bisnis dan marketer yang sudah menjalankan iklan dengan metrik yang terlihat "sehat" (CTR bagus, CPC wajar), tapi biaya per pembelian (CPA) tetap tinggi dan closing masih seret. Kalau kamu merasa sudah coba banyak hal tapi hasilnya belum berubah, webinar ini dirancang untuk situasi itu.',
  },
  {
    question: 'Bagaimana format webinarnya?',
    answer:
      'Live 90 menit via Zoom. Kamu bisa bertanya langsung selama sesi berlangsung. Setelah live selesai, rekaman full akan dikirimkan dan bisa kamu tonton ulang kapan saja tanpa batas waktu akses.',
  },
  {
    question: 'Saya bukan orang teknis, apakah bisa mengikuti?',
    answer:
      'Bisa. Materi dirancang untuk pemilik bisnis dan marketer, bukan untuk developer. Fokusnya di cara membaca data dan membuat keputusan, bukan coding atau setup teknis.',
  },
  {
    question: 'Apa bedanya dengan konten gratis tentang CRO yang sudah banyak?',
    answer:
      'Konten gratis biasanya generik: "perbaiki headline", "tambah testimoni", dll. Di webinar ini, kamu akan belajar framework diagnosa yang spesifik: cara membaca data landing page kamu sendiri untuk menemukan di mana letak masalahnya, lalu memperbaikinya berdasarkan data, bukan tebak-tebakan.',
  },
  {
    question: 'Apakah ada rekaman kalau saya tidak bisa hadir live?',
    answer:
      'Ya. Rekaman full webinar akan dikirimkan setelah sesi live selesai. Tapi kami sangat menyarankan hadir live agar kamu bisa ikut sesi tanya jawab langsung dan membawa kasus bisnismu sendiri.',
  },
  {
    question: 'Harga Rp79.000 ini termasuk semua bonus?',
    answer:
      'Ya. Dengan Rp79.000 kamu mendapatkan: live session 90 menit, rekaman webinar, ebook pelengkap, akses tanya jawab langsung, dan kesempatan booking sesi Landing Page Audit personal gratis. Tidak ada biaya tambahan.',
  },
] as const;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Rule 5.5: Functional update form for setState
  const toggle = useCallback((index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  }, []);

  return (
    <section id="faq" className="py-10 sm:py-14 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-950/90 pointer-events-none" />
      <div className="relative max-w-3xl mx-auto z-10">
        <SectionReveal>
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-slate-400 text-sm font-semibold tracking-wide uppercase mb-3">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Pertanyaan yang Sering Ditanyakan
            </h2>
          </div>
        </SectionReveal>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <SectionReveal key={index} delay={index * 60}>
                <div className="glass-card rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                    id={`faq-${index}`}
                  >
                    <span className="text-sm sm:text-[15px] font-semibold text-white group-hover:text-brand-400 transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brand-400' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-slate-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
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
