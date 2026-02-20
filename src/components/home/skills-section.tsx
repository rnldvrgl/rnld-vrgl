import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { Card, CardContent } from "@/components/ui/card"
import { getSkillIcon } from "@/lib/skill-icons"
import type { Skill } from "@/lib/supabase/types"
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([category, categorySkills]) => {
          const Icon = categoryIcons[category] || HiOutlineCog6Tooth
          return (
            <Card key={category}>
              <CardContent>
                {/* Category header */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg border border-border/40 bg-background/50 text-code-keyword transition-colors group-hover:border-code-keyword/40 group-hover:bg-code-keyword/10">
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold tracking-tight text-foreground">
                      {category}
                    </h3>
                    <p className="text-[10px] text-muted-foreground/50">
                      {categorySkills.length}{" "}
                      {categorySkills.length === 1 ? "skill" : "skills"}
                    </p>
                  </div>
                </div>

                {/* Skills with proficiency bars */}
                <div className="space-y-3">
                  {categorySkills.map((skill) => {
                    const SkillIcon = getSkillIcon(skill.icon_name)
                    return (
                      <div key={skill.id}>
                        <div className="mb-1.5 flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <SkillIcon className="size-3.5 text-muted-foreground/60" />
                            {skill.name}
                          </span>
                          <span className="text-[10px] tabular-nums text-muted-foreground/50">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-border/30">
                          <div
                            className="h-full rounded-full bg-linear-to-r from-code-keyword/40 to-code-keyword transition-all duration-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </CodeSection>
  )
}
