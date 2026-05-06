'use client';

import { motion } from 'framer-motion';
import { ScanSearch, Code2, Workflow, Rocket } from 'lucide-react';
import { AnimatedSection, AnimatedItem } from '@/components/animated-section';
import SectionHeader from '@/components/section-header';

const steps = [
  {
    number: '01',
    icon: ScanSearch,
    title: 'Audit & Strategy',
    description: 'We identify gaps in growth, tracking, and operations — then map a clear action plan for maximum impact.',
    color: '#0066FF',
    bg: 'from-blue-500/5 to-blue-600/3',
    border: 'border-gray-100',
    iconBg: 'from-[#0066FF] to-[#0052CC]',
    shadow: 'shadow-blue-500/10',
  },
  {
    number: '02',
    icon: Code2,
    title: 'Build & Design',
    description: 'Agile development of your custom system — built inside your accounts, on your stack.',
    color: '#0066FF',
    bg: 'from-blue-500/5 to-blue-600/3',
    border: 'border-gray-100',
    iconBg: 'from-[#0066FF] to-[#0052CC]',
    shadow: 'shadow-blue-500/10',
  },
  {
    number: '03',
    icon: Workflow,
    title: 'Automate & Integrate',
    description: 'Everything connected into one workflow engine — CRM, content pipeline, outreach, and ads tracking.',
    color: '#0066FF',
    bg: 'from-blue-500/5 to-blue-600/3',
    border: 'border-gray-100',
    iconBg: 'from-[#0066FF] to-[#0052CC]',
    shadow: 'shadow-blue-500/10',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Scale',
    description: 'Ongoing optimization and support — the system runs, improves, and scales without you managing it manually.',
    color: '#0066FF',
    bg: 'from-blue-500/5 to-blue-600/3',
    border: 'border-gray-100',
    iconBg: 'from-[#0066FF] to-[#0052CC]',
    shadow: 'shadow-blue-500/10',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-20 md:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/60 to-white" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Our Process"
          title={<>From Audit to Automation <span className="gradient-text">in 4 Steps</span></>}
          description="A clear, outcome-driven framework — from identifying gaps to running a fully automated growth engine."
        />

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:block">
          <AnimatedSection variant="stagger-children">
            <div className="relative grid grid-cols-4 gap-6 xl:gap-8">
              {/* Connecting dashed line */}
              <div className="absolute top-[52px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] z-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-gray-200" />
              </div>

              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <AnimatedItem key={step.number} variant="fade-up" delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                      className={`group relative flex flex-col items-center text-center rounded-2xl border ${step.border} bg-white p-6 pt-8 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden`}
                    >
                      {/* Subtle gradient bg on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-b ${step.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

                      {/* Step number — positioned above icon */}
                      <div
                        className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-40"
                        style={{ color: step.color }}
                      >
                        Step {step.number}
                      </div>

                      {/* Icon circle */}
                      <div className="relative z-10 mb-5">
                        <div
                          className={`flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-gradient-to-br ${step.iconBg} shadow-lg ${step.shadow} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="relative z-10 mb-2 text-[15px] font-bold text-[#0A1628] leading-snug">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="relative z-10 text-sm text-gray-500 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </AnimatedItem>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden">
          <AnimatedSection variant="stagger-children">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-[#0066FF]/30 via-gray-200 to-transparent" />

              <div className="space-y-5">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <AnimatedItem key={step.number} variant="fade-up" delay={index * 0.08}>
                      <div className="flex gap-5 items-start">
                        {/* Icon on timeline */}
                        <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${step.iconBg} shadow-md ${step.shadow}`}>
                          <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                          <span
                            className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50"
                            style={{ color: step.color }}
                          >
                            Step {step.number}
                          </span>
                          <h3 className="text-base font-bold text-[#0A1628] mt-0.5 mb-1.5">{step.title}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </AnimatedItem>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
