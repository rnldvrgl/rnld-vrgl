"use client"

import {
  CloseTag,
  CodeComment,
  OpenTag,
  SelfClosingTag,
} from "@/components/shared/code-tags"
import type { Profile } from "@/lib/supabase/types"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function HeroSection({ profile }: { profile: Profile | null }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center px-6"
    >
      {/* Subtle grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
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
          className="py-4 pl-4 md:pl-8"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-code-attr">
            Full-Stack Developer
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {profile?.full_name ?? "Ronald Vergel Dela Cruz"}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {profile?.headline ??
              "Building modern web experiences with clean code and thoughtful design."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CloseTag tag="h1" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <SelfClosingTag tag="rnldvrgl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="text-code-comment">{"// scroll down"}</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
