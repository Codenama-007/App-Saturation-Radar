'use client';
import Link from "next/link";

const pipelineSteps = [
  { id: '01', label: 'YOUR IDEA', desc: 'Natural language description of your app concept' },
  { id: '02', label: 'SEMANTIC SEARCH', desc: 'Vector similarity across 10,000+ indexed products' },
  { id: '03', label: 'SIMILAR PRODUCTS', desc: 'Ranked by semantic & feature overlap' },
  { id: '04', label: 'MARKET ANALYSIS', desc: 'Launch velocity, pricing clusters, feature coverage' },
  { id: '05', label: 'SATURATION SCORE', desc: 'Composite 0–100 intelligence metric' },
];

const metrics = [
  { label: 'Comparable Products', value: '31', sub: 'indexed products' },
  { label: 'Recent Launches', value: '18', sub: 'in last 90 days', warn: true },
  { label: 'Feature Overlap', value: 'HIGH', sub: '7 of 8 core features', warn: true },
  { label: 'Pricing Overlap', value: 'MEDIUM', sub: '$9–29/mo bracket' },
];

export function SaturationRadar() {
  return (
    <section id="saturation-radar" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(184,245,0,0.03) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-label mb-4">CORE FEATURE</div>
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
          >
            See how crowded your
            <br />
            <span className="text-[#B8F500]">idea really is.</span>
          </h2>
          <p className="text-base text-[#9299A5] leading-relaxed">
            Describe your application idea and Saturation Radar finds the products most similar
            to it across the indexed market — giving you an objective signal before you commit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — pipeline */}
          <div className="relative">
            <div className="space-y-0">
              {pipelineSteps.map((step, i) => (
                <div key={step.id} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Connector line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${
                        i === 0 || i === pipelineSteps.length - 1
                          ? 'border-[#B8F500] bg-[#B8F500]/10'
                          : 'border-[#252932] bg-[#111318]'
                      }`}>
                        <span className="mono-data text-[9px] text-[#B8F500]">{step.id}</span>
                      </div>
                      {i < pipelineSteps.length - 1 && (
                        <div className="w-px h-10 bg-gradient-to-b from-[#252932] to-transparent mt-1" />
                      )}
                    </div>
                    <div className="pt-1 pb-8">
                      <div className="mono-data text-[10px] text-[#B8F500] mb-1">{step.label}</div>
                      <div className="text-sm text-[#9299A5]">{step.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input mockup */}
            <div className="mt-2 p-4 rounded-xl border border-[#252932] bg-[#111318]">
              <div className="mono-data text-[10px] text-[#9299A5] mb-3">IDEA INPUT</div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-[#252932] bg-[#0d1014]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-[#9299A5]">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
                  <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-sm text-[#9299A5] flex-1">AI habit tracker for college students...</span>
                <span className="text-[#B8F500] animate-blink text-sm">|</span>
              </div>
              <Link href = '/analyze'>
              <button className="btn-primary w-full mt-3 justify-center text-xs py-2.5">
                Analyze Market →
              </button>
              </Link>
              
            </div>
          </div>

          {/* Right — score dashboard */}
          <div className="space-y-4">
            {/* Score card */}
            <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#252932]">
                <span className="mono-data text-[10px] text-[#B8F500]">SATURATION SCORE</span>
                <span className="badge-lime">ANALYSIS COMPLETE</span>
              </div>
              <div className="p-5">
                {/* Score */}
                <div className="flex items-end gap-4 mb-6">
                  <div
                    className="text-7xl font-bold text-[#B8F500] leading-none"
                    style={{ fontFamily: 'var(--font-space-grotesk)', textShadow: '0 0 30px rgba(184,245,0,0.3)' }}
                  >
                    84
                  </div>
                  <div className="mb-2">
                    <div className="text-2xl text-[#9299A5] font-semibold">/100</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                      <span className="mono-data text-[10px] text-[#EF4444]">HIGH</span>
                    </div>
                  </div>
                </div>

                {/* Gauge bar */}
                <div className="mb-6">
                  <div className="h-2 rounded-full bg-[#252932] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: '84%',
                        background: 'linear-gradient(90deg, #22C55E 0%, #F59E0B 50%, #EF4444 84%)',
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="mono-data text-[9px] text-[#22C55E]">LOW</span>
                    <span className="mono-data text-[9px] text-[#F59E0B]">MEDIUM</span>
                    <span className="mono-data text-[9px] text-[#EF4444]">HIGH</span>
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-3">
                  {metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-lg border border-[#252932] bg-[#0d1014]">
                      <div className="mono-data text-[9px] mb-1.5 leading-tight">{m.label}</div>
                      <div
                        className={`text-lg font-bold ${m.warn ? 'text-[#F59E0B]' : 'text-[#F5F7FA]'}`}
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        {m.value}
                      </div>
                      <div className="mono-data text-[9px] text-[#9299A5] mt-0.5">{m.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-[#252932] bg-[#111318]">
              <span className="mono-data text-[10px]">ANALYSIS_ID: SR-20240810-9F2A</span>
              <span className="mono-data text-[10px] text-[#22C55E]">✓ COMPLETE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
