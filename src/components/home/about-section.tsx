import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  const techStack = new Set(
    experiences.flatMap(
      (e) =>
        e.experience_skills?.map((es) => es.skill?.name).filter(Boolean) ?? [],
    ),
  )

  const stats = [
    { label: "Years Experience", value: `${yearsOfExperience}+` },
    { label: "Projects Built", value: `${projectCount}+` },
    { label: "Technologies", value: `${techStack.size}+` },
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
            <div className="relative size-full min-h-80! overflow-hidden rounded-2xl border-2 border-border/60 shadow-lg shadow-background/50">
              <Image
                src={profile.avatar_url}
                alt={profile.full_name}
                fill
                className="object-cover"
                sizes="192px"
                priority
              />
              {/* Decorative code tag overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background/90 to-transparent px-3 pb-2 pt-6">
                <span className="text-[10px] text-code-tag">
                  &lt;<span className="text-code-keyword">img</span>{" "}
                  <span className="text-code-attr">alt</span>=
                  <span className="text-code-string">&quot;me&quot;</span> /&gt;
                </span>
              </div>
            </div>
          )}

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
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
              variant="outline"
              asChild
            >
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <HiOutlineDocumentArrowDown className="size-4" />
                Download Resume
              </a>
            </Button>
          )}
        </div>

        {/* Right column — Bio + Stats */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.bio}
            </p>
            {profile.location && (
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <HiOutlineMapPin className="size-3.5 text-code-keyword" />
                Based in{" "}
                <span className="text-foreground">{profile.location}</span>
              </p>
            )}
          </div>

          {/* Stats row */}
          <div className="grid md:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold tracking-tight text-code-keyword sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CodeSection>
  )
}
