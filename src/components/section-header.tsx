'use client';

import React from 'react';

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-14 lg:mb-20 ${centered ? 'text-center' : ''}`}>
      {/* Label */}
      <div
        className={`flex items-center mb-4 ${centered ? 'justify-center' : 'justify-start'}`}
      >
        <div className={`w-4 sm:w-6 h-px mr-2 sm:mr-3 shrink-0 ${light ? 'bg-blue-400/60' : 'bg-[#0066FF]/40'}`} />
        <span
          className={`text-[11px] font-semibold uppercase tracking-widest ${light ? 'text-blue-300' : 'text-[#0066FF]'}`}
        >
          {label}
        </span>
        <div className={`w-4 sm:w-6 h-px ml-2 sm:ml-3 shrink-0 ${light ? 'bg-blue-400/60' : 'bg-[#0066FF]/40'}`} />
      </div>

      {/* Title */}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[52px] font-bold leading-[1.12] tracking-tight mb-4 sm:mb-5 ${
          light ? 'text-white' : 'text-[#0A1628]'
        }`}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl px-4 sm:px-0 ${
            centered ? 'mx-auto' : ''
          } ${light ? 'text-blue-200/60' : 'text-gray-500'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
