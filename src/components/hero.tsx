'use client';

import { useState } from 'react';
import { Phone, ChevronRight, TrendingUp, Settings, Brain } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import BookingModal from '@/components/booking-modal';

const benefits = [
  {
    icon: TrendingUp,
    text: 'More qualified meetings, less manual outreach',
  },
  {
    icon: Settings,
    text: 'Fully automated back-office operations',
  },
  {
    icon: Brain,
    text: 'AI systems that improve over time',
  },
];

export default function Hero() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg-3.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0A1628]/92 via-[#0d1f3a]/82 to-[#071020]/92" />

        {/* Blue glow top-right */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#0066FF]/14 rounded-full blur-[120px] z-[1] pointer-events-none" />

        {/* Violet glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] z-[1] pointer-events-none" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Main Content */}
        <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] mb-8">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-sm text-blue-100/80 font-medium">Trusted by 20+ companies worldwide</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              Build Automation Engines - Not Just Software
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-blue-100/60 max-w-2xl mb-10 leading-relaxed font-light">
              We help businesses replace fragmented tools, manual workflows, and guesswork with AI-powered systems
              that generate revenue, automate operations, and scale predictably.
            </p>

            {/* Benefit bullets */}
            <ul className="space-y-3 mb-10">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <li
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/25 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#338AFF]" />
                    </div>
                    <span className="text-blue-100/75 text-sm sm:text-base">{benefit.text}</span>
                  </li>
                );
              })}
            </ul>

            {/* Tagline */}
            <p className="text-sm text-blue-200/45 italic mb-8">
              Start with an audit. Leave with a working growth engine.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                size="lg"
                onClick={() => setShowBooking(true)}
                className="bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg px-8 h-12 text-base font-semibold shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 transition-all duration-300 group w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-2.5" />
                Book a Call
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>

          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent z-[4]" />
      </section>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </>
  );
}
