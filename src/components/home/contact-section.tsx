"use client"

import {
  CloseTag,
  CodeHeading,
  CodeSection,
  OpenTag,
} from "@/components/shared/code-tags"
import { Button } from "@/components/ui/button"
import type { Profile } from "@/lib/supabase/types"
import { AnimatePresence, motion } from "framer-motion"
import { type FormEvent, useCallback, useEffect, useState } from "react"
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineEnvelope,
  HiOutlineExclamationTriangle,
  HiOutlinePaperAirplane,
} from "react-icons/hi2"
import { SiGithub, SiLinkedin, SiX } from "react-icons/si"

type FormStatus = "idle" | "submitting" | "success" | "error"

function Field({
  id,
  label,
  type = "text",
  required = false,
  textarea = false,
  value,
  onChange,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  textarea?: boolean
  value: string
  onChange: (v: string) => void
}) {
  const shared =
    "peer w-full rounded-lg border border-border/30 bg-background/50 px-4 pt-5 pb-2 text-sm text-foreground outline-none transition-all placeholder-transparent focus:border-code-keyword/50 focus:ring-1 focus:ring-code-keyword/20 dark:bg-background/20"

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={5}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-code-keyword/80"
      >
        {label}
      </label>
    </div>
  )
}

export function ContactSection({ profile }: { profile: Profile | null }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)

  const COOLDOWN_SECONDS = 30

  // Cooldown timer
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setTimeout(() => {
        setCooldownRemaining((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldownRemaining])

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()

      // Check cooldown
      const now = Date.now()
      const timeSinceLastSubmit = (now - lastSubmitTime) / 1000
      if (timeSinceLastSubmit < COOLDOWN_SECONDS) {
        setStatus("error")
        setErrorMsg("Please wait before sending another message")
        return
      }

      setStatus("submitting")
      setErrorMsg("")

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Something went wrong")
        }

        setStatus("success")
        setLastSubmitTime(Date.now())
        setCooldownRemaining(COOLDOWN_SECONDS)
        setName("")
        setEmail("")
        setSubject("")
        setMessage("")
      } catch (err) {
        setStatus("error")
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong")
      }
    },
    [name, email, subject, message, lastSubmitTime],
  )

  const socials = [
    {
      href: `mailto:${profile?.email ?? "delacruz.ronaldvergel@gmail.com"}`,
      icon: HiOutlineEnvelope,
      label: "Email",
      value: profile?.email ?? "delacruz.ronaldvergel@gmail.com",
    },
    {
      href: profile?.github_url ?? "https://github.com/rnldvrgl",
      icon: SiGithub,
      label: "GitHub",
      value: "github.com/rnldvrgl",
    },
    {
      href: profile?.linkedin_url ?? "https://linkedin.com/in/rnldvrgl",
      icon: SiLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rnldvrgl",
    },
    {
      href: profile?.twitter_url ?? "https://twitter.com/rnldvrgl",
      icon: SiX,
      label: "X (Twitter)",
      value: "@rnldvrgl",
    },
  ]

  return (
    <CodeSection
      id="contact"
      tag="section"
      attrs={{ id: "contact" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// have a project in mind? let\u0027s talk."}
        </p>
      </CodeHeading>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        {/* ── Left: Form ── */}
        <div>
          <OpenTag
            tag="form"
            attrs={{ action: "/api/contact" }}
          />
          <form
            onSubmit={handleSubmit}
            className="mt-4 mb-4 space-y-4 pl-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                required
                value={name}
                onChange={setName}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                required
                value={email}
                onChange={setEmail}
              />
            </div>

            <Field
              id="subject"
              label="Subject (optional)"
              value={subject}
              onChange={setSubject}
            />

            <Field
              id="message"
              label="Message"
              textarea
              required
              value={message}
              onChange={setMessage}
            />

            {/* Status feedback */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500"
                >
                  <HiOutlineCheckCircle className="size-4 shrink-0" />
                  Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  <HiOutlineExclamationTriangle className="size-4 shrink-0" />
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={status === "submitting" || cooldownRemaining > 0}
              className="w-full rounded-xl sm:w-auto"
            >
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending…
                </span>
              ) : cooldownRemaining > 0 ? (
                <span className="flex items-center gap-2">
                  <HiOutlineClock className="size-4" />
                  Wait {cooldownRemaining}s
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <HiOutlinePaperAirplane className="size-4" />
                  Send message
                </span>
              )}
            </Button>
          </form>
          <CloseTag tag="form" />
        </div>

        {/* ── Right: Social links sidebar ── */}
        <div className="flex flex-col gap-3 lg:pt-6">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
            {"// or reach me directly"}
          </p>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                social.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group flex items-center gap-3 rounded-lg border border-border/20 bg-card/30 px-4 py-3 transition-all hover:border-code-keyword/30 hover:bg-card/40 dark:bg-card/10 dark:hover:bg-card/20"
            >
              <social.icon className="size-4 text-code-keyword/60 transition-colors group-hover:text-code-keyword" />
              <div className="flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
                  {social.label}
                </span>
                <span className="text-sm text-muted-foreground/70 transition-colors group-hover:text-foreground">
                  {social.value}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </CodeSection>
  )
}
