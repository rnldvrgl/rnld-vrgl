import { motion } from "framer-motion"
import { useMemo } from "react"

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function GradientOrb({
  className,
  duration,
  intensity = 50,
}: {
  className: string
  duration: number
  intensity?: number
}) {
  // generate once per mount (important)
  const path = useMemo(() => {
    return {
      x: [
        0,
        randomRange(-intensity, intensity),
        randomRange(-intensity, intensity),
        0,
      ],
      y: [
        0,
        randomRange(-intensity, intensity),
        randomRange(-intensity, intensity),
        0,
      ],
    }
  }, [intensity])

  return (
    <motion.div
      animate={{
        x: path.x,
        y: path.y,
        scale: [1, 1.08, 0.95, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className={className}
    />
  )
}
