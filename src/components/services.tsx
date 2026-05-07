'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import SectionHeader from '@/components/section-header';
import { AnimatedSection } from '@/components/animated-section';

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const reviews = [
  {
    initials: 'LS',
    name: 'Lou',
    company: 'Signal Law',
    quote:
      'I worked with Shah on a number of projects and was consistently impressed by his ability to break down complex problems into tractable pieces and drive them to completion.',
  },
  {
    initials: 'JI',
    name: 'John',
    company: 'iPromo',
    quote: 'Shahzaib did a great job of communicating throughout the project. He found solutions to hurdles along the way and ultimately we were very satisfied.',
  },
  {
    initials: 'TG',
    name: 'Thad',
    company: 'Gengyvusa',
    quote:
      'Shahzaib is an absolute gem. He is always polite and prompt in his communications, making collaboration seamless and enjoyable.',
  },
  {
    initials: 'EH',
    name: 'Eli',
    company: 'Kenetics Health',
    quote:
      'Shahzaib was an outstanding freelancer to work with. He demonstrated deep technical expertise and a clear understanding of our project goals.',
  },
  {
    initials: 'MM',
    name: 'Michael',
    company: 'DebatePartners',
    quote:
      'Excellent developing a complex AI-driven application from scratch, over an extended period of time.',
  },
  {
    initials: 'JI',
    name: 'John',
    company: 'iPromo',
    quote: 'Shahzaib found solutions to hurdles along the way and ultimately we were very satisfied.',
  },
];

/* ------------------------------------------------------------------ */
/*  Review Card                                                        */
/* ------------------------------------------------------------------ */

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="group relative flex-shrink-0 w-[290px] sm:w-[310px] bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#0066FF]/20 transition-all duration-300">
      <div
        className="absolute top-4 right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #0066FF 0%, #338AFF 40%, transparent 70%)',
          filter: 'blur(18px)',
        }}
      />

      <div className="relative p-7 flex flex-col gap-5 min-h-[280px]">
        <div className="w-12 h-12 rounded-xl bg-[#0066FF]/8 flex items-center justify-center group-hover:bg-[#0066FF] transition-all duration-400">
          <Quote className="w-5 h-5 text-[#0066FF] group-hover:text-white transition-colors duration-400" strokeWidth={2} />
        </div>

        <blockquote className="text-sm sm:text-[15px] text-[#1F2937] leading-relaxed">
          “{review.quote}”
        </blockquote>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-sm font-bold text-[#0A1628]">{review.name}</p>
          <p className="text-sm text-gray-500">{review.company}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

const marqueeReviews = [...reviews, ...reviews];

export default function Services() {
  return (
    <>
      <section id="services" className="relative py-20 md:py-28 overflow-hidden bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Reviews"
            title={<>What Clients Say</>}
            description="Real feedback from clients across legal, healthcare, CRM, and AI projects."
          />

          {/* Marquee slider */}
          <AnimatedSection variant="fade-up" className="relative">
            <div className="overflow-hidden">
              <div className="flex w-max animate-services-marquee gap-5 py-4 px-1 hover:[animation-play-state:paused]">
                {marqueeReviews.map((review, index) => (
                  <ReviewCard
                    key={`${review.name}-${review.company}-${index}`}
                    review={review}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
