import React, { useState } from 'react';
import { X, User, Mail, Phone, ShieldCheck, ArrowRight, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import axios from 'axios';
import { trackPixelEvent } from '../../Services/metaPixel';
import { useAnalytics } from '../../Hooks/useAnalytics';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { trackEvent } = useAnalytics();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !whatsapp.trim()) {
      setErrorMsg('Mohon lengkapi semua kolom pendaftaran.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Client-side Meta Pixel Tracking
      trackPixelEvent('InitiateCheckout', {
        value: 79000,
        currency: 'IDR',
        content_name: 'Webinar Bedah Landing Page CRO',
      });
      trackPixelEvent('Lead', {
        content_name: 'Webinar Registration Form',
      });

      // Submit to backend
      const response = await axios.post('/checkout/register', {
        name,
        email,
        whatsapp,
      });

      const redirectUrl = response.data?.redirect_url || response.data?.payment_url;

      if (response.data?.success && redirectUrl) {
        // Track first-party conversion event
        trackEvent({
          event_type: 'conversion',
          location_id: 'checkout_modal',
        });

        // Redirect to Duitku payment page
        window.location.href = redirectUrl;
        onClose();
        // Reset form
        setName('');
        setEmail('');
        setWhatsapp('');
      } else {
        setErrorMsg('Terjadi kesalahan. Silakan coba lagi.');
      }
    } catch (err: any) {
      console.error('Registration failed:', err);
      setErrorMsg(err.response?.data?.message || 'Gagal menyimpan data pendaftaran. Silakan periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-950/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-dark-900 border border-orange-500/30 p-6 sm:p-8 shadow-2xl shadow-orange-500/20 text-left overflow-hidden group"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow Decorator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-colors cursor-pointer"
          aria-label="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SLOT EARLY BIRD RP79.000</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            Lengkapi Data Pendaftaran
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Isi data di bawah ini untuk mendapatkan akses Live Zoom & pembayaran resmi Duitku.
          </p>
        </div>

        {/* Benefits Summary checklist */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 mb-6 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span>Akses Live Webinar 90 Menit (6 September 2026)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span>Rekaman Kualitas HD Akses Selamanya</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <span>Bonus Template Checklist CRO Audit Siap Pakai</span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Justin Wijaya"
                className="w-full bg-dark-950 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Alamat Email Aktif
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full bg-dark-950 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="081234567890"
                className="w-full bg-dark-950 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-brand-600 to-accent-500 hover:from-brand-500 hover:to-accent-400 text-white font-display font-bold text-sm py-4 rounded-xl shadow-xl shadow-brand-600/30 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menghubungkan ke Duitku...</span>
              </>
            ) : (
              <>
                <span>Lanjut ke Pembayaran (Rp79.000)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Security Footer */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Data Terenkripsi 256-bit • Duitku Payment Gateway (QRIS, VA Bank, E-Wallet)</span>
        </div>
      </div>
    </div>
  );
}
