import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body as {
      name?: string
      email?: string
      subject?: string
      message?: string
    }

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      )
    }

    // Rudimentary email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      )
    }

    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      email: email.trim(),
      subject: (subject ?? "").trim(),
      message: message.trim(),
    })

    if (error) {
      console.error("Contact submission error:", error)
      return NextResponse.json(
        { error: "Something went wrong. Please try again later." },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    )
  }
}
