import { AnimatedSection } from "@/components/shared/animated-section"
import { BlogCard } from "@/components/shared/blog-card"
import { SectionHeading } from "@/components/shared/section-heading"
import type { BlogPost } from "@/lib/supabase/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function LatestPostsSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <div className="flex items-end justify-between">
            <SectionHeading
              title="Latest Posts"
              subtitle="Thoughts, tutorials, and dev notes."
            />
            <Link
              href="/blog"
              className="mb-12 hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <AnimatedSection
              key={post.id}
              delay={i * 0.1}
            >
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all posts
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
