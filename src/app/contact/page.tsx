import { AnimatedSection } from "@/components/shared/animated-section"
import { SectionHeading } from "@/components/shared/section-heading"
import { getProfile } from "@/lib/data"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — let's work together.",
}

const socialLinkClass =
  "group flex items-center gap-4 rounded-lg border border-border/30 bg-card/20 px-6 py-5 transition-all duration-300 hover:border-border/60 hover:bg-card/40"

export default async function ContactPage() {
  const profile = await getProfile()

  const links = [
    {
      href: `mailto:${profile?.email ?? "hello@rnldvrgl.dev"}`,
      icon: Mail,
      label: "Email",
      value: profile?.email ?? "hello@rnldvrgl.dev",
    },
    {
      href: profile?.github_url ?? "https://github.com/rnldvrgl",
      icon: Github,
      label: "GitHub",
      value: "github.com/rnldvrgl",
    },
    {
      href: profile?.linkedin_url ?? "https://linkedin.com/in/rnldvrgl",
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rnldvrgl",
    },
    {
      href: profile?.twitter_url ?? "https://twitter.com/rnldvrgl",
      icon: Twitter,
      label: "Twitter",
      value: "@rnldvrgl",
    },
  ]

  return (
    <section className="px-6 pb-24 pt-32">
      <div className="mx-auto max-w-2xl">
        <AnimatedSection>
          <SectionHeading
            title="Contact"
            subtitle="Have a project in mind? Let's talk."
          />
        </AnimatedSection>

        <div className="flex flex-col gap-3">
          {links.map((link, i) => (
            <AnimatedSection
              key={link.label}
              delay={i * 0.08}
            >
              <a
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className={socialLinkClass}
              >
                <link.icon className="h-4 w-4 text-muted-foreground/60 transition-colors group-hover:text-foreground" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
                    {link.label}
                  </span>
                  <span className="text-sm text-muted-foreground/80 transition-colors group-hover:text-foreground">
                    {link.value}
                  </span>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
