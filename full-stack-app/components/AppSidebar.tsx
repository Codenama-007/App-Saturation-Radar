"use client"

import React from 'react'
import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarMenuButton ,
  SidebarMenuItem , 
  SidebarMenu
} from '@/components/ui/sidebar';
import { LogOut, LogOutIcon } from 'lucide-react';
import { UserIcon } from 'lucide-react'
import { Plus } from 'lucide-react';

const AppSidebar = () => {
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
       <SidebarContent className="px-2 py-4">

        <SidebarMenu>
          <SidebarMenuItem>

            <SidebarMenuButton
              className="
                h-10
                border border-[#30363d]
                bg-[#161b22]
                text-[#f0f6fc]

                hover:bg-[#21262d]
                hover:text-[#58a6ff]

                transition-colors
              "
            >
              <Plus className="h-4 w-4" />
              <span>New Chat</span>
            </SidebarMenuButton>

          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarContent>

      {/* Footer — demo user + sign up */}
      <SidebarFooter className="border-t border-[#252932] px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#111318] border border-[#252932] flex items-center justify-center text-xs font-semibold text-[#B8F500]">
            <UserIcon/> 
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#F5F7FA] leading-none">Affan Shah</span>
            <span className="text-xs text-[#9299A5] leading-none mt-1">demo@saturationradar.com</span>
          </div>
        </div>

        <Link href="/register" className="block w-full">
          <button className="btn-primary w-full text-xs py-2.5 px-4 flex items-center justify-center gap-1.5">
            <LogOut/>
            Logout
            {/* <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg> */}
          </button>
        </Link>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
