import Link from "next/link"

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Go home
      </Link>
    </section>
  )
}
