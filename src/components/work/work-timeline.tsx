"use client"

import { Timeline } from "@/components/work/timeline"
import { TimelineFilter } from "@/components/work/timeline-filter"
import type { Experience, ExperienceType } from "@/lib/supabase/types"
import { useMemo, useState } from "react"

export function WorkTimeline({ experiences }: { experiences: Experience[] }) {
  const [filter, setFilter] = useState<"all" | ExperienceType>("all")

  const filtered = useMemo(
    () =>
      filter === "all"
        ? experiences
        : experiences.filter((e) => e.type === filter),
    [experiences, filter],
  )

  return (
    <div className="space-y-12">
      <TimelineFilter
        active={filter}
        onChange={setFilter}
      />
      <Timeline experiences={filtered} />
    </div>
  )
}
