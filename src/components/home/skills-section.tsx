import {
  CloseTag,
  CodeHeading,
  CodeSection,
  OpenTag,
} from "@/components/shared/code-tags"
import type { Skill } from "@/lib/supabase/types"

export function SkillsSection({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "Other"
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

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(grouped).map(([category, categorySkills]) => (
          <div
            key={category}
            className="space-y-3"
          >
            <div>
              <OpenTag
                tag="ul"
                attrs={{ class: category.toLowerCase().replace(/\s+/g, "-") }}
              />
            </div>
            <div className="pl-4 space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-code-function">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rounded-md border border-border/50 bg-secondary/50 px-3 py-1.5 text-sm text-foreground transition-colors hover:border-code-keyword/40 hover:bg-code-keyword/10"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <CloseTag tag="ul" />
            </div>
          </div>
        ))}
      </div>
    </CodeSection>
  )
}
