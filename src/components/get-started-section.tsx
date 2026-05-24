'use client';

import { Phone } from 'lucide-react';

export default function GetStartedSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4 leading-tight tracking-tight">
          Ready to build?
        </h2>

        <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          30-minute call. Walk away with a clear plan, whether you work with us or not.
        </p>

        <a
          href="https://calendly.com/code_squad/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 bg-[#1E3A5F] hover:bg-[#15293F] text-white rounded-lg px-8 h-12 text-base font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300"
        >
          <Phone className="w-4 h-4" />
          Book a Free Call
        </a>
      </div>
    </section>
  );
}
