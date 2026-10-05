'use client';

import { useEffect, useRef, useState } from 'react';

const features = [
  { label: 'AI Coaching', coverage: 82, color: '#EF4444' },
  { label: 'Gamification', coverage: 71, color: '#F59E0B' },
  { label: 'Social Features', coverage: 55, color: '#F59E0B' },
  { label: 'Wearable Integration', coverage: 41, color: '#22C55E' },
  { label: 'Offline Support', coverage: 13, color: '#B8F500' },
  { label: 'Regional Language', coverage: 7, color: '#B8F500' },
];

const gaps = [
  {
    title: 'Offline-first experience',
    desc: 'Offline-first experiences appear underrepresented among indexed competitors.',
    score: 13,
  },
  {
    title: 'Regional language support',
    desc: 'Non-English interfaces have minimal coverage across competing products.',
    score: 7,
  },
];

export function GapAnalysis() {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gap-analysis" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(184,245,0,0.04) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="section-label mb-4">GAP ANALYSIS</div>
          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
          >
            Don&apos;t just see the competition.
            <br />
            <span className="text-[#B8F500]">Find the gap.</span>
          </h2>
          <p className="text-base text-[#9299A5] leading-relaxed">
            Feature coverage analysis reveals which capabilities are saturated —
            and which remain underserved. Potential gaps are surfaced automatically.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — feature coverage bars */}
          <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#252932]">
              <span className="mono-data text-[10px] text-[#B8F500]">FEATURE COVERAGE</span>
              <span className="mono-data text-[10px] text-[#9299A5]">31 PRODUCTS ANALYZED</span>
            </div>
            <div className="p-5 space-y-5">
              {features.map((feature, i) => (
                <div key={feature.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#F5F7FA]">{feature.label}</span>
                    <span
                      className="mono-data text-[10px]"
                      style={{ color: feature.color }}
                    >
                      {feature.coverage}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[#252932] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: animated ? `${feature.coverage}%` : '0%',
                        background: feature.color,
                        transitionDelay: `${i * 100}ms`,
                        boxShadow: feature.coverage < 20 ? `0 0 8px ${feature.color}50` : 'none',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-[#252932] flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span className="mono-data text-[9px] text-[#9299A5]">Saturated (&gt;60%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span className="mono-data text-[9px] text-[#9299A5]">Moderate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B8F500]" />
                <span className="mono-data text-[9px] text-[#9299A5]">Gap (&lt;20%)</span>
              </div>
            </div>
          </div>

          {/* Right — gap callouts */}
          <div className="space-y-4">
            {gaps.map((gap, i) => (
              <div
                key={gap.title}
                className="rounded-xl border border-[#B8F500]/30 bg-[#B8F500]/5 overflow-hidden transition-all duration-300 hover:border-[#B8F500]/50"
              >
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#B8F500]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8F500] animate-blink" />
                    <span className="mono-data text-[10px] text-[#B8F500]">POTENTIAL GAP DETECTED</span>
                  </div>
                  <span className="mono-data text-[10px] text-[#B8F500]">{gap.score}% coverage</span>
                </div>
                <div className="p-5">
                  <div
                    className="text-xl font-semibold text-[#F5F7FA] mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {gap.title}
                  </div>
                  <p className="text-sm text-[#9299A5] leading-relaxed">{gap.desc}</p>
                  <div className="mt-4 text-xs text-[#9299A5] italic border-t border-[#B8F500]/15 pt-3">
                    Estimated from indexed market data. Not a guarantee of market opportunity.
                  </div>
                </div>
              </div>
            ))}

            {/* Context card */}
            <div className="p-4 rounded-xl border border-[#252932] bg-[#111318]">
              <div className="mono-data text-[9px] text-[#9299A5] mb-3">INTERPRETATION GUIDE</div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[#B8F500] text-xs mt-0.5">→</span>
                  <span className="text-xs text-[#9299A5]">Low feature coverage = less competition in that dimension</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#B8F500] text-xs mt-0.5">→</span>
                  <span className="text-xs text-[#9299A5]">Gaps are <em>potential</em> opportunities, not validated markets</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#B8F500] text-xs mt-0.5">→</span>
                  <span className="text-xs text-[#9299A5]">Low coverage can also mean low user demand — validate independently</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
