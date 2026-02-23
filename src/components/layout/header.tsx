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
  { href: "#hero", label: "home", ext: ".tsx", index: "01" },
  { href: "#about", label: "about", ext: ".tsx", index: "02" },
  { href: "#expertise", label: "expertise", ext: ".tsx", index: "03" },
  { href: "#work", label: "work", ext: ".tsx", index: "04" },
  { href: "#projects", label: "projects", ext: ".tsx", index: "05" },
  { href: "#contact", label: "contact", ext: ".tsx", index: "06" },
]

const blogPageLink = { href: "/blog", label: "blog", ext: ".mdx", index: "07" }

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("#hero")
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  const isHome = pathname === "/"

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

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

  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      if (isNavigating) return

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
  }, [isHome, isNavigating])

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false)
      if (!isHome && href.startsWith("#")) {
        window.location.href = `/${href}`
        return
      }

      // If navigating to an anchor on the home page
      if (isHome && href.startsWith("#")) {
        setIsNavigating(true)
        setActiveSection(href)
        // Re-enable scroll-spy after smooth scroll completes
        setTimeout(() => {
          setIsNavigating(false)
        }, 1500)
      }
    },
    [isHome],
  )

  const renderTabItem = (
    link: { href: string; label: string; ext: string; index: string },
    isActive: boolean,
  ) => {
    const isAnchor = link.href.startsWith("#")
    const resolvedHref = isAnchor && !isHome ? `/${link.href}` : link.href

    const inner = (
      <>
        <span className="font-mono text-[10px] text-muted-foreground/50 mr-1">
          {link.index}
          {" // "}
        </span>
        <span className="text-xs text-muted-foreground/80">{link.label}</span>
        <span className="text-xs text-muted-foreground/30">{link.ext}</span>
        {isActive && (
          <motion.div
            layoutId="editor-tab-indicator"
            className="absolute inset-x-0 bottom-0 h-0.5 bg-code-keyword"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        )}
      </>
    )

    const classes = `relative flex items-center gap-0.5 px-4 py-2.5 transition-colors ${
      isActive
        ? "bg-background/80 text-foreground dark:bg-background/50"
        : "text-muted-foreground/60 hover:bg-background/40 hover:text-muted-foreground dark:hover:bg-background/20"
    }`

    if (isAnchor) {
      return (
        <a
          key={link.href}
          href={resolvedHref}
          onClick={() => handleNavClick(link.href)}
          className={classes}
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
        className={classes}
      >
        {inner}
      </Link>
    )
  }

  const renderMobileItem = (
    link: { href: string; label: string; ext: string; index: string },
    isActive: boolean,
  ) => {
    const isAnchor = link.href.startsWith("#")
    const resolvedHref = isAnchor && !isHome ? `/${link.href}` : link.href

    const inner = (
      <>
        <span className="font-mono text-xs text-muted-foreground/50">
          {link.index}
        </span>
        <span className="text-xs text-muted-foreground/40">{"// "}</span>
        <span
          className={`text-2xl font-light tracking-wide ${
            isActive
              ? "text-foreground"
              : "text-muted-foreground/70 group-hover:text-foreground"
          }`}
        >
          {link.label}
        </span>
        <span className="text-sm text-muted-foreground/30">{link.ext}</span>
      </>
    )

    if (isAnchor) {
      return (
        <a
          key={link.href}
          href={resolvedHref}
          onClick={() => handleNavClick(link.href)}
          className="group flex items-baseline gap-3 py-3"
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
        className="group flex items-baseline gap-3 py-3"
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
              className="fixed inset-0 top-12 z-50 bg-background xl:hidden"
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
                      {renderMobileItem(link, isActive)}
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
            ? "border-b border-border/30 bg-background/80 backdrop-blur-xl dark:bg-background/70"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-12 max-w-6xl items-center px-0 lg:px-0">
          <a
            href={isHome ? "#hero" : "/"}
            title="Ronald Vergel Dela Cruz"
            className="transition-opacity hover:opacity-70 px-5"
          >
            <RnldvrglTag />
          </a>

          <div className="ml-auto flex h-full items-center space-x-3  px:3 xl:px-5">
            {/* Desktop nav — editor tabs */}
            <nav className="hidden flex-1 items-center overflow-hidden xl:flex">
              {navLinks.map((link) =>
                renderTabItem(
                  link,
                  isHome ? activeSection === link.href : false,
                ),
              )}
            </nav>
            {/* theme toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center  px-3 xl:hidden">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50"
              aria-label="Toggle menu"
            >
              <div className="relative flex size-5 items-center justify-center">
                <motion.span
                  className="absolute left-0 h-0.5 w-5 rounded-full bg-current"
                  animate={{
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 0 : -4,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 h-0.5 w-5 rounded-full bg-current"
                  animate={{
                    opacity: mobileOpen ? 0 : 1,
                    scaleX: mobileOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
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

      {mobileMenu}
    </>
  )
}
