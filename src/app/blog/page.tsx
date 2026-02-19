import { AnimatedSection } from "@/components/shared/animated-section"
import { BlogCard } from "@/components/shared/blog-card"
import { SectionHeading } from "@/components/shared/section-heading"
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
    <section className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading
            title="Blog"
            subtitle="Thoughts, tutorials, and dev notes."
          />
        </AnimatedSection>

        {posts.length === 0 ? (
          <AnimatedSection>
            <p className="text-muted-foreground">No posts yet.</p>
          </AnimatedSection>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <AnimatedSection
                key={post.id}
                delay={i * 0.08}
              >
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
