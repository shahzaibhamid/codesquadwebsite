'use client';

import { Phone, Sparkles } from 'lucide-react';

const auditItems = [
  'GEO, AEO, SEO',
  'Ads analysis',
  'Ads tracking analysis',
  'Content analysis',
  'Content repurposing',
  'Outreach system',
  'Customer support system',
  'Back-office systems',
  'AI agents',
];

export default function GetStartedSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/40 to-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#0066FF]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#071020]" />
          <div className="absolute inset-0 grid-pattern opacity-25" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#338AFF]/6 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/50 to-transparent" />

          <div className="relative z-10 text-center px-8 sm:px-12 md:px-16 py-14 md:py-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.1] mb-8">
              <Sparkles className="w-3.5 h-3.5 text-[#338AFF]" />
              <span className="text-xs font-semibold text-blue-100/70 tracking-wide">
                Get Started
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              Start Building -<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #338AFF 0%, #66B2FF 100%)' }}
              >
                Not Planning.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-blue-100/45 max-w-2xl mx-auto mb-10 leading-relaxed">
              We audit:
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-left">
              {auditItems.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-sm text-blue-100/80"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-8 text-base text-blue-100/60">
              Then we build custom system.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/code_squad/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-white/20 text-white hover:bg-white/8 hover:border-white/35 rounded-xl px-8 h-12 text-sm font-medium backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                Book a Free Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
