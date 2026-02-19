import { BlogCard } from "@/components/shared/blog-card"
import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/supabase/types"
import Link from "next/link"
import { HiOutlineArrowRight } from "react-icons/hi2"

export function LatestPostsSection({ posts }: { posts: BlogPost[] }) {
  return (
    <CodeSection
      id="writing"
      tag="aside"
      attrs={{ id: "writing" }}
    >
      <CodeHeading tag="h2">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Writing
            </h2>
            <p className="mt-1 text-sm text-code-comment">
              {"// latest from the blog"}
            </p>
          </div>
          <Button
            variant="link"
            asChild
            className="mb-1 hidden sm:inline-flex group"
          >
            <Link href="/blog">
              view all
              <HiOutlineArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-500" />
            </Link>
          </Button>
        </div>
      </CodeHeading>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground/60">
          {"// coming soon..."}
        </p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden group">
            <Button
              variant="link"
              asChild
            >
              <Link href="/blog">
                view all posts
                <HiOutlineArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </CodeSection>
  )
}
