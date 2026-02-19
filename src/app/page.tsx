import { AboutSection } from "@/components/home/about-section"
import { CertificationsSection } from "@/components/home/certifications-section"
import { ContactSection } from "@/components/home/contact-section"
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section"
import { HeroSection } from "@/components/home/hero-section"
import { LatestPostsSection } from "@/components/home/latest-posts-section"
import { SkillsSection } from "@/components/home/skills-section"
import { WorkSection } from "@/components/home/work-section"
import { CloseTag } from "@/components/shared/code-tags-shared"
import {
  getBlogPosts,
  getCertifications,
  getExperiences,
  getProfile,
  getProjects,
  getSkills,
} from "@/lib/data"

export const revalidate = 60

export default async function HomePage() {
  const [
    profile,
    skills,
    allProjects,
    latestPosts,
    experiences,
    certifications,
  ] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
    getBlogPosts({ limit: 3 }),
    getExperiences(),
    getCertifications(),
  ])

  const featuredProjects = allProjects.filter((p) => p.featured)

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection
        profile={profile}
        experiences={experiences}
        projects={allProjects}
      />
      <SkillsSection skills={skills} />
      <WorkSection experiences={experiences} />
      <CertificationsSection certifications={certifications} />
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
