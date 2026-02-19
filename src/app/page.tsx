import { AboutSection } from "@/components/home/about-section"
import { ContactSection } from "@/components/home/contact-section"
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section"
import { HeroSection } from "@/components/home/hero-section"
import { LatestPostsSection } from "@/components/home/latest-posts-section"
import { SkillsSection } from "@/components/home/skills-section"
import { WorkSection } from "@/components/home/work-section"
import { CloseTag } from "@/components/shared/code-tags-shared"
import {
  getBlogPosts,
  getExperiences,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/data"

export const revalidate = 60

export default async function HomePage() {
  const [profile, skills, featuredProjects, latestPosts, experiences] =
    await Promise.all([
      getProfile(),
      getSkills(),
      getProjects({ featured: true }),
      getBlogPosts({ limit: 3 }),
      getExperiences(),
    ])

  return (
    <>
      {/* Document open */}
      <div className="mx-auto max-w-5xl px-6 pt-20">
        <span className="text-xs text-code-comment select-none" aria-hidden>
          {"<!DOCTYPE html>"}
        </span>
      </div>

      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <WorkSection experiences={experiences} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <LatestPostsSection posts={latestPosts} />
      <ContactSection profile={profile} />

      {/* Document close */}
      <div className="mx-auto max-w-5xl px-6 pb-12">
        <CloseTag tag="html" />
      </div>
    </>
  )
}
