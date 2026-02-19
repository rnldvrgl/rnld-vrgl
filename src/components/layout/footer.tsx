export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ronald Vergel Dela Cruz
          </p>
          <p className="text-sm text-code-comment">
            <span className="text-code-tag">&lt;</span>
            <span className="text-code-keyword">rnldvrgl</span>
            <span className="text-code-tag"> /&gt;</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
