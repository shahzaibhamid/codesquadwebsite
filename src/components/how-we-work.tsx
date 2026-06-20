'use client';

const steps = [
  {
    title: 'Discovery Call',
    description:
      'We learn about your business, workflows, goals, and bottlenecks.',
  },
  {
    title: 'Opportunity Assessment',
    description:
      'We identify the highest-impact automation and AI opportunities based on business value and ROI.',
  },
  {
    title: 'Build & Deploy',
    description:
      'We implement automation systems, AI agents, and workflows directly into your existing stack.',
  },
  {
    title: 'Optimize & Scale',
    description:
      'We continuously improve and expand systems as your business grows.',
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="relative bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center sm:mb-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#6B7280]">
            Our process
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#1A1A1A]">
            How we work
          </h2>
        </div>

        <ol className="divide-y divide-[#F0F1F4]">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-5 py-8 first:pt-0 last:pb-0 sm:gap-7"
            >
              <span className="font-mono text-[26px] sm:text-[30px] font-medium leading-none text-[#1E3A5F]/35 tracking-tight shrink-0 w-10">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h3 className="text-[19px] sm:text-[20px] font-semibold tracking-[-0.01em] text-[#1A1A1A]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.65] text-[#4B5563]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
