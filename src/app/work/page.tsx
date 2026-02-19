import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeading } from "@/components/shared/section-heading"
import { WorkTimeline } from "@/components/work/work-timeline"
import { getExperiences } from "@/lib/data"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Work",
  description:
    "My professional journey — work experience, projects, and freelance work.",
}

export default async function WorkPage() {
  const experiences = await getExperiences()

  return (
    <section className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading
            title="Work"
            subtitle="A timeline of my professional journey."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <WorkTimeline experiences={experiences} />
        </AnimatedSection>
      </div>
    </section>
  )
}
