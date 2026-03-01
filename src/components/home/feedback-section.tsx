"use client"

import {
  CloseTag,
  CodeHeading,
  CodeSection,
  OpenTag,
} from "@/components/shared/code-tags"
import { Button } from "@/components/ui/button"
import type { Feedback } from "@/lib/supabase/types"
import { AnimatePresence, motion } from "framer-motion"
import { type FormEvent, useCallback, useState } from "react"
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlinePaperAirplane,
  HiOutlineStar,
  HiStar,
} from "react-icons/hi2"

/* ────────────────── Star Rating ────────────────── */
const STAR_LABELS = ["Terrible", "Poor", "Okay", "Good", "Excellent"]

function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number
  onChange?: (v: number) => void
  readonly?: boolean
  size?: "sm" | "md"
}) {
  const [hover, setHover] = useState(0)
  const sizeClass = size === "sm" ? "h-3.5 w-3.5" : "h-7 w-7"
  const active = hover || value

  if (readonly) {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= value ? (
              <HiStar className={`${sizeClass} text-yellow-400`} />
            ) : (
              <HiOutlineStar
                className={`${sizeClass} text-muted-foreground/30`}
              />
            )}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex gap-1 rounded-lg border border-border/30 bg-background/50 px-3 py-2 w-fit dark:bg-background/20"
        role="group"
        aria-label="Star rating"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= active
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange?.(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              aria-label={`Rate ${star} out of 5 — ${STAR_LABELS[star - 1]}`}
              className="rounded transition-transform active:scale-90 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-code-keyword/50"
            >
              {filled ? (
                <HiStar
                  className={`${sizeClass} text-yellow-400 drop-shadow-sm`}
                />
              ) : (
                <HiOutlineStar
                  className={`${sizeClass} text-muted-foreground/40 hover:text-yellow-400/60`}
                />
              )}
            </button>
          )
        })}
      </div>
      <span className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider">
        {active > 0
          ? `${STAR_LABELS[active - 1]} (${active}/5)`
          : "Select a rating"}
      </span>
    </div>
  )
}

/* ────────────────── Feedback Card ────────────────── */
function FeedbackCard({
  feedback,
  index,
}: {
  feedback: Feedback
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group flex items-start gap-3 rounded-lg border border-border/20 bg-card/30 px-4 py-3 transition-all hover:border-code-keyword/30 hover:bg-card/40 dark:bg-card/10 dark:hover:bg-card/20"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-code-keyword/10 text-code-keyword text-xs font-bold mt-0.5">
        {(feedback.name || "A").charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-sm font-medium text-foreground/80 truncate">
            {feedback.name || "Anonymous"}
          </span>
          <StarRating
            value={feedback.stars}
            readonly
            size="sm"
          />
        </div>
        <p className="text-sm text-muted-foreground/70 leading-relaxed">
          {feedback.comment}
        </p>
        <time className="text-[10px] text-muted-foreground/40 mt-1.5 block">
          {new Date(feedback.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>
    </motion.div>
  )
}

/* ────────────────── Feedback Form (field helper) ────────────────── */
function Field({
  id,
  label,
  type = "text",
  required = false,
  textarea = false,
  value,
  onChange,
  maxLength,
}: {
  id: string
  label: string
  type?: string
  required?: boolean
  textarea?: boolean
  value: string
  onChange: (v: string) => void
  maxLength?: number
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
          rows={4}
          maxLength={maxLength}
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
          maxLength={maxLength}
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
      {maxLength && textarea && (
        <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground/40">
          {value.length}/{maxLength}
        </span>
      )}
    </div>
  )
}

type FormStatus = "idle" | "submitting" | "success" | "error"

/* ────────────────── Main Section ────────────────── */
export function FeedbackSection({ feedbacks }: { feedbacks: Feedback[] }) {
  const [name, setName] = useState("")
  const [stars, setStars] = useState(0)
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const submit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (status === "submitting") return

      if (!comment.trim()) {
        setStatus("error")
        setErrorMsg("Please write a comment.")
        return
      }

      if (stars < 1) {
        setStatus("error")
        setErrorMsg("Please select a star rating.")
        return
      }

      setStatus("submitting")
      setErrorMsg("")

      try {
        const res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim() || null,
            stars,
            comment: comment.trim(),
          }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Failed to submit feedback.")
        }

        setStatus("success")
        setName("")
        setStars(0)
        setComment("")

        setTimeout(() => setStatus("idle"), 4000)
      } catch (err: unknown) {
        setStatus("error")
        setErrorMsg(
          err instanceof Error ? err.message : "Something went wrong.",
        )
      }
    },
    [name, stars, comment, status],
  )

  const isBusy = status === "submitting"

  // Compute average if feedbacks exist
  const avg =
    feedbacks.length > 0
      ? feedbacks.reduce((sum, fb) => sum + fb.stars, 0) / feedbacks.length
      : 0

  return (
    <CodeSection
      id="feedback"
      tag="section"
      attrs={{ id: "feedback" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Feedback
        </h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// what people are saying"}
        </p>
      </CodeHeading>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        {/* ── Left: Form ── */}
        <div>
          <OpenTag
            tag="form"
            attrs={{ action: "/api/feedback" }}
          />
          <form
            onSubmit={submit}
            className="mt-4 mb-4 space-y-4 pl-4"
          >
            <Field
              id="feedback-name"
              label="Name (optional)"
              value={name}
              onChange={setName}
            />

            <StarRating
              value={stars}
              onChange={setStars}
            />

            <Field
              id="feedback-comment"
              label="Your feedback"
              textarea
              required
              value={comment}
              onChange={setComment}
              maxLength={500}
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
                  Thank you! Your feedback will appear once approved.
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
              disabled={isBusy}
              className="w-full rounded-xl sm:w-auto"
            >
              {isBusy ? (
                <span className="flex items-center gap-2">
                  <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <HiOutlinePaperAirplane className="size-4" />
                  Submit Feedback
                </span>
              )}
            </Button>
          </form>
          <CloseTag tag="form" />
        </div>

        {/* ── Right: Feedbacks sidebar ── */}
        <div className="flex flex-col gap-3 lg:pt-6">
          {/* Average rating */}
          {feedbacks.length > 0 && (
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl font-bold text-foreground tracking-tight">
                {avg.toFixed(1)}
              </span>
              <div>
                <StarRating
                  value={Math.round(avg)}
                  readonly
                  size="sm"
                />
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                  {feedbacks.length}{" "}
                  {feedbacks.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          )}

          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/50">
            {"// recent feedback"}
          </p>

          {feedbacks.length > 0 ? (
            <div className="flex flex-col gap-3 max-h-105 overflow-y-auto pr-1">
              {feedbacks.map((fb, i) => (
                <FeedbackCard
                  key={fb.id}
                  feedback={fb}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-lg border border-border/20 bg-card/30 px-4 py-8 dark:bg-card/10">
              <p className="text-sm text-muted-foreground/50">
                No feedback yet — be the first!
              </p>
            </div>
          )}
        </div>
      </div>
    </CodeSection>
  )
}
