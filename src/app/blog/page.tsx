import { BlogCard } from "@/components/shared/blog-card"
import { CloseTag, OpenTag } from "@/components/shared/code-tags-shared"
import { getBlogPosts } from "@/lib/data"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my latest blog posts about web development, tutorials, and developer experiences.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <section className="px-6 pb-24 pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <OpenTag
            tag="section"
            attrs={{ id: "blog" }}
          />
        </div>
        <div className="pl-4 md:pl-8 mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="mt-1 text-sm text-code-comment">
            {"// thoughts, tutorials & dev notes"}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="pl-4 md:pl-8 text-muted-foreground">No posts yet.</p>
        ) : (
          <div className="pl-4 md:pl-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}

        <div className="mt-8">
          <CloseTag tag="section" />
        </div>
      </div>
    </section>
  )
}
