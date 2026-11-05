export type Scoring = {
  saturation_score?: number
  saturation_level?: string
  opportunity_score?: number
  verdict?: string
  opportunity_verdict?: string
  build_verdict?: string
  competition_density?: number
  similarity_score?: number
  market_gap_score?: number
  confidence_score?: number
  relevant_competitors?: number
  high_similarity_competitors?: number
}

export type StreamField = "response" | "features"

export type StreamEvent =
  | { type: "start"; idea: string }
  | { type: "step"; node: string }
  | { type: "token"; field: StreamField; text: string }
  | { type: "text"; field: StreamField; text: string }
  | { type: "scoring"; data: Scoring }
  | { type: "done"; idea: string; from_cache: boolean; chat_id: number | null; saved: boolean }
  | { type: "error"; detail: string }

// reads newline-delimited JSON from a fetch response and calls onEvent for each line
export async function readEvents(res: Response, onEvent: (event: StreamEvent) => void) {
  if (!res.body) throw new Error("The response has no body")

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })

    // the last piece may be half a line, so keep it for the next chunk
    const lines = buffer.split("\n")
    buffer = lines.pop() ?? ""

    for (const line of lines) {
      if (line.trim()) onEvent(JSON.parse(line) as StreamEvent)
    }
  }

  if (buffer.trim()) onEvent(JSON.parse(buffer) as StreamEvent)
}