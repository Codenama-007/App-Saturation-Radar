'use client';

const competitors = [
  {
    name: 'HabitAI',
    similarity: 92,
    category: 'AI habit tracking',
    launched: '34 days ago',
    tags: ['Next.js', 'OpenAI', 'Vercel'],
    users: '4.2K',
    risk: 'high',
  },
  {
    name: 'Streakly',
    similarity: 87,
    category: 'Gamified habit tracking',
    launched: '51 days ago',
    tags: ['React Native', 'Firebase'],
    users: '11K',
    risk: 'high',
  },
  {
    name: 'FocusHabit',
    similarity: 82,
    category: 'Student productivity',
    launched: '67 days ago',
    tags: ['Flutter', 'Supabase'],
    users: '2.8K',
    risk: 'medium',
  },
  {
    name: 'DailyStack',
    similarity: 74,
    category: 'Habit automation',
    launched: '89 days ago',
    tags: ['React', 'Node.js'],
    users: '6.1K',
    risk: 'medium',
  },
];

const riskColors: Record<string, string> = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#22C55E',
};

export function CompetitorIntelligence() {
  return (
    <section id="competitor-intelligence" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="section-label mb-4">COMPETITOR INTELLIGENCE</div>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
            >
              Not just a score.
              <br />
              <span className="text-[#9299A5]">Real context.</span>
            </h2>
          </div>
          <p className="text-base text-[#9299A5] leading-relaxed lg:max-w-md">
            Every similar product is surfaced with launch timing, technology signals, and
            similarity scores — so you understand <em>who</em> you&apos;re competing with.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {competitors.map((c, i) => (
            <div
              key={c.name}
              className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden group hover:border-[#B8F500]/30 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Card header */}
              <div className="px-4 py-3 border-b border-[#252932] flex items-center justify-between">
                <span
                  className="font-semibold text-sm text-[#F5F7FA]"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {c.name}
                </span>
                {/* Similarity badge */}
                <div
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold"
                  style={{
                    background: `${riskColors[c.risk]}15`,
                    color: riskColors[c.risk],
                    border: `1px solid ${riskColors[c.risk]}30`,
                    fontFamily: 'var(--font-jetbrains)',
                  }}
                >
                  {c.similarity}%
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                {/* Similarity bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="mono-data text-[9px]">SIMILARITY</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#252932] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 group-hover:opacity-100"
                      style={{ width: `${c.similarity}%`, background: riskColors[c.risk] }}
                    />
                  </div>
                </div>

                {/* Category & launch */}
                <div className="space-y-2 mb-4">
                  <div>
                    <div className="mono-data text-[9px] mb-0.5">CATEGORY</div>
                    <div className="text-xs text-[#F5F7FA]">{c.category}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="mono-data text-[9px] mb-0.5">LAUNCHED</div>
                      <div className="text-xs text-[#9299A5]">{c.launched}</div>
                    </div>
                    <div>
                      <div className="mono-data text-[9px] mb-0.5">EST. USERS</div>
                      <div className="text-xs text-[#F5F7FA]">{c.users}</div>
                    </div>
                  </div>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((tag) => (
                    <span key={tag} className="badge-cyan text-[9px] py-0.5 px-1.5">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary bar */}
        <div className="mt-8 p-4 rounded-xl border border-[#252932] bg-[#111318] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <div className="mono-data text-[9px] mb-0.5">TOTAL INDEXED PRODUCTS</div>
              <div className="text-xl font-bold text-[#F5F7FA]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>31</div>
            </div>
            <div className="w-px h-8 bg-[#252932]" />
            <div>
              <div className="mono-data text-[9px] mb-0.5">SHOWING TOP</div>
              <div className="text-xl font-bold text-[#F5F7FA]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>4</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="mono-data text-[10px] text-[#9299A5]">Example data for demonstration</span>
            <span className="badge-lime">MOCKUP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
