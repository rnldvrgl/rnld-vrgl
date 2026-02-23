"use client"

import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getSkillIcon } from "@/lib/skill-icons"
import type { Skill } from "@/lib/supabase/types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import {
  HiOutlineCodeBracketSquare,
  HiOutlineCog6Tooth,
  HiOutlineCpuChip,
  HiOutlinePaintBrush,
  HiOutlineServerStack,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2"

const categoryIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  Frontend: HiOutlineCodeBracketSquare,
  Backend: HiOutlineServerStack,
  Design: HiOutlinePaintBrush,
  DevOps: HiOutlineWrenchScrewdriver,
  Database: HiOutlineCpuChip,
}

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  if (skills.length === 0)
    return (
      <CodeSection
        id="expertise"
        tag="section"
        attrs={{ id: "expertise" }}
      >
        <CodeHeading tag="h2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Expertise
          </h2>
          <p className="mt-1 text-sm text-code-comment">
            {"// technologies & tools I work with"}
          </p>
        </CodeHeading>
        <p className="text-sm text-muted-foreground/60">
          {"// coming soon..."}
        </p>
      </CodeSection>
    )

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category?.name || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  const categories = Object.keys(grouped)
  const selected = activeTab ?? categories[0]
  const activeSkills = grouped[selected] ?? []
  const ActiveIcon = categoryIcons[selected] || HiOutlineCog6Tooth

  return (
    <CodeSection
      id="expertise"
      tag="section"
      attrs={{ id: "expertise" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Expertise
        </h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// technologies & tools I work with"}
        </p>
      </CodeHeading>

      {/* Editor window container */}
      <div className="overflow-hidden rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm dark:border-border/30 dark:bg-card/10">
        <div className="flex items-center border-b border-border/30 bg-card/50 dark:bg-card/30">
          {/* macOS dots — desktop only */}
          <div className="hidden gap-1.5 px-3 py-3 md:flex">
            <div className="size-3 rounded-full bg-red-500/70" />
            <div className="size-3 rounded-full bg-yellow-500/70" />
            <div className="size-3 rounded-full bg-green-500/70" />
          </div>

          {/* Mobile category selector */}
          <div className="flex w-full items-center gap-3 px-3 py-2.5 md:hidden">
            {/* Active category icon badge */}
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-code-keyword/20 bg-code-keyword/10 text-code-keyword">
              <ActiveIcon className="size-3.5" />
            </div>

            <Select
              value={selected}
              onValueChange={(val) => setActiveTab(val)}
            >
              <SelectTrigger className="h-8 flex-1 border border-border/30 bg-background/40 text-xs font-medium text-foreground focus:ring-code-keyword/30 dark:bg-background/20">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="w-[--radix-select-trigger-width]">
                <SelectGroup>
                  <SelectLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
                    Categories
                  </SelectLabel>
                  {categories.map((cat) => {
                    const Icon = categoryIcons[cat] || HiOutlineCog6Tooth
                    return (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="text-xs"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="size-3.5 shrink-0 text-code-keyword/70" />
                          <span>{cat}</span>
                          <span className="ml-auto font-mono text-[10px] text-muted-foreground/40">
                            {grouped[cat].length}
                          </span>
                        </span>
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Skill count badge */}
            <span className="shrink-0 font-mono text-[10px] text-code-comment">
              {`// ${activeSkills.length}`}
            </span>
          </div>

          {/* Desktop tab bar */}
          <div className="hidden flex-1 overflow-x-auto scrollbar-none md:flex">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat] || HiOutlineCog6Tooth
              const isActive = cat === selected
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`relative flex items-center gap-2 border-r border-border/20 px-4 py-2.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-background/80 text-foreground dark:bg-background/50"
                      : "text-muted-foreground/50 hover:bg-background/40 hover:text-muted-foreground dark:hover:bg-background/20"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span className="hidden sm:inline">{cat}</span>
                  <span className="font-mono text-[10px] text-muted-foreground/30">
                    {grouped[cat].length}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="skill-tab-indicator"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-code-keyword"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Category header */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg border border-code-keyword/20 bg-code-keyword/10 text-code-keyword">
                  <ActiveIcon className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {selected}
                  </h3>
                  <p className="font-mono text-[10px] text-code-comment">
                    {`// ${activeSkills.length} ${activeSkills.length === 1 ? "technology" : "technologies"}`}
                  </p>
                </div>
              </div>

              {/* Skills grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {activeSkills.map((skill, i) => {
                  const SkillIcon = getSkillIcon(skill.name)
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="group/skill flex items-center gap-3 rounded-lg border border-border/20 bg-background/30 px-4 py-3 transition-all hover:border-code-keyword/30 dark:bg-background/10"
                    >
                      <SkillIcon className="size-5 shrink-0 text-code-keyword/60 transition-colors group-hover/skill:text-code-keyword" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-foreground/90">
                            {skill.name}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground/50">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border/20 dark:bg-border/15">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{
                              duration: 0.6,
                              delay: i * 0.03,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-full rounded-full bg-linear-to-r from-code-keyword/50 to-code-keyword"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </CodeSection>
  )
}
