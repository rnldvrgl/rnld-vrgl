import { AnimatedSection } from "@/components/shared/animated-section"
import { ProjectCard } from "@/components/shared/project-card"
import { SectionHeading } from "@/components/shared/section-heading"
import { getProjects } from "@/lib/data"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of projects — web apps, tools, and experiments built with modern technologies.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading
            title="Projects"
            subtitle="A collection of things I've built."
          />
        </AnimatedSection>

        {projects.length === 0 ? (
          <AnimatedSection>
            <p className="text-muted-foreground">No projects yet.</p>
          </AnimatedSection>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, i) => (
              <AnimatedSection
                key={project.id}
                delay={i * 0.08}
              >
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
