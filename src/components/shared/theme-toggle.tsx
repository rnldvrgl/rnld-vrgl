"use client"
import { Button } from "@/components/ui/button"
import useIsMounted from "@/lib/hooks/useIsMounted"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const isMounted = useIsMounted()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  if (!isMounted()) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative size-9 rounded-full border border-border/50 bg-background/60 backdrop-blur-md"
        aria-label="Toggle theme"
        disabled
      >
        <HiOutlineSun className="size-4 text-foreground" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex size-9 cursor-pointer items-center justify-center rounded-full border border-border/50 bg-background/60 shadow-sm backdrop-blur-md transition-colors hover:border-border hover:bg-accent/50"
      aria-label="Toggle theme"
      whileHover="hover"
    >
      {/* Moon icon — visible in dark mode */}
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0,
        }}
        variants={{
          hover: { rotate: isDark ? -15 : 180, scale: isDark ? 1.15 : 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <HiOutlineMoon className="size-4 text-foreground" />
      </motion.div>

      {/* Sun icon — visible in light mode */}
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? -180 : 0,
          scale: isDark ? 0 : 1,
        }}
        variants={{
          hover: { rotate: isDark ? -180 : 15, scale: isDark ? 0 : 1.15 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <HiOutlineSun className="size-4 text-foreground" />
      </motion.div>

      <span className="sr-only">Toggle theme</span>
    </motion.button>
  )
}
