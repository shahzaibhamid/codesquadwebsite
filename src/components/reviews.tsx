'use client';

import { ArrowUpRight } from 'lucide-react';
import {
  caseStudies,
  clientQuotes,
  type ClientQuote,
} from '@/components/case-studies-data';

function initials(name: string) {
  return name
    .split(' ')
    .filter((part) => !part.endsWith('.'))
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

const companyUrlBySlug = Object.fromEntries(
  caseStudies.map((study) => [study.slug, study.companyUrl]),
);

function QuoteTile({ quote }: { quote: ClientQuote }) {
  const url = companyUrlBySlug[quote.slug];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-7 transition-colors duration-200 hover:border-[#1E3A5F]/40"
    >
      <blockquote className="text-[14.5px] leading-relaxed text-[#374151]">
        “{quote.quote}”
      </blockquote>
      <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#F0F1F4] pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1E3A5F]/10 text-[11px] font-semibold text-[#1E3A5F]">
            {initials(quote.name)}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1A1A1A]">{quote.name}</p>
            <p className="text-[12px] text-[#6B7280]">
              {quote.title} · {quote.company}
            </p>
          </div>
        </div>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-[#9CA3AF] transition-colors duration-200 group-hover:text-[#1E3A5F]"
          strokeWidth={2}
        />
      </div>
    </a>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative bg-[#FAFBFC] py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A1A]">
            What clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {clientQuotes.map((quote) => (
            <QuoteTile key={quote.slug} quote={quote} />
          ))}
        </div>
      </div>
    </section>
  );
}
