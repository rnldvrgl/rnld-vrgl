import { createSupabaseServerClient } from "@/lib/supabase/server"
import type {
  BlogPost,
  Certification,
  Experience,
  ExperienceType,
  Profile,
  Project,
  Skill,
} from "@/lib/supabase/types"

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase.from("profiles").select("*").single()
  return data
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from("skills")
    .select("*, category:skill_categories(*)")
    .order("sort_order", { ascending: true })
  return data ?? []
}

export async function getProjects(
  options: { featured?: boolean } = {},
): Promise<Project[]> {
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from("projects")
    .select(`*, project_images(*)`)
    .order("sort_order", { ascending: true })

  if (options.featured) {
    query = query.eq("featured", true)
  }

  const { data } = await query
  return data ?? []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("slug", slug)
    .single()
  return data
}

export async function getBlogPosts(
  options: { limit?: number } = {},
): Promise<BlogPost[]> {
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from("blog_posts")
    .select("*, blog_tags(*, tag:tags(*))")
    .eq("published", true)
    .order("published_at", { ascending: false })

  if (options.limit) {
    query = query.limit(options.limit)
  }

  const { data } = await query
  return data ?? []
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from("blog_posts")
    .select("*, blog_tags(*, tag:tags(*))")
    .eq("slug", slug)
    .eq("published", true)
    .single()
  return data
}

export async function incrementPostViews(postId: string): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.rpc("increment_post_views", { post_id: postId })
}

export async function getExperiences(
  options: { type?: ExperienceType; featured?: boolean } = {},
): Promise<Experience[]> {
  const supabase = await createSupabaseServerClient()
  let query = supabase
    .from("experiences")
    .select("*, experience_skills(*, skill:skills(*))")
    .order("start_date", { ascending: false })

  if (options.type) {
    query = query.eq("type", options.type)
  }

  if (options.featured) {
    query = query.eq("featured", true)
  }

  const { data } = await query
  return data ?? []
}

export async function getCertifications(): Promise<Certification[]> {
  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true })
  return data ?? []
}
