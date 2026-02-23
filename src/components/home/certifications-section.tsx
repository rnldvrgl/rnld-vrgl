"use client"

import { CodeHeading, CodeSection } from "@/components/shared/code-tags"
import { useTime } from "@/lib/hooks/useTime"
import type { Certification } from "@/lib/supabase/types"
import { motion } from "framer-motion"
import {
  HiOutlineAcademicCap,
  HiOutlineArrowUpRight,
  HiOutlineCheckBadge,
  HiOutlineClock,
} from "react-icons/hi2"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
}

/* ── Individual certification card ─────────────── */
function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const now = useTime()
  const isExpired = cert.expiry_date && new Date(cert.expiry_date) < now
  const isActive = !isExpired && cert.expiry_date

  // How far through the cert's validity period we are
  const validityProgress = (() => {
    if (!cert.expiry_date) return null
    const start = new Date(cert.issue_date).getTime()
    const end = new Date(cert.expiry_date).getTime()
    const nowTimestamp = now.getTime()
    return Math.min(1, Math.max(0, (nowTimestamp - start) / (end - start)))
  })()

  const cardBorder = isExpired
    ? "border-destructive/30"
    : isActive
      ? "border-emerald-500/30"
      : "border-code-keyword/20"

  const hoverBorder = isExpired
    ? "hover:border-destructive/50"
    : isActive
      ? "hover:border-emerald-500/50"
      : "hover:border-code-keyword/40"

  const accentBar = isExpired
    ? "bg-linear-to-b from-destructive/70 via-destructive/50 to-destructive/20"
    : isActive
      ? "bg-linear-to-b from-emerald-500/70 via-emerald-500/50 to-emerald-500/20"
      : "bg-linear-to-b from-code-keyword/70 via-code-keyword/50 to-code-keyword/20"

  const badgeBg = isExpired
    ? "bg-linear-to-br from-destructive/20 to-destructive/5"
    : isActive
      ? "bg-linear-to-br from-emerald-500/20 to-emerald-500/5"
      : "bg-linear-to-br from-code-keyword/20 to-code-keyword/5"

  const badgeBorder = isExpired
    ? "border-destructive/20"
    : isActive
      ? "border-emerald-500/20"
      : "border-code-keyword/20"

  const badgeText = isExpired
    ? "text-destructive"
    : isActive
      ? "text-emerald-500"
      : "text-code-keyword"

  const glowShadow = isExpired
    ? "group-hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]"
    : isActive
      ? "group-hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]"
      : "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)]"

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-50px", once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group h-full"
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border ${cardBorder} ${hoverBorder} bg-card/50 backdrop-blur-md transition-all duration-300 ${glowShadow} hover:scale-[1.02] hover:bg-card/60 dark:bg-card/20 dark:hover:bg-card/30`}
      >
        {/* Accent glow bar */}
        <div className={`absolute inset-y-0 left-0 w-1 ${accentBar}`} />

        {/* Shimmer effect on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        <div className="relative p-6 pl-7">
          <div className="flex items-start gap-5">
            {/* Badge icon */}
            <div className="relative shrink-0">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`flex size-14 items-center justify-center rounded-xl border-2 ${badgeBorder} ${badgeBg} ${badgeText} shadow-lg backdrop-blur-sm`}
              >
                <HiOutlineCheckBadge className="size-7" />
              </motion.div>
            </div>

            <div className="min-w-0 flex-1 space-y-3">
              {/* Header: Name + Status */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold leading-tight tracking-tight text-foreground">
                  {cert.name}
                </h3>
                {(isExpired || isActive) && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xxs font-semibold uppercase tracking-wider ${
                      isExpired
                        ? "bg-destructive/15 text-destructive border border-destructive/20"
                        : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20"
                    }`}
                  >
                    {isExpired ? (
                      <>
                        <HiOutlineClock className="size-3" />
                        Expired
                      </>
                    ) : (
                      <>
                        <motion.span
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="size-1.5 rounded-full bg-emerald-500"
                        />
                        Active
                      </>
                    )}
                  </motion.span>
                )}
              </div>

              {/* Issuer */}
              <p className="flex items-center gap-2 text-sm text-muted-foreground/80">
                <HiOutlineAcademicCap className="size-4 shrink-0 text-code-attr" />
                {cert.issuer}
              </p>

              {/* Validity timeline (if expiry exists) */}
              {validityProgress !== null && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xxs text-muted-foreground/60">
                    <span className="font-medium">
                      {formatDate(cert.issue_date)}
                    </span>
                    <span className="font-medium">
                      {formatDate(cert.expiry_date!)}
                    </span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-border/30 dark:bg-border/20">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${validityProgress * 100}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: index * 0.1 + 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`h-full rounded-full ${
                        isExpired
                          ? "bg-destructive/70"
                          : "bg-linear-to-r from-emerald-500/60 via-emerald-500 to-emerald-400"
                      }`}
                    />
                  </div>
                </div>
              )}

              {/* No expiry — just issue date */}
              {validityProgress === null && (
                <p className="text-xxs text-muted-foreground/60">
                  Issued{" "}
                  <span className="font-medium">
                    {formatDate(cert.issue_date)}
                  </span>
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                {cert.credential_id && (
                  <span className="font-mono text-xxs text-muted-foreground/40">
                    #{cert.credential_id.slice(0, 8)}
                  </span>
                )}
                {cert.credential_url && (
                  <motion.a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/30 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground/70 transition-all hover:border-code-keyword/40 hover:text-foreground hover:shadow-sm dark:bg-background/30"
                  >
                    Verify
                    <HiOutlineArrowUpRight className="size-3.5" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Section ───────────────────────────────────── */
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

  // Summary counts
  const activeCount = certifications.filter(
    (c) => c.expiry_date && new Date(c.expiry_date) >= new Date(),
  ).length

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
          {activeCount > 0 && (
            <span className="ml-2 text-emerald-500">
              — {activeCount} active
            </span>
          )}
        </p>
      </CodeHeading>

      <div className="grid gap-5 sm:grid-cols-2 sm:items-stretch">
        {certifications.map((cert, i) => (
          <CertCard
            key={cert.id}
            cert={cert}
            index={i}
          />
        ))}
      </div>
    </CodeSection>
  )
}
