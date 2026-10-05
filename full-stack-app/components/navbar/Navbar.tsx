'use client';

import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/providers/lenis-provider';
import Link from "next/link"

const navLinks = [
  { label: 'Product', href: '#saturation-radar' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Market Intelligence', href: '#gap-analysis' },
  { label: 'Website Scanner', href: '#website-intelligence' },
];

export function Navbar() {
  const { scrollTo } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) scrollTo(el);
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#08090B]/90 backdrop-blur-md border-b border-[#252932]'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          className="flex items-center gap-2 group"
          aria-label="Saturation Radar home"
        >
          {/* Radar icon */}
          <span className="relative w-7 h-7">
            <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
              <circle cx="14" cy="14" r="12" stroke="#252932" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="7" stroke="#252932" strokeWidth="1" />
              <circle cx="14" cy="14" r="2.5" fill="#B8F500" />
              <line x1="14" y1="14" x2="23" y2="6" stroke="#B8F500" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <circle cx="23" cy="6" r="1.5" fill="#B8F500" opacity="0.5" />
            </svg>
          </span>
          <span
            className="font-bold text-sm tracking-widest uppercase text-white group-hover:text-[#B8F500] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains)' }}
          >
            SATURATION RADAR
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-sm text-[#9299A5] hover:text-[#F5F7FA] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#B8F500] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#saturation-radar"
            onClick={(e) => handleNav(e, '#saturation-radar')}
            className="btn-primary text-xs py-2 px-4"
          >
            Analyze Idea
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <Link href={'/register'}>
            <button className='ml-4 shadow-accent p-2 rounded-md bg-[#111318] text-white hover:border-[#B8F500]-950'>
              Sign In
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-px bg-[#F5F7FA] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-[#F5F7FA] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#F5F7FA] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-[#111318] border-b border-[#252932] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-sm text-[#9299A5] hover:text-[#F5F7FA] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#saturation-radar"
            onClick={(e) => handleNav(e, '#saturation-radar')}
            className="btn-primary text-xs py-2.5 px-5 w-fit"
          >
            Analyze Idea →
          </a>
          <Link href={'/register'}>
            <button className='bg-[#111318] text-white'>
              Sign In
            </button>
          </Link>

        </div>
      </div>
    </header>
  );
}
