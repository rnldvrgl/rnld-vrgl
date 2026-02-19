import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { ProjectCard } from "@/components/shared/project-card"
import type { Project } from "@/lib/supabase/types"
import { HiOutlineCodeBracketSquare } from "react-icons/hi2"

export function FeaturedProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0)
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
        <p className="text-sm text-muted-foreground/60">
          {"// coming soon..."}
        </p>
      </CodeSection>
    )

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

      {/* Project count badge */}
      <div className="mb-6 flex items-center gap-2">
        <HiOutlineCodeBracketSquare className="size-4 text-code-keyword" />
        <span className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {projects.length}
          </span>{" "}
          featured {projects.length === 1 ? "project" : "projects"}
        </span>
      </div>

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
