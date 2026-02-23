"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const { theme } = useTheme()
  const [isHidden, setIsHidden] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 1 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as HTMLElement
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(!!isClickable)
    }

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)

    window.addEventListener("mousemove", moveCursor)
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY])

  // Detect touch devices
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
    }
    // Use setTimeout to avoid direct setState in effect
    const timer = setTimeout(checkTouch, 0)
    return () => clearTimeout(timer)
  }, [])

  if (isTouchDevice || isHidden) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -left-4 -top-4 size-8 rounded-full border-2 transition-colors"
          animate={{
            scale: isPointer ? 1.5 : 1,
            borderColor: isPointer
              ? theme === "dark"
                ? "oklch(0.75 0.22 290 / 0.6)"
                : "oklch(0.50 0.18 290 / 0.7)"
              : theme === "dark"
                ? "oklch(0.85 0.05 290 / 0.25)"
                : "oklch(0.40 0.05 290 / 0.30)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative -left-1 -top-1 size-2 rounded-full transition-colors"
          animate={{
            scale: isPointer ? 0.8 : 1,
            backgroundColor: isPointer
              ? theme === "dark"
                ? "oklch(0.75 0.22 290)"
                : "oklch(0.50 0.18 290)"
              : theme === "dark"
                ? "oklch(0.85 0.05 290 / 0.8)"
                : "oklch(0.40 0.05 290 / 0.9)",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
          }}
        />
      </motion.div>
    </>
  )
}
