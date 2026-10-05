'use client';

import { useEffect, useRef, useState } from 'react';

const radarAxes = [
  { label: 'FRAMEWORK', angle: 0, detected: true, value: 0.9 },
  { label: 'INFRASTRUCTURE', angle: 60, detected: true, value: 0.85 },
  { label: 'UI PATTERNS', angle: 120, detected: true, value: 0.75 },
  { label: 'CODE SIGNALS', angle: 180, detected: true, value: 0.7 },
  { label: 'CONTENT SIGNALS', angle: 240, detected: false, value: 0.6 },
  { label: 'DEPLOYMENT', angle: 300, detected: true, value: 0.88 },
];

const signals = [
  { label: 'Cursor-generated file headers', confidence: 'HIGH' },
  { label: 'Generic component naming patterns', confidence: 'MEDIUM' },
  { label: 'AI-typical dependency selection', confidence: 'HIGH' },
  { label: 'Vercel deployment signals', confidence: 'HIGH' },
  { label: 'No custom build configuration', confidence: 'MEDIUM' },
];

const confidenceColors: Record<string, string> = {
  HIGH: '#B8F500',
  MEDIUM: '#F59E0B',
  LOW: '#9299A5',
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function RadarChart() {
  const cx = 120, cy = 120, maxR = 90;
  const levels = [0.25, 0.5, 0.75, 1];

  const polygonPoints = radarAxes
    .map((a) => {
      const pt = polarToCartesian(cx, cy, a.value * maxR, a.angle);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 240 240" className="w-full max-w-[260px] mx-auto">
      {/* Grid rings */}
      {levels.map((l) => {
        const pts = radarAxes
          .map((a) => {
            const p = polarToCartesian(cx, cy, l * maxR, a.angle);
            return `${p.x},${p.y}`;
          })
          .join(' ');
        return <polygon key={l} points={pts} fill="none" stroke="#252932" strokeWidth="1" />;
      })}

      {/* Axis lines */}
      {radarAxes.map((a) => {
        const end = polarToCartesian(cx, cy, maxR, a.angle);
        return <line key={a.label} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#252932" strokeWidth="1" />;
      })}

      {/* Data polygon */}
      <polygon
        points={polygonPoints}
        fill="rgba(184,245,0,0.1)"
        stroke="#B8F500"
        strokeWidth="1.5"
      />

      {/* Data points */}
      {radarAxes.map((a) => {
        const pt = polarToCartesian(cx, cy, a.value * maxR, a.angle);
        return (
          <circle key={a.label + '-dot'} cx={pt.x} cy={pt.y} r="3" fill="#B8F500" />
        );
      })}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="2.5" fill="#B8F500" opacity="0.6" />

      {/* Axis labels */}
      {radarAxes.map((a) => {
        const labelPt = polarToCartesian(cx, cy, maxR + 16, a.angle);
        return (
          <text
            key={a.label + '-text'}
            x={labelPt.x}
            y={labelPt.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="7"
            fill="#9299A5"
            fontFamily="var(--font-jetbrains)"
          >
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

export function VibeCode() {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
          const target = 78;
          const duration = 1200;
          const start = Date.now();
          const timer = setInterval(() => {
            const t = Math.min((Date.now() - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t === 1) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section id="vibe-code" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 dot-grid opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy + score */}
          <div>
            <div className="section-label mb-4">VIBE-CODE DETECTION</div>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'var(--font-space-grotesk)', letterSpacing: '-0.02em' }}
            >
              Understand what
              <br />
              <span className="text-[#B8F500]">powers the product.</span>
            </h2>
            <p className="text-base text-[#9299A5] leading-relaxed mb-10">
              Saturation Radar detects observable signals associated with AI-assisted
              development — framework choices, deployment patterns, code structure signals,
              and content fingerprints.
            </p>

            {/* Score card */}
            <div className="p-6 rounded-xl border border-[#252932] bg-[#111318]">
              <div className="mono-data text-[10px] text-[#B8F500] mb-4">VIBE-CODE LIKELIHOOD</div>
              <div className="flex items-end gap-3 mb-4">
                <div
                  className="text-7xl font-bold text-[#B8F500] leading-none"
                  style={{ fontFamily: 'var(--font-space-grotesk)', textShadow: '0 0 30px rgba(184,245,0,0.3)' }}
                >
                  {count}
                </div>
                <div className="mb-2 text-3xl text-[#9299A5] font-semibold">%</div>
              </div>
              <div className="h-2 rounded-full bg-[#252932] overflow-hidden mb-4">
                <div
                  className="h-full rounded-full bg-[#B8F500] transition-all duration-1000"
                  style={{ width: `${count}%` }}
                />
              </div>
              <div className="text-xs text-[#9299A5] italic leading-relaxed border-t border-[#252932] pt-4">
                Estimated from publicly observable signals. Not a definitive attribution.
                Signal detection is probabilistic and does not imply confirmed use of any specific tool.
              </div>
            </div>

            {/* Detected signals */}
            <div className="mt-4 space-y-2">
              <div className="mono-data text-[9px] text-[#9299A5] mb-3">DETECTED SIGNALS</div>
              {signals.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-2 border-b border-[#252932]/50">
                  <span className="text-xs text-[#F5F7FA]">{s.label}</span>
                  <span
                    className="mono-data text-[9px] px-2 py-0.5 rounded border"
                    style={{
                      color: confidenceColors[s.confidence],
                      borderColor: `${confidenceColors[s.confidence]}30`,
                      background: `${confidenceColors[s.confidence]}10`,
                    }}
                  >
                    {s.confidence}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — radar chart */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-sm p-6 rounded-xl border border-[#252932] bg-[#111318]">
              <div className="mono-data text-[10px] text-[#B8F500] mb-4 text-center">SIGNAL RADAR</div>
              <RadarChart />
              <div className="mt-4 grid grid-cols-2 gap-2">
                {radarAxes.map((a) => (
                  <div key={a.label} className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: a.detected ? '#B8F500' : '#252932' }}
                    />
                    <span className="mono-data text-[9px] text-[#9299A5]">{a.label}</span>
                    <span className="mono-data text-[9px] text-[#B8F500] ml-auto">{Math.round(a.value * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
