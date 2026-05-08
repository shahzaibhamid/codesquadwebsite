'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from '@/components/animated-section';

const clients = [
  { name: 'DB Partner', src: '/images/db partner.png' },
  { name: 'Drop PR', src: '/images/drop pr.png' },
  { name: 'gAI', src: '/images/gAI.png' },
  { name: 'Kenetics', src: '/images/kenetics.png' },
  { name: 'MR', src: '/images/mr.png' },
  { name: 'SettleIn', src: '/images/settleIn.png' },
];

export default function Clients() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let frameId = 0;
    let lastTime = performance.now();
    let offset = 0;
    let travelWidth = track.scrollWidth / 2;
    const speed = 28;

    const updateWidth = () => {
      travelWidth = track.scrollWidth / 2;
      if (travelWidth > 0) {
        offset %= travelWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(track);

    const animate = (now: number) => {
      if (travelWidth > 0) {
        const delta = (now - lastTime) / 1000;
        offset += speed * delta;
        if (offset >= travelWidth) {
          offset -= travelWidth;
        }
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }

      lastTime = now;
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="relative py-8 md:py-8 bg-gradient-to-b from-gray-50/60 to-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fade-up" className="text-center mb-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-medium text-blue-600 tracking-wide uppercase">
              Trusted Partners
            </span>
          </div>
        </AnimatedSection>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max flex-nowrap gap-16 py-4 px-1 transform-gpu will-change-transform">
          {[0, 1].map((groupIndex) => (
            <div key={groupIndex} className="flex flex-nowrap items-center gap-16 shrink-0">
              {clients.map((client) => (
                <div
                  key={`${groupIndex}-${client.name}`}
                  className="flex-shrink-0 flex items-center justify-center"
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
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-60" />
    </section>
  );
}
