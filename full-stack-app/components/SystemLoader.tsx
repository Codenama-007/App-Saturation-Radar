
type SystemLoaderProps = {
  label?: string;
  sublabel?: string;
  fullScreen?: boolean;
  showProgress?: boolean;
};

export function SystemLoader({
  label = "INITIALIZING SYSTEM",
  sublabel = "Establishing secure connection...",
  fullScreen = false,
  showProgress = true,
}: SystemLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={[
        "relative flex items-center justify-center overflow-hidden",
        "bg-[#08090B] text-[#F5F7FA]",
        fullScreen ? "fixed inset-0 z-50 min-h-screen" : "min-h-[360px] w-full rounded-lg",
      ].join(" ")}
    >
      {/* Technical grid background */}
      <div
        aria-hidden="true"
        className="grid-bg-sm pointer-events-none absolute inset-0 opacity-40"
      />

      {/* Ambient lime glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B8F500]/[0.04] blur-3xl"
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center px-6 py-12">
        {/* Radar animation */}
        <div
          aria-hidden="true"
          className="relative mb-10 flex h-40 w-40 items-center justify-center"
        >
          {/* Static radar circles */}
          <div className="absolute inset-0 rounded-full border border-[#252932]" />
          <div className="absolute inset-[18px] rounded-full border border-[#252932]" />
          <div className="absolute inset-[36px] rounded-full border border-[#252932]" />

          {/* Radar crosshairs */}
          <div className="absolute h-px w-full bg-[#252932]" />
          <div className="absolute h-full w-px bg-[#252932]" />

          {/* Animated expanding rings */}
          <div className="loader-radar-ring absolute h-16 w-16 rounded-full border border-[#B8F500]/70" />
          <div className="loader-radar-ring loader-delay-1 absolute h-16 w-16 rounded-full border border-[#B8F500]/50" />
          <div className="loader-radar-ring loader-delay-2 absolute h-16 w-16 rounded-full border border-[#22D3EE]/40" />

          {/* Rotating radar sweep */}
          <div className="loader-radar-sweep absolute inset-2 rounded-full">
            <div className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom bg-gradient-to-t from-[#B8F500]/80 to-transparent" />
          </div>

          {/* Central core */}
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#B8F500]/50 bg-[#B8F500]/10">
            <div className="h-2.5 w-2.5 rounded-full bg-[#B8F500] shadow-[0_0_18px_rgba(184,245,0,0.8)] animate-pulse" />
          </div>

          {/* Radar signal points */}
          <span className="absolute right-8 top-10 h-1.5 w-1.5 rounded-full bg-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
          <span className="absolute bottom-9 left-10 h-1 w-1 rounded-full bg-[#B8F500] animate-pulse" />
        </div>

        {/* Status */}
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B8F500]" />
          <span className="font-mono text-[10px] font-medium tracking-[0.24em] text-[#B8F500]">
            {label}
          </span>
        </div>

        <p className="mb-7 text-center text-sm text-[#9299A5]">
          {sublabel}
        </p>

        {/* Progress indicator */}
        {showProgress && (
          <div className="w-full max-w-[260px]">
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] tracking-wider">
              <span className="text-[#9299A5]">PROCESSING</span>
              <span className="text-[#B8F500]">IN PROGRESS</span>
            </div>

            <div className="h-[3px] overflow-hidden rounded-full bg-[#252932]">
              <div className="loader-progress h-full w-full origin-left rounded-full bg-[#B8F500]" />
            </div>
          </div>
        )}

        {/* Footer metadata */}
        <div className="mt-9 flex items-center gap-3 font-mono text-[9px] tracking-widest text-[#555C68]">
          <span>SYS.READY</span>
          <span className="h-1 w-1 rounded-full bg-[#252932]" />
          <span>SECURE MODE</span>
          <span className="h-1 w-1 rounded-full bg-[#252932]" />
          <span>V1.0</span>
        </div>
      </div>

      {/* Scan line */}
      <div
        aria-hidden="true"
        className="loader-scan-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B8F500]/40 to-transparent"
      />
    </div>
  );
}
