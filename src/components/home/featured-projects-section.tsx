import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { ProjectCard } from "@/components/shared/project-card"
import type { Project } from "@/lib/supabase/types"

export function FeaturedProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null

  return (
    <CodeSection
      id="projects"
      tag="section"
      attrs={{ id: "projects" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// a selection of my recent work"}
        </p>
      </CodeHeading>

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </CodeSection>
  )
}
