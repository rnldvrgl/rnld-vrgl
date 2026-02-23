import { CountUpStats, type StatItem } from "@/components/home/count-up-stats"
import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { Button } from "@/components/ui/button"
import type { Experience, Profile, Project } from "@/lib/supabase/types"
import Image from "next/image"
import {
  HiOutlineDocumentArrowDown,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2"
import { SiGithub, SiLinkedin, SiX } from "react-icons/si"

interface AboutSectionProps {
  profile: Profile | null
  experiences: Experience[]
  projects: Project[]
}

export function AboutSection({
  profile,
  experiences,
  projects,
}: AboutSectionProps) {
  if (!profile)
    return (
      <CodeSection
        id="about"
        tag="section"
        attrs={{ id: "about" }}
      >
        <CodeHeading tag="h2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About me
          </h2>
          <p className="mt-1 text-sm text-code-comment">
            {"// a bit about who I am"}
          </p>
        </CodeHeading>
        <p className="text-sm text-muted-foreground/60">
          {"// coming soon..."}
        </p>
      </CodeSection>
    )

  // Compute stats from real data
  const yearsOfExperience =
    experiences.length > 0
      ? (() => {
          const earliest = experiences.reduce(
            (min, exp) => (exp.start_date < min ? exp.start_date : min),
            experiences[0].start_date,
          )
          return Math.max(
            1,
            new Date().getFullYear() - new Date(earliest).getFullYear(),
          )
        })()
      : 0
  const projectCount = projects.length

  const stats: StatItem[] = [
    {
      label: "Years Experience",
      value: yearsOfExperience,
      suffix: "+",
      icon: "experience",
    },
    {
      label: "Projects Built",
      value: projectCount,
      suffix: "+",
      icon: "projects",
    },
  ]

  const socials = [
    { href: profile.github_url, icon: SiGithub, label: "GitHub" },
    { href: profile.linkedin_url, icon: SiLinkedin, label: "LinkedIn" },
    { href: profile.twitter_url, icon: SiX, label: "X" },
    {
      href: `mailto:${profile.email}`,
      icon: HiOutlineEnvelope,
      label: "Email",
    },
  ].filter((s) => s.href)

  return (
    <CodeSection
      id="about"
      tag="section"
      attrs={{ id: "about" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About me
        </h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// a bit about who I am"}
        </p>
      </CodeHeading>

      <div className="grid gap-10 md:grid-cols-[280px_1fr]">
        {/* Left column — Avatar + Socials */}
        <div className="flex flex-col items-center gap-6 lg:items-start">
          {profile.avatar_url && (
            <div className="group/avatar relative mx-auto aspect-3/4 w-full max-w-70 overflow-hidden rounded-2xl border border-border/40 shadow-lg shadow-black/5 dark:border-border/30 dark:shadow-black/20 md:mx-0">
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="object-cover object-[center_20%]"
                sizes="280px"
                priority
              />
              {/* Bottom gradient — dark only for code overlay readability */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/60 to-transparent" />
              {/* Decorative code tag overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-3 pb-2">
                <span className="text-xs text-white/80 bg-background/50 px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                  &lt;<span className="text-code-keyword">img</span>{" "}
                  <span className="text-code-attr">alt</span>=
                  <span className="text-code-string">&quot;me&quot;</span> /&gt;
                </span>
              </div>
            </div>
          )}

          {/* Social links — Apple frosted pill */}
          <div className="flex items-center justify-around gap-1 w-full rounded-full border border-border/40 bg-card/50 p-1 backdrop-blur-sm dark:border-border/20 dark:bg-card/30">
            {socials.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                className="rounded-full"
                asChild
              >
                <a
                  href={social.href!}
                  target={
                    social.href!.startsWith("mailto") ? undefined : "_blank"
                  }
                  rel={
                    social.href!.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={social.label}
                >
                  <social.icon className="size-4" />
                </a>
              </Button>
            ))}
          </div>

          {/* Resume button */}
          {profile.resume_url && (
            <Button
              className="w-full rounded-xl group"
              asChild
            >
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HiOutlineDocumentArrowDown className="size-4 group-hover:animate-bounce transition-all duration-100" />
                Download Resume
              </a>
            </Button>
          )}
        </div>

        {/* Right column — Bio + Stats */}
        <div className="space-y-8">
          {/* Bio in Apple frosted glass card */}
          <div className="rounded-xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm dark:border-border/20 dark:bg-card/15">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.bio}
            </p>
            {profile.location && (
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <HiOutlineMapPin className="size-3.5 text-code-keyword" />
                Based in{" "}
                <span className="text-foreground">{profile.location}</span>
              </p>
            )}
          </div>

          {/* Stats row with count-up animation */}
          <CountUpStats stats={stats} />
        </div>
      </div>
    </CodeSection>
  )
}
