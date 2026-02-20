"use client"

import RnldvrglTag from "@/components/shared/rnldvrgl-tag"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"

const navLinks = [
  { href: "#hero", label: "home", index: "01" },
  { href: "#about", label: "about", index: "02" },
  { href: "#expertise", label: "expertise", index: "03" },
  { href: "#work", label: "work", index: "04" },
  { href: "#projects", label: "projects", index: "05" },
  { href: "#contact", label: "contact", index: "06" },
]

const blogPageLink = { href: "/blog", label: "blog", index: "07" }

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#hero")
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  const isHome = pathname === "/"

  useEffect(() => {
    // Use timeout to avoid setState in effect warning
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileOpen])

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
        <span className="text-xs text-muted-foreground/40">{"//"}</span>
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
          {"//"}
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
      // On non-home pages, link to /<hash> so it navigates home first
      const resolvedHref = isHome ? link.href : `/${link.href}`

      return (
        <a
          key={link.href}
          href={resolvedHref}
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

  const allLinks = [...navLinks, blogPageLink]

  const mobileMenu = mounted
    ? createPortal(
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 top-16 z-50 bg-background lg:hidden"
            >
              <nav className="flex flex-col gap-2 px-8 pt-8">
                {allLinks.map((link, i) => {
                  const isActive = link.href.startsWith("#")
                    ? activeSection === link.href
                    : pathname.startsWith(link.href)

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      {renderNavItem(link, isActive, true)}
                    </motion.div>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled || mobileOpen
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a
            href={isHome ? "#hero" : "/"}
            title="Ronald Vergel Dela Cruz"
            className="relative z-50 text-sm font-medium tracking-tight text-foreground transition-opacity hover:opacity-70"
          >
            <RnldvrglTag />
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) =>
              renderNavItem(link, isHome ? activeSection === link.href : false),
            )}
            <ThemeToggle />
          </nav>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50"
              aria-label="Toggle menu"
            >
              <div className="relative flex size-5 items-center justify-center">
                {/* Top bar → rotates to form \ of X */}
                <motion.span
                  className="absolute left-0 h-0.5 w-5 rounded-full bg-current"
                  animate={{
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 0 : -4,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                {/* Middle bar → fades out */}
                <motion.span
                  className="absolute left-0 h-0.5 w-5 rounded-full bg-current"
                  animate={{
                    opacity: mobileOpen ? 0 : 1,
                    scaleX: mobileOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                {/* Bottom bar → rotates to form / of X */}
                <motion.span
                  className="absolute left-0 h-0.5 w-5 rounded-full bg-current"
                  animate={{
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? 0 : 4,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu rendered via portal */}
      {mobileMenu}
    </>
  )
}
