'use client';

import { Suspense, lazy } from 'react';
import Navigation from '@/components/navigation';
import Hero from '@/components/hero';

// Lazy load heavy components for better performance
const Clients = lazy(() => import('@/components/clients'));
const Services = lazy(() => import('@/components/services'));
const CaseStudies = lazy(() => import('@/components/case-studies'));
const Team = lazy(() => import('@/components/team'));
const GetStartedSection = lazy(() => import('@/components/get-started-section'));
const Footer = lazy(() => import('@/components/footer'));
const CookieConsent = lazy(() => import('@/components/cookie-consent'));

// Simple loading fallback
const SectionFallback = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pb-4">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Clients />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CaseStudies />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Team />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <GetStartedSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CookieConsent />
      </Suspense>
    </div>
  );
}
