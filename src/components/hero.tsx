'use client';

import { useState } from 'react';
import { Phone, ChevronRight, ArrowUpRight, Search, Globe, Workflow, Bot, Headphones, BarChart3, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingModal from '@/components/booking-modal';

const benefits = [
  { icon: ArrowUpRight, text: 'Outbound' },
  { icon: Search, text: 'Inbound' },
  { icon: Globe, text: 'SEO · AEO · GEO' },
  { icon: FileText, text: 'Content Automation' },
  { icon: BarChart3, text: 'Ads' },
  { icon: Headphones, text: 'Customer Support' },
  { icon: Workflow, text: 'Back Office' },
  { icon: Bot, text: 'AI Agents' },
];

export default function Hero() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <section id="hero" className="relative min-h-screen flex flex-col bg-[#FAFAF9]">
        <div className="relative z-[3] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 w-full flex-1 flex items-center">
          <div className="max-w-5xl mx-auto">

            {/* Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-white border border-gray-200">
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-sm text-gray-600 font-medium">Trusted by 20+ companies worldwide</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[3.75rem] xl:text-[3.75rem] font-semibold text-[#1A1A1A] leading-[1.05] tracking-[-0.035em] mb-5 text-center mx-auto">
              Build Automation Engines
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-500 max-w-2xl mx-auto mb-6 leading-relaxed font-light text-center">
              We help businesses automate repetitive manual tasks.
            </p>

            {/* Benefit chips — 4 per row, 2 rows */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-8 mb-10 max-w-5xl mx-auto">
              {benefits.map((benefit, i) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-700"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#1E3A5F] shrink-0" />
                    <span className="font-medium truncate">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => window.open('https://calendly.com/code_squad/30min', '_blank', 'noopener,noreferrer')}
                className="bg-[#1E3A5F] hover:bg-[#15293F] text-white rounded-lg px-8 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300 group w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-2.5" />
                Book a Consultation Call
                <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </div>

          </div>
        </div>

        {/* Trusted by — minimal text marquee */}
        <div className="relative w-full border-t border-gray-200/70 bg-[#FAFAF9] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center gap-8 overflow-hidden">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Trusted by
            </span>
            <div className="flex-1 overflow-hidden marquee-container">
              <div className="flex w-max animate-marquee-slow gap-12 whitespace-nowrap">
                {[...Array(2)].map((_, dup) => (
                  <div key={dup} className="flex items-center gap-12">
                    {['iPromo', 'EnergyBits', 'GengyvUSA', 'Modern Law', 'Kenetics Health', 'TriState', 'SettleIn', "Mama's Compass", 'DebatePartners'].map((name) => (
                      <span key={`${dup}-${name}`} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                        {name}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </>
  );
}
