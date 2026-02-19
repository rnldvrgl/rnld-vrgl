-- ============================================================
-- Migration: Replace tech_stack text[] with junction table,
--            Replace skills.category text with FK to skill_categories
-- Run in Supabase SQL Editor
-- ============================================================

-- -------------------------------------------------------
-- 1. Create skill_categories lookup table
-- -------------------------------------------------------
create table if not exists skill_categories (
  id         uuid primary key default uuid_generate_v4(),
  name       text    not null unique,
  slug       text    not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- RLS
alter table skill_categories enable row level security;
create policy "Public read skill_categories" on skill_categories for select using (true);

-- -------------------------------------------------------
-- 2. Populate skill_categories from existing distinct values
-- -------------------------------------------------------
insert into skill_categories (name, slug, sort_order)
select
  category,
  lower(replace(category, ' ', '-')),
  row_number() over (order by category) * 10
from (select distinct category from skills) sub
on conflict (name) do nothing;

-- -------------------------------------------------------
-- 3. Add category_id FK to skills and populate it
-- -------------------------------------------------------
alter table skills add column if not exists category_id uuid references skill_categories(id) on delete set null;

update skills s
set category_id = sc.id
from skill_categories sc
where sc.name = s.category;

-- Drop old text column (optional — uncomment when ready)
-- alter table skills drop column if exists category;

-- -------------------------------------------------------
-- 4. Create experience_skills junction table
-- -------------------------------------------------------
create table if not exists experience_skills (
  id            uuid primary key default uuid_generate_v4(),
  experience_id uuid not null references experiences(id) on delete cascade,
  skill_id      uuid not null references skills(id) on delete cascade,
  unique (experience_id, skill_id)
);

-- RLS
alter table experience_skills enable row level security;
create policy "Public read experience_skills" on experience_skills for select using (true);

-- -------------------------------------------------------
-- 5. Migrate existing tech_stack arrays to experience_skills
--    (matches tech_stack entries to skills by name)
-- -------------------------------------------------------
insert into experience_skills (experience_id, skill_id)
select e.id, s.id
from experiences e,
     unnest(e.tech_stack) as tech_name
     join skills s on lower(s.name) = lower(tech_name)
on conflict (experience_id, skill_id) do nothing;

-- Drop old text[] column (optional — uncomment when ready)
-- alter table experiences drop column if exists tech_stack;
