import type { ReactNode } from "react"

/* ─── Server-safe code-tag components (no framer-motion) ──── */

interface CodeTagProps {
  children: ReactNode
  className?: string
}

/** Renders an HTML-style opening tag like `<section>` */
export function OpenTag({
  tag,
  attrs,
  className = "",
}: {
  tag: string
  attrs?: Record<string, string>
  className?: string
}) {
  return (
    <span
      className={`select-none text-sm leading-relaxed tracking-wide text-code-comment ${className}`}
      aria-hidden
    >
      <span className="text-code-tag">&lt;</span>
      <span className="text-code-keyword">{tag}</span>
      {attrs &&
        Object.entries(attrs).map(([key, value]) => (
          <span key={key}>
            {" "}
            <span className="text-code-attr">{key}</span>
            <span className="text-code-tag">=</span>
            <span className="text-code-string">&quot;{value}&quot;</span>
          </span>
        ))}
      <span className="text-code-tag">&gt;</span>
    </span>
  )
}

/** Renders an HTML-style closing tag like `</section>` */
export function CloseTag({
  tag,
  className = "",
}: {
  tag: string
  className?: string
}) {
  return (
    <span
      className={`select-none text-sm leading-relaxed tracking-wide text-code-comment ${className}`}
      aria-hidden
    >
      <span className="text-code-tag">&lt;/</span>
      <span className="text-code-keyword">{tag}</span>
      <span className="text-code-tag">&gt;</span>
    </span>
  )
}

/** Renders a self-closing tag like `<rnldvrgl />` */
export function SelfClosingTag({
  tag,
  className = "",
}: {
  tag: string
  className?: string
}) {
  return (
    <span
      className={`select-none text-sm leading-relaxed tracking-wide text-code-comment ${className}`}
      aria-hidden
    >
      <span className="text-code-tag">&lt;</span>
      <span className="text-code-keyword">{tag}</span>
      <span className="text-code-tag"> /&gt;</span>
    </span>
  )
}

/** Renders an HTML comment like `<!-- text -->` */
export function CodeComment({ children, className = "" }: CodeTagProps) {
  return (
    <span
      className={`select-none text-sm italic tracking-wide text-code-comment ${className}`}
      aria-hidden
    >
      {"<!-- "}
      {children}
      {" -->"}
    </span>
  )
}

/** Renders a DOCTYPE declaration like `<!DOCTYPE html>` */
export function DocType({ className = "" }: { className?: string }) {
  return (
    <span
      className={`select-none text-sm tracking-wide text-code-comment ${className}`}
      aria-hidden
    >
      <span className="text-code-tag">&lt;!</span>
      <span className="text-code-keyword">DOCTYPE</span>
      <span className="text-code-attr"> html</span>
      <span className="text-code-tag">&gt;</span>
    </span>
  )
}

/** A lighter inline code-block heading - used inside sections */
export function CodeHeading({
  tag,
  children,
  className = "",
}: {
  tag: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`mb-6 ${className}`}>
      <OpenTag
        tag={tag}
        className="block mb-1"
      />
      <div className="pl-4 md:pl-6">{children}</div>
      <CloseTag
        tag={tag}
        className="block mt-1"
      />
    </div>
  )
}
