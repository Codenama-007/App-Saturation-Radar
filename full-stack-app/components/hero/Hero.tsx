'use client';

import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/providers/lenis-provider';

function HeroDashboard() {
  const [score, setScore] = useState(0);
  const [showProducts, setShowProducts] = useState(false);
  const [scanLine, setScanLine] = useState(true);

  useEffect(() => {
    // Animate score counter
    const duration = 1800;
    const target = 84;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setScore(Math.round(eased * target));
      if (progress === 1) clearInterval(timer);
    }, 16);

    // Show competitor products after delay
    const t = setTimeout(() => setShowProducts(true), 1200);
    return () => { clearInterval(timer); clearTimeout(t); };
  }, []);

  return (
    <div className="relative w-full max-w-[520px] mx-auto rounded-xl border border-[#252932] overflow-hidden shadow-2xl bg-[#0d0f13]">
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#252932] bg-[#111318]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]/70" />
        <span className="ml-3 mono-data text-[11px]">SATURATION RADAR — Analysis v2.1</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8F500] animate-blink" />
          <span className="mono-data text-[10px] text-[#B8F500]">LIVE</span>
        </span>
      </div>

      {/* Main content */}
      <div className="relative p-5 overflow-hidden">
        {/* Scan line animation */}
        {scanLine && (
          <div
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8F500]/60 to-transparent pointer-events-none z-10 animate-scan-line"
            style={{ top: 0 }}
            onAnimationIteration={() => {}}
          />
        )}

        {/* Query */}
        <div className="mb-4 p-3 rounded-lg border border-[#252932] bg-[#111318]">
          <div className="mono-data text-[10px] text-[#B8F500] mb-1">ANALYZING IDEA</div>
          <div className="text-sm text-[#F5F7FA] font-medium">&ldquo;AI habit tracker for college students&rdquo;</div>
        </div>

        {/* Score area */}
        <div className="flex items-start gap-6 mb-4">
          {/* Radar circle */}
          <div className="relative flex-shrink-0 w-24 h-24">
            <svg viewBox="0 0 96 96" className="w-24 h-24">
              {/* Background circles */}
              <circle cx="48" cy="48" r="42" stroke="#252932" strokeWidth="1" fill="none" />
              <circle cx="48" cy="48" r="30" stroke="#252932" strokeWidth="1" fill="none" />
              <circle cx="48" cy="48" r="18" stroke="#252932" strokeWidth="1" fill="none" />
              {/* Score arc */}
              <circle
                cx="48" cy="48" r="42"
                stroke="#B8F500"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(score / 100) * 264} 264`}
                transform="rotate(-90 48 48)"
                style={{ transition: 'stroke-dasharray 0.1s ease' }}
              />
              {/* Center dot */}
              <circle cx="48" cy="48" r="4" fill="#B8F500" />
            </svg>
            {/* Pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-[#B8F500]/30 animate-radar-pulse" />
            </div>
          </div>

          {/* Score text */}
          <div>
            <div className="mono-data text-[10px] mb-0.5">SATURATION SCORE</div>
            <div
              className="text-5xl font-bold text-[#B8F500] leading-none"
              style={{ fontFamily: 'var(--font-space-grotesk)', textShadow: '0 0 20px rgba(184,245,0,0.4)' }}
            >
              {score}
              <span className="text-2xl text-[#9299A5]">/100</span>
            </div>
            <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#EF4444]/30 bg-[#EF4444]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
              <span className="mono-data text-[10px] text-[#EF4444]">HIGH SATURATION</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2.5 rounded-lg border border-[#252932] bg-[#111318]">
            <div className="mono-data text-[10px] mb-0.5">COMPARABLE PRODUCTS</div>
            <div className="text-xl font-bold text-[#F5F7FA]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>31</div>
          </div>
          <div className="p-2.5 rounded-lg border border-[#252932] bg-[#111318]">
            <div className="mono-data text-[10px] mb-0.5">LAUNCHED (&lt;90 DAYS)</div>
            <div className="text-xl font-bold text-[#F59E0B]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>18</div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#252932] mb-4" />

        {/* Closest products */}
        <div className="mono-data text-[10px] text-[#B8F500] mb-3">CLOSEST PRODUCTS</div>
        <div className="flex flex-col gap-2">
          {[
            { name: 'HabitAI', score: 92, color: '#EF4444' },
            { name: 'Streakly', score: 87, color: '#F59E0B' },
            { name: 'FocusHabit', score: 82, color: '#F59E0B' },
          ].map((p, i) => (
            <div
              key={p.name}
              className="flex items-center gap-3 transition-all duration-300"
              style={{
                opacity: showProducts ? 1 : 0,
                transform: showProducts ? 'translateX(0)' : 'translateX(-12px)',
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <span className="mono-data text-[11px] text-[#F5F7FA] w-24">{p.name}</span>
              <div className="flex-1 h-1 rounded-full bg-[#252932] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: showProducts ? `${p.score}%` : '0%',
                    background: p.color,
                    transitionDelay: `${400 + i * 150}ms`,
                  }}
                />
              </div>
              <span className="mono-data text-[11px] text-[#9299A5] w-8 text-right">{p.score}%</span>
            </div>
          ))}
        </div>

        {/* Status footer */}
        <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#252932]">
          <span className="mono-data text-[9px]">SCAN_STATUS: COMPLETE</span>
          <span className="mono-data text-[9px] text-[#B8F500]">ANALYSIS_TIME: 2.4s</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { scrollTo } = useLenis();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) scrollTo(el);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      {/* Radial fade overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,245,0,0.04) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(8,9,11,0.9) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#252932] bg-[#111318]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8F500] animate-blink" />
                <span className="section-label text-[10px]">AI APP MARKET INTELLIGENCE</span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
            >
              Know the market
              <br />
              <span className="text-[#B8F500]" style={{ textShadow: '0 0 40px rgba(184,245,0,0.25)' }}>
                before you build.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-[#9299A5] leading-relaxed mb-10 max-w-xl">
              Analyze your app idea, discover similar products, measure market saturation,
              and find potential gaps before you spend weeks building something nobody needs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#saturation-radar"
                onClick={(e) => handleScroll(e, 'saturation-radar')}
                className="btn-primary text-sm py-3 px-6"
              >
                Analyze Your Idea
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#website-intelligence"
                onClick={(e) => handleScroll(e, 'website-intelligence')}
                className="btn-ghost text-sm py-3 px-6"
              >
                Scan a Website
              </a>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-[#252932]">
              {[
                { value: '10K+', label: 'Products Indexed' },
                { value: '2.4s', label: 'Avg. Analysis Time' },
                { value: '94%', label: 'Gap Detection Accuracy' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold text-[#F5F7FA]"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#9299A5] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="relative animate-float-subtle lg:pl-8">
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-xl" style={{ boxShadow: '0 0 80px rgba(184,245,0,0.08)' }} />
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="mono-data text-[10px]">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#9299A5] to-transparent" />
      </div>
    </section>
  );
}
