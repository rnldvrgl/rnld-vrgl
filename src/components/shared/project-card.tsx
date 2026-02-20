import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/supabase/types"
import Image from "next/image"
import Link from "next/link"
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2"
import { SiGithub } from "react-icons/si"

export function ProjectCard({ project }: { project: Project }) {
  const tags =
    project.project_tags
      ?.map((pt) => pt.tag)
      .filter((t): t is NonNullable<typeof t> => t != null) ?? []

  return (
    <Card className="group relative overflow-hidden border border-border/30 p-0">
      {/* Cover image with overlay */}
      {project.cover_image && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute right-3 top-3">
              <span className="rounded-md border border-code-keyword/30 bg-code-keyword/10 px-2 py-0.5 text-[10px] font-medium text-code-keyword backdrop-blur-sm">
                featured
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Title row with external links */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-code-keyword">
            {project.title}
          </h3>
          <div className="flex shrink-0 items-center gap-2">
            {project.github_url && (
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
              >
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source code"
                >
                  <SiGithub className="size-3.5" />
                </Link>
              </Button>
            )}
            {project.live_url && (
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
              >
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live site"
                >
                  <HiOutlineArrowTopRightOnSquare className="size-3.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="border-border/30 bg-secondary/30 text-[11px] text-muted-foreground transition-colors hover:border-code-keyword/30 hover:bg-code-keyword/10 hover:text-foreground"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
