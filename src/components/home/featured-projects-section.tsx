import { AnimatedSection } from "@/components/shared/animated-section"
import { ProjectCard } from "@/components/shared/project-card"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Project } from "@/lib/supabase/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FeaturedProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="flex items-end justify-between">
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of my recent work."
            />
            <Link
              href="/projects"
              className="mb-12 hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <AnimatedSection
              key={project.id}
              delay={i * 0.1}
            >
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all projects
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
