"use client"

import RnldvrglTag from "@/components/shared/rnldvrgl-tag"
import {
  HiOutlineCheckCircle,
  HiOutlineCodeBracket,
  HiOutlineCommandLine,
} from "react-icons/hi2"
import { SiGithub } from "react-icons/si"

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/40 backdrop-blur-sm dark:bg-card/20">
      <div className="mx-auto flex h-7 max-w-full items-center justify-between px-4 text-[11px]">
        {/* Left cluster */}
        <div className="flex items-center gap-3 text-muted-foreground/60">
          {/* Branch indicator */}
          <span className="hidden items-center gap-1.5 sm:flex">
            <SiGithub className="size-3" />
            <span>main</span>
          </span>

          <span className="hidden h-3 w-px bg-border/30 sm:block" />

          {/* Errors/warnings — always clean */}
          <span className="flex items-center gap-1">
            <HiOutlineCheckCircle className="size-3 text-emerald-500/70" />
            <span>0 problems</span>
          </span>
        </div>

        {/* Center — branding */}
        <RnldvrglTag />

        {/* Right cluster */}
        <div className="flex items-center gap-3 text-muted-foreground/60">
          <span className="hidden items-center gap-1.5 sm:flex">
            <HiOutlineCodeBracket className="size-3" />
            <span>TypeScript</span>
          </span>

          <span className="hidden h-3 w-px bg-border/30 sm:block" />

          <span className="hidden items-center gap-1.5 sm:flex">
            <HiOutlineCommandLine className="size-3" />
            <span>Next.js</span>
          </span>

          <span className="hidden h-3 w-px bg-border/30 sm:block" />

          <span className="text-muted-foreground/40">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
