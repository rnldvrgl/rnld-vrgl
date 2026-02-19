import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Skill } from "@/lib/supabase/types"

export function SkillsSection({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null

  // Group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading
            title="Skills"
            subtitle="Technologies and tools I work with."
          />
        </AnimatedSection>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([category, categorySkills], i) => (
            <AnimatedSection
              key={category}
              delay={i * 0.1}
            >
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="rounded-md border border-border/50 bg-secondary/50 px-3 py-1.5 text-sm text-foreground"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
