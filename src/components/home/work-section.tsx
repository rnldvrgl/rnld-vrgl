import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { WorkTimeline } from "@/components/work/work-timeline"
import type { Experience } from "@/lib/supabase/types"

export function WorkSection({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) return null

  return (
    <CodeSection
      id="work"
      tag="section"
      attrs={{ id: "work" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Work</h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// my professional journey"}
        </p>
      </CodeHeading>

      <WorkTimeline experiences={experiences} />
    </CodeSection>
  )
}
