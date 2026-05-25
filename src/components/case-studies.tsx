'use client';

import { ArrowUpRight } from 'lucide-react';
import { caseStudies, type CaseStudy } from '@/components/case-studies-data';

function StudyCard({ study }: { study: CaseStudy }) {
  return (
    <a
      href={study.companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-7 sm:p-8 transition-colors duration-200 hover:border-[#1E3A5F]/40"
    >
      <div className="flex h-14 items-center justify-center">
        <span className="text-[19px] font-semibold tracking-[-0.02em] text-[#1A1A1A]">
          {study.company}
        </span>
      </div>

      <h3 className="mt-2 text-center text-[18px] font-medium leading-[1.45] tracking-[-0.01em] text-[#1A1A1A]">
        {study.title}
      </h3>

      <div className="mt-auto pt-7">
        <div className="flex flex-col items-center gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#F1F3F7] px-2.5 py-1 text-[11px] font-medium text-[#4B5563]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="-mx-7 sm:-mx-8 mt-5 border-t border-[#F0F1F4]" />
        <div className="mt-4 flex items-center justify-between text-[12.5px] font-medium text-[#6B7280] transition-colors duration-200 group-hover:text-[#1E3A5F]">
          <span>Visit site</span>
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>
    </a>
  );
}

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B7280]">
            Selected work
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[#1A1A1A]">
            Case studies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B7280]">
            Production systems built for healthcare, legal, and e-commerce teams
            designed around their needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study) => (
            <StudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
