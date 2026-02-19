import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/format"
import type { BlogPost } from "@/lib/supabase/types"
import Image from "next/image"
import Link from "next/link"
import { HiOutlineCalendarDays, HiOutlineEye } from "react-icons/hi2"

export function BlogCard({ post }: { post: BlogPost }) {
  const tags =
    post.blog_tags
      ?.map((bt) => bt.tag)
      .filter((t): t is NonNullable<typeof t> => t != null) ?? []

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <article className="overflow-hidden rounded-lg border border-border/50 bg-card transition-colors hover:border-border">
        {post.cover_image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="space-y-3 p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {post.published_at && (
              <span className="inline-flex items-center gap-1">
                <HiOutlineCalendarDays className="size-3" />
                {formatDate(post.published_at)}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <HiOutlineEye className="size-3" />
              {post.views} views
            </span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary/80 transition-colors">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
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
        </div>
      </article>
    </Link>
  )
}
