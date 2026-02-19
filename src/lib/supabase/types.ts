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

export interface Skill {
  id: string
  name: string
  category: string
  icon_url: string | null
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
