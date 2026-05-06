'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import SectionHeader from '@/components/section-header';
import { AnimatedSection, AnimatedItem } from '@/components/animated-section';
import { caseStudies } from '@/components/case-studies-data';

const MotionLink = motion(Link);
const previewCaseStudies = caseStudies.slice(0, 3);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

type Mode = 'preview' | 'full';

function StudyCard({
  study,
  mode,
}: {
  study: (typeof caseStudies)[number];
  mode: Mode;
}) {
  const isFull = mode === 'full';
  const href = `/case-studies/${study.slug}`;

  if (!isFull) {
    return (
      <MotionLink
        href={href}
        whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
        className="group relative block h-full min-h-[500px] rounded-[28px] border border-[#DCE3EE] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col cursor-pointer"
      >
        <div className="p-5 sm:p-6 lg:p-7 flex flex-col min-h-[250px]">
          <div className="flex flex-wrap gap-2">
            {study.pills.map((pill, index) => (
              <span
                key={pill}
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-[13px] font-medium border ${
                  index === 0
                    ? 'bg-white text-[#0F172A] border-[#D9DEE7]'
                    : 'bg-[#DDE8FF] text-[#1D4ED8] border-[#DDE8FF]'
                }`}
              >
                {pill}
              </span>
            ))}
          </div>

          <h3 className="mt-5 text-[24px] sm:text-[28px] lg:text-[32px] font-semibold leading-[1.08] tracking-tight text-[#1F2937] max-w-[14ch]">
            {study.headline}
          </h3>

          <div className="mt-auto">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B7280] mb-3">
              {study.badge}
            </p>
            <div className="inline-flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#DDE8FF] text-[#2563EB] font-bold flex items-center justify-center text-[13px]">
                {study.brandMark}
              </div>
              <span className="text-sm sm:text-[15px] font-semibold text-[#2563EB]">{study.brand}</span>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B7280]">
            {study.testimonialLabel}
          </p>
          <div className="mt-3 flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#DDE8FF] text-[#2563EB] font-bold flex items-center justify-center text-[13px] shrink-0">
              {study.brandMark}
            </div>
            <div className="flex-1">
              <blockquote className="text-[16px] sm:text-[18px] lg:text-[19px] font-semibold leading-[1.35] tracking-tight text-[#1F2937] max-w-[24ch]">
                {study.testimonialQuote}
              </blockquote>
              <p className="mt-3 text-[13px] sm:text-sm text-[#4B5563]">{study.testimonialByline}</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          className="absolute bottom-5 right-5 opacity-0 translate-y-2 transition-all duration-200 ease-out pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-active:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#1746c7] transition-colors duration-200">
            View case study
            <span className="text-sm leading-none">→</span>
          </span>
        </motion.div>
      </MotionLink>
    );
  }

  return (
    <MotionLink
      href={href}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative block h-full rounded-[28px] border border-gray-200 bg-white shadow-[0_1px_1px_rgba(15,23,42,0.03)] overflow-hidden flex flex-col cursor-pointer"
    >
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {study.pills.map((pill, index) => (
              <span
                key={pill}
                className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium border ${
                  index === 0
                    ? 'bg-white text-[#0F172A] border-gray-200'
                    : 'bg-[#DCE8FF] text-[#1D4ED8] border-[#DCE8FF]'
                }`}
              >
                {pill}
              </span>
            ))}
          </div>

          <h3 className="text-2xl sm:text-[2.15rem] font-bold leading-[1.12] tracking-tight text-[#1F2937] max-w-3xl">
            {study.headline}
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B7280] mb-2">
                {study.badge}
              </p>
              <div className="inline-flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-[#DCE8FF] text-[#2563EB] font-bold flex items-center justify-center text-sm">
                  {study.brandMark}
                </div>
                <span className="text-base font-semibold text-[#2563EB]">{study.brand}</span>
              </div>
            </div>

            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#2563EB]">
              {study.subtitle}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5 lg:gap-7 items-start">
          <div className="relative rounded-2xl border border-[#DDE3EE] bg-gradient-to-br from-[#ECF3FF] via-white to-[#EEF6FF] overflow-hidden min-h-[190px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),transparent_60%)]" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {study.testimonialLabel}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-white shadow-[0_18px_40px_rgba(37,99,235,0.12)] text-2xl font-bold text-[#9BB3E8]">
                  {study.brandMark}
                </div>
                <div className="absolute -right-1.5 -bottom-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#1D4ED8] shadow-lg shadow-blue-500/25">
                  <Play className="h-3.5 w-3.5 fill-white text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
              Watch testimonial
            </p>
            <blockquote className="text-xl sm:text-2xl font-semibold leading-[1.3] tracking-tight text-[#1F2937] max-w-4xl">
              {study.testimonialQuote}
            </blockquote>
            <p className="text-sm sm:text-base text-[#4B5563]">{study.testimonialByline}</p>

            {isFull && (
              <div className="pt-3 mt-1.5 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-3">
                      Situation
                    </p>
                    <ul className="space-y-2">
                      {study.situation.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-3">
                      Built
                    </p>
                    <ul className="space-y-2">
                      {study.built.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B7280] mb-3">
                      Results
                    </p>
                    <ul className="space-y-2">
                      {study.results.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-gray-600">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        className="absolute bottom-5 right-5 opacity-0 translate-y-2 transition-all duration-200 ease-out pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-active:opacity-100"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#1746c7] transition-colors duration-200">
          View case study
          <span className="text-sm leading-none">→</span>
        </span>
      </motion.div>
    </MotionLink>
  );
}

export default function CaseStudies({ mode = 'preview' }: { mode?: Mode }) {
  if (mode === 'full') {
    return (
      <section className="py-16 md:py-24 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-12"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0066FF] mb-3">Case Studies</p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0A1628]">Production case studies</h2>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((study, i) => (
              <AnimatedItem key={study.title} variant="fade-up" delay={i * 0.08}>
                <StudyCard study={study} mode="full" />
              </AnimatedItem>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="case-studies" className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Case Studies"
        title={<>Selected <span className="gradient-text">Production Wins</span></>}
        description="A clean showcase of the systems we've built."
      />

        <AnimatedSection variant="stagger-children" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {previewCaseStudies.map((study, i) => (
            <AnimatedItem key={study.title} variant="fade-up" delay={i * 0.08}>
              <StudyCard study={study} mode="preview" />
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
