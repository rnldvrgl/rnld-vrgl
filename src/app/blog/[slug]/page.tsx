import { AnimatedSection } from "@/components/shared/animated-section"
import { MarkdownRenderer } from "@/components/shared/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getBlogPostBySlug, getBlogPosts, incrementPostViews } from "@/lib/data"
import { formatDate } from "@/lib/format"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  HiOutlineArrowLeft,
  HiOutlineCalendarDays,
  HiOutlineEye,
} from "react-icons/hi2"

export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image
        ? [
            {
              url: post.cover_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts.map((post) => ({ slug: post.slug }))
  } catch {
    // During build, cookies() is unavailable — return empty to skip SSG
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Increment views — safe for ISR: runs at build/revalidation time on the server
  await incrementPostViews(post.id)

  const tags =
    post.blog_tags
      ?.map((bt) => bt.tag)
      .filter((t): t is NonNullable<typeof t> => t != null) ?? []

  return (
    <article className="px-6 pb-24 pt-24">
      <div className="mx-auto max-w-3xl">
        <AnimatedSection>
          <Button
            variant="link"
            size="sm"
            asChild
            className="mb-8 p-0 text-muted-foreground"
          >
            <Link href="/blog">
              <HiOutlineArrowLeft className="size-3.5" />
              Back to blog
            </Link>
          </Button>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <header className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {post.published_at && (
                <span className="inline-flex items-center gap-1">
                  <HiOutlineCalendarDays className="size-3.5" />
                  {formatDate(post.published_at)}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <HiOutlineEye className="size-3.5" />
                {post.views} views
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground">{post.excerpt}</p>

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
          </header>
        </AnimatedSection>

        {post.cover_image && (
          <AnimatedSection delay={0.2}>
            <div className="relative mt-8 aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </AnimatedSection>
        )}

        <AnimatedSection delay={0.3}>
          <Separator className="my-10" />
          <MarkdownRenderer content={post.content} />
        </AnimatedSection>
      </div>
    </article>
  )
}
