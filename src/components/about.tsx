'use client';

import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Users, Zap, ShieldCheck } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' as const },
  }),
};

const stats = [
  { icon: Users, value: '20+', label: 'Clients Served' },
  { icon: Zap, value: '100%', label: 'Brand-Owned Stack' },
  { icon: ShieldCheck, value: '0', label: 'Hostage Contracts' },
];


const auditItems = [
  'SEO & content gaps',
  'Ad tracking & attribution',
  'Outreach systems',
  'Automation opportunities',
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">

      {/* ── Top half: dark navy — POSITIONING + TRUST LAYER ── */}
      <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#071020] py-20 md:py-28">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

        {/* Blue glow top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#0066FF]/15 rounded-full blur-[120px] pointer-events-none" />
        {/* Violet glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-[350px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left — Positioning */}
            <div>
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
                className="text-[11px] font-semibold uppercase tracking-widest text-[#338AFF] mb-5"
              >
                Who We Are
              </motion.p>

              <motion.h2
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
              >
                Not an Agency.{' '}
                <span className="text-[#338AFF]">Not SaaS.</span>
                <br />
                A System Builder.
              </motion.h2>

              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
                className="text-blue-200/60 text-base leading-relaxed max-w-lg mb-5"
              >
                We build systems you actually own.
                <br />
                Designed for your workflows, integrated into your stack, and built to scale with your business.
              </motion.p>

              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
                className="text-blue-200/60 text-base leading-relaxed max-w-lg mt-5"
              >
                We&apos;ve done this for 20+ clients across healthcare, agriculture, fintech, and manufacturing.
              </motion.p>
            </div>

            {/* Right — Stats cards */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className="grid grid-cols-1 gap-4"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                  className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#0066FF]/30 hover:bg-white/[0.07] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-all duration-300">
                    <s.icon className="w-5 h-5 text-[#338AFF] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-white leading-none">{s.value}</p>
                    <p className="text-sm text-blue-200/50 mt-1">{s.label}</p>
                  </div>
                </motion.div>
              ))}

              {/* Proof label */}
              <p className="text-xs text-blue-200/30 font-semibold uppercase tracking-widest text-center mt-2">
                Proof — Built for real execution
              </p>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Diagonal divider ── */}
      <div className="relative h-16 bg-gradient-to-br from-[#071020] to-[#0A1628] overflow-hidden">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="white">
          <path d="M0,64 L1440,0 L1440,64 Z" />
        </svg>
      </div>

      {/* ── Bottom half: white — SOFT CTA ── */}
      <div className="relative bg-white py-20 md:py-24 overflow-hidden">
        {/* Soft blue glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0066FF]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left — Soft CTA copy */}
            <div>
              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
                className="text-[11px] font-semibold uppercase tracking-widest text-[#0066FF] mb-5"
              >
                Get Started
              </motion.p>

              <motion.h2
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                className="text-3xl sm:text-4xl font-extrabold text-[#0A1628] leading-tight mb-5"
              >
                Start Building -<br />
                <span className="text-[#0066FF]">Not Planning.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
                className="text-gray-500 text-base leading-relaxed mb-6"
              >
                We analyze your:
              </motion.p>

              <motion.ul
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}
                className="space-y-2.5 mb-8"
              >
                {auditItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600 text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </motion.ul>

              <motion.p
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4}
                className="text-gray-500 text-base mb-8 italic"
              >
                Then we build it together.
              </motion.p>

              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={5}
              >
                <a
                  href="https://calendly.com/code_squad/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 group"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Free Call
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </motion.div>
            </div>

            {/* Right — guarantee card */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className="relative rounded-3xl overflow-hidden"
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] to-[#0d1f3a]" />
              <div className="absolute inset-0 grid-pattern opacity-10" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#0066FF]/15 rounded-full blur-3xl" />

              <div className="relative p-8 sm:p-10 space-y-6">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#338AFF]">Built for Ownership. Not Lock-in.</p>

                {[
                  { title: 'Built in YOUR accounts', desc: 'Everything lives on your stack. Not ours.' },
                  { title: 'If we part ways, the engine stays', desc: 'No hostage. No lock-in. The system is yours.' },
                  { title: 'Tested on real use first', desc: "If it doesn't work on me, I won't sell it." },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="flex gap-4"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0066FF] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-blue-200/50 text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

    </section>
  );
}
