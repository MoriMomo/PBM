import React, { useState, useEffect } from 'react';
import CTAButton from './CTAButton';

interface NavbarProps {
  onCtaClick: () => void;
}

const NAV_LINKS = [
  { label: 'Masalah', href: '#pain-points' },
  { label: 'Materi', href: '#modules' },
  { label: 'Pembicara', href: '#speaker' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'Harga', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;

export default function Navbar({ onCtaClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-950/85 backdrop-blur-xl border-b border-white/[0.08] shadow-xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 flex items-center justify-center font-display font-black text-white text-base shadow-lg shadow-brand-600/30 group-hover:scale-105 transition-transform">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-base sm:text-lg text-white group-hover:text-brand-400 transition-colors">
              PBM Agency
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              CRO SPECIALIST
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 glass-card px-5 py-2 rounded-full border border-white/10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <CTAButton
          onClick={onCtaClick}
          size="sm"
          showArrow={false}
          id="navbar-cta"
        >
          Daftar Sekarang
        </CTAButton>
      </div>
    </header>
  );
}
