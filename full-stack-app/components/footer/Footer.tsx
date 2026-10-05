'use client';

import { useLenis } from '@/components/providers/lenis-provider';

const footerNav = [
  {
    title: 'Product',
    links: [
      { label: 'Market Intelligence', href: '#saturation-radar' },
      { label: 'Competitor Analysis', href: '#competitor-intelligence' },
      { label: 'Gap Detection', href: '#gap-analysis' },
      { label: 'Website Scanner', href: '#website-intelligence' },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Vibe-Code Detection', href: '#vibe-code' },
      { label: 'Security Assessment', href: '#security' },
      { label: 'How It Works', href: '#how-it-works' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
];

export function Footer() {
  const { scrollTo } = useLenis();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) scrollTo(el);
    }
  };

  return (
    <footer className="relative border-t border-[#252932] bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6">
                <circle cx="14" cy="14" r="12" stroke="#252932" strokeWidth="1.5" />
                <circle cx="14" cy="14" r="7" stroke="#252932" strokeWidth="1" />
                <circle cx="14" cy="14" r="2.5" fill="#B8F500" />
                <line x1="14" y1="14" x2="23" y2="6" stroke="#B8F500" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <circle cx="23" cy="6" r="1.5" fill="#B8F500" opacity="0.5" />
              </svg>
              <span
                className="font-bold text-xs tracking-widest uppercase text-white"
                style={{ fontFamily: 'var(--font-jetbrains)' }}
              >
                SATURATION RADAR
              </span>
            </div>

            <p className="text-sm text-[#9299A5] leading-relaxed mb-6 max-w-xs">
              Market intelligence for AI/vibe-coded app builders.
              Know the market before you build the product.
            </p>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#252932] bg-[#111318]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8F500] animate-blink" />
              <span className="mono-data text-[9px]">LANDING PAGE DEMO — Product Coming Soon</span>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <div className="mono-data text-[10px] text-[#9299A5] mb-4">{col.title.toUpperCase()}</div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNav(e, link.href)}
                      className="text-sm text-[#9299A5] hover:text-[#F5F7FA] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#252932] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="mono-data text-[10px] text-[#9299A5]">
            © {new Date().getFullYear()} Saturation Radar. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <span className="mono-data text-[9px] text-[#9299A5]">
              BUILT_WITH: Next.js · TypeScript · Lenis
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#9299A5] hover:text-[#F5F7FA] transition-colors"
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="text-xs">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
