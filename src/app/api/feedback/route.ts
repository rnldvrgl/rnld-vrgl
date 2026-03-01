import { createSupabaseServerClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, stars, comment } = body as {
      name?: string
      stars?: number
      comment?: string
    }

    // Validate comment
    if (!comment?.trim()) {
      return NextResponse.json(
        { error: "A comment is required." },
        { status: 400 },
      )
    }

    // Validate stars
    const starsNum = Number(stars)
    if (!Number.isInteger(starsNum) || starsNum < 1 || starsNum > 5) {
      return NextResponse.json(
        { error: "Please select a rating between 1 and 5 stars." },
        { status: 400 },
      )
    }

    if (comment.trim().length > 500) {
      return NextResponse.json(
        { error: "Comment must be 500 characters or less." },
        { status: 400 },
      )
    }

    const supabase = await createSupabaseServerClient()

    const { error } = await supabase.from("feedbacks").insert({
      name: name?.trim() || null,
      stars: starsNum,
      comment: comment.trim(),
    })

    if (error) {
      console.error("Feedback submission error:", error)
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
