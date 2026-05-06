'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Workflow,
  BarChart3,
  Repeat2,
  Mail,
  Headphones,
  X,
  CheckCheck,
  Building2,
  Stethoscope,
  Smile,
  Rocket,
} from 'lucide-react';
import SectionHeader from '@/components/section-header';
import { AnimatedSection } from '@/components/animated-section';

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const services = [
  {
    icon: Globe,
    title: 'Growth & Visibility Engine',
    cardNumber: 1,
    subServices: [
      'ChatGPT, Perplexity, Gemini citations',
      'Technical SEO & authority building',
      'AI-powered content pipelines',
      'Keyword research & mapping',
    ],
    modal: {
      headline: 'You Get Discovered Where Decisions Happen.',
      description: 'We build visibility across traditional search and AI-powered answers. Your brand gets cited in ChatGPT, Perplexity, and Gemini while ranking on Google through technical SEO and keyword-targeted content.',
      industries: [
        { icon: Smile, label: 'Aesthetic Labs', detail: 'Appear in AI answers for treatment queries and local intent searches.' },
        { icon: Stethoscope, label: 'Dental Clinics', detail: 'Rank for high-intent service searches and build search authority.' },
        { icon: Building2, label: 'Clinics & MedSpas', detail: 'Turn content into discoverability across search and AI tools.' },
        { icon: Rocket, label: 'Startups', detail: 'Get cited early where buyers ask questions and make decisions.' },
      ],
      includes: ['GEO / AEO citations', 'Technical SEO audit', 'AI content pipeline', 'Authority building', 'Keyword mapping'],
    },
  },
  {
    icon: Mail,
    title: 'AI Outreach Engine',
    cardNumber: 2,
    subServices: [
      'ICP Filtering & Enrichment',
      'AI Cold Email Systems',
      'Deliverability Infrastructure',
      'Outbound Pipeline Automation',
    ],
    modal: {
      headline: 'Consistent Pipeline of Qualified Meetings.',
      description: 'We build the full outbound stack: enrichment, ICP gating, AI-written cold email, and deliverability infrastructure. The system runs pipeline while you sleep, booking qualified meetings without manual outreach.',
      industries: [
        { icon: Smile, label: 'Aesthetic Labs', detail: 'Auto-outreach to referral partners and high-value leads.' },
        { icon: Stethoscope, label: 'Dental Clinics', detail: 'Automated recall and referral outreach that books appointments.' },
        { icon: Building2, label: 'Clinics & MedSpas', detail: 'Connect outreach to booking for a fully automated pipeline.' },
        { icon: Rocket, label: 'Startups', detail: 'Launch an outbound machine that scales with your team.' },
      ],
      includes: ['Data enrichment setup', 'ICP filtering & segmentation', 'AI cold email sequences', 'Deliverability infrastructure', 'CRM integration'],
    },
  },
  {
    icon: BarChart3,
    title: 'Attribution & Ads Engine',
    cardNumber: 3,
    subServices: [
      'Full Tracking Stack',
      'Meta Pixel & UTMs',
      'Conversions API (CAPI)',
      'Revenue Attribution Clarity',
      'GA4 & GTM Setup',
    ],
    modal: {
      headline: 'You Finally Know What\'s Working.',
      description: 'We install the full tracking stack, then automate reporting so you always know which ads, pages, and campaigns drive real revenue. Every conversion is traced back to the source.',
      industries: [
        { icon: Smile, label: 'Aesthetic Labs', detail: 'Track consultation bookings back to the exact ad that drove them.' },
        { icon: Stethoscope, label: 'Dental Clinics', detail: 'Full attribution from ad click to confirmed appointment.' },
        { icon: Building2, label: 'Clinics & MedSpas', detail: 'Automated dashboards with weekly performance summaries.' },
        { icon: Rocket, label: 'Startups', detail: 'Make data-driven decisions from day one.' },
      ],
      includes: ['GTM & GA4 setup', 'Meta Pixel & Conversions API', 'UTM tracking structure', 'Automated ROAS dashboard', 'Monthly attribution reports'],
    },
  },
  {
    icon: Workflow,
    title: 'Automation Engine',
    cardNumber: 4,
    subServices: [
      'CRM + booking workflows',
      'Back-office automation',
      'Client intake & support systems',
      'Care coordination',
    ],
    modal: {
      headline: 'Operations Run Without Manual Effort.',
      description: 'We automate the back-office end to end: client intake forms, care coordination, CRM workflows, RTM, and technical OCR processing. Your team spends less time on admin and more time on high-value work.',
      industries: [
        { icon: Smile, label: 'Aesthetic Labs', detail: 'Automated intake, prep, and follow-up sequences.' },
        { icon: Stethoscope, label: 'Dental Clinics', detail: 'Patient intake, insurance processing, and coordination.' },
        { icon: Building2, label: 'Clinics & MedSpas', detail: 'Less admin work so practitioners get time back.' },
        { icon: Rocket, label: 'Startups', detail: 'Scale operations without scaling headcount.' },
      ],
      includes: ['CRM & booking automation', 'Client intake workflow', 'Care coordination setup', 'RTM & OCR integration', 'Back-office automation'],
    },
  },
  {
    icon: Repeat2,
    title: 'Content Repurposing Engine',
    cardNumber: 5,
    subServices: [
      'Blog → Social Posts',
      'Blog → Email Series',
      'Blog → Video Scripts',
      'Multi-channel Distribution',
      'Brand Voice Consistency',
    ],
    modal: {
      headline: 'Maximum Output From Minimal Input.',
      description: 'We take each blog or long-form piece and repurpose it across social media, email, ad copy, and video scripts. Your message stays consistent and your brand stays visible across every channel without creating from scratch each time.',
      industries: [
        { icon: Smile, label: 'Aesthetic Labs', detail: 'One treatment guide becomes content across IG, email, and ads.' },
        { icon: Stethoscope, label: 'Dental Clinics', detail: 'Repurpose patient education content across every channel.' },
        { icon: Building2, label: 'Clinics & MedSpas', detail: 'Maximize ROI on every content piece.' },
        { icon: Rocket, label: 'Startups', detail: 'Scale content output without scaling your team or budget.' },
      ],
      includes: ['Content audit & asset mapping', 'Social post creation', 'Email newsletter repurposing', 'Ad copy extraction', 'Video script formatting'],
    },
  },
  {
    icon: Headphones,
    title: 'Customer Support Engine',
    cardNumber: 6,
    subServices: [
      'Ticket routing & triage',
      'Helpdesk automation',
      'Client follow-up workflows',
      'Knowledge base support',
    ],
    modal: {
      headline: 'Support That Scales Without Chaos.',
      description: 'We build customer support systems that route, prioritize, and automate responses so your team can handle more clients without losing quality or speed.',
      industries: [
        { icon: Smile, label: 'Aesthetic Labs', detail: 'Handle patient questions and follow-ups without slowing the front desk.' },
        { icon: Stethoscope, label: 'Dental Clinics', detail: 'Automate appointment support and patient communication.' },
        { icon: Building2, label: 'Clinics & MedSpas', detail: 'Reduce admin load while keeping response times fast.' },
        { icon: Rocket, label: 'Startups', detail: 'Scale support without building a large support team.' },
      ],
      includes: ['Helpdesk workflow setup', 'Auto-triage and routing', 'Client follow-up automation', 'Knowledge base structure', 'Response templates'],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Modal                                                               */
/* ------------------------------------------------------------------ */

function ServiceModal({
  service,
  onClose,
}: {
  service: (typeof services)[number] | null;
  onClose: () => void;
}) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-8 pb-6 rounded-t-3xl bg-gradient-to-br from-[#0A1628] to-[#0d1f3a]">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-[#0066FF] flex items-center justify-center shadow-lg mb-5">
              <service.icon className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#338AFF] mb-1">{service.title}</p>
            <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight">{service.modal.headline}</h2>
          </div>

          <div className="p-8 pt-6 space-y-8">
            <p className="text-gray-600 leading-relaxed">{service.modal.description}</p>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Who It&apos;s For</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.modal.industries.map((ind) => (
                  <div key={ind.label} className="flex gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center shrink-0">
                      <ind.icon className="w-4 h-4 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{ind.label}</p>
                      <p className="text-xs text-gray-500 leading-snug mt-0.5">{ind.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What&apos;s Included</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.modal.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <CheckCheck className="w-4 h-4 shrink-0 text-[#0066FF]" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg bg-gradient-to-r from-[#0066FF] to-[#338AFF] hover:from-[#0052CC] hover:to-[#0066FF] transition-all"
              onClick={onClose}
            >
              Get Started with This Service
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Service Card                                                        */
/* ------------------------------------------------------------------ */

const VISIBLE_DEFAULT = 3;

function ServiceCard({
  service,
  onLearnMore,
}: {
  service: (typeof services)[number];
  onLearnMore: () => void;
}) {
  const Icon = service.icon;
  const [hovered, setHovered] = useState(false);
  const visibleSubs = hovered ? service.subServices : service.subServices.slice(0, VISIBLE_DEFAULT);

  return (
    <div
      className="od-service-card group relative flex-shrink-0 w-[290px] sm:w-[310px] bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100 hover:border-[#0066FF]/20 hover:shadow-2xl hover:shadow-[#0066FF]/10 transition-all duration-400"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Blue glowing blob decoration */}
      <div
        className="absolute top-4 right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #0066FF 0%, #338AFF 40%, transparent 70%)',
          filter: 'blur(18px)',
        }}
      />
      {/* Subtle always-visible blob */}
      <div
        className="absolute top-6 right-8 w-16 h-16 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #0066FF 0%, transparent 70%)',
          filter: 'blur(14px)',
        }}
      />

      <div className="relative p-7 flex flex-col gap-5 min-h-[280px]">
        {/* Icon */}
        <div className="od-service-icon w-12 h-12 rounded-xl bg-[#0066FF]/8 flex items-center justify-center group-hover:bg-[#0066FF] transition-all duration-400">
          <Icon className="w-5 h-5 text-[#0066FF] group-hover:text-white transition-colors duration-400" strokeWidth={2} />
        </div>

        {/* Title */}
        <div className="headWrap">
          <h3
            className="text-xl font-extrabold text-[#0A1628] leading-tight group-hover:text-[#0066FF] transition-colors duration-300"
            onClick={onLearnMore}
          >
            {service.title}
          </h3>
        </div>

        {/* Sub-services pills */}
        <div className="sub-services-container flex flex-wrap gap-2">
          {visibleSubs.map((sub) => (
            <button
              key={sub}
              onClick={onLearnMore}
              className="sub-service inline-flex items-center px-3.5 py-1.5 rounded-full border border-gray-200 bg-white hover:border-[#0066FF] hover:text-[#0066FF] text-sm text-gray-600 font-medium transition-all duration-200 hover:shadow-sm"
            >
              {sub}
            </button>
          ))}
          {!hovered && service.subServices.length > VISIBLE_DEFAULT && (
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-dashed border-gray-200 text-xs text-gray-400 font-medium">
              +{service.subServices.length - VISIBLE_DEFAULT} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

const marqueeServices = [...services, ...services];

export default function Services() {
  const [activeService, setActiveService] = useState<(typeof services)[number] | null>(null);

  return (
    <>
      <section id="services" className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Systems We Build"
            title={<>Systems We Build</>}
            description="From visibility to outbound, tracking, automation, and repurposing, everything works together as one engine."
          />

          {/* Marquee slider */}
          <AnimatedSection variant="fade-up" className="relative">
            <div className="overflow-hidden">
              <div className="flex w-max animate-services-marquee gap-5 py-4 px-1 hover:[animation-play-state:paused]">
                {marqueeServices.map((service, index) => (
                  <ServiceCard
                    key={`${service.title}-${index}`}
                    service={service}
                    onLearnMore={() => setActiveService(service)}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </>
  );
}
