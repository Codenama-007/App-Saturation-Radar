'use client';

const ideaFlow = [
  { num: '01', title: 'Describe your idea', desc: 'Enter a natural language description of your app concept.' },
  { num: '02', title: 'We find similar products', desc: 'Semantic search across 10,000+ indexed applications.' },
  { num: '03', title: 'We measure competition', desc: 'Saturation score, launch velocity, and feature overlap.' },
  { num: '04', title: 'We identify potential gaps', desc: 'Surface underserved feature dimensions and opportunities.' },
];

const scanFlow = [
  { num: '01', title: 'Paste your website URL', desc: 'Any publicly accessible web application or landing page.' },
  { num: '02', title: 'Analyze technology', desc: 'Framework, infrastructure, and dependency fingerprinting.' },
  { num: '03', title: 'Assess security config', desc: 'Passive HTTP header and TLS configuration review.' },
  { num: '04', title: 'Estimate vibe-code likelihood', desc: 'AI-assisted development signal detection.' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="section-label mb-4">HOW IT WORKS</div>
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
          >
            Two workflows.
            <br />
            <span className="text-[#9299A5]">One platform.</span>
          </h2>
          <p className="text-base text-[#9299A5] leading-relaxed">
            Whether you&apos;re validating a new idea or analyzing an existing product,
            Saturation Radar gives you the intelligence to move faster with less guesswork.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Idea analysis flow */}
          <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-[#252932]">
              <div className="w-8 h-8 rounded-full border border-[#B8F500]/40 bg-[#B8F500]/10 flex items-center justify-center">
                <span className="text-[#B8F500] text-sm">→</span>
              </div>
              <div>
                <div className="mono-data text-[10px] text-[#B8F500]">WORKFLOW A</div>
                <div className="text-sm font-semibold text-[#F5F7FA]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Idea Analysis
                </div>
              </div>
            </div>

            <div className="p-6 space-y-0">
              {ideaFlow.map((step, i) => (
                <div key={step.num} className="flex gap-4">
                  {/* Left column */}
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full border border-[#B8F500]/30 bg-[#B8F500]/5 flex items-center justify-center flex-shrink-0">
                      <span
                        className="text-xs font-bold text-[#B8F500]"
                        style={{ fontFamily: 'var(--font-jetbrains)' }}
                      >
                        {step.num}
                      </span>
                    </div>
                    {i < ideaFlow.length - 1 && (
                      <div className="w-px flex-1 my-1.5 bg-gradient-to-b from-[#B8F500]/20 to-transparent min-h-[28px]" />
                    )}
                  </div>

                  {/* Right column */}
                  <div className={`pb-6 ${i === ideaFlow.length - 1 ? '' : ''}`}>
                    <div
                      className="font-semibold text-sm text-[#F5F7FA] mb-1"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-[#9299A5] leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Website scan flow */}
          <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-5 border-b border-[#252932]">
              <div className="w-8 h-8 rounded-full border border-[#22D3EE]/40 bg-[#22D3EE]/10 flex items-center justify-center">
                <span className="text-[#22D3EE] text-sm">⚡</span>
              </div>
              <div>
                <div className="mono-data text-[10px] text-[#22D3EE]">WORKFLOW B</div>
                <div className="text-sm font-semibold text-[#F5F7FA]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                  Website Scanner
                </div>
              </div>
            </div>

            <div className="p-6 space-y-0">
              {scanFlow.map((step, i) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/5 flex items-center justify-center flex-shrink-0">
                      <span
                        className="text-xs font-bold text-[#22D3EE]"
                        style={{ fontFamily: 'var(--font-jetbrains)' }}
                      >
                        {step.num}
                      </span>
                    </div>
                    {i < scanFlow.length - 1 && (
                      <div className="w-px flex-1 my-1.5 bg-gradient-to-b from-[#22D3EE]/20 to-transparent min-h-[28px]" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div
                      className="font-semibold text-sm text-[#F5F7FA] mb-1"
                      style={{ fontFamily: 'var(--font-space-grotesk)' }}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-[#9299A5] leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom data labels */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'ANALYSIS TIME', value: '< 5s' },
            { label: 'PRODUCTS INDEXED', value: '10K+' },
            { label: 'SECURITY HEADERS CHECKED', value: '12' },
            { label: 'VIBE SIGNALS DETECTED', value: '24+' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-lg border border-[#252932] bg-[#111318] text-center">
              <div
                className="text-2xl font-bold text-[#B8F500] mb-1"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {stat.value}
              </div>
              <div className="mono-data text-[9px] text-[#9299A5]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
