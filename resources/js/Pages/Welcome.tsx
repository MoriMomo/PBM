import React, { useEffect, useCallback, lazy, Suspense } from 'react';
import { Head } from '@inertiajs/react';
import { useAnalytics } from '../Hooks/useAnalytics';
import { useScrollTracking } from '../Hooks/useScrollTracking';
import { useDwellTime } from '../Hooks/useDwellTime';
import { initMetaPixel } from '../Services/metaPixel';
import { initClarity } from '../Services/clarity';

// Critical Above-the-Fold components (loaded synchronously for fast LCP/FCP)
import Navbar from '../Components/Landing/Navbar';
import HeroSection from '../Components/Landing/HeroSection';
import CheckoutModal from '../Components/Landing/CheckoutModal';

// Consolidated Below-the-Fold chunk (lazy-loaded as a SINGLE chunk to prevent main-thread TBT blocking and eliminate HTTP/1.1 waterfall)
const BelowTheFoldSections = lazy(
  () => import('../Components/Landing/BelowTheFoldSections')
);

const CONVERSION_LOCATIONS = new Set(['hero_cta', 'pricing_cta', 'final_cta']);

export default function Welcome() {
  const { trackEvent } = useAnalytics();
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  // Initialize tracking hooks
  useScrollTracking();
  useDwellTime();

  // Defer non-critical 3rd-party analytics (Meta Pixel & Clarity) until after initial paint / idle
  useEffect(() => {
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          initMetaPixel();
          initClarity();
        });
      } else {
        initMetaPixel();
        initClarity();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Central CTA click handler.
   */
  const handleCtaClick = useCallback(
    (locationId: string) => {
      trackEvent({
        event_type: 'cta_click',
        location_id: locationId,
      });

      // Open checkout modal for registration
      setIsCheckoutOpen(true);
    },
    [trackEvent]
  );

  // Stable location-specific handlers to avoid inline arrow functions in render
  const handleNavbarCta = useCallback(() => handleCtaClick('navbar_cta'), [handleCtaClick]);
  const handleHeroCta = useCallback(() => handleCtaClick('hero_cta'), [handleCtaClick]);
  const handleModulesCta = useCallback(() => handleCtaClick('modules_cta'), [handleCtaClick]);
  const handlePricingCta = useCallback(() => handleCtaClick('pricing_cta'), [handleCtaClick]);
  const handleFinalCta = useCallback(() => handleCtaClick('final_cta'), [handleCtaClick]);

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 font-sans selection:bg-brand-500/30 selection:text-white overflow-x-hidden">
      <Head>
        <title>
          Webinar The Silent Conversion Leak: Temukan Kebocoran Konversi di
          Funnel Iklan Kamu | PBM Agency
        </title>
        <meta
          name="description"
          content="Iklan sudah jalan tapi closing masih seret? Dalam 90 menit, pelajari cara menemukan kebocoran konversi yang menguras budget iklan kamu. Early bird Rp79.000. Live 6 September 2026."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Webinar The Silent Conversion Leak | PBM Agency"
        />
        <meta
          property="og:description"
          content="Temukan kebocoran konversi yang diam-diam menguras budget iklan kamu. Live webinar 90 menit, 6 September 2026."
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* Navbar - Critical above-the-fold */}
      <Navbar onCtaClick={handleNavbarCta} />

      {/* Main Landmark Area for Accessibility & SEO */}
      <main id="main-content" role="main">
        {/* Hero Section - Synchronous, zero delay, instant FCP/LCP paint */}
        <HeroSection onCtaClick={handleHeroCta} />

        {/* Consolidated Below-the-Fold sections */}
        <Suspense fallback={<div className="min-h-[600px] w-full" />}>
          <BelowTheFoldSections
            onModulesCta={handleModulesCta}
            onPricingCta={handlePricingCta}
            onFinalCta={handleFinalCta}
          />
        </Suspense>
      </main>

      {/* Webinar Registration Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
