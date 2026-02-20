import RnldvrglTag from "@/components/shared/rnldvrgl-tag"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40 py-8">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ronald Vergel Dela Cruz
          </p>
          <RnldvrglTag />
        </div>
      </div>
    </footer>
  )
}
