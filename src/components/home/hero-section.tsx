"use client"

import {
  CloseTag,
  CodeComment,
  DocType,
  OpenTag,
} from "@/components/shared/code-tags"
import type { Profile } from "@/lib/supabase/types"
import { motion } from "framer-motion"

export function HeroSection({ profile }: { profile: Profile | null }) {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center px-6"
    >
      <div className="relative mx-auto max-w-5xl">
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
          className="py-4 flex flex-col space-y-4 ps-4 md:ps-6 lg:ps-8"
        >
          <p className="font-medium uppercase tracking-[0.3em] text-code-attr">
            Full-Stack Developer
          </p>
          <h1 className="text-5xl font-black tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {profile?.full_name ?? "Ronald Vergel Dela Cruz"}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-2xl">
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
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted-foreground/50 transition-colors hover:text-muted-foreground"
      >
        {/* Mouse outline */}
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
