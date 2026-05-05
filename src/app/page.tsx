import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'CG AutoEdge | Car Deal Negotiators — Get the Best Price on Your Next Car',
  description:
    'CG AutoEdge negotiates car deals on your behalf so you never overpay again. Expert negotiators, transparent pricing, guaranteed savings on new and used vehicles.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <HowItWorksSection />
      <ServicesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
