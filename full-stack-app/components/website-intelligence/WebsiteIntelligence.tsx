'use client';

import { useState } from 'react';

const techStack = [
  { label: 'Next.js', detected: true },
  { label: 'React', detected: true },
  { label: 'Tailwind CSS', detected: true },
  { label: 'Vercel', detected: true },
  { label: 'TypeScript', detected: true },
  { label: 'Framer Motion', detected: false },
];

const securityRows = [
  { label: 'HTTPS', status: 'ok', note: 'TLS 1.3' },
  { label: 'HSTS', status: 'ok', note: 'max-age=31536000' },
  { label: 'Content-Security-Policy', status: 'warn', note: 'Not configured' },
  { label: 'X-Frame-Options', status: 'warn', note: 'Missing header' },
  { label: 'Referrer-Policy', status: 'ok', note: 'strict-origin-when-cross-origin' },
  { label: 'Permissions-Policy', status: 'warn', note: 'Not set' },
];

const statusIcons: Record<string, { icon: string; color: string }> = {
  ok:   { icon: '✓', color: '#22C55E' },
  warn: { icon: '⚠', color: '#F59E0B' },
  fail: { icon: '✗', color: '#EF4444' },
};

export function WebsiteIntelligence() {
  const [url, setUrl] = useState('https://yourapp.com');
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 1800);
  };

  return (
    <section id="website-intelligence" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(34,211,238,0.03) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="section-label mb-4">WEBSITE INTELLIGENCE</div>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
            >
              Already built something?
              <br />
              <span className="text-[#22D3EE]">Scan it.</span>
            </h2>
          </div>
          <p className="text-base text-[#9299A5] leading-relaxed lg:max-w-md">
            Analyze your website&apos;s technology, observable security configuration,
            and signals associated with AI-assisted development — from a single URL.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — URL input + scan result */}
          <div className="space-y-4">
            {/* URL input */}
            <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#252932]">
                <div className="mono-data text-[10px] text-[#22D3EE] mb-3">WEBSITE SCANNER</div>
                <div className="flex items-center gap-2 p-3 rounded-lg border border-[#252932] bg-[#0d1014] mb-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 text-[#9299A5]">
                    <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M1 6h12" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="3.5" cy="4.5" r="0.5" fill="currentColor"/>
                    <circle cx="5.5" cy="4.5" r="0.5" fill="currentColor"/>
                  </svg>
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-[#F5F7FA] outline-none placeholder-[#9299A5]"
                    placeholder="https://yourapp.com"
                  />
                </div>
                <button
                  onClick={handleScan}
                  disabled={scanning}
                  className={`w-full justify-center text-xs py-2.5 rounded-md font-semibold flex items-center gap-2 transition-all duration-200 ${
                    scanning
                      ? 'bg-[#252932] text-[#9299A5] cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                  style={{ background: scanning ? undefined : undefined }}
                >
                  {scanning ? (
                    <>
                      <span className="w-3.5 h-3.5 border border-t-transparent border-[#9299A5] rounded-full animate-spin" />
                      Scanning…
                    </>
                  ) : (
                    <>Scan Website →</>
                  )}
                </button>
              </div>

              {/* Scan result summary */}
              {(scanned || !scanning) && (
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg border border-[#252932] bg-[#0d1014]">
                      <div className="mono-data text-[9px] mb-1.5">SECURITY CONFIG</div>
                      <div
                        className="text-2xl font-bold text-[#22C55E]"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        82<span className="text-base text-[#9299A5]">/100</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg border border-[#252932] bg-[#0d1014]">
                      <div className="mono-data text-[9px] mb-1.5">VIBE-CODE LIKELIHOOD</div>
                      <div
                        className="text-2xl font-bold text-[#B8F500]"
                        style={{ fontFamily: 'var(--font-space-grotesk)' }}
                      >
                        78<span className="text-base text-[#9299A5]">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tech stack */}
            <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#252932]">
                <span className="mono-data text-[10px] text-[#22D3EE]">TECHNOLOGY DETECTED</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-2">
                  {techStack.map((t) => (
                    <div key={t.label} className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold"
                        style={{ color: t.detected ? '#22C55E' : '#9299A5' }}
                      >
                        {t.detected ? '✓' : '·'}
                      </span>
                      <span className="text-xs text-[#F5F7FA]">{t.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — security panel */}
          <div className="rounded-xl border border-[#252932] bg-[#111318] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#252932]">
              <span className="mono-data text-[10px] text-[#22D3EE]">SECURITY CONFIGURATION</span>
              <span className="badge-cyan">PASSIVE ASSESSMENT</span>
            </div>

            {/* Score gauge */}
            <div className="px-5 pt-5 pb-4 border-b border-[#252932]">
              <div className="flex items-center gap-4">
                <div
                  className="text-5xl font-bold text-[#22C55E]"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  82
                </div>
                <div>
                  <div className="text-xl text-[#9299A5]">/100</div>
                  <div className="mono-data text-[10px] text-[#22C55E] mt-0.5">GOOD</div>
                </div>
                <div className="flex-1 ml-4">
                  <div className="h-2 rounded-full bg-[#252932] overflow-hidden">
                    <div className="h-full rounded-full bg-[#22C55E]" style={{ width: '82%' }} />
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-[#9299A5] italic">
                Passive assessment of publicly observable security configuration.
                Not a penetration test or vulnerability scan.
              </div>
            </div>

            {/* Security rows */}
            <div className="p-5 space-y-3">
              {securityRows.map((row) => {
                const s = statusIcons[row.status];
                return (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-[#252932]/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold w-4 text-center" style={{ color: s.color }}>
                        {s.icon}
                      </span>
                      <span className="text-sm text-[#F5F7FA]">{row.label}</span>
                    </div>
                    <span className="mono-data text-[10px] text-[#9299A5] text-right max-w-[140px] truncate">
                      {row.note}
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
