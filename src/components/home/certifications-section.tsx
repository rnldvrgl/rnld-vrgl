import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { Card, CardContent } from "@/components/ui/card"
import type { Certification } from "@/lib/supabase/types"
import {
  HiOutlineAcademicCap,
  HiOutlineArrowUpRight,
  HiOutlineShieldCheck,
} from "react-icons/hi2"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

export function CertificationsSection({
  certifications,
}: {
  certifications: Certification[]
}) {
  if (certifications.length === 0)
    return (
      <CodeSection
        id="certifications"
        tag="section"
        attrs={{ id: "certifications" }}
      >
        <CodeHeading tag="h2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Certifications
          </h2>
          <p className="mt-1 text-sm text-code-comment">
            {"// credentials & qualifications"}
          </p>
        </CodeHeading>
        <p className="text-sm text-muted-foreground/60">
          {"// coming soon..."}
        </p>
      </CodeSection>
    )

  return (
    <CodeSection
      id="certifications"
      tag="section"
      attrs={{ id: "certifications" }}
    >
      <CodeHeading tag="h2">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Certifications
        </h2>
        <p className="mt-1 text-sm text-code-comment">
          {"// credentials & qualifications"}
        </p>
      </CodeHeading>

      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => {
          const isExpired =
            cert.expiry_date && new Date(cert.expiry_date) < new Date()

          return (
            <Card
              key={cert.id}
              className="group relative "
            >
              <CardContent className="flex gap-4">
                {/* Icon */}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background/50 text-code-keyword transition-colors group-hover:border-code-keyword/40 group-hover:bg-code-keyword/10">
                  <HiOutlineShieldCheck className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  {/* Name */}
                  <h3 className="text-sm font-semibold leading-tight tracking-tight text-foreground">
                    {cert.name}
                  </h3>

                  {/* Issuer */}
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground/70">
                    <HiOutlineAcademicCap className="size-3 shrink-0" />
                    {cert.issuer}
                  </p>

                  {/* Dates */}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground/50">
                      {formatDate(cert.issue_date)}
                      {cert.expiry_date && ` — ${formatDate(cert.expiry_date)}`}
                    </span>
                    {isExpired && (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-destructive">
                        Expired
                      </span>
                    )}
                    {!isExpired && cert.expiry_date && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-emerald-500">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Credential link */}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 transition-colors hover:text-foreground"
                    >
                      Verify credential
                      <HiOutlineArrowUpRight className="size-3" />
                    </a>
                  )}

                  {/* Credential ID */}
                  {cert.credential_id && !cert.credential_url && (
                    <p className="mt-3 font-mono text-[10px] text-muted-foreground/40">
                      ID: {cert.credential_id}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </CodeSection>
  )
}
