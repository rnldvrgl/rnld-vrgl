import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AiChatWidget } from "@/components/shared/ai-chat-widget"
import { CodeEditorBackground } from "@/components/shared/code-editor-background"
import { CustomCursor } from "@/components/shared/custom-cursor"
import { ScrollToTop } from "@/components/shared/scroll-to-top"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Ronald Vergel Dela Cruz | Full-Stack Web Developer",
    template: "%s | Ronald Vergel Dela Cruz",
  },
  description:
    "Full-stack developer specializing in modern web technologies. View my projects, blog posts, and more.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rnld-vrgl.vercel.app",
  ),
  openGraph: {
    title: "Ronald Vergel Dela Cruz | Full-Stack Web Developer",
    description:
      "Full-stack developer specializing in modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronald Vergel Dela Cruz | Full-Stack Developer",
    description:
      "Full-stack developer specializing in modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <ScrollToTop />
            <CustomCursor />
            <AiChatWidget />
            <CodeEditorBackground />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-30 -z-999" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
