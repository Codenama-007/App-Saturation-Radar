'use client';

export function Problem() {
  const lines = [
    { text: 'Same idea.', delay: 0 },
    { text: 'Same audience.', delay: 100 },
    { text: 'Same features.', delay: 200 },
    { text: 'Same pricing.', delay: 300 },
    { text: '', delay: 400 },
    { text: 'Different founder.', delay: 500, muted: true },
    { text: '', delay: 600 },
    { text: 'Same result:', delay: 700, muted: true },
    { text: 'No users.', delay: 800, accent: true },
  ];

  return (
    <section id="problem" className="relative py-32 overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, rgba(8,9,11,0.95), transparent)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — headline */}
          <div>
            <div className="section-label mb-6">THE PROBLEM</div>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight mb-8"
              style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
            >
              You have an idea.
              <br />
              <span className="text-[#9299A5]">But do you know who</span>
              <br />
              already built it?
            </h2>
            <p className="text-base text-[#9299A5] leading-relaxed max-w-md">
              Most builders discover their competitors after they&apos;ve already shipped.
              By then, user acquisition is 10× harder and differentiation feels impossible.
            </p>

            {/* Cost callout */}
            <div className="mt-8 p-4 rounded-lg border border-[#EF4444]/20 bg-[#EF4444]/5">
              <div className="mono-data text-[10px] text-[#EF4444] mb-2">ESTIMATED COST OF BUILDING BLIND</div>
              <div className="text-2xl font-bold text-[#F5F7FA]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                4–12 weeks
              </div>
              <div className="text-sm text-[#9299A5] mt-1">of engineering time on an already-saturated idea</div>
            </div>
          </div>

          {/* Right — typographic statement */}
          <div className="relative">
            {/* Terminal-style card */}
            <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#252932] bg-[#0d1014]">
                <div className="mono-data text-[10px] text-[#9299A5]">founder_diary.log</div>
              </div>
              <div className="p-6 font-mono">
                {lines.map((line, i) =>
                  line.text === '' ? (
                    <div key={i} className="h-4" />
                  ) : (
                    <div
                      key={i}
                      className={`text-lg sm:text-xl font-semibold leading-snug transition-all duration-500 ${
                        line.accent
                          ? 'text-[#EF4444]'
                          : line.muted
                          ? 'text-[#9299A5]'
                          : 'text-[#F5F7FA]'
                      }`}
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        animationDelay: `${line.delay}ms`,
                      }}
                    >
                      {line.text}
                    </div>
                  )
                )}

                {/* Cursor blink */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[#B8F500] animate-blink text-xl font-bold">█</span>
                </div>
              </div>
            </div>

            {/* Floating tag */}
            <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full border border-[#252932] bg-[#111318]">
              <span className="mono-data text-[10px]">PATTERN DETECTED: 31× cases</span>
            </div>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'COMPETING APPS IN HABIT-TRACKER CATEGORY', value: '200+' },
            { label: 'LAUNCHED IN LAST 90 DAYS', value: '47' },
            { label: 'SURVIVE PAST 6 MONTHS', value: '12%' },
            { label: 'FOUNDERS WHO RESEARCHED FIRST', value: '8%' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-lg border border-[#252932] bg-[#111318]">
              <div className="mono-data text-[9px] mb-2 leading-relaxed">{stat.label}</div>
              <div
                className="text-2xl font-bold text-[#F5F7FA]"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
