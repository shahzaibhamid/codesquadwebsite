'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import LoadingScreen from '@/components/loading-screen';
import Navigation from '@/components/navigation';
import Hero from '@/components/hero';

// Lazy load heavy components for better performance
const Clients = lazy(() => import('@/components/clients'));
const About = lazy(() => import('@/components/about'));
const Services = lazy(() => import('@/components/services'));
const CaseStudies = lazy(() => import('@/components/case-studies'));
const Industries = lazy(() => import('@/components/industries'));
const Resources = lazy(() => import('@/components/resources'));
const CTASection = lazy(() => import('@/components/cta-section'));
const Contact = lazy(() => import('@/components/contact'));
const FAQ = lazy(() => import('@/components/faq'));
const Footer = lazy(() => import('@/components/footer'));
const LiveChat = lazy(() => import('@/components/live-chat'));
const CookieConsent = lazy(() => import('@/components/cookie-consent'));

// Simple loading fallback
const SectionFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduce loading time from 1.5s to 0.5s for better UX
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <LoadingScreen isVisible={isLoading} />
      <Navigation />
      <main className="flex-1 pb-4">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Clients />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CaseStudies />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Industries />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Resources limit={3} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQ />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <LiveChat />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CookieConsent />
      </Suspense>
    </div>
  );
}
