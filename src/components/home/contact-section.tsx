import {
  CloseTag,
  CodeHeading,
  CodeSection,
  OpenTag,
} from "@/components/shared/code-tags"
import type { Profile } from "@/lib/supabase/types"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export function ContactSection({ profile }: { profile: Profile | null }) {
  const links = [
    {
      href: `mailto:${profile?.email ?? "delacruz.ronaldvergel@gmail.com"}`,
      icon: Mail,
      label: "Email",
      value: profile?.email ?? "delacruz.ronaldvergel@gmail.com",
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
      label: "Twitter / X",
      value: "@rnldvrgl",
    },
  ]

  return (
    <CodeSection
      id="contact"
      tag="section"
      attrs={{ id: "contact" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// have a project in mind? let's talk."}
        </p>
      </CodeHeading>

      <div className="max-w-2xl">
        <OpenTag
          tag="ul"
          attrs={{ class: "links" }}
        />
        <div className="mt-4 mb-4 flex flex-col gap-3 pl-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group flex items-center gap-4 rounded-lg border border-border/30 bg-card/40 px-5 py-4 transition-all duration-300 hover:border-code-keyword/40 hover:bg-card/60"
            >
              <link.icon className="h-4 w-4 text-code-keyword transition-colors group-hover:text-code-function" />
              <div className="flex flex-col">
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/60">
                  {link.label}
                </span>
                <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  {link.value}
                </span>
              </div>
            </a>
          ))}
        </div>
        <CloseTag tag="ul" />
      </div>
    </CodeSection>
  )
}
