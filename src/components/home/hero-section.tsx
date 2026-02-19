import { AnimatedSection } from "@/components/shared/animated-section"
import type { Profile } from "@/lib/supabase/types"
import { ArrowDown } from "lucide-react"

export function HeroSection({ profile }: { profile: Profile | null }) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedSection>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Full-Stack Developer
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {profile?.full_name ?? "Ronald Vergel Dela Cruz"}
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {profile?.headline ??
              "Building modern web experiences with clean code and thoughtful design."}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="mt-10">
            <a
              href="#about"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Learn more
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
