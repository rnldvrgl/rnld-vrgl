import { AboutSection } from "@/components/home/about-section"
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section"
import { HeroSection } from "@/components/home/hero-section"
import { LatestPostsSection } from "@/components/home/latest-posts-section"
import { SkillsSection } from "@/components/home/skills-section"
import { Separator } from "@/components/ui/separator"
import { getBlogPosts, getProfile, getProjects, getSkills } from "@/lib/data"

export const revalidate = 60

export default async function HomePage() {
  const [profile, skills, featuredProjects, latestPosts] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects({ featured: true }),
    getBlogPosts({ limit: 3 }),
  ])

  return (
    <>
      <HeroSection profile={profile} />
      <Separator className="mx-auto max-w-5xl" />
      <AboutSection profile={profile} />
      <Separator className="mx-auto max-w-5xl" />
      <SkillsSection skills={skills} />
      <Separator className="mx-auto max-w-5xl" />
      <FeaturedProjectsSection projects={featuredProjects} />
      <Separator className="mx-auto max-w-5xl" />
      <LatestPostsSection posts={latestPosts} />
    </>
  )
}
