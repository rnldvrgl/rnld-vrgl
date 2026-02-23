"use client"

import {
  CloseTag,
  CodeComment,
  DocType,
  OpenTag,
} from "@/components/shared/code-tags"
import { useTypingAnimation } from "@/lib/hooks/useTypingAnimation"
import type { Profile } from "@/lib/supabase/types"
import {
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { MouseEvent, useCallback, useState } from "react"

function FloatingCard({
  children,
  className,
  delay,
  mx,
  my,
  depth = 1,
}: {
  children: React.ReactNode
  className?: string
  delay: number
  mx: MotionValue<number>
  my: MotionValue<number>
  depth?: number
}) {
  const x = useTransform(mx, [-1, 1], [-12 * depth, 12 * depth])
  const y = useTransform(my, [-1, 1], [-12 * depth, 12 * depth])
  const rotateX = useTransform(my, [-1, 1], [3 * depth, -3 * depth])
  const rotateY = useTransform(mx, [-1, 1], [-3 * depth, 3 * depth])

  const cfg = { stiffness: 60, damping: 20 }
  const sx = useSpring(x, cfg)
  const sy = useSpring(y, cfg)
  const srx = useSpring(rotateX, cfg)
  const sry = useSpring(rotateY, cfg)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: sx, y: sy, rotateX: srx, rotateY: sry }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HeroSection({ profile }: { profile: Profile | null }) {
  const fullName = profile?.full_name ?? "Ronald Vergel Dela Cruz"
  const headline =
    profile?.headline ??
    "Building modern web experiences with clean code and thoughtful design."

  const [cycle, setCycle] = useState(0)

  const handleHeadlineComplete = useCallback(() => {
    setCycle((c) => c + 1)
  }, [])

  const { displayedText: displayedHeadline, isTyping: isHeadlineTyping } =
    useTypingAnimation({
      text: headline,
      speed: 60,
      delay: 300,
      pauseBetween: 3000,
      onComplete: handleHeadlineComplete,
      key: `headline-${cycle}`,
    })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    },
    [mouseX, mouseY],
  )

  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center px-6"
      onMouseMove={handleMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <FloatingCard
          mx={mouseX}
          my={mouseY}
          delay={1.5}
          depth={1.2}
          className="absolute right-[13%] top-[16%]"
        >
          <div className="rounded-xl border border-border/20 bg-card/40 p-3.5 shadow-2xl backdrop-blur-md dark:bg-card/20">
            <div className="mb-2 flex gap-1.5">
              <div className="size-2 rounded-full bg-red-500/60" />
              <div className="size-2 rounded-full bg-yellow-500/60" />
              <div className="size-2 rounded-full bg-green-500/60" />
            </div>
            <pre className="text-xs leading-relaxed">
              <span className="text-code-keyword">const</span>{" "}
              <span className="text-code-function">dev</span> = {"{\n"}
              {"  "}
              <span className="text-code-attr">name</span>:{" "}
              <span className="text-code-string">&quot;{fullName}&quot;</span>,
              {"\n  "}
              <span className="text-code-attr">role</span>:{" "}
              <span className="text-code-string">&quot;Full-Stack&quot;</span>,
              {"\n  "}
              <span className="text-code-attr">passionate</span>:{" "}
              <span className="text-code-keyword">true</span>,{"\n  "}
              <span className="text-code-attr">coffeLover</span>:{" "}
              <span className="text-code-keyword">true</span>,{"\n  "}
              <span className="text-code-attr">learning</span>:{" "}
              <span className="text-code-string">&quot;always&quot;</span>
              {"\n};"}
            </pre>
          </div>
        </FloatingCard>

        {/* Bottom-left: terminal */}
        <FloatingCard
          mx={mouseX}
          my={mouseY}
          delay={1.8}
          depth={0.8}
          className="absolute bottom-[10%] left-[6%]"
        >
          <div className="rounded-xl border border-border/20 bg-card/40 p-3.5 shadow-2xl backdrop-blur-md dark:bg-card/20">
            <p className="font-mono text-[11px]">
              <span className="text-code-string">$</span>{" "}
              <span className="text-code-function">npm run</span>{" "}
              <span className="text-foreground/80">build</span>
            </p>
            <p className="mt-1 font-mono text-xs text-emerald-700 dark:text-emerald-500/80 ">
              ✓ Compiled successfully
            </p>
          </div>
        </FloatingCard>

        {/* Top-left: JSX tag */}
        <FloatingCard
          mx={mouseX}
          my={mouseY}
          delay={2.0}
          depth={1.5}
          className="absolute left-[12%] top-[15%]"
        >
          <div className="rounded-lg border border-border/15 bg-card/30 px-3 py-2 shadow-xl backdrop-blur-md dark:bg-card/15">
            <p className="text-[11px]">
              <span className="text-code-tag">&lt;</span>
              <span className="text-code-keyword">Portfolio</span>
              <span className="text-code-tag"> /&gt;</span>
            </p>
          </div>
        </FloatingCard>

        {/* Bottom-right: comment */}
        <FloatingCard
          mx={mouseX}
          my={mouseY}
          delay={2.2}
          depth={1.0}
          className="absolute bottom-[24%] right-[12%]"
        >
          <div className="rounded-lg border border-border/15 bg-card/30 px-3 py-2 shadow-xl backdrop-blur-md dark:bg-card/15">
            <p className="text-xs text-code-comment">
              {"// TODO: Be better than yesterday."}
            </p>
          </div>
        </FloatingCard>

        {/* Mid-right: import */}
        <FloatingCard
          mx={mouseX}
          my={mouseY}
          delay={2.4}
          depth={0.6}
          className="absolute right-[6%] top-[55%]"
        >
          <div className="rounded-lg border border-border/15 bg-card/25 px-3 py-2 shadow-lg backdrop-blur-md dark:bg-card/10">
            <p className="text-[11px]">
              <span className="text-code-keyword">from</span>{" "}
              <span className="text-code-function">foomodule</span>{" "}
              <span className="text-code-keyword">import</span>{" "}
              <span className="text-code-string">FooBar, FooBaz</span>
            </p>
          </div>
        </FloatingCard>
      </div>
      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
        >
          <DocType />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-2"
        >
          <CodeComment>portfolio</CodeComment>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4"
        >
          <OpenTag tag="h1" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col space-y-4 py-4 ps-4 md:ps-6 lg:ps-8"
        >
          {/* Role — gradient pill badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-code-keyword/20 bg-code-keyword/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-code-keyword backdrop-blur-sm"
          >
            Full-Stack Web Developer
          </motion.span>

          <div className="relative">
            {/* Invisible text to reserve space and prevent layout shift */}
            <h1 className="pointer-events-none text-5xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              {fullName}
            </h1>
          </div>

          <div className="relative max-w-2xl">
            {/* Invisible text to reserve space */}
            <p className="pointer-events-none text-lg leading-relaxed text-muted-foreground opacity-0 sm:text-2xl">
              {headline}
            </p>
            {/* Visible typing animation */}
            <p className="absolute inset-0 text-lg leading-relaxed text-muted-foreground sm:text-2xl">
              {displayedHeadline}
              {isHeadlineTyping && (
                <span className="ml-1 inline-block h-[0.9em] w-1 animate-pulse bg-code-keyword" />
              )}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CloseTag tag="h1" />
        </motion.div>
      </div>
      {/* ── Scroll indicator ── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-muted-foreground/50 transition-colors hover:text-muted-foreground"
      >
        <div className="relative flex h-9 w-5.5 items-start justify-center rounded-full border border-muted-foreground/30 pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="size-1 rounded-full bg-code-keyword"
          />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
          scroll
        </span>
      </motion.a>
    </section>
  )
}
