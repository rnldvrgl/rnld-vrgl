import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeading } from "@/components/shared/section-heading"
import type { Profile } from "@/lib/supabase/types"

export function AboutSection({ profile }: { profile: Profile | null }) {
  if (!profile) return null

  return (
    <section
      id="about"
      className="py-24 px-6"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <SectionHeading
            title="About"
            subtitle="A bit about me and what I do."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
            <p>{profile.bio}</p>
            {profile.location && (
              <p className="text-sm">
                Based in{" "}
                <span className="text-foreground">{profile.location}</span>
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
