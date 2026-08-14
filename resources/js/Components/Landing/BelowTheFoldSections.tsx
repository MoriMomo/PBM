import React from 'react';
import ClientLogosSection from './ClientLogosSection';
import PainPointsSection from './PainPointsSection';
import RootCauseSection from './RootCauseSection';
import ModulesSection from './ModulesSection';
import BonusSection from './BonusSection';
import SpeakerSection from './SpeakerSection';
import CaseStudySection from './CaseStudySection';
import TestimonialsSection from './TestimonialsSection';
import PricingSection from './PricingSection';
import FAQSection from './FAQSection';
import FinalCTASection from './FinalCTASection';
import FooterSection from './FooterSection';

interface BelowTheFoldSectionsProps {
  onModulesCta: () => void;
  onPricingCta: () => void;
  onFinalCta: () => void;
}

const SECTION_DIVIDER = (
  <div className="max-w-6xl mx-auto px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  </div>
);

export default function BelowTheFoldSections({
  onModulesCta,
  onPricingCta,
  onFinalCta,
}: BelowTheFoldSectionsProps) {
  return (
    <>
      {/* Client Trust Flash Logos Banner */}
      <ClientLogosSection />

      {SECTION_DIVIDER}

      {/* Pain Points Section */}
      <PainPointsSection />

      {/* Root Cause Section */}
      <RootCauseSection />

      {SECTION_DIVIDER}

      {/* Modules, Bonus, Speaker */}
      <ModulesSection onCtaClick={onModulesCta} />
      <BonusSection />
      <SpeakerSection />

      {SECTION_DIVIDER}

      {/* Case Study, Testimonials, Pricing, FAQ, Final CTA */}
      <CaseStudySection />
      <TestimonialsSection />
      <PricingSection onCtaClick={onPricingCta} />
      <FAQSection />
      <FinalCTASection onCtaClick={onFinalCta} />

      {/* Footer */}
      <FooterSection />
    </>
  );
}
