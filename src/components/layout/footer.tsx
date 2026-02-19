export function Footer() {
  return (
    <footer className="border-t border-border/40 py-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ronald Vergel Dela Cruz. All
            rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">&lt;rnldvrgl /&gt; </p>
        </div>
      </div>
    </footer>
  )
}
