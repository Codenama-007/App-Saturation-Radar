export default function RadarMark() {
    return (
      <svg
        viewBox="0 0 48 48"
        className="mx-auto mb-8 h-12 w-12 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        role="img"
        aria-label="App Saturation Radar"
      >
        <circle cx="24" cy="24" r="20" opacity="0.35" />
        <circle cx="24" cy="24" r="12" opacity="0.6" />
        <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
        <path d="M24 24 L38 10" strokeLinecap="round" />
      </svg>
    );
  }