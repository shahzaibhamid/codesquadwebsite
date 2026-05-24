'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Linkedin } from 'lucide-react';
import { AnimatedSection, AnimatedItem } from '@/components/animated-section';
import SectionHeader from '@/components/section-header';

const teamMembers = [
  {
    name: 'Shahzaib Hamid',
    title: 'Founder & CEO',
    location: 'Lahore, PK',
    image: '/team/shahzaib.jpeg',
    linkedin: 'https://www.linkedin.com/in/shahzaibhamid/',
  },
  {
    name: 'Saad Khalid',
    title: 'Partner @ CodeSquad',
    location: 'New York, US',
    image: '/team/saad.jpeg',
  },
  {
    name: 'Dr. Rehan Usman',
    title: 'Partner @ CodeSquad',
    location: 'London, UK',
    image: '/team/rehan.jpeg',
  },
];

type TeamMember = {
  name: string;
  title: string;
  location: string;
  image: string;
  linkedin?: string;
};

export default function Team() {
  return (
    <section id="team" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/60 to-white" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Team"
          title={<>Our <span className="gradient-text">Team</span></>}
        />

        <AnimatedSection variant="stagger-children" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {(teamMembers as TeamMember[]).map((member, idx) => (
            <AnimatedItem key={member.name} variant="fade-up" delay={idx * 0.08}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)' }}
              >
                {/* Avatar area */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-[#1A1A1A] group-hover:text-[#1E3A5F] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#1E3A5F]/70 mt-1">{member.title}</p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        className="shrink-0 w-8 h-8 rounded-lg bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 flex items-center justify-center text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white hover:border-[#1E3A5F] transition-colors duration-200"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">{member.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
