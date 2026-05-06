'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  BookOpen,
  Headphones,
  ArrowRight,
  Clock,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/animated-section';
import SectionHeader from '@/components/section-header';

// ── Types ───────────────────────────────────────────────────────────────────

type ResourceType = 'Article' | 'White Paper' | 'Podcast';

interface Resource {
  id: number;
  type: ResourceType;
  title: string;
  description: string;
  author: string;
  readTime: string;
  date: string;
  tag: string;
}

// ── Config ───────────────────────────────────────────────────────────────────

const typeConfig: Record<
  ResourceType,
  {
    icon: typeof FileText;
    gradient: string;
    accentFrom: string;
    accentTo: string;
    tagBg: string;
    tagText: string;
    glowColor: string;
    label: string;
  }
> = {
  Article: {
    icon: FileText,
    gradient: 'from-blue-50/80 via-white to-blue-50/50',
    accentFrom: '#3B82F6',
    accentTo: '#60A5FA',
    tagBg: 'bg-blue-50/50 border-blue-100/50',
    tagText: 'text-blue-700',
    glowColor: 'rgba(59, 130, 246, 0.08)',
    label: 'Article',
  },
  'White Paper': {
    icon: BookOpen,
    gradient: 'from-indigo-50/80 via-white to-indigo-50/50',
    accentFrom: '#6366F1',
    accentTo: '#818CF8',
    tagBg: 'bg-indigo-50/50 border-indigo-100/50',
    tagText: 'text-indigo-700',
    glowColor: 'rgba(99, 102, 241, 0.08)',
    label: 'White Paper',
  },
  Podcast: {
    icon: Headphones,
    gradient: 'from-emerald-50/80 via-white to-emerald-50/50',
    accentFrom: '#10B981',
    accentTo: '#34D399',
    tagBg: 'bg-emerald-50/50 border-emerald-100/50',
    tagText: 'text-emerald-700',
    glowColor: 'rgba(16, 185, 129, 0.08)',
    label: 'Podcast',
  },
};

// ── Data ────────────────────────────────────────────────────────────────────

const resources: Resource[] = [
  {
    id: 1,
    type: 'Article',
    title: 'How AI is Revolutionizing Healthcare Diagnostics',
    description:
      'Explore the latest advancements in AI-powered medical imaging and diagnostic tools transforming patient care.',
    author: 'Shahzaib Hamid',
    readTime: '8 min read',
    date: 'Mar 15, 2026',
    tag: 'Healthcare',
  },
  {
    id: 2,
    type: 'Article',
    title: 'Computer Vision in Quality Control: Lessons from 50+ Implementations',
    description:
      'Key insights and battle-tested best practices from deploying computer vision systems worldwide.',
    author: 'Shahzaib Hamid',
    readTime: '6 min read',
    date: 'Feb 20, 2026',
    tag: 'Computer Vision',
  },
  {
    id: 3,
    type: 'Article',
    title: "Building HIPAA-Compliant Applications: A Developer's Guide",
    description:
      'Essential guidelines for building healthcare applications that meet regulatory requirements.',
    author: 'Shahzaib Hamid',
    readTime: '10 min read',
    date: 'Jan 12, 2026',
    tag: 'Healthcare',
  },
  {
    id: 4,
    type: 'White Paper',
    title: 'The Future of Precision Agriculture: A Comprehensive Guide',
    description:
      'An in-depth analysis of how IoT, computer vision, and machine learning are shaping modern farming.',
    author: 'Shahzaib Hamid',
    readTime: '15 min read',
    date: 'Mar 8, 2026',
    tag: 'Agriculture',
  },
  {
    id: 5,
    type: 'White Paper',
    title: 'Enterprise IoT Security: Threats and Solutions',
    description:
      'A thorough examination of the current threat landscape in enterprise IoT and countermeasures.',
    author: 'Shahzaib Hamid',
    readTime: '20 min read',
    date: 'Feb 28, 2026',
    tag: 'IoT',
  },
  {
    id: 6,
    type: 'Podcast',
    title: 'TechTalk: Engineering IoT for Smart Manufacturing',
    description:
      'Our engineering leads discuss real-world IoT implementations and their impact on industrial efficiency.',
    author: 'Shahzaib Hamid',
    readTime: '32 min listen',
    date: 'Mar 28, 2026',
    tag: 'IoT',
  },
];

