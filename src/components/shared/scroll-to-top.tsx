"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { HiOutlineChevronUp } from "react-icons/hi2"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const circumference = 2 * Math.PI * 18
  const offset = circumference - scrollProgress * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-24 right-7.5 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group relative flex size-11 cursor-pointer items-center justify-center rounded-full border border-border/50 bg-background/80 shadow-lg backdrop-blur-md transition-colors hover:border-border hover:bg-accent/50"
            aria-label="Scroll to top"
          >
            {/* Progress ring */}
            <svg
              className="pointer-events-none absolute inset-0 -rotate-90"
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-border/30"
              />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="text-code-keyword transition-all duration-150"
              />
            </svg>
            <HiOutlineChevronUp className="size-4 transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
