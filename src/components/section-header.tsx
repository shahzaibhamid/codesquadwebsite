'use client';

import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  title,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-14 lg:mb-12 ${centered ? 'text-center' : ''}`}>
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.03em] mb-4 sm:mb-5 ${
          light ? 'text-white' : 'text-[#1A1A1A]'
        }`}
      >
        {title}
      </h2>

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
