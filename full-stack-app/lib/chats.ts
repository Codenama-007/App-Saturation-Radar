import { apiFetch } from "@/lib/api"
import type { Scoring } from "@/lib/stream"

export type ChatSummary = {
  id: number
  title: string
  created_at: string
  updated_at: string
}

export type TurnOut = {
  id: number
  question: string
  response: string
  features: string
  scoring: Scoring
  from_cache: boolean
  created_at: string
}

export type ChatDetail = ChatSummary & { turns: TurnOut[] }

// keeps the HTTP status so callers can tell "not found" from other failures
export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await apiFetch(path, options)

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(res.status, typeof body?.detail === "string" ? body.detail : "Request failed")
  }

  if (res.status === 204) return undefined as T

  return (await res.json()) as T
}

export const listChats = () => request<ChatSummary[]>("/chats")

export const getChat = (id: number) => request<ChatDetail>(`/chats/${id}`)

export const renameChat = (id: number, title: string) =>
  request<ChatSummary>(`/chats/${id}`, { method: "PATCH", body: JSON.stringify({ title }) })

export const deleteChat = (id: number) => request<void>(`/chats/${id}`, { method: "DELETE" })