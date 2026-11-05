export type ChatRoute =
  | { kind: "new" }
  | { kind: "chat"; id: number }
  | { kind: "invalid" }

// /main is a new chat, /main/123 is chat 123, anything else is invalid
export function parseChatRoute(pathname: string): ChatRoute {
  const parts = pathname.split("/").filter(Boolean)

  if (parts.length === 1) return { kind: "new" }

  if (parts.length === 2 && /^\d{1,9}$/.test(parts[1])) {
    return { kind: "chat", id: Number(parts[1]) }
  }

  return { kind: "invalid" }
}