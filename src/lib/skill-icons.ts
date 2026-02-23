import type { IconType } from "react-icons"
import {
  HiOutlineCircleStack,
  HiOutlineCog6Tooth,
  HiOutlineCommandLine,
  HiOutlineGlobeAlt,
  HiOutlinePaintBrush,
  HiOutlineShieldCheck,
} from "react-icons/hi2"
import {
  SiCss3,
  SiDocker,
  SiFigma,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si"

/**
 * Maps a skill's `icon_name` (stored in Supabase) to a react-icons component.
 * Add new entries here when you add skills to the DB.
 *
 * Convention: use the exact export name from react-icons/si for tech brands,
 * or from react-icons/hi2 for generic icons.
 */
const iconMap: Record<string, IconType> = {
  // -- Brand / tech icons (react-icons/si) --
  SiTypescript: SiTypescript,
  SiJavascript: SiJavascript,
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiTailwindcss: SiTailwindcss,
  SiHtml5: SiHtml5,
  SiCss3: SiCss3,
  SiNodedotjs: SiNodedotjs,
  SiLaravel: SiLaravel,
  SiPython: SiPython,
  SiGraphql: SiGraphql,
  SiPostgresql: SiPostgresql,
  SiSupabase: SiSupabase,
  SiMongodb: SiMongodb,
  SiRedis: SiRedis,
  SiGit: SiGit,
  SiDocker: SiDocker,
  SiVercel: SiVercel,
  SiFigma: SiFigma,

  // -- Generic / fallback icons (react-icons/hi2) --
  HiOutlineGlobeAlt: HiOutlineGlobeAlt,
  HiOutlineCommandLine: HiOutlineCommandLine,
  HiOutlineCircleStack: HiOutlineCircleStack,
  HiOutlinePaintBrush: HiOutlinePaintBrush,
  HiOutlineShieldCheck: HiOutlineShieldCheck,
}

const aliasMap: Record<string, string> = {
  "next.js": "SiNextdotjs",
  "tailwind css": "SiTailwindcss",
  tailwind: "SiTailwindcss",
  typescript: "SiTypescript",
  javascript: "SiJavascript",
  react: "SiReact",
  "node.js": "SiNodedotjs",
  nodejs: "SiNodedotjs",
  python: "SiPython",
  graphql: "SiGraphql",
  laravel: "SiLaravel",
  postgresql: "SiPostgresql",
  postgres: "SiPostgresql",
  supabase: "SiSupabase",
  mongodb: "SiMongodb",
  redis: "SiRedis",
  git: "SiGit",
  docker: "SiDocker",
  vercel: "SiVercel",
  figma: "SiFigma",
  html5: "SiHtml5",
  html: "SiHtml5",
  css3: "SiCss3",
  css: "SiCss3",
  "ci/cd": "HiOutlineCommandLine",
}

/** Default icon when `icon_name` is null or not found in the map */
const defaultIcon: IconType = HiOutlineCog6Tooth

export function getSkillIcon(iconName: string | null): IconType {
  if (!iconName) return defaultIcon

  // Exact match (for keys already stored as Si* or HiOutline*)
  if (iconMap[iconName]) return iconMap[iconName]

  // Alias lookup (for human-readable names like "Next.js", "Tailwind CSS")
  const alias = aliasMap[iconName.toLowerCase()]
  if (alias && iconMap[alias]) return iconMap[alias]

  console.warn(`Icon not found for: "${iconName}". Using default.`)
  return defaultIcon
}
