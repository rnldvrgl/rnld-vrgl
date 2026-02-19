"use client"

import { ThemeToggle } from "@/components/shared/theme-toggle"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const navLinks = [
  { href: "#hero", label: "home", index: "01" },
  { href: "#about", label: "about", index: "02" },
  { href: "#expertise", label: "expertise", index: "03" },
  { href: "#work", label: "work", index: "04" },
  { href: "#projects", label: "projects", index: "05" },
  { href: "#contact", label: "contact", index: "06" },
]

const blogLink = { href: "/blog", label: "blog", index: "07" }

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#hero")
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === "/"

  // Track scroll position for active section and header blur
  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = navLinks.map((l) => l.href.slice(1))
      let current = sections[0]
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) current = id
        }
      }
      setActiveSection(`#${current}`)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHome])

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false)
      if (!isHome && href.startsWith("#")) {
        // Navigate to home page first, then scroll
        window.location.href = `/${href}`
        return
      }
    },
    [isHome],
  )

  const renderNavItem = (
    link: { href: string; label: string; index: string },
    isActive: boolean,
    isMobile = false,
  ) => {
    const isAnchor = link.href.startsWith("#")

    const inner = isMobile ? (
      <>
        <span className="font-mono text-xs text-muted-foreground/50">
          {link.index}
        </span>
        <span className="text-xs text-muted-foreground/40">//</span>
        <span
          className={`text-2xl font-light tracking-wide ${
            isActive
              ? "text-foreground"
              : "text-muted-foreground/70 group-hover:text-foreground"
          }`}
        >
          {link.label}
        </span>
      </>
    ) : (
      <>
        <span className="font-mono text-[10px] text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
          {link.index}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
          //
        </span>
        <span
          className={`text-[13px] font-medium tracking-wide transition-colors ${
            isActive
              ? "text-foreground"
              : "text-muted-foreground/80 group-hover:text-foreground"
          }`}
        >
          {link.label}
        </span>
        {isActive && (
          <motion.div
            layoutId="nav-indicator"
            className="absolute -bottom-0.5 left-0 h-px w-full bg-foreground"
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
            }}
          />
        )}
      </>
    )

    if (isAnchor) {
      return (
        <a
          key={link.href}
          href={link.href}
          onClick={() => handleNavClick(link.href)}
          className={`group ${isMobile ? "flex items-baseline gap-3 py-3" : "relative flex items-baseline gap-2 py-2"}`}
        >
          {inner}
        </a>
      )
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setMobileOpen(false)}
        className={`group ${isMobile ? "flex items-baseline gap-3 py-3" : "relative flex items-baseline gap-2 py-2"}`}
      >
        {inner}
      </Link>
    )
  }

  const allLinks = [...navLinks, blogLink]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <a
          href={isHome ? "#hero" : "/"}
          className="relative z-50 text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          <span className="text-code-tag">&lt;</span>
          <span className="text-code-keyword">rnldvrgl</span>
          <span className="text-code-tag"> /&gt;</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {isHome
            ? navLinks.map((link) =>
                renderNavItem(link, activeSection === link.href),
              )
            : null}
          {renderNavItem(blogLink, pathname.startsWith("/blog"))}
          <ThemeToggle />
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 flex flex-col justify-center bg-background/98 backdrop-blur-sm md:hidden"
        >
          <nav className="flex flex-col gap-2 px-8">
            {allLinks.map((link, i) => {
              const isActive = link.href.startsWith("#")
                ? activeSection === link.href
                : pathname.startsWith(link.href)

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  {renderNavItem(link, isActive, true)}
                </motion.div>
              )
            })}
          </nav>
        </motion.div>
      )}
    </header>
  )
}
