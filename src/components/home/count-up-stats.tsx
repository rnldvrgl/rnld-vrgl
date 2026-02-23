"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useCountUp } from "@/lib/hooks/useCountUp"
import { motion } from "framer-motion"
import {
  HiOutlineBriefcase,
  HiOutlineCodeBracketSquare,
  HiOutlineCpuChip,
} from "react-icons/hi2"

export interface StatItem {
  label: string
  value: number
  suffix: string
  icon: "experience" | "projects" | "technologies"
}

const iconMap = {
  experience: HiOutlineBriefcase,
  projects: HiOutlineCodeBracketSquare,
  technologies: HiOutlineCpuChip,
}

function CountUpCard({ stat, delay }: { stat: StatItem; delay: number }) {
  const { ref, count } = useCountUp(stat.value)
  const Icon = iconMap[stat.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="group/stat relative overflow-hidden h-full">
        <CardContent
          ref={ref}
          className="flex items-center gap-4"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-code-keyword/20 bg-code-keyword/10 text-code-keyword transition-colors group-hover/stat:border-code-keyword/40 group-hover/stat:bg-code-keyword/10">
            <Icon className="size-5" />
          </div>
          <div>
            <p className="text-3xl font-bold tabular-nums tracking-tight text-code-keyword">
              {count}
              <span className="text-lg">{stat.suffix}</span>
            </p>
            <p className="text-xsfont-medium uppercase tracking-wider text-muted-foreground/60">
              {stat.label}
            </p>
          </div>
        </CardContent>
        {/* Decorative accent */}
        <div className="absolute -right-4 -top-4 size-24 rounded-full bg-code-keyword/10 blur-2xl transition-all group-hover/stat:bg-code-keyword/20" />
      </Card>
    </motion.div>
  )
}

export function CountUpStats({ stats }: { stats: StatItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((stat, i) => (
        <CountUpCard
          key={stat.label}
          stat={stat}
          delay={i * 0.1}
        />
      ))}
    </div>
  )
}