// ── Animation variants ──────────────────────────────────────────────────────

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

interface ResourcesProps {
  limit?: number;
}

// ── Resource Card ────────────────────────────────────────────────────────────

function ResourceCard({ resource }: { resource: Resource }) {
  const config = typeConfig[resource.type];
  const Icon = config.icon;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.28, ease: 'easeOut' } }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-transparent shadow-sm hover:shadow-2xl transition-all duration-400 cursor-pointer flex flex-col"
      style={{
        '--glow': config.glowColor,
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      } as React.CSSProperties}
    >
      {/* Hover glow ring */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `0 0 0 1.5px ${config.accentFrom}40, 0 20px 60px ${config.glowColor}` }}
      />

      {/* ── Visual header ── */}
      <div className={`relative h-44 bg-gradient-to-br ${config.gradient} overflow-hidden flex-shrink-0 border-b border-gray-100`}>
        {/* Mesh / noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Radial glow blob */}
        <div
          className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-10 blur-2xl"
          style={{ background: config.accentFrom }}
        />

        {/* Centered icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-20 h-20 rounded-2xl bg-white/80 border border-gray-100/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-400 shadow-sm">
              <Icon className="w-9 h-9 drop-shadow-sm" style={{ color: config.accentFrom }} strokeWidth={1.5} />
            </div>
            {/* Pulse ring on hover */}
            <div 
              className="absolute inset-0 rounded-2xl border-2 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" 
              style={{ borderColor: `${config.accentFrom}30` }}
            />
          </div>
        </div>

        {/* Tag — top left */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold border backdrop-blur-sm ${config.tagBg} ${config.tagText}`}
          >
            {resource.tag}
          </span>
        </div>

        {/* Type pill — top right */}
        <div className="absolute top-4 right-4 z-10">
          <span 
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white shadow-sm"
            style={{ background: `linear-gradient(135deg, ${config.accentFrom}, ${config.accentTo})` }}
          >
            {resource.type}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 px-6 pt-4 pb-5">
        {/* Title */}
        <h3 className="text-[15px] font-bold text-[#0A1628] mb-2.5 leading-snug line-clamp-2 transition-colors duration-300" style={{ color: '#0A1628' }}>
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5 flex-1">
          {resource.description}
        </p>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Author avatar + info */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${config.accentFrom}, ${config.accentTo})` }}
            >
              {getInitials(resource.author)}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-[#0A1628] truncate max-w-[110px]">
                {resource.author}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>{resource.date}</span>
              </div>
            </div>
          </div>

          {/* Read time + arrow */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-gray-400">
              <Clock className="w-3 h-3" />
              {resource.readTime}
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
              style={{ background: `linear-gradient(135deg, ${config.accentFrom}, ${config.accentTo})` }}
            >
              <ChevronRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(90deg, ${config.accentFrom}, ${config.accentTo})` }}
      />
    </motion.article>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────

export default function Resources({ limit }: ResourcesProps) {
  const visibleResources = useMemo(() => {
    return typeof limit === 'number' ? resources.slice(0, limit) : resources;
  }, [limit]);

  return (
    <section id="resources" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Knowledge Hub"
          title="Latest Insights"
          description="Expert perspectives, in-depth research, and actionable ideas — curated by our team to keep you ahead of the curve."
        />

        {/* ── Cards Grid ── */}
        <div className="relative">
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          >
            {visibleResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </motion.div>
        </div>

        {/* ── View All CTA ── */}
        <AnimatedSection variant="fade-up" delay={0.1} className="mt-12 text-center">
          <Link
            href="/articles"
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${typeConfig.Article.accentFrom}, ${typeConfig.Article.accentTo})`,
              boxShadow: `0 8px 24px ${typeConfig.Article.glowColor}`,
            }}
          >
            View All Insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
