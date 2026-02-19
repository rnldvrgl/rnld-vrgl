-- ============================================================
-- Seed data & Supabase Storage setup for rnld-vrgl
-- Run in Supabase SQL Editor AFTER the main schema
-- ============================================================

-- -------------------------------------------------------
-- 0. Supabase Storage bucket for images & files
--    (Run this in SQL Editor — creates a public bucket)
-- -------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

-- Allow public reads on the portfolio bucket
create policy "Public read portfolio bucket"
on storage.objects for select
using (bucket_id = 'portfolio');

-- Allow authenticated uploads (you, logged into Supabase dashboard)
create policy "Auth upload portfolio bucket"
on storage.objects for insert
with check (bucket_id = 'portfolio');

create policy "Auth update portfolio bucket"
on storage.objects for update
using (bucket_id = 'portfolio');

create policy "Auth delete portfolio bucket"
on storage.objects for delete
using (bucket_id = 'portfolio');

-- -------------------------------------------------------
-- 1. Enforce single profile row
-- -------------------------------------------------------
-- Add a constraint so only one profile can exist
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_singleton'
  ) then
    alter table profiles add constraint profiles_singleton check (true);
    -- Use a unique partial index on a constant to enforce single row
    create unique index if not exists profiles_single_row on profiles ((true));
  end if;
end $$;

-- -------------------------------------------------------
-- 2. Seed skill_categories
-- -------------------------------------------------------
insert into skill_categories (name, slug, sort_order) values
  ('Frontend',  'frontend',  10),
  ('Backend',   'backend',   20),
  ('Database',  'database',  30),
  ('DevOps',    'devops',    40),
  ('Design',    'design',    50),
  ('Other',     'other',     60)
on conflict (name) do nothing;

-- -------------------------------------------------------
-- 3. Seed skills  (adjust to your actual stack)
-- -------------------------------------------------------
-- Frontend
insert into skills (name, category_id, icon_name, proficiency, sort_order) values
  ('TypeScript',   (select id from skill_categories where slug = 'frontend'), 'SiTypescript',   90, 10),
  ('React',        (select id from skill_categories where slug = 'frontend'), 'SiReact',        92, 20),
  ('Next.js',      (select id from skill_categories where slug = 'frontend'), 'SiNextdotjs',    88, 30),
  ('Tailwind CSS', (select id from skill_categories where slug = 'frontend'), 'SiTailwindcss',  90, 40),
  ('HTML/CSS',     (select id from skill_categories where slug = 'frontend'), 'SiHtml5',        95, 50),
  ('JavaScript',   (select id from skill_categories where slug = 'frontend'), 'SiJavascript',   93, 60)
on conflict do nothing;

-- Backend
insert into skills (name, category_id, icon_name, proficiency, sort_order) values
  ('Node.js',   (select id from skill_categories where slug = 'backend'), 'SiNodedotjs', 85, 10),
  ('Python',    (select id from skill_categories where slug = 'backend'), 'SiPython',    70, 20),
  ('REST APIs', (select id from skill_categories where slug = 'backend'), 'HiOutlineGlobeAlt', 88, 30),
  ('GraphQL',   (select id from skill_categories where slug = 'backend'), 'SiGraphql',   72, 40)
on conflict do nothing;

-- Database
insert into skills (name, category_id, icon_name, proficiency, sort_order) values
  ('PostgreSQL', (select id from skill_categories where slug = 'database'), 'SiPostgresql', 82, 10),
  ('Supabase',   (select id from skill_categories where slug = 'database'), 'SiSupabase',   85, 20),
  ('MongoDB',    (select id from skill_categories where slug = 'database'), 'SiMongodb',    70, 30),
  ('Redis',      (select id from skill_categories where slug = 'database'), 'SiRedis',      60, 40)
on conflict do nothing;

-- DevOps
insert into skills (name, category_id, icon_name, proficiency, sort_order) values
  ('Git',       (select id from skill_categories where slug = 'devops'), 'SiGit',    90, 10),
  ('Docker',    (select id from skill_categories where slug = 'devops'), 'SiDocker', 65, 20),
  ('Vercel',    (select id from skill_categories where slug = 'devops'), 'SiVercel', 85, 30),
  ('CI/CD',     (select id from skill_categories where slug = 'devops'), 'HiOutlineCommandLine', 70, 40)
on conflict do nothing;

-- Design
insert into skills (name, category_id, icon_name, proficiency, sort_order) values
  ('Figma',          (select id from skill_categories where slug = 'design'), 'SiFigma', 75, 10),
  ('UI/UX Design',   (select id from skill_categories where slug = 'design'), 'HiOutlinePaintBrush', 70, 20)
on conflict do nothing;

-- -------------------------------------------------------
-- 4. Seed tags  (shared between projects & blog posts)
-- -------------------------------------------------------
insert into tags (name, slug) values
  ('React',        'react'),
  ('Next.js',      'nextjs'),
  ('TypeScript',   'typescript'),
  ('Tailwind CSS', 'tailwind-css'),
  ('Supabase',     'supabase'),
  ('Node.js',      'nodejs'),
  ('PostgreSQL',   'postgresql'),
  ('GraphQL',      'graphql'),
  ('REST API',     'rest-api'),
  ('Full Stack',   'full-stack'),
  ('Frontend',     'frontend'),
  ('Backend',      'backend'),
  ('DevOps',       'devops'),
  ('UI/UX',        'ui-ux'),
  ('Open Source',   'open-source'),
  ('Tutorial',     'tutorial'),
  ('Career',       'career'),
  ('Productivity', 'productivity')
on conflict (name) do nothing;

-- -------------------------------------------------------
-- 5. Sample profile (update with your real data)
-- -------------------------------------------------------
insert into profiles (full_name, headline, bio, email, location)
values (
  'Ronald Vergel Dela Cruz',
  'Building modern web experiences with clean code and thoughtful design.',
  'I''m a full-stack developer focused on building fast, accessible, and beautiful web applications. I enjoy crafting intuitive user experiences and working across the stack — from database design to pixel-perfect UI.',
  'your-email@example.com',
  'Philippines'
)
on conflict do nothing;

-- -------------------------------------------------------
-- NOTE: After running this seed, upload images to the
-- "portfolio" storage bucket in Supabase Dashboard:
--
--   portfolio/avatar.jpg      → update profiles.avatar_url
--   portfolio/resume.pdf      → update profiles.resume_url
--   portfolio/projects/*.png  → use in projects.cover_image
--   portfolio/blog/*.png      → use in blog_posts.cover_image
--
-- Public URL pattern:
--   https://<project-ref>.supabase.co/storage/v1/object/public/portfolio/<path>
-- -------------------------------------------------------
