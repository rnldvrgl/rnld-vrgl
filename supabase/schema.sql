-- ============================================================
-- Portfolio Schema for rnld-vrgl
-- Run in Supabase SQL Editor (or via supabase db push)
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- -------------------------------------------------------
-- 1. profiles
-- -------------------------------------------------------
create table if not exists profiles (
  id          uuid primary key default uuid_generate_v4(),
  full_name   text        not null,
  headline    text        not null default '',
  bio         text        not null default '',
  avatar_url  text,
  resume_url  text,
  email       text        not null,
  github_url  text,
  linkedin_url text,
  twitter_url text,
  website_url text,
  location    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- -------------------------------------------------------
-- 2a. skill_categories (lookup table for consistent grouping)
-- -------------------------------------------------------
create table if not exists skill_categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text    not null unique,
  slug       text    not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------
-- 2b. skills
-- -------------------------------------------------------
create table if not exists skills (
  id          uuid primary key default uuid_generate_v4(),
  name        text    not null,
  category_id uuid    references skill_categories(id) on delete set null,
  icon_name   text,
  proficiency integer not null default 50 check (proficiency between 0 and 100),
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- -------------------------------------------------------
-- 3. tags  (shared between projects & blog posts)
-- -------------------------------------------------------
create table if not exists tags (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,
  slug       text not null unique,
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------
-- 4. projects
-- -------------------------------------------------------
create table if not exists projects (
  id          uuid primary key default uuid_generate_v4(),
  title       text    not null,
  slug        text    not null unique,
  description text    not null default '',
  content     text,
  cover_image text,
  live_url    text,
  github_url  text,
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- -------------------------------------------------------
-- 5. project_tags  (many-to-many)
-- -------------------------------------------------------
create table if not exists project_tags (
  id         uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  tag_id     uuid not null references tags(id) on delete cascade,
  unique (project_id, tag_id)
);

-- -------------------------------------------------------
-- 6. blog_posts
-- -------------------------------------------------------
create table if not exists blog_posts (
  id           uuid primary key default uuid_generate_v4(),
  title        text    not null,
  slug         text    not null unique,
  excerpt      text    not null default '',
  content      text    not null default '',
  cover_image  text,
  published    boolean     not null default false,
  published_at timestamptz,
  views        integer     not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- -------------------------------------------------------
-- 7. blog_tags  (many-to-many)
-- -------------------------------------------------------
create table if not exists blog_tags (
  id           uuid primary key default uuid_generate_v4(),
  blog_post_id uuid not null references blog_posts(id) on delete cascade,
  tag_id       uuid not null references tags(id) on delete cascade,
  unique (blog_post_id, tag_id)
);

-- -------------------------------------------------------
-- 8. experiences
-- -------------------------------------------------------
create table if not exists experiences (
  id          uuid primary key default uuid_generate_v4(),
  title       text    not null,
  company     text    not null,
  description text    not null default '',
  start_date  date    not null,
  end_date    date,
  type        text    not null default 'work' check (type in ('work', 'project', 'freelance')),
  link        text,
  featured    boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- -------------------------------------------------------
-- 8b. experience_skills  (many-to-many replacing tech_stack text[])
-- -------------------------------------------------------
create table if not exists experience_skills (
  id            uuid primary key default uuid_generate_v4(),
  experience_id uuid not null references experiences(id) on delete cascade,
  skill_id      uuid not null references skills(id) on delete cascade,
  unique (experience_id, skill_id)
);

-- -------------------------------------------------------
-- 9. certifications  (NEW — for future use)
-- -------------------------------------------------------
create table if not exists certifications (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  issuer          text not null,
  issue_date      date not null,
  expiry_date     date,
  credential_id   text,
  credential_url  text,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now()
);

-- -------------------------------------------------------
-- 10. education  (NEW — for future use)
-- -------------------------------------------------------
create table if not exists education (
  id          uuid primary key default uuid_generate_v4(),
  institution text not null,
  degree      text not null,
  field       text,
  start_date  date not null,
  end_date    date,
  description text default '',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- -------------------------------------------------------
-- RPC: increment_post_views  (used by blog detail page)
-- -------------------------------------------------------
create or replace function increment_post_views(post_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update blog_posts
  set views = views + 1
  where id = post_id;
end;
$$;

-- -------------------------------------------------------
-- Row Level Security (public read-only for portfolio)
-- -------------------------------------------------------
alter table profiles          enable row level security;
alter table skill_categories  enable row level security;
alter table skills            enable row level security;
alter table tags              enable row level security;
alter table projects          enable row level security;
alter table project_tags      enable row level security;
alter table blog_posts        enable row level security;
alter table blog_tags         enable row level security;
alter table experiences       enable row level security;
alter table experience_skills enable row level security;
alter table certifications    enable row level security;
alter table education         enable row level security;

-- Public read policies
create policy "Public read profiles"          on profiles          for select using (true);
create policy "Public read skill_categories"  on skill_categories  for select using (true);
create policy "Public read skills"            on skills            for select using (true);
create policy "Public read tags"              on tags              for select using (true);
create policy "Public read projects"          on projects          for select using (true);
create policy "Public read project_tags"      on project_tags      for select using (true);
create policy "Public read blog_posts"        on blog_posts        for select using (true);
create policy "Public read blog_tags"         on blog_tags         for select using (true);
create policy "Public read experiences"       on experiences       for select using (true);
create policy "Public read experience_skills" on experience_skills for select using (true);
create policy "Public read certifications"    on certifications    for select using (true);
create policy "Public read education"         on education         for select using (true);

-- -------------------------------------------------------
-- Updated-at triggers
-- -------------------------------------------------------
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on profiles   for each row execute function update_updated_at();
create trigger set_updated_at before update on projects   for each row execute function update_updated_at();
create trigger set_updated_at before update on blog_posts for each row execute function update_updated_at();
create trigger set_updated_at before update on experiences for each row execute function update_updated_at();
