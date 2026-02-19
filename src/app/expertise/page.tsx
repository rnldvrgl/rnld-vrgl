import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeading } from "@/components/shared/section-heading"
import { getSkills } from "@/lib/data"
import type { Skill } from "@/lib/supabase/types"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Technologies, tools, and skills I use to build modern web experiences.",
}

function SkillCategory({
  category,
  skills,
}: {
  category: string
  skills: Skill[]
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.id}
            className="rounded-md border border-border/30 bg-secondary/20 px-3 py-1.5 text-sm text-muted-foreground/80 transition-colors hover:border-border/50 hover:text-foreground"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default async function ExpertisePage() {
  const skills = await getSkills()

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || "Other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <section className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading
            title="Expertise"
            subtitle="Technologies and tools I work with daily."
          />
        </AnimatedSection>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([category, categorySkills], i) => (
            <AnimatedSection
              key={category}
              delay={i * 0.08}
            >
              <SkillCategory
                category={category}
                skills={categorySkills}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
