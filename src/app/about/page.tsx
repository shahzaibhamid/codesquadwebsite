'use client';

import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/components/navigation';

const Footer = lazy(() => import('@/components/footer'));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const services = [
  {
    arrow: '→',
    title: 'Outbound',
    description: 'Enrichment, ICP gating, AI cold email, deliverability. The system that runs pipeline while founders sleep.',
  },
  {
    arrow: '→',
    title: 'Inbound',
    description: 'SEO content engine, repurposing across social/ads/email, attribution tracking.',
  },
  {
    arrow: '→',
    title: 'AEO',
    description: 'Citations in ChatGPT, Perplexity, and Gemini. Where buyers actually search now.',
  },
  {
    arrow: '→',
    title: 'Back Ops',
    description: 'Client intake, Technical OCR, RTM, client care coordination.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#0A1628] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0066FF]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
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
            About Shahzaib
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-8"
          >
            I run a fully automated<br className="hidden sm:block" />
            <span className="text-[#338AFF]"> all-bound and backops</span> stack.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-blue-200/60 text-lg leading-relaxed max-w-2xl"
          >
            Cold outreach that books meetings. Ad tracking that proves ROI. Content that gets cited by ChatGPT. Back-office that runs itself.
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
              <span className="text-sm text-blue-200/70">20+ clients shipped</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-[#338AFF]" />
              <span className="text-sm text-blue-200/70">Tested on myself first</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof Line */}
      <section className="bg-gradient-to-r from-[#0066FF] to-[#0047CC] py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white text-center text-sm sm:text-base font-medium">
            Shipped it for 20+ clients. And myself.{' '}
            <span className="opacity-70">That&apos;s the test. If it doesn&apos;t work on me, I won&apos;t sell it.</span>
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="max-w-2xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0066FF] mb-6">Who I Am</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-6 leading-tight">
              I&apos;m Shahzaib, founder of a small Tech Team.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              I build revenue and operations automation for teams tired of stitching together five tools, three contractors, and a spreadsheet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What I Build */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mb-12"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0066FF] mb-3">Services</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628]">What I build</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className="group p-6 rounded-2xl border border-gray-100 bg-white hover:border-blue-200/60 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0066FF]/8 flex items-center justify-center group-hover:bg-[#0066FF] transition-colors duration-300">
                    <span className="text-[#0066FF] font-bold text-sm group-hover:text-white transition-colors duration-300">→</span>
                  </div>
                  <h3 className="font-bold text-[#0A1628] text-base">{s.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed pl-11">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare + No Hostage */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#0A1628] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#0066FF]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/20 flex items-center justify-center mb-5">
                <span className="text-[#338AFF] text-lg font-bold">+</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">Built for healthcare teams</h3>
              <p className="text-blue-200/60 text-sm leading-relaxed">
                Everything is brand-owned. Built inside YOUR accounts, on YOUR stack.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-5">
                <span className="text-emerald-400 text-lg font-bold">✓</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-3">No hostage. Ever.</h3>
              <p className="text-blue-200/60 text-sm leading-relaxed">
                If we part ways, the engine stays. Your stack, your data, your system.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center max-w-xl mx-auto mb-12"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#0066FF] mb-4">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1628] mb-4 leading-tight">
              I offer simple and cost effective retainers that make sense.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Let&apos;s start with an audit, from there we build it together.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="https://calendly.com/code_squad/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 group"
            >
              <Calendar className="w-4 h-4" />
              Book a Call
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.25}
            className="mt-14 flex justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0066FF] text-sm font-medium transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
