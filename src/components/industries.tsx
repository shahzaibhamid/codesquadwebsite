'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sprout,
  Cpu,
  Wrench,
  Building2,
  GraduationCap,
} from 'lucide-react';
import SectionHeader from '@/components/section-header';

const industries = [
  {
    icon: Heart,
    title: 'Healthcare',
    description: 'HIPAA-compliant automation for clinics, intake, and patient operations.',
    tags: ['HIPAA', 'Automation', 'Patient Ops'],
    details: [
      '65% lift in patient engagement for therapy practices',
      'Full intake & care coordination automation',
      'RTM and technical OCR integration',
      'Admin time cut by 50% — practitioners get their week back',
    ],
  },
  {
    icon: Sprout,
    title: 'Agriculture',
    description: 'Precision and IoT systems that streamline field operations and monitoring.',
    tags: ['IoT', 'Precision', 'Monitoring'],
    details: [
      'IoT sensor integration for real-time field monitoring',
      'Automated irrigation and crop analytics',
      'Drone data pipelines and precision agriculture workflows',
      'Operational dashboards for farm management teams',
    ],
  },
  {
    icon: Cpu,
    title: 'Computer Vision',
    description: 'AI models, OCR, and automation built for real-world deployment.',
    tags: ['OCR', 'AI Models', 'Automation'],
    details: [
      'Custom object detection and image recognition models',
      'Technical OCR for document and form processing',
      'Deep learning pipelines for autonomous systems',
      'Real-world deployment across edge and cloud environments',
    ],
  },
  {
    icon: Wrench,
    title: 'Manufacturing',
    description: 'Predictive and digital systems that improve factory operations.',
    tags: ['Predictive', 'Digital Twins', 'Ops'],
    details: [
      'Predictive maintenance to reduce equipment downtime',
      'Digital twin integration for smart factory ops',
      'SCADA and workflow automation systems',
      'Real-time production monitoring dashboards',
    ],
  },
  {
    icon: Building2,
    title: 'Fintech',
    description: 'Secure, compliant platforms for finance and payments.',
    tags: ['PCI-DSS', 'Compliance', 'Payments'],
    details: [
      'Full ad attribution stack — every conversion traced to source',
      'PCI-compliant payment infrastructure',
      'Automated financial reporting and analytics',
      'CRM and back-office automation for financial teams',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'LMS and adaptive learning systems for modern education teams.',
    tags: ['LMS', 'Adaptive', 'Learning'],
    details: [
      'Interactive LMS platforms with gamification',
      'Adaptive learning engines that improve over time',
      'Virtual classroom and student engagement tools',
      'Admin automation for enrollment and reporting',
    ],
  },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const current = industries[active];
  const Icon = current.icon;

  return (
    <section id="industries" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Industries"
          title={<>Where We&apos;ve <span className="gradient-text">Built Systems</span></>}
          description="We understand how tech works in each industry, not just how to ship software."
        />

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {industries.map((ind, i) => {
            const TabIcon = ind.icon;
            const isActive = i === active;
            return (
              <button
                key={ind.title}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#0066FF] text-white border-[#0066FF] shadow-lg shadow-blue-500/20'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#0066FF]/40 hover:text-[#0066FF]'
                }`}
              >
                <TabIcon className="w-4 h-4" strokeWidth={2} />
                {ind.title}
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#0A1628] to-[#0d1f3a] p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0066FF] flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    {current.title}
                  </h3>
                  <p className="text-blue-200/60 text-base leading-relaxed">
                    {current.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white/[0.07] border border-white/[0.10] text-xs font-semibold text-blue-200/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right panel */}
              <div className="lg:col-span-3 p-8 sm:p-10">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#0066FF] mb-6">
                  What we&apos;ve built
                </p>
                <ul className="space-y-4">
                  {current.details.map((detail, i) => (
                    <motion.li
                      key={detail}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
