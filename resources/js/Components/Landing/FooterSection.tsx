import React from 'react';
import { ExternalLink } from 'lucide-react';

const NAV_FOOTER_LINKS = [
  { label: 'Masalah', href: '#pain-points' },
  { label: 'Materi', href: '#modules' },
  { label: 'Pembicara', href: '#speaker' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'Harga', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;

export default function FooterSection() {
  return (
    <footer
      id="footer"
      className="py-10 sm:py-12 px-4 sm:px-6 border-t border-white/[0.06] bg-dark-950/80"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center font-display font-black text-white text-xs shadow-md">
            P
          </div>
          <span className="font-display font-bold text-sm text-white">
            PBM Agency
          </span>
          <span className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} PBM Agency. All rights reserved.
          </span>
        </div>

        {/* Footer Nav Links */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-slate-400">
          {NAV_FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social */}
        <a
          href="https://instagram.com/justinwijaya_"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-brand-400 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          @justinwijaya_
        </a>
      </div>
    </footer>
  );
}
