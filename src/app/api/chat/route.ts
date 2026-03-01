import { getExperiences, getProfile, getProjects, getSkills } from "@/lib/data"
import { NextResponse, type NextRequest } from "next/server"

// Ordered list of free fallback models — tried in sequence on 429 / 503
const FALLBACK_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "arcee-ai/trinity-mini:free",
]

async function buildSystemPrompt(): Promise<string> {
  const [profile, projects, skills, experiences] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getExperiences(),
  ])

  const profileSection = profile
    ? `## About ${profile.full_name}
${profile.bio}
Location: ${profile.location ?? "N/A"}
Email: ${profile.email}
GitHub: ${profile.github_url ?? "N/A"}
LinkedIn: ${profile.linkedin_url ?? "N/A"}`
    : ""

  const projectsSection =
    projects.length > 0
      ? `## Projects
${projects
  .map(
    (p) =>
      `- **${p.title}**: ${p.description}${p.tags?.length ? ` [${p.tags.join(", ")}]` : ""}${p.live_url ? ` | Live: ${p.live_url}` : ""}${p.github_url ? ` | GitHub: ${p.github_url}` : ""}`,
  )
  .join("\n")}`
      : ""

  const skillsSection =
    skills.length > 0
      ? `## Skills\n${skills.map((s) => s.name).join(", ")}`
      : ""

  const expSection =
    experiences.length > 0
      ? `## Experience
${experiences
  .map(
    (e) =>
      `- **${e.title}** at ${e.company} (${e.start_date} – ${e.end_date ?? "Present"}): ${e.description ?? ""}`,
  )
  .join("\n")}`
      : ""

  return `You are a friendly AI assistant on ${profile?.full_name ?? "Ronald Vergel Dela Cruz"}'s portfolio website. Answer questions about the portfolio owner using ONLY the information provided below. Do NOT invent, assume, or hallucinate any projects, skills, or experience that are not listed here. If you don't have enough information to answer a question, say so honestly and suggest the visitor use the contact form.

${profileSection}

${projectsSection}

${skillsSection}

${expSection}

Keep responses concise, helpful, and professional. You can also answer general programming questions.`
}

async function callModel(
  apiUrl: string,
  apiKey: string,
  model: string,
  systemPrompt: string,
  messages: { role: string; content: string }[],
): Promise<{ ok: boolean; status: number; data?: unknown; raw?: string }> {
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
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: 300,
      temperature: 0.7,
    }),
  })

  if (!res.ok) {
    const raw = await res.text().catch(() => "")
    return { ok: false, status: res.status, raw }
  }

  const data = await res.json()
  return { ok: true, status: res.status, data }
}

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
      process.env.AI_API_URL || "https://openrouter.ai/api/v1/chat/completions"
    const primaryModel =
      process.env.AI_MODEL || "meta-llama/llama-3.3-70b-instruct:free"

    if (!apiKey) {
      return NextResponse.json({
        message:
          "Hi! I'm currently in demo mode. Please configure an AI API key to enable full chat capabilities. In the meantime, feel free to explore the portfolio or use the contact form!",
      })
    }

    // Build a grounded system prompt from real Supabase data
    const systemPrompt = await buildSystemPrompt()

    // Build the model queue: primary first, then fallbacks (deduped)
    const modelQueue = [
      primaryModel,
      ...FALLBACK_MODELS.filter((m) => m !== primaryModel),
    ]

    let lastStatus = 500
    let lastRaw = ""

    for (const model of modelQueue) {
      const result = await callModel(
        apiUrl,
        apiKey,
        model,
        systemPrompt,
        trimmedMessages,
      )

      if (result.ok) {
        const data = result.data as {
          choices?: { message?: { content?: string } }[]
        }
        const reply =
          data.choices?.[0]?.message?.content ||
          "Sorry, I couldn't generate a response. Please try again!"
        return NextResponse.json({ message: reply })
      }

      lastStatus = result.status
      lastRaw = result.raw ?? ""
      console.error(`AI model "${model}" failed (${result.status}):`, lastRaw)

      // Only retry on rate-limit or temporary upstream errors
      const isRetryable = result.status === 429 || result.status === 503
      if (!isRetryable) break
    }

    // All models failed (or non-retryable error)
    const isAuthError = lastStatus === 401 || lastStatus === 403
    return NextResponse.json({
      message: isAuthError
        ? "AI is not configured correctly — invalid or missing API key. Check the AI_API_KEY environment variable."
        : `AI service returned an error (${lastStatus}). Please try again in a moment.`,
      debug:
        process.env.NODE_ENV === "development"
          ? { error: JSON.parse(lastRaw || "{}"), user_id: "" }
          : undefined,
    })
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }
}
