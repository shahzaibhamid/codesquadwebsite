'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
    description: 'HIPAA-compliant automation for clinics and patient operations.',
  },
  {
    icon: Sprout,
    title: 'Agriculture',
    description: 'Precision and IoT systems for modern field operations.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'LMS and adaptive learning systems for modern education teams.',
  },
  {
    icon: Wrench,
    title: 'Manufacturing',
    description: 'Predictive and digital systems that improve factory operations.',
  },
  {
    icon: Building2,
    title: 'Fintech',
    description: 'Secure, compliant platforms for finance and payments.',
  },
  {
    icon: Cpu,
    title: 'Computer Vision',
    description: 'AI models, OCR, and automation built for deployment.',
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/40 via-white to-gray-50/40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Industries"
          title={<>Industries We Work In</>}
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-5">
          {industries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
                className="group flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:border-[#0066FF]/25 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[#0066FF]">
                  <Icon className="w-5 h-5 text-[#0066FF] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-semibold text-[#0A1628] mb-1">
                    {industry.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://calendly.com/code_squad/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#0066FF] px-6 h-11 text-sm font-medium text-white shadow-md shadow-blue-500/20 hover:bg-[#0052CC] transition-all duration-300 w-full sm:w-auto"
          >
            Book a Free Call
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 h-11 text-sm font-medium text-gray-700 hover:border-[#0066FF]/25 hover:text-[#0066FF] transition-all duration-300 w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
