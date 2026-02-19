import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import type { Profile } from "@/lib/supabase/types"
import { MapPin } from "lucide-react"

export function AboutSection({ profile }: { profile: Profile | null }) {
  if (!profile) return null

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

      <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
        <p className="text-base sm:text-lg">{profile.bio}</p>
        {profile.location && (
          <p className="inline-flex items-center gap-2 text-sm">
            <MapPin className="h-3.5 w-3.5 text-code-keyword" />
            <span>
              Based in{" "}
              <span className="text-foreground">{profile.location}</span>
            </span>
          </p>
        )}
      </div>
    </CodeSection>
  )
}
