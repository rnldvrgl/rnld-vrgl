"use client"

import { MarkdownRenderer } from "@/components/shared/markdown-renderer"
import { AnimatePresence, motion } from "framer-motion"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
  HiOutlineXMark,
} from "react-icons/hi2"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

function formatTimestamp(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  })
}

// Reformat inline date strings inside AI response text
// Handles MM-DD-YYYY, YYYY-MM-DD, and MM/DD/YYYY
function reformatDatesInText(text: string): string {
  // MM-DD-YYYY or MM/DD/YYYY
  text = text.replace(
    /\b(0?[1-9]|1[0-2])[-\/](0?[1-9]|[12]\d|3[01])[-\/](\d{4})\b/g,
    (_, m, d, y) => {
      const date = new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`)
      return isNaN(date.getTime()) ? _ : formatTimestamp(date)
    },
  )
  // YYYY-MM-DD (ISO)
  text = text.replace(
    /\b(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/g,
    (_, y, m, d) => {
      const date = new Date(`${y}-${m}-${d}`)
      return isNaN(date.getTime()) ? _ : formatTimestamp(date)
    },
  )
  return text
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export function AiChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm an AI assistant for Ronald's portfolio. Ask me anything about his projects, skills, or experience!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastMsgRef = useRef<HTMLDivElement>(null)

  // Jump to bottom instantly before paint when the panel opens (no visible scroll)
  useLayoutEffect(() => {
    if (!open) return
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [open])

  // On new messages: scroll so the START of the new message is visible
  // On loading indicator: scroll to bottom so it's visible
  useEffect(() => {
    if (!open) return
    if (loading) {
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
    } else {
      lastMsgRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })
    }
  }, [messages, loading, open])

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    try {
      const chatHistory = [...messages, userMsg]
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: reformatDatesInText(
            data.message || data.error || "Something went wrong.",
          ),
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: reformatDatesInText(
            "Sorry, I couldn't connect. Please try again!",
          ),
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages])

  return (
    <>
      {/* Chat bubble button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-code-keyword text-white shadow-lg shadow-code-keyword/25 transition-colors hover:bg-code-keyword/90 **:cursor-none! md:cursor-none!"
            aria-label="Open AI chat"
          >
            <HiOutlineChatBubbleLeftRight className="h-6 w-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping  bg-code-keyword/20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex h-120 w-90 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border/30 bg-card/95 backdrop-blur-xl shadow-2xl **:cursor-auto! md:**:cursor-auto! cursor-auto! md:cursor-auto!"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/20 px-4 py-3 bg-card">
              <div className="flex items-center gap-2">
                <HiOutlineSparkles className="h-5 w-5 text-code-keyword" />
                <div>
                  <h3 className="text-sm font-semibold">AI Assistant</h3>
                  <p className="text-[10px] text-muted-foreground">
                    Ask me anything
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close chat"
              >
                <HiOutlineXMark className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            >
              {messages.map((msg, i) => (
                <div
                  key={msg.id}
                  ref={i === messages.length - 1 ? lastMsgRef : null}
                  className={`flex flex-col gap-0.5 ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-code-keyword/15 text-foreground"
                        : "bg-muted/50 text-foreground"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <MarkdownRenderer
                        content={msg.content}
                        compact
                      />
                    ) : (
                      msg.content
                    )}
                  </div>
                  <span className="px-1 text-[9px] text-muted-foreground/50">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 rounded-xl">
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border/20 px-3 py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 rounded-lg border border-border/30 bg-background/50 px-3 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-code-keyword/50 focus:ring-1 focus:ring-code-keyword/20 dark:bg-background/20"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-code-keyword text-white transition-all hover:bg-code-keyword/90 disabled:opacity-40 disabled:hover:bg-code-keyword"
                  aria-label="Send message"
                >
                  <HiOutlinePaperAirplane className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-1.5 text-center text-[9px] text-muted-foreground/40">
                Powered by AI &middot; Responses may not always be accurate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
