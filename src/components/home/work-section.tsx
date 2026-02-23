import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { WorkTimeline } from "@/components/work/work-timeline"
import type { Experience } from "@/lib/supabase/types"
import {
  HiOutlineBriefcase,
  HiOutlineBuildingOffice2,
  HiOutlineCalendarDays,
} from "react-icons/hi2"

export function WorkSection({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0)
    return (
      <CodeSection
        id="work"
        tag="section"
        attrs={{ id: "work" }}
      >
        <CodeHeading tag="h2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Work
          </h2>
          <p className="mt-1 text-sm text-code-comment">
            {"// my professional journey"}
          </p>
        </CodeHeading>
        <p className="text-sm text-muted-foreground/60">
          {"// coming soon..."}
        </p>
      </CodeSection>
    )

  const companies = new Set(experiences.map((e) => e.company)).size
  const yearsActive = (() => {
    const earliest = experiences.reduce(
      (min, e) => (e.start_date < min ? e.start_date : min),
      experiences[0].start_date,
    )
    return Math.max(
      1,
      new Date().getFullYear() - new Date(earliest).getFullYear(),
    )
  })()
  const currentRole = experiences.find((e) => !e.end_date && e.type === "work")

  const stats = [
    {
      icon: HiOutlineBriefcase,
      label: "Roles",
      value: `${experiences.length}`,
    },
    {
      icon: HiOutlineBuildingOffice2,
      label: "Companies",
      value: `${companies}`,
    },
    { icon: HiOutlineCalendarDays, label: "Years", value: `${yearsActive}+` },
  ]

  return (
    <CodeSection
      id="work"
      tag="section"
      attrs={{ id: "work" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Work</h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// my professional journey"}
        </p>
      </CodeHeading>

      {/* Summary bar */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2"
            >
              <stat.icon className="size-4 text-code-keyword" />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {stat.value}
                </span>{" "}
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        {currentRole && (
          <p className="text-xs text-muted-foreground/60">
            Currently:{" "}
            <span className="text-code-string">
              {currentRole.title} @ {currentRole.company}
            </span>
          </p>
        )}
      </div>

      <WorkTimeline experiences={experiences} />
    </CodeSection>
  )
}
