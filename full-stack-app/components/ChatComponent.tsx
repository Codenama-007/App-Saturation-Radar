"use client"

import React, { useState } from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MarketValidation from './MarketValidation'

interface Turn {
    question: string
    response: string
    features: string
    scoring: {
        opportunity_score?: number
        verdict?: string
        opportunity_verdict?: string
        competition_density?: number
        similarity_score?: number
        market_gap_score?: number
        confidence_score?: number
        relevant_competitors?: number
        high_similarity_competitors?: number
    }
}

const ChatComponent = () => {
    const [Message, setMessage] = useState("")
    const [messages, setMessages] = useState<Turn[]>([])

    const handleAnalyze = async () => {
        const currentMessage = Message

        if (!currentMessage.trim()) return

        setMessage("")

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/radar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: currentMessage }),
            })

            const data = await response.json()

            setMessages((prev) => [
                ...prev,
                {
                    question: currentMessage,
                    response: data.response || "",
                    features: data.features || "",
                    scoring: data.scoring || {},
                },
            ])

            console.log(data)
        } catch (error) {
            console.log(error)

            setMessages((prev) => [
                ...prev,
                {
                    question: currentMessage,
                    response: "Something went wrong while connecting to the backend.",
                    features: "",
                    scoring: {},
                },
            ])
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

            <section className="flex-1 space-y-6 overflow-y-scroll px-6 py-8">
                {messages.map((turn, idx) => (
                    <React.Fragment key={idx}>
                        <div className="flex justify-end">
                            <div className="max-w-xl rounded-lg border bg-[#B8F500] text-[#08090B] px-4 py-3 text-sm leading-relaxed">
                                {turn.question}
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <div className="max-w-xl rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-3 text-sm leading-relaxed text-[#f0f6fc] space-y-3">

                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {turn.response}
                                    </ReactMarkdown>
                                </div>

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
                        onClick={handleAnalyze}
                    >
                        Analyze
                    </Button>

                </div>

            </footer>

        </main>
    )
}

export default ChatComponent