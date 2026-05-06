'use client';

import Image from 'next/image';
import { AnimatedSection } from '@/components/animated-section';

const clients = [
  { name: 'DB Partner', src: '/images/db partner.png' },
  { name: 'Drop PR', src: '/images/drop pr.png' },
  { name: 'gAI', src: '/images/gAI.png' },
  { name: 'Kenetics', src: '/images/kenetics.png' },
  { name: 'MR', src: '/images/mr.png' },
  { name: 'SettleIn', src: '/images/settleIn.png' },
];

// Double the list for seamless infinite loop
const doubled = [...clients, ...clients];

export default function Clients() {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-gray-50/60 to-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fade-up" className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-blue-600 tracking-wide uppercase">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Trusted by <span className="gradient-text">Industry Leaders</span> Worldwide
          </h2>
        </AnimatedSection>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="flex animate-marquee-slow" style={{ animationDuration: '28s' }}>
          {doubled.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 flex items-center justify-center mx-8"
              style={{ width: 120 }}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={100}
                height={60}
                className="h-14 w-auto max-w-full object-contain"
                style={{ filter: 'grayscale(100%) brightness(0.55)' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60" />
    </section>
  );
}
