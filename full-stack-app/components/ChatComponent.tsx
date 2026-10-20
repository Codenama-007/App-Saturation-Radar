"use client"
import { apiFetch } from '@/lib/api'
import { readEvents } from '@/lib/stream'
import type { Scoring } from '@/lib/stream'
import React, { useEffect, useRef, useState } from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarketValidation from './MarketValidation'
import { SystemLoader } from './SystemLoader'
import { ButtonSpinner } from './ButtonSpinner'

interface Turn {
    question: string
    response: string
    features: string
    scoring?: Scoring
    streaming: boolean
    step: string
}

// what is happening after each pipeline step finishes
const STEP_LABELS: Record<string, string> = {
    start: "Checking past results...",
    check_cache: "Generating a search query...",
    generate_query: "Searching the web...",
    search_products: "Analyzing competitors...",
    compare_products: "Scoring the market...",
    calculate_scores: "Writing differentiators...",
}

const ChatComponent = () => {
    const [Message, setMessage] = useState("")
    const [messages, setMessages] = useState<Turn[]>([])
    const [streaming, setStreaming] = useState(false)
    const scrollRef = useRef<HTMLElement>(null)

    // keep following the new text, unless the user scrolled up to read
    useEffect(() => {
        const el = scrollRef.current
        if (el && el.scrollHeight - el.scrollTop - el.clientHeight < 200) {
            el.scrollTop = el.scrollHeight
        }
    }, [messages])

    // update the newest turn as events arrive
    const updateLast = (change: (turn: Turn) => Turn) =>
        setMessages((prev) => prev.map((t, i) => (i === prev.length - 1 ? change(t) : t)))

    const handleAnalyze = async () => {
        const question = Message

        // ignore empty input and clicks while a request is running
        if (!question.trim() || streaming) return

        setMessage("")
        setStreaming(true)
        setMessages((prev) => [
            ...prev,
            { question, response: "", features: "", streaming: true, step: STEP_LABELS.start },
        ])

        // jump to the new question once it has rendered
        requestAnimationFrame(() => {
            const el = scrollRef.current
            if (el) el.scrollTop = el.scrollHeight
        })

        try {
            const response = await apiFetch('/radar/stream', {
                method: 'POST',
                body: JSON.stringify({ query: question }),
            })

            if (!response.ok) throw new Error(`Request failed: ${response.status}`)

            await readEvents(response, (event) => {
                if (event.type === "step") {
                    updateLast((t) => ({ ...t, step: STEP_LABELS[event.node] ?? t.step }))
                } else if (event.type === "token") {
                    updateLast((t) => ({ ...t, [event.field]: t[event.field] + event.text }))
                } else if (event.type === "text") {
                    // the finished text replaces what was streamed
                    updateLast((t) => ({ ...t, [event.field]: event.text }))
                } else if (event.type === "scoring") {
                    updateLast((t) => ({ ...t, scoring: event.data }))
                } else if (event.type === "error") {
                    updateLast((t) => ({
                        ...t,
                        response: t.response ? `${t.response}\n\n${event.detail}` : event.detail,
                    }))
                }
            })
        } catch (error) {
            console.log(error)

            updateLast((t) => ({
                ...t,
                response: "Something went wrong while connecting to the backend.",
            }))
        } finally {
            updateLast((t) => ({ ...t, streaming: false }))
            setStreaming(false)
        }
    }

    return (
        <main className="flex h-screen flex-col bg-[#0d1117] text-[#f0f6fc]">
            <header className="flex items-center gap-4 border-b border-[#30363d] px-6 py-4">

                <SidebarTrigger
                    className="
                        text-[#8b949e]
                        hover:bg-[#161b22]
                        hover:text-[#f0f6fc]
                    "
                />

                <div>
                    <h1
                        className="text-lg font-semibold tracking-tight"
                        style={{ fontFamily: 'var(--font-jetbrains)' }}
                    >
                        Saturation Radar
                    </h1>

                    <p className="font-mono text-xs text-[#8b949e]">
                        Know the saturation score for the app that you just build
                    </p>
                </div>

            </header>

            <section ref={scrollRef} data-lenis-prevent className="flex-1 space-y-6 overflow-y-scroll px-6 py-8">
                {messages.map((turn, idx) => (
                    <React.Fragment key={idx}>
                        <div className="flex justify-end">
                            <div className="max-w-xl rounded-lg border bg-[#B8F500] text-[#08090B] px-4 py-3 text-sm leading-relaxed">
                                {turn.question}
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <div
                                className={`max-w-xl rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-3 text-sm leading-relaxed text-[#f0f6fc] space-y-3 ${
                                    turn.streaming && !turn.response ? "w-full" : ""
                                }`}
                            >

                                {turn.streaming && !turn.response && (
                                    <div className="overflow-hidden rounded-lg">
                                        <SystemLoader label="ANALYZING MARKET" sublabel={turn.step} />
                                    </div>
                                )}

                                {turn.response && (
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {turn.response}
                                        </ReactMarkdown>
                                    </div>
                                )}

                                {turn.features && (
                                    <div className="border-t border-[#30363d] pt-3 prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {turn.features}
                                        </ReactMarkdown>
                                    </div>
                                )}

                                {turn.scoring && (
                                    <MarketValidation scoring={turn.scoring} />
                                )}

                                {turn.streaming && turn.response && (
                                    <p className="flex items-center gap-2 text-xs text-[#8b949e]">
                                        <ButtonSpinner />
                                        {turn.step}
                                    </p>
                                )}

                            </div>
                        </div>

                    </React.Fragment>
                ))}

            </section>

            <footer className="border-t border-[#30363d] bg-[#0d1117] p-4">
                <div className="mx-auto flex max-w-4xl gap-3">
                    <Input
                        placeholder="Ask Jarvis anything..."
                        className="
                            w-full
                            h-11
                            border-[#30363d]
                            bg-[#161b22]
                            text-[#f0f6fc]
                            placeholder:text-[#8b949e]
                            focus-visible:border-[#58a6ff]
                            focus-visible:ring-[#58a6ff]/20
                            shadow-none
                        "
                        value={Message}
                        disabled={streaming}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                    />

                    <Button
                        className="
                            text-xs
                            py-2.5
                            p-5
                            gap-1.5
                            bg-[#B8F500]
                            text-[#08090B]
                            hover:bg-[#a3d900]
                            font-medium
                        "
                        disabled={streaming}
                        onClick={handleAnalyze}
                    >
                        {streaming ? <ButtonSpinner /> : null}
                        {streaming ? "Analyzing..." : "Analyze"}
                    </Button>

                </div>

            </footer>

        </main>
    )
}

export default ChatComponent