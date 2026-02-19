import { BlogCard } from "@/components/shared/blog-card"
import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import type { BlogPost } from "@/lib/supabase/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function LatestPostsSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <CodeSection
      id="blog"
      tag="section"
      attrs={{ id: "blog" }}
    >
      <CodeHeading tag="h2">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Latest Posts
            </h2>
            <p className="mt-1 text-sm text-code-comment">
              {"// thoughts, tutorials & dev notes"}
            </p>
          </div>
          <Link
            href="/blog"
            className="mb-1 hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            view all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CodeHeading>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
          />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          view all posts
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </CodeSection>
  )
}
