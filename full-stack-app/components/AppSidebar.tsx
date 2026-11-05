"use client"

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { clearSession, getUser } from '@/lib/token'
import type { AuthUser } from '@/lib/token'
import { parseChatRoute } from '@/lib/chat-route'
import React from 'react'
import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton'
import { LogOut } from 'lucide-react';
import { UserIcon } from 'lucide-react'
import { Plus } from 'lucide-react';
import { useChats } from '@/components/chats-context'
import ChatListItem from '@/components/ChatListItem'

const AppSidebar = () => {
  // the sidebar only renders in the browser, so localStorage is safe to read here
  const [user] = useState<AuthUser | null>(getUser)
  const router = useRouter()
  const pathname = usePathname()
  const { chats, loading, error, rename, remove } = useChats()

  // the chat that is open right now, if any
  const route = parseChatRoute(pathname)
  const activeId = route.kind === "chat" ? route.id : null

  // clear the saved token and go back to the login page
  const handleLogout = () => {
    clearSession()
    router.push('/login')
  }

  const handleDelete = async (id: number) => {
    await remove(id)

    // the open chat is gone, so go to a fresh one
    if (id === activeId) router.push('/main')
  }

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

      {/* New chat button and the list of saved chats */}
      <SidebarContent data-lenis-prevent className="px-2 py-4">

        <SidebarMenu>
          <SidebarMenuItem>

            <SidebarMenuButton
              onClick={() => router.push('/main')}
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

        <div className="mono-data mb-2 mt-6 px-2 text-[10px]">YOUR CHATS</div>

        {loading && (
          <div className="space-y-2 px-2" aria-label="Loading chats">
            <Skeleton className="h-6 w-full bg-[#181B22]" />
            <Skeleton className="h-6 w-5/6 bg-[#181B22]" />
            <Skeleton className="h-6 w-4/6 bg-[#181B22]" />
          </div>
        )}

        {!loading && error && (
          <p role="alert" className="px-2 text-xs text-[var(--danger)]">{error}</p>
        )}

        {!loading && !error && chats.length === 0 && (
          <p className="px-2 text-xs leading-relaxed text-[#9299A5]">
            No chats yet. Ask your first question to start one.
          </p>
        )}

        {chats.length > 0 && (
          <SidebarMenu className="gap-1">
            {chats.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                active={chat.id === activeId}
                onRename={rename}
                onDelete={handleDelete}
              />
            ))}
          </SidebarMenu>
        )}

      </SidebarContent>

      {/* Footer — signed-in user and logout */}
      <SidebarFooter className="border-t border-[#252932] px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 shrink-0 rounded-full bg-[#111318] border border-[#252932] flex items-center justify-center text-xs font-semibold text-[#B8F500]">
            {user ? user.username.charAt(0).toUpperCase() : <UserIcon className="h-4 w-4" />}
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm text-[#F5F7FA] leading-none" title={user?.username}>
              {user?.username ?? "Account"}
            </span>
            <span className="mt-1 truncate text-xs text-[#9299A5] leading-none" title={user?.email}>
              {user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="btn-primary w-full text-xs py-2.5 px-4 flex items-center justify-center gap-1.5"
        >
          <LogOut />
          Logout
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar