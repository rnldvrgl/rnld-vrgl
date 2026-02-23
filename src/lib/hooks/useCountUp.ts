"use client"

import { animate, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export function useCountUp(target: number, duration = 2) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { margin: "-80px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const effectiveDuration = Math.min(duration, target * 0.15)

    const controls = animate(0, target, {
      duration: effectiveDuration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, target, duration])

  return { ref, count }
}
