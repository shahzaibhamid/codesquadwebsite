'use client';

import { Users, Zap, ShieldCheck } from 'lucide-react';

const stats = [
  { icon: Users, value: '20+', label: 'Clients Served' },
  { icon: Zap, value: '100%', label: 'Brand-Owned Stack' },
  { icon: ShieldCheck, value: '50%+', label: 'US Based Clients' },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#071020] py-20 md:py-28">
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[#0066FF]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                Automation Agency That Helps You Scale.
              </h2>

              <p className="text-blue-200/60 text-base leading-relaxed max-w-lg mb-5">
                We build systems you actually own.
                <br />
                Designed for your workflows, integrated into your stack, and built to scale with your business.
              </p>

              <p className="text-blue-200/60 text-base leading-relaxed max-w-lg mt-5">
                We&apos;ve done this for 20+ clients across healthcare, agriculture, fintech, and manufacturing.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {stats.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-[#0066FF]/30 hover:bg-white/[0.07] transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:border-[#0066FF] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#338AFF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-white leading-none">{s.value}</p>
                      <p className="text-sm text-blue-200/50 mt-1">{s.label}</p>
                    </div>
                  </div>
                );
              })}

              <p className="text-xs text-blue-200/30 font-semibold uppercase tracking-widest text-center mt-2">
                Proof — Built for real execution
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-16 bg-gradient-to-br from-[#071020] to-[#0A1628] overflow-hidden">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 64" preserveAspectRatio="none" fill="white">
          <path d="M0,64 L1440,0 L1440,64 Z" />
        </svg>
      </div>

    </section>
  );
}
