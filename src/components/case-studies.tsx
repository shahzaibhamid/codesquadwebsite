'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/section-header';
import { AnimatedSection, AnimatedItem } from '@/components/animated-section';
import { caseStudies } from '@/components/case-studies-data';

const MotionLink = motion(Link);
const previewCaseStudies = caseStudies;

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
        className="group relative block h-full min-h-[460px] rounded-[28px] border border-[#DCE3EE] bg-white shadow-none overflow-hidden flex flex-col cursor-pointer transition-shadow duration-300"
      >
        <div
          aria-hidden="true"
          className="absolute top-4 right-5 h-28 w-28 rounded-full pointer-events-none opacity-0 scale-95 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-1 group-hover:-translate-y-1"
          style={{
            background: 'radial-gradient(circle, #0066FF 0%, #338AFF 40%, transparent 72%)',
            filter: 'blur(20px)',
          }}
        />
        <div className="p-3.5 sm:p-4 lg:p-5">
          <div className="grid grid-cols-1 gap-5 items-start">
            <div className="flex flex-col min-h-[180px]">
              <h3 className="text-[22px] sm:text-[25px] lg:text-[30px] font-semibold leading-[1.05] tracking-tight text-[#1F2937] max-w-[15ch] transition-all duration-300 group-hover:text-[#0066FF] group-hover:translate-y-[-1px]">
                {study.headline}
              </h3>

              <div className="mt-3.5 flex flex-wrap gap-2">
                {study.pills.map((pill, index) => (
                  <span
                    key={pill}
                    className={`inline-flex items-center rounded-full px-3.5 py-1.25 text-[12px] font-medium border ${
                      index === 0
                        ? 'bg-white text-[#0F172A] border-[#D9DEE7]'
                        : 'bg-[#DDE8FF] text-[#1D4ED8] border-[#DDE8FF]'
                    }`}
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#6B7280] mb-2.5">
                  {study.badge}
                </p>
                <div className="inline-flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-[#DDE8FF] text-[#2563EB] font-bold flex items-center justify-center text-[12px]">
                    {study.brandMark}
                  </div>
                  <span className="text-sm sm:text-[14px] font-semibold text-[#2563EB] transition-colors duration-300 group-hover:text-[#0066FF]">{study.brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB]" />

        <div className="p-3.5 sm:p-4 lg:p-5">
          <div className="space-y-2">
            {study.points.map((point) => (
              <div key={point} className="flex items-start gap-2.5 text-[13px] sm:text-sm leading-relaxed text-[#1F2937] transition-colors duration-300 group-hover:text-[#0A1628]">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0066FF] shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </MotionLink>
    );
  }

  return (
    <MotionLink
      href={href}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative block h-full rounded-[28px] border border-gray-200 bg-white shadow-none overflow-hidden flex flex-col cursor-pointer"
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
        <div className="space-y-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
            Highlights
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {study.points.map((point) => (
              <div key={point} className="flex items-start gap-2.5 text-sm sm:text-[15px] leading-relaxed text-[#1F2937]">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {isFull && (
          <div className="pt-6 mt-6 border-t border-gray-200">
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const maxStartIndex = Math.max(previewCaseStudies.length - Math.ceil(cardsPerView), 0);
  const safeActiveIndex = Math.min(activeIndex, maxStartIndex);

  useEffect(() => {
    const updateCardsPerView = () => {
      setCardsPerView(window.innerWidth >= 1024 ? 2.5 : 1);
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:gap-8 mb-10">
          <SectionHeader
            label="Case Studies"
            title={<>Selected <span className="gradient-text">Production Wins</span></>}
            description="A clean showcase of the systems we've built."
          />

          <div className="flex items-center justify-end gap-3">
              <button
              type="button"
              onClick={() => setActiveIndex((current) => (current - 1 + (maxStartIndex + 1)) % (maxStartIndex + 1))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D9DEE7] bg-white text-[#1F2937] shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#0066FF] hover:text-[#0066FF]"
              aria-label="Previous case study"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveIndex((current) => (current + 1) % (maxStartIndex + 1))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D9DEE7] bg-white text-[#1F2937] shadow-[0_8px_20px_rgba(15,23,42,0.06)] transition-all duration-200 hover:border-[#0066FF] hover:text-[#0066FF]"
              aria-label="Next case study"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            animate={{
              x:
                cardsPerView === 1
                  ? `-${safeActiveIndex * 100}%`
                  : `calc(-${safeActiveIndex} * (40% + 1.5rem))`,
            }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="flex"
          >
            {previewCaseStudies.map((study) => (
              <div key={study.slug} className="min-w-full lg:min-w-[40%] lg:px-3 box-border">
                <StudyCard study={study} mode="preview" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {previewCaseStudies.slice(0, Math.max(previewCaseStudies.length - cardsPerView + 1, 1)).map((study, index) => (
            <button
              key={study.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-200 ${
                index === safeActiveIndex ? 'w-8 bg-[#0066FF]' : 'w-2.5 bg-[#CBD5E1]'
              }`}
              aria-label={`Go to case study ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
