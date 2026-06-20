'use client';

import Image from 'next/image';
import { Linkedin } from 'lucide-react';

export default function Founder() {
  return (
    <section id="founder" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16 lg:gap-20">
          <div className="relative h-72 w-72 shrink-0 overflow-hidden rounded-[28px] md:h-[22rem] md:w-[22rem] lg:h-[26rem] lg:w-[26rem]">
            <Image
              src="/team/shahzaib.jpeg"
              alt="Shahzaib Hamid"
              fill
              sizes="(max-width: 768px) 288px, (max-width: 1024px) 352px, 416px"
              className="object-cover"
              priority={false}
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B7280]">
              Founder
            </p>

            <h2 className="mt-3 text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[#1A1A1A]">
              Shahzaib Hamid
            </h2>

            <p className="mt-3 text-base text-[#6B7280]">Founder, CodeSquad</p>

            <div className="mt-7 space-y-4 max-w-2xl md:mx-0 mx-auto">
              <p className="text-[17px] leading-[1.65] tracking-[-0.005em] text-[#374151]">
                I build AI systems that help small and medium businesses grow,
                with automation that lives inside your stack and becomes yours
                to run.
              </p>
              <p className="text-[16px] leading-[1.7] text-[#4B5563]">
                At CodeSquad, my team and I turn those capabilities into
                systems that actually move the needle: more pipeline, more
                booked revenue, fewer hours lost to manual work. We don&rsquo;t
                just automate tasks; we build the engine that drives growth
                and then hand it over. It lives in your stack, your team runs
                it, and it holds up under real workload.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center md:justify-start">
              <a
                href="https://www.linkedin.com/in/shahzaibhamid/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shahzaib Hamid on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-[#1F2937] transition-colors duration-200 hover:border-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
