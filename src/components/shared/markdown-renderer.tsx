import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
  content: string
  compact?: boolean
}

export function MarkdownRenderer({
  content,
  compact = false,
}: MarkdownRendererProps) {
  if (compact) {
    return (
      <div className="prose prose-neutral dark:prose-invert max-w-none text-sm prose-p:my-1 prose-p:leading-relaxed prose-headings:text-sm prose-headings:font-semibold prose-headings:my-1 prose-ul:my-1 prose-ul:pl-4 prose-ol:my-1 prose-ol:pl-4 prose-li:my-0 prose-li:leading-relaxed prose-strong:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-background/60 prose-code:px-1 prose-code:py-0.5 prose-code:text-xs prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-background/60 prose-pre:text-xs prose-pre:my-1 prose-pre:border prose-pre:border-border/50">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-muted prose-pre:border prose-pre:border-border/50 prose-img:rounded-lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
