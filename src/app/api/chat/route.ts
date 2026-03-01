import { NextResponse, type NextRequest } from "next/server"

const SYSTEM_PROMPT = `You are a friendly AI assistant on Ronald Vergel Dela Cruz's portfolio website. You help visitors learn about Ronald's skills, projects, and experience. Keep responses concise, helpful, and professional. If asked about things unrelated to the portfolio or web development, politely redirect the conversation. You can answer general programming questions too.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages } = body as {
      messages?: { role: string; content: string }[]
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required." },
        { status: 400 },
      )
    }

    // Limit message history to prevent abuse
    const trimmedMessages = messages.slice(-10)

    const apiKey = process.env.AI_API_KEY
    const apiUrl =
      process.env.AI_API_URL ||
      "https://openrouter.ai/api/v1/chat/completions"
    const model =
      process.env.AI_MODEL || "mistralai/mistral-7b-instruct:free"

    if (!apiKey) {
      // Fallback: return a helpful static response when no API key is configured
      return NextResponse.json({
        message:
          "Hi! I'm currently in demo mode. Please configure an AI API key to enable full chat capabilities. In the meantime, feel free to explore the portfolio or use the contact form!",
      })
    }

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "https://rnld-vrgl.vercel.app",
        "X-Title": "Ronald Vergel Portfolio",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...trimmedMessages,
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      console.error("AI API error:", res.status, await res.text())
      return NextResponse.json({
        message:
          "I'm having trouble connecting right now. Please try again in a moment!",
      })
    }

    const data = await res.json()
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response. Please try again!"

    return NextResponse.json({ message: reply })
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}
