import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { caseStudies } from '@/components/case-studies-data';
import Navigation from '@/components/navigation';

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-[#0A1628]">
      <Navigation />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0d1f3a] to-[#0A1628] pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0066FF]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#case-studies"
            className="inline-flex items-center gap-2 text-blue-300/70 hover:text-blue-200 text-sm font-medium mb-10 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {study.pills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90"
              >
                {pill}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white max-w-4xl">
            {study.headline}
          </h1>
          <p className="mt-5 text-blue-200/65 text-base sm:text-lg leading-relaxed max-w-3xl">
            {study.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-white/10 px-4 py-2">
              <div className="h-9 w-9 rounded-xl bg-[#DDE8FF] text-[#2563EB] font-bold flex items-center justify-center text-sm">
                {study.brandMark}
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-200/45">
                  {study.badge}
                </p>
                <p className="text-sm text-white">{study.brand}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F7F8FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0066FF] mb-5">
              Key Points
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {study.points.slice(0, 4).map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0066FF] shrink-0" />
                  <span className="text-sm sm:text-[15px] text-gray-700 leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0066FF] mb-2">Next Step</p>
              <p className="text-lg font-medium text-[#0A1628]">If you want this inside your stack, we&apos;ll build it with you.</p>
            </div>
            <a
              href="https://calendly.com/code_squad/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0066FF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-[#0052CC] transition-colors duration-300"
            >
              <Calendar className="w-4 h-4" />
              Book a Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
