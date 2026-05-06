'use client';

import React, { Suspense, lazy } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import Navigation from '@/components/navigation';
import CaseStudies from '@/components/case-studies';

const Footer = lazy(() => import('@/components/footer'));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#0A1628] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0066FF]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-300/60 hover:text-blue-200 text-sm font-medium mb-10 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-[11px] font-semibold uppercase tracking-widest text-[#338AFF]/70 mb-5"
          >
            Case Studies
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-8"
          >
            Systems built for real execution.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-blue-200/60 text-lg leading-relaxed max-w-2xl"
          >
            Three production examples showing what happens when the workflow is owned, automated, and built inside the client&apos;s stack.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-8 flex flex-wrap gap-3"
          >
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-blue-200/70">Owned systems</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-[#338AFF]" />
              <span className="text-sm text-blue-200/70">No lock-in</span>
            </div>
          </motion.div>
        </div>
      </section>

      <CaseStudies mode="full" />

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0066FF] mb-4">Next Step</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-4 leading-tight">
            If you want this inside your stack, we&apos;ll start building it with you.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://calendly.com/code_squad/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              Book a Call
            </a>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
