'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  ClipboardCheck,
  FolderCheck,
  ThumbsUp,
  Headphones,
  Sparkles,
} from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

const trustIndicators = [
  { icon: FolderCheck, label: '200+ Projects Delivered' },
  { icon: ThumbsUp, label: '99% Client Satisfaction' },
  { icon: Headphones, label: '24/7 Support' },
];

export default function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/40 to-white" />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0066FF]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fade-up">
          {/* Card */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Dark background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#071020]" />
            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-25" />
            {/* Blue glow top-right */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[100px] pointer-events-none" />
            {/* Subtle bottom glow */}
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#338AFF]/6 rounded-full blur-[80px] pointer-events-none" />
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/50 to-transparent" />

            <div className="relative z-10 text-center px-8 sm:px-12 md:px-16 py-14 md:py-20">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] mb-8"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#338AFF]" />
                <span className="text-xs font-semibold text-blue-100/70 tracking-wide">
                  Start Your Project Today
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight"
              >
                Stop Managing Tools.
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #338AFF 0%, #66B2FF 100%)' }}>
                  Start Running a System.
                </span>
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-base sm:text-lg text-blue-100/45 max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                If your growth depends on manual work, disconnected tools, or guesswork —
                we fix that. One integrated system. Owned by you.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  href="https://codesquad-form.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-xl px-8 h-12 text-sm font-semibold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-300 w-full sm:w-auto"
                >
                  <ClipboardCheck className="w-4 h-4" />
                  Get Free Checklist
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href="https://calendly.com/code_squad/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2.5 border border-white/20 text-white hover:bg-white/8 hover:border-white/35 rounded-xl px-8 h-12 text-sm font-medium backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  Book a Free Call
                </motion.a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-12 pt-8 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
              >
                {trustIndicators.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-blue-100/40">
                    <Icon className="w-4 h-4 text-[#338AFF]/50" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
