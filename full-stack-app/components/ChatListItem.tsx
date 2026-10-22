"use client"

import { useState } from "react"
import type { FormEvent, KeyboardEvent } from "react"
import Link from "next/link"
import { Check, Pencil, Trash2, X } from "lucide-react"
import { SidebarMenuItem } from "@/components/ui/sidebar"
import type { ChatSummary } from "@/lib/chats"

type Props = {
  chat: ChatSummary
  active: boolean
  onRename: (id: number, title: string) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

type Mode = "view" | "edit" | "confirm"

const iconButton =
  "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#9299A5] hover:bg-[#252932] hover:text-[#F5F7FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F500] disabled:opacity-50"

export default function ChatListItem({ chat, active, onRename, onDelete }: Props) {
  const [mode, setMode] = useState<Mode>("view")
  const [draft, setDraft] = useState(chat.title)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  const startEdit = () => {
    setDraft(chat.title)
    setError("")
    setMode("edit")
  }

  async function saveTitle(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const title = draft.trim()

    if (!title) {
      setError("The title can't be empty")
      return
    }

    // nothing changed, so skip the request
    if (title === chat.title) {
      setMode("view")
      return
    }

    setBusy(true)
    setError("")

    try {
      await onRename(chat.id, title)
      setMode("view")
    } catch {
      setError("Could not rename the chat")
    } finally {
      setBusy(false)
    }
  }

  async function confirmDelete() {
    setBusy(true)
    setError("")

    try {
      // this row disappears once the chat is removed from the list
      await onDelete(chat.id)
    } catch {
      setError("Could not delete the chat")
      setBusy(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setMode("view")
  }

  return (
    <SidebarMenuItem>
      {mode === "view" && (
        <div
          className={`group/chat flex items-center rounded-md border-l-2 ${
            active ? "border-[#B8F500] bg-[#181B22]" : "border-transparent hover:bg-[#111318]"
          }`}
        >
          <Link
            href={`/main/${chat.id}`}
            aria-current={active ? "page" : undefined}
            title={chat.title}
            className={`min-w-0 flex-1 truncate rounded px-2 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F500] ${
              active ? "text-[#F5F7FA]" : "text-[#9299A5] hover:text-[#F5F7FA]"
            }`}
          >
            {chat.title}
          </Link>

          <div className="flex shrink-0 gap-0.5 pr-1 md:opacity-0 md:group-focus-within/chat:opacity-100 md:group-hover/chat:opacity-100">
            <button
              type="button"
              aria-label={`Rename chat ${chat.title}`}
              onClick={startEdit}
              className={iconButton}
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label={`Delete chat ${chat.title}`}
              onClick={() => {
                setError("")
                setMode("confirm")
              }}
              className={iconButton}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {mode === "edit" && (
        <form onSubmit={saveTitle} className="flex items-center gap-1 px-1">
          <input
            autoFocus
            value={draft}
            maxLength={80}
            aria-label="Chat title"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 min-w-0 flex-1 rounded-md border border-[#252932] bg-[#181B22] px-2 text-sm text-[#F5F7FA] focus:border-[#B8F500] focus:outline-none"
          />
          <button type="submit" aria-label="Save title" disabled={busy} className={iconButton}>
            <Check className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Cancel renaming"
            onClick={() => setMode("view")}
            className={iconButton}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </form>
      )}

      {mode === "confirm" && (
        <div className="flex items-center justify-between gap-2 rounded-md bg-[#181B22] px-2 py-1.5">
          <span className="text-xs text-[#F5F7FA]">Delete this chat?</span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={confirmDelete}
              disabled={busy}
              className="rounded bg-[#EF4444]/15 px-2 py-1 text-xs font-medium text-[#EF4444] hover:bg-[#EF4444]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] disabled:opacity-50"
            >
              {busy ? "Deleting..." : "Delete"}
            </button>
            <button
              type="button"
              onClick={() => setMode("view")}
              disabled={busy}
              className="rounded px-2 py-1 text-xs text-[#9299A5] hover:text-[#F5F7FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8F500] disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="px-2 pt-1 text-xs text-[var(--danger)]">
          {error}
        </p>
      )}
    </SidebarMenuItem>
  )
}