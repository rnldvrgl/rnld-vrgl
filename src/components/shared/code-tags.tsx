"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { ReactNode } from "react"
import {
  CloseTag,
  CodeComment,
  CodeHeading,
  DocType,
  OpenTag,
  SelfClosingTag,
} from "./code-tags-shared"

// Re-export server-safe components for convenience
export { CloseTag, CodeComment, CodeHeading, DocType, OpenTag, SelfClosingTag }

/** A full section wrapper with opening/closing tags and scroll-triggered animation */
export function CodeSection({
  id,
  tag,
  attrs,
  children,
  className = "",
}: {
  id: string
  tag: string
  attrs?: Record<string, string>
  children: ReactNode
  className?: string
}) {
  return (
    <AnimatePresence>
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`relative py-24 ${className}`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <OpenTag
              tag={tag}
              attrs={attrs}
            />
          </div>
          <div className="pl-4 md:pl-8">{children}</div>
          <div className="mt-8">
            <CloseTag tag={tag} />
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
