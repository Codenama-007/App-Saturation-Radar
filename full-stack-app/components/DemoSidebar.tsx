'use client';

import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar';

export function DemoSidebar() {
  return (
    <Sidebar className="border-r border-[#252932] bg-[#08090B] ">
      {/* Header — logo, same as Navbar */}
      <SidebarHeader className="border-b border-[#252932] px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Saturation Radar home"
        >
          <span className="relative w-7 h-7 shrink-0">
            <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7">
              <circle cx="14" cy="14" r="12" stroke="#252932" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="7" stroke="#252932" strokeWidth="1" />
              <circle cx="14" cy="14" r="2.5" fill="#B8F500" />
              <line
                x1="14"
                y1="14"
                x2="23"
                y2="6"
                stroke="#B8F500"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
              />
              <circle cx="23" cy="6" r="1.5" fill="#B8F500" opacity="0.5" />
            </svg>
          </span>
          <span
            className="font-bold text-sm tracking-widest uppercase text-white group-hover:text-[#B8F500] transition-colors"
            style={{ fontFamily: 'var(--font-jetbrains)' }}
          >
            SATURATION RADAR
          </span>
        </Link>
      </SidebarHeader>

      {/* Middle section — demo project notice */}
      <SidebarContent className="px-4 py-6 flex flex-col items-center justify-center text-center gap-3">
        <div className="w-10 h-10 rounded-full border border-[#252932] flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="#B8F500" strokeWidth="1.2" />
            <path d="M9 5.5v4M9 12h.01" stroke="#B8F500" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-xs text-[#9299A5] leading-relaxed max-w-[180px]">
          This is a demo project. Data shown here is for preview purposes only.
        </p>
      </SidebarContent>

      {/* Footer — demo user + sign up */}
      <SidebarFooter className="border-t border-[#252932] px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#111318] border border-[#252932] flex items-center justify-center text-xs font-semibold text-[#B8F500]">
            DU
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#F5F7FA] leading-none">Demo User</span>
            <span className="text-xs text-[#9299A5] leading-none mt-1">demo@saturationradar.com</span>
          </div>
        </div>

        <Link href="/register" className="block w-full">
          <button className="btn-primary w-full text-xs py-2.5 px-4 flex items-center justify-center gap-1.5">
            Sign Up
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}