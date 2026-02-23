"use client"

import { Button } from "@/components/ui/button"
import type { ExperienceType } from "@/lib/supabase/types"
import { motion } from "framer-motion"

const filters: { value: "all" | ExperienceType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "work", label: "Employment" },
  { value: "freelance", label: "Freelance" },
]

interface TimelineFilterProps {
  active: "all" | ExperienceType
  onChange: (value: "all" | ExperienceType) => void
}

export function TimelineFilter({ active, onChange }: TimelineFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant="ghost"
          size="sm"
          onClick={() => onChange(filter.value)}
          className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide ${
            active === filter.value
              ? "text-foreground"
              : "text-muted-foreground/60 hover:text-muted-foreground"
          }`}
        >
          {active === filter.value && (
            <motion.div
              layoutId="timeline-filter"
              className="absolute inset-0 rounded-full border border-border/60 bg-secondary/40"
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
              }}
            />
          )}
          <span className="relative z-10">{filter.label}</span>
        </Button>
      ))}
    </div>
  )
}
