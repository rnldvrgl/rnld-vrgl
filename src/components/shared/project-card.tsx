import { Badge } from "@/components/ui/badge"
import type { Project } from "@/lib/supabase/types"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ProjectCard({ project }: { project: Project }) {
  const tags =
    project.project_tags
      ?.map((pt) => pt.tag)
      .filter((t): t is NonNullable<typeof t> => t != null) ?? []

  return (
    <div className="group overflow-hidden rounded-lg border border-border/50 bg-card transition-colors hover:border-border">
      {project.cover_image && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="space-y-3 p-5">
        <h3 className="text-lg font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-xs"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 pt-1">
          {project.live_url && (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </Link>
          )}
          {project.github_url && (
            <Link
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
