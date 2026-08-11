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
import ClientLogosSection from '../Components/Landing/ClientLogosSection';
import PainPointsSection from '../Components/Landing/PainPointsSection';
import RootCauseSection from '../Components/Landing/RootCauseSection';
import CheckoutModal from '../Components/Landing/CheckoutModal';

// Below-the-Fold components (lazy-loaded via React.lazy for code splitting)
const ModulesSection = lazy(() => import('../Components/Landing/ModulesSection'));
const BonusSection = lazy(() => import('../Components/Landing/BonusSection'));
const SpeakerSection = lazy(() => import('../Components/Landing/SpeakerSection'));
const CaseStudySection = lazy(() => import('../Components/Landing/CaseStudySection'));
const TestimonialsSection = lazy(() => import('../Components/Landing/TestimonialsSection'));
const PricingSection = lazy(() => import('../Components/Landing/PricingSection'));
const FAQSection = lazy(() => import('../Components/Landing/FAQSection'));
const FinalCTASection = lazy(() => import('../Components/Landing/FinalCTASection'));
const FooterSection = lazy(() => import('../Components/Landing/FooterSection'));

// Hoist static JSX divider element outside component to avoid allocations
const SECTION_DIVIDER = (
  <div className="max-w-6xl mx-auto px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  </div>
);

// Lightweight fallback placeholder for lazy-loaded sections
const SectionFallback = () => <div className="min-h-[150px] w-full" />;

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
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Central CTA click handler.
   */
  const handleCtaClick = useCallback(
    (locationId: string) => {
      const isConversion = CONVERSION_LOCATIONS.has(locationId);

      trackEvent({
        event_type: isConversion ? 'conversion' : 'cta_click',
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

      {/* Navbar */}
      <Navbar onCtaClick={handleNavbarCta} />

      {/* Main Landmark Area for Accessibility & SEO */}
      <main id="main-content" role="main">
        {/* Hero Section */}
        <HeroSection onCtaClick={handleHeroCta} />

        {/* Client Trust Flash Logos Banner (Reference: pbmagency.id) */}
        <ClientLogosSection />

        {SECTION_DIVIDER}

        {/* Pain Points Section */}
        <PainPointsSection />

        {/* Root Cause Section */}
        <RootCauseSection />

        {SECTION_DIVIDER}

        {/* Below-the-Fold Lazy Loaded Sections */}
        <Suspense fallback={<SectionFallback />}>
          <ModulesSection onCtaClick={handleModulesCta} />
          <BonusSection />
          <SpeakerSection />
        </Suspense>

        {SECTION_DIVIDER}

        <Suspense fallback={<SectionFallback />}>
          <CaseStudySection />
          <TestimonialsSection />
          <PricingSection onCtaClick={handlePricingCta} />
          <FAQSection />
          <FinalCTASection onCtaClick={handleFinalCta} />
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback />}>
        <FooterSection />
      </Suspense>

      {/* Webinar Registration Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
