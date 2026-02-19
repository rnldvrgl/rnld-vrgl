export interface Profile {
  id: string
  full_name: string
  headline: string
  bio: string
  avatar_url: string | null
  resume_url: string | null
  email: string
  github_url: string | null
  linkedin_url: string | null
  twitter_url: string | null
  website_url: string | null
  location: string | null
  created_at: string
  updated_at: string
}

export interface SkillCategory {
  id: string
  name: string
  slug: string
  sort_order: number
  created_at: string
}

export interface Skill {
  id: string
  name: string
  category_id: string | null
  category?: SkillCategory
  icon_name: string | null
  proficiency: number
  sort_order: number
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string | null
  cover_image: string | null
  live_url: string | null
  github_url: string | null
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
  project_tags?: ProjectTag[]
}

export interface ProjectTag {
  id: string
  project_id: string
  tag_id: string
  tag?: Tag
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string | null
  published: boolean
  published_at: string | null
  views: number
  created_at: string
  updated_at: string
  blog_tags?: BlogTag[]
}

export interface BlogTag {
  id: string
  blog_post_id: string
  tag_id: string
  tag?: Tag
}

export type ExperienceType = "work" | "project" | "freelance"

export interface ExperienceSkill {
  id: string
  experience_id: string
  skill_id: string
  skill?: Skill
}

export interface Experience {
  id: string
  title: string
  company: string
  description: string
  start_date: string
  end_date: string | null
  type: ExperienceType
  link: string | null
  featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
  experience_skills?: ExperienceSkill[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issue_date: string
  expiry_date: string | null
  credential_id: string | null
  credential_url: string | null
  sort_order: number
  created_at: string
}
