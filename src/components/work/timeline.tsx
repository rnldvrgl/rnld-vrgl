"use client"

import { Badge } from "@/components/ui/badge"
import { formatTimelineDate } from "@/lib/format"
import type { Experience } from "@/lib/supabase/types"
import { motion } from "framer-motion"
import {
  HiOutlineArrowUpRight,
  HiOutlineBriefcase,
  HiOutlineCodeBracket,
  HiOutlineComputerDesktop,
} from "react-icons/hi2"

const typeConfig: Record<
  Experience["type"],
  { label: string; icon: typeof HiOutlineBriefcase }
> = {
  work: { label: "Employment", icon: HiOutlineBriefcase },
  project: { label: "Project", icon: HiOutlineCodeBracket },
  freelance: { label: "Freelance", icon: HiOutlineComputerDesktop },
}

function TimelineItem({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const isLeft = index % 2 === 0
  const config = typeConfig[experience.type]
  const Icon = config.icon
  const isPresent = !experience.end_date

  return (
    <div className="group relative lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
      {/* Connector dot */}
      <div className="absolute left-6 top-0 z-10 hidden h-full lg:left-1/2 lg:block lg:-translate-x-1/2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="sticky top-40 flex size-3 items-center justify-center"
        >
          <div className="size-2.5 rounded-full border border-foreground/30 bg-foreground/50 transition-colors group-hover:border-foreground/60 group-hover:bg-foreground" />
        </motion.div>
      </div>

      {/* Left column content (even items) */}
      <div
        className={`${isLeft ? "lg:pr-16" : "lg:order-3 lg:pl-16"} ${
          !isLeft ? "lg:col-start-3" : ""
        }`}
      >
        <motion.div
          initial={{
            opacity: 0,
            x: isLeft ? -30 : 30,
          }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{
            duration: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="relative rounded-lg border border-border/40 bg-card/30 p-6 backdrop-blur-xs transition-colors duration-300 hover:border-border/70 hover:bg-card/50"
        >
          {/* Type badge + date */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Icon className="size-3.5 text-muted-foreground/60" />
              <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
                {config.label}
              </span>
            </div>
            <span className="font-mono text-xs text-muted-foreground/50">
              {formatTimelineDate(experience.start_date)}
              {" — "}
              {isPresent ? (
                <span className="text-emerald-600 dark:text-emerald-400/80">
                  Present
                </span>
              ) : (
                formatTimelineDate(experience.end_date!)
              )}
            </span>
          </div>

          {/* Title + Company */}
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {experience.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground/80">
            {experience.company}
          </p>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground/70">
            {experience.description}
          </p>

          {/* Tech stack */}
          {experience.experience_skills &&
            experience.experience_skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {experience.experience_skills.map((es) => (
                  <Badge
                    key={es.id}
                    variant="secondary"
                    className="border-border/30 bg-secondary/30 text-[10px] font-normal text-muted-foreground/70 hover:bg-secondary/50 hover:text-muted-foreground"
                  >
                    {es.skill?.name ?? "Unknown"}
                  </Badge>
                ))}
              </div>
            )}

          {/* Link */}
          {experience.link && (
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              View
              <HiOutlineArrowUpRight className="size-3" />
            </a>
          )}
        </motion.div>
      </div>

      {/* Center column (connector line area) */}
      <div
        className={`hidden lg:block ${!isLeft ? "lg:order-2" : ""}`}
        aria-hidden
      />

      {/* Empty column for alternating layout */}
      <div
        className={`hidden lg:block ${isLeft ? "lg:order-3" : "lg:order-1"}`}
        aria-hidden
      />
    </div>
  )
}

/* Mobile-only dot for the vertical line */
function MobileDot() {
  return (
    <div className="relative mb-1 flex items-center gap-4 lg:hidden">
      <div className="ml-5.5 size-2.5 rounded-full border border-foreground/30 bg-foreground/50 " />
    </div>
  )
}

export function Timeline({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No experiences to show yet.
      </p>
    )
  }

  return (
    <div className="relative">
      {/* Center vertical line — desktop */}
      <div
        className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-foreground to-border/0 lg:block"
        aria-hidden
      />

      {/* Left vertical line — mobile */}
      <div
        className="absolute left-6.75 top-0 h-full w-px bg-foreground to-border/0 lg:hidden"
        aria-hidden
      />

      <div className="flex flex-col gap-8 lg:gap-12">
        {experiences.map((exp, i) => (
          <div key={exp.id}>
            <MobileDot />
            <div className="pl-14 lg:pl-0">
              <TimelineItem
                experience={exp}
                index={i}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
