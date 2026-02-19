-- ============================================================
-- Migration: Replace skills.icon_url with skills.icon_name
-- Run in Supabase SQL Editor
-- ============================================================

-- Add the new column
alter table skills add column if not exists icon_name text;

-- Drop the old column (uncomment when ready)
-- alter table skills drop column if exists icon_url;
