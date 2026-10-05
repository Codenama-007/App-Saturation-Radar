'use client';

import { useLenis } from '@/components/providers/lenis-provider';

export function FinalCta() {
  const { scrollTo } = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) scrollTo(el);
  };

  return (
    <section id="cta" className="relative py-32 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      {/* Lime glow center */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,245,0,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-[#252932] bg-[#111318] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8F500] animate-blink" />
          <span className="section-label text-[10px]">READY TO SHIP WITH EVIDENCE?</span>
        </div>

        {/* Headline */}
        <h2
          className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
          style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
        >
          Build smarter.
          <br />
          <span className="text-[#B8F500]" style={{ textShadow: '0 0 40px rgba(184,245,0,0.25)' }}>
            Ship with evidence.
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-lg text-[#9299A5] leading-relaxed mb-12 max-w-xl mx-auto">
          Stop guessing whether your next idea has room to compete.
          Get the market signal before you write a single line of code.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#saturation-radar"
            onClick={(e) => handleScroll(e, 'saturation-radar')}
            className="btn-primary text-base py-3.5 px-8 text-sm"
          >
            Analyze Your Idea
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#website-intelligence"
            onClick={(e) => handleScroll(e, 'website-intelligence')}
            className="btn-ghost text-sm py-3.5 px-8"
          >
            Scan a Website
          </a>
        </div>

        {/* Monospace assurance strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {[
            'No backend required',
            'UI mockup demonstration',
            'Open-source roadmap',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-[#B8F500] text-sm">✓</span>
              <span className="mono-data text-[10px] text-[#9299A5]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
