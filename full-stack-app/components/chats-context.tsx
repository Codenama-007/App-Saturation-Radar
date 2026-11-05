"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { deleteChat, listChats, renameChat } from "@/lib/chats"
import type { ChatSummary } from "@/lib/chats"
import { getToken } from "@/lib/token"

type ChatsContextValue = {
  chats: ChatSummary[]
  loading: boolean
  error: string
  refresh: () => Promise<void>
  rename: (id: number, title: string) => Promise<void>
  remove: (id: number) => Promise<void>
}

const ChatsContext = createContext<ChatsContextValue | null>(null)

// the last list we loaded, so opening another chat does not flash empty placeholders
let cache: { token: string | null; chats: ChatSummary[] } = { token: null, chats: [] }

// shares the chat list between the sidebar and the chat screen
export function ChatsProvider({ children }: { children: React.ReactNode }) {
  // only reuse the list when it belongs to the signed-in user
  const [cached] = useState(() => {
    const token = getToken()
    return token !== null && token === cache.token ? cache.chats : null
  })
  const [chats, setChats] = useState<ChatSummary[]>(cached ?? [])
  const [loading, setLoading] = useState(cached === null)
  const [error, setError] = useState("")

  const refresh = useCallback(async () => {
    try {
      setChats(await listChats())
      setError("")
    } catch {
      setError("Could not load your chats")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (!loading) cache = { token: getToken(), chats }
  }, [chats, loading])

  const rename = useCallback(async (id: number, title: string) => {
    const updated = await renameChat(id, title)
    setChats((prev) => prev.map((chat) => (chat.id === id ? updated : chat)))
  }, [])

  const remove = useCallback(async (id: number) => {
    await deleteChat(id)
    setChats((prev) => prev.filter((chat) => chat.id !== id))
  }, [])

  const value = useMemo(
    () => ({ chats, loading, error, refresh, rename, remove }),
    [chats, loading, error, refresh, rename, remove]
  )

  return <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
}

export function useChats() {
  const context = useContext(ChatsContext)

  if (!context) throw new Error("useChats must be used inside ChatsProvider")

  return context
}