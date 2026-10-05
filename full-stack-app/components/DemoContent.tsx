"use client"

import React, { useState } from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Turn {
  question: string
  response: string
  features: string
}

const DemoContent = () => {
    const [Message, setMessage] = useState("")
  const [messages, setMessages] = useState<Turn[]>([])

  const handleSend = async () => {
    const currentIdea = Message
    setMessage("")

    try {
      const res = await fetch('http://127.0.0.1:8000/demo_analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query : currentIdea }),
      })
      const data = await res.json()

      setMessages((prev) => [...prev, { question: currentIdea, response: data.response ,  features: data.features}])
    } catch (err) {
      console.error('Failed to reach agent backend:', err)
      setMessages((prev) => [
        ...prev,
        { question: currentIdea, response: 'Something went wrong — check the backend logs.', features: ''},
      ])
    }
};

  return (
    <main className="flex h-screen flex-col bg-[#0d1117] text-[#f0f6fc]">

      {/* ================= HEADER ================= */}

      <header className="flex items-center gap-4 border-b border-[#30363d] px-6 py-4">

        <SidebarTrigger
          className="
            text-[#8b949e]
            hover:bg-[#161b22]
            hover:text-[#f0f6fc]
          "
        />

        <div>
          <h1 className="text-lg font-semibold tracking-tight" style={{ fontFamily: 'var(--font-jetbrains)' }}>
            Saturation Radar
          </h1>

          <p className="font-mono text-xs text-[#8b949e]">
            This is just a demo version of the actual app that demonstrates how the project works 
          </p>
        </div>

      </header>


      {/* ================= MESSAGES ================= */}

      <section className="flex-1 space-y-6 overflow-y-scroll px-6 py-8">

        {messages.map((turn, idx) => (
          <React.Fragment key={idx}>
            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-xl rounded-lg border bg-[#B8F500] text-[#08090B] px-4 py-3 text-sm leading-relaxed">
                {turn.question}
              </div>
            </div>

             {/* AI Message */}
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
              </div>
            </div>
          </React.Fragment>
        ))}
      </section>


      {/* ================= INPUT ================= */}

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
            onChange={(e) => { setMessage(e.target.value) }}
          />

          <Button
            className="text-xs py-2.5 p-5 gap-1.5 bg-[#B8F500] text-[#08090B] hover:bg-[#a3d900] font-medium"
            onClick={handleSend}
          >
            Analyze
          </Button>

        </div>

      </footer>

    </main>
  )
}

export default DemoContent
