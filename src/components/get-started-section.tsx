'use client';

import { Phone } from 'lucide-react';

export default function GetStartedSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold text-[#1A1A1A] mb-5 leading-[1.05] tracking-[-0.035em]">
          Ready to build?
        </h2>

        <p className="mx-auto mb-8 max-w-xl text-[15px] sm:text-[16px] leading-[1.7] text-[#6B7280]">
          Most clients keep us on after launch as their ongoing AI partner.
          Monthly strategy sessions, evolving systems, and continued support as
          the business grows.
        </p>

        <a
          href="https://calendly.com/code_squad/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 bg-[#1E3A5F] hover:bg-[#15293F] text-white rounded-lg px-8 h-12 text-base font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300"
        >
          <Phone className="w-4 h-4" />
          Free audit call
        </a>
      </div>
    </section>
  );
}
