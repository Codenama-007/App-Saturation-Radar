'use client';

const secRows = [
  { label: 'HTTPS', status: 'ok', detail: 'TLS 1.3 enforced' },
  { label: 'HSTS', status: 'ok', detail: 'max-age=31536000; includeSubDomains' },
  { label: 'Content-Security-Policy', status: 'warn', detail: 'Header not present' },
  { label: 'X-Frame-Options', status: 'warn', detail: 'Missing — clickjacking risk' },
  { label: 'Referrer-Policy', status: 'ok', detail: 'strict-origin-when-cross-origin' },
  { label: 'X-Content-Type-Options', status: 'ok', detail: 'nosniff' },
  { label: 'Permissions-Policy', status: 'warn', detail: 'Not configured' },
];

const summary = [
  { label: 'PASSED', count: 4, color: '#22C55E' },
  { label: 'WARNINGS', count: 3, color: '#F59E0B' },
  { label: 'CRITICAL', count: 0, color: '#EF4444' },
];

const statusConfig: Record<string, { icon: string; color: string; bg: string }> = {
  ok:   { icon: '✓', color: '#22C55E', bg: 'rgba(34,197,94,0.08)' },
  warn: { icon: '⚠', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  fail: { icon: '✗', color: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
};

export function Security() {
  return (
    <section id="security" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="section-label mb-4">SECURITY CONFIGURATION ASSESSMENT</div>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
            >
              Observable security
              <br />
              <span className="text-[#22D3EE]">at a glance.</span>
            </h2>
          </div>
          <div className="space-y-3">
            <p className="text-base text-[#9299A5] leading-relaxed">
              A passive assessment of publicly observable HTTP headers and TLS configuration.
              No active probing, no vulnerability scanning, no penetration testing.
            </p>
            <div className="p-3 rounded-lg border border-[#F59E0B]/20 bg-[#F59E0B]/5 flex items-start gap-2">
              <span className="text-[#F59E0B] text-sm">⚠</span>
              <span className="text-xs text-[#9299A5]">
                This is a surface-level configuration check — not a security audit.
                Results reflect publicly visible headers only.
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Score overview */}
          <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#252932]">
              <span className="mono-data text-[10px] text-[#22D3EE]">SCORE OVERVIEW</span>
            </div>
            <div className="p-5">
              {/* Big score */}
              <div className="text-center mb-6">
                <div
                  className="text-8xl font-bold text-[#22C55E] leading-none mb-1"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  82
                </div>
                <div className="text-base text-[#9299A5]">/100</div>
              </div>

              {/* Gauge */}
              <div className="mb-6">
                <div className="h-3 rounded-full bg-[#252932] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '82%', background: 'linear-gradient(90deg, #22C55E 60%, #F59E0B 100%)' }}
                  />
                </div>
              </div>

              {/* Summary chips */}
              <div className="space-y-2">
                {summary.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="mono-data text-[10px] text-[#9299A5]">{s.label}</span>
                    <span
                      className="mono-data text-sm font-bold"
                      style={{ color: s.count === 0 ? '#252932' : s.color }}
                    >
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Security checks */}
          <div className="lg:col-span-2 rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#252932]">
              <span className="mono-data text-[10px] text-[#22D3EE]">HEADER ANALYSIS</span>
              <span className="badge-cyan">PASSIVE ONLY</span>
            </div>
            <div className="divide-y divide-[#252932]">
              {secRows.map((row) => {
                const cfg = statusConfig[row.status];
                return (
                  <div
                    key={row.label}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#252932]/30 transition-colors"
                  >
                    {/* Status icon */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {cfg.icon}
                    </div>

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#F5F7FA] truncate">{row.label}</div>
                      <div className="mono-data text-[9px] text-[#9299A5] mt-0.5">{row.detail}</div>
                    </div>

                    {/* Status badge */}
                    <span
                      className="flex-shrink-0 px-2 py-0.5 rounded text-[9px] font-bold"
                      style={{
                        fontFamily: 'var(--font-jetbrains)',
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.color}30`,
                      }}
                    >
                      {row.status === 'ok' ? 'PASS' : row.status === 'warn' ? 'WARN' : 'FAIL'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
