"use client"
import { apiFetch } from '@/lib/api'
import { ApiError, getChat } from '@/lib/chats'
import type { TurnOut } from '@/lib/chats'
import { parseChatRoute } from '@/lib/chat-route'
import { readEvents } from '@/lib/stream'
import type { Scoring } from '@/lib/stream'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SidebarTrigger } from './ui/sidebar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarketValidation from './MarketValidation'
import { SystemLoader } from './SystemLoader'
import { ButtonSpinner } from './ButtonSpinner'
import { useChats } from './chats-context'

interface Turn {
    question: string
    response: string
    features: string
    scoring?: Scoring
    streaming: boolean
    step: string
    unsaved?: boolean
}

type LoadState = "ready" | "loading" | "missing" | "error"

// what is happening after each pipeline step finishes
const STEP_LABELS: Record<string, string> = {
    start: "Checking past results...",
    check_cache: "Generating a search query...",
    generate_query: "Searching the web...",
    search_products: "Analyzing competitors...",
    compare_products: "Scoring the market...",
    calculate_scores: "Writing differentiators...",
}

// turns a saved question and answer into what the screen shows
const toTurn = (t: TurnOut): Turn => ({
    question: t.question,
    response: t.response,
    features: t.features,
    scoring: Object.keys(t.scoring ?? {}).length > 0 ? t.scoring : undefined,
    streaming: false,
    step: "",
})

const ChatComponent = () => {
    const pathname = usePathname()
    const router = useRouter()
    const { refresh } = useChats()

    // /main is a new chat, /main/123 is a saved chat
    const route = parseChatRoute(pathname)
    const chatId = route.kind === "chat" ? route.id : null

    const [Message, setMessage] = useState("")
    const [messages, setMessages] = useState<Turn[]>([])
    const [streaming, setStreaming] = useState(false)
    const [loadState, setLoadState] = useState<LoadState>(chatId === null ? "ready" : "loading")
    // which chat the messages on screen belong to
    const [shownId, setShownId] = useState<number | null>(chatId)
    // a chat this screen just created, its answer is already on screen
    const [createdId, setCreatedId] = useState<number | null>(null)

    const scrollRef = useRef<HTMLElement>(null)
    const runRef = useRef(0)
    const abortRef = useRef<AbortController | null>(null)

    // the URL changed, so reset the screen in the same render to avoid showing the old chat
    if (shownId !== chatId) {
        setShownId(chatId)

        if (chatId !== null && chatId === createdId) {
            setCreatedId(null)
        } else {
            setMessages([])
            setStreaming(false)
            setLoadState(chatId === null ? "ready" : "loading")
        }
    }

    const status: LoadState = route.kind === "invalid" ? "missing" : loadState

    const scrollToBottom = () => {
        requestAnimationFrame(() => {
            const el = scrollRef.current
            if (el) el.scrollTop = el.scrollHeight
        })
    }

    // leaving a chat stops any answer still streaming into it
    useEffect(() => {
        return () => {
            abortRef.current?.abort()
            runRef.current += 1
        }
    }, [chatId])

    // load the saved questions of the chat in the URL
    useEffect(() => {
        if (chatId === null || loadState !== "loading") return

        let cancelled = false

        getChat(chatId)
            .then((chat) => {
                if (cancelled) return
                setMessages(chat.turns.map(toTurn))
                setLoadState("ready")
                scrollToBottom()
            })
            .catch((error) => {
                if (cancelled) return
                setLoadState(error instanceof ApiError && error.status === 404 ? "missing" : "error")
            })

        return () => {
            cancelled = true
        }
    }, [chatId, loadState])

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

        // ignore empty input, clicks while a request is running, and chats that are not loaded
        if (!question.trim() || streaming || status !== "ready") return

        setMessage("")
        setStreaming(true)
        setMessages((prev) => [
            ...prev,
            { question, response: "", features: "", streaming: true, step: STEP_LABELS.start },
        ])
        scrollToBottom()

        const run = ++runRef.current
        const controller = new AbortController()
        abortRef.current = controller

        // ignore events from a run the user has already left
        const update = (change: (turn: Turn) => Turn) => {
            if (runRef.current === run) updateLast(change)
        }

        try {
            const response = await apiFetch('/radar/stream', {
                method: 'POST',
                body: JSON.stringify({ query: question, chat_id: chatId }),
                signal: controller.signal,
            })

            if (!response.ok) throw new Error(`Request failed: ${response.status}`)

            await readEvents(response, (event) => {
                if (event.type === "step") {
                    update((t) => ({ ...t, step: STEP_LABELS[event.node] ?? t.step }))
                } else if (event.type === "token") {
                    update((t) => ({ ...t, [event.field]: t[event.field] + event.text }))
                } else if (event.type === "text") {
                    // the finished text replaces what was streamed
                    update((t) => ({ ...t, [event.field]: event.text }))
                } else if (event.type === "scoring") {
                    update((t) => ({ ...t, scoring: event.data }))
                } else if (event.type === "error") {
                    update((t) => ({
                        ...t,
                        response: t.response ? `${t.response}\n\n${event.detail}` : event.detail,
                    }))
                } else if (event.type === "done") {
                    update((t) => ({ ...t, streaming: false, unsaved: !event.saved }))

                    if (runRef.current !== run) return
                    setStreaming(false)

                    if (event.saved && event.chat_id !== null) {
                        // the first answer of a new chat gives it a URL, without reloading the screen
                        if (chatId === null) {
                            setCreatedId(event.chat_id)
                            router.replace(`/main/${event.chat_id}`, { scroll: false })
                        }

                        refresh()
                    }
                }
            })
        } catch (error) {
            // the user left this chat, so there is nothing to show
            if (controller.signal.aborted) return

            console.log(error)

            update((t) => ({
                ...t,
                response: "Something went wrong while connecting to the backend.",
            }))
        } finally {
            if (runRef.current === run) {
                updateLast((t) => ({ ...t, streaming: false }))
                setStreaming(false)
            }
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

                {status === "loading" && (
                    <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#8b949e]">
                        <ButtonSpinner />
                        Loading chat...
                    </div>
                )}

                {status === "missing" && (
                    <div className="py-16 text-center text-sm text-[#8b949e]">
                        <p>This chat does not exist, or it belongs to another account.</p>
                        <Link href="/main" className="mt-3 inline-block font-medium text-[#B8F500] hover:underline">
                            Start a new chat
                        </Link>
                    </div>
                )}

                {status === "error" && (
                    <div className="py-16 text-center text-sm text-[#8b949e]">
                        <p>Could not load this chat.</p>
                        <button
                            onClick={() => setLoadState("loading")}
                            className="mt-3 font-medium text-[#B8F500] hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {status === "ready" && messages.map((turn, idx) => (
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

                                {turn.unsaved && (
                                    <p className="text-xs text-[#F59E0B]">
                                        This answer could not be saved to your history.
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
                        disabled={streaming || status !== "ready"}
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
                        disabled={streaming || status !== "ready"}
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