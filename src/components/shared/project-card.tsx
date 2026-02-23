"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/supabase/types"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2"
import { SiGithub } from "react-icons/si"

const MAX_VISIBLE_TAGS = 4
const AUTOPLAY_INTERVAL = 5000

export function ProjectCard({ project }: { project: Project }) {
  const tags = project.tags ?? []
  // Support project_images array; fall back to cover_image
  const images = project.project_images?.length
    ? project.project_images
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((img) => img.image_url)
    : project.cover_image
      ? [project.cover_image]
      : []

  const hasMultipleImages = images.length > 1

  const [currentImage, setCurrentImage] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAllTags, setShowAllTags] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [canExpand, setCanExpand] = useState(false)

  const descRef = useRef<HTMLParagraphElement>(null)

  // Detect if description overflows the 2-line clamp
  useEffect(() => {
    const el = descRef.current
    if (el) {
      setCanExpand(el.scrollHeight > el.clientHeight + 1)
    }
  }, [])

  // Autoplay carousel (pauses on hover)
  useEffect(() => {
    if (!hasMultipleImages || isHovered) return
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, AUTOPLAY_INTERVAL)
    return () => clearInterval(timer)
  }, [hasMultipleImages, images.length, isHovered])

  const goToImage = useCallback((index: number) => {
    setCurrentImage(index)
  }, [])

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const visibleTags = showAllTags ? tags : tags.slice(0, MAX_VISIBLE_TAGS)
  const hiddenTagCount = tags.length - MAX_VISIBLE_TAGS

  return (
    <Card
      className="group relative overflow-hidden border border-border/30 p-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image carousel */}
      {images.length > 0 && (
        <div className="relative aspect-video overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImage]}
                alt={`${project.title} — image ${currentImage + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

          {/* Carousel prev/next (visible on hover) */}
          {hasMultipleImages && (
            <>
              <div className="absolute inset-y-0 left-0 flex items-center opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={prevImage}
                  className="ml-2 flex size-8 items-center justify-center rounded-full bg-background/60 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-background/80"
                  aria-label="Previous image"
                >
                  <HiOutlineChevronLeft className="size-4" />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={nextImage}
                  className="mr-2 flex size-8 items-center justify-center rounded-full bg-background/60 text-foreground/80 backdrop-blur-sm transition-colors hover:bg-background/80"
                  aria-label="Next image"
                >
                  <HiOutlineChevronRight className="size-4" />
                </button>
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToImage(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentImage
                        ? "w-4 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Featured badge */}
          {project.featured && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-3"
            >
              <span className="flex items-center gap-1.5 rounded-md border-2 border-code-keyword/60 bg-code-keyword/20 px-2.5 py-1 text-xxs font-bold uppercase tracking-wider text-code-keyword shadow-lg backdrop-blur-sm">
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="size-1.5 rounded-full bg-code-keyword"
                />
                Featured
              </span>
            </motion.div>
          )}

          {/* Image counter */}
          {hasMultipleImages && (
            <div className="absolute left-3 top-3">
              <span className="rounded-md bg-background/60 px-2 py-0.5 font-mono text-[10px] text-foreground/80 backdrop-blur-sm">
                {currentImage + 1}/{images.length}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="space-y-3 p-5">
        {/* Title row with external links */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-code-keyword">
            {project.title}
          </h3>
          <div className="flex shrink-0 items-center gap-2">
            {project.github_url && (
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
              >
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View source code"
                >
                  <SiGithub className="size-3.5" />
                </Link>
              </Button>
            )}
            {project.live_url && (
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
              >
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View live site"
                >
                  <HiOutlineArrowTopRightOnSquare className="size-3.5" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Expandable description */}
        <div>
          <p
            ref={descRef}
            className={`text-sm leading-relaxed text-muted-foreground ${
              !isExpanded ? "line-clamp-2" : ""
            }`}
          >
            {project.description}
          </p>
          {canExpand && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-xsfont-medium text-code-keyword/70 transition-colors hover:text-code-keyword"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        {/* Tags with "+N more" collapse */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {visibleTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-border/40 bg-secondary/40 text-xs text-muted-foreground transition-colors hover:border-code-keyword/30 hover:bg-code-keyword/10 hover:text-foreground dark:border-border/30 dark:bg-secondary/30"
              >
                {tag}
              </Badge>
            ))}
            {!showAllTags && hiddenTagCount > 0 && (
              <button
                onClick={() => setShowAllTags(true)}
                className="rounded-full border border-dashed border-border/40 px-2 py-0.5 text-xs text-muted-foreground/60 transition-colors hover:border-code-keyword/40 hover:text-code-keyword"
              >
                +{hiddenTagCount} more
              </button>
            )}
            {showAllTags && tags.length > MAX_VISIBLE_TAGS && (
              <button
                onClick={() => setShowAllTags(false)}
                className="rounded-full border border-dashed border-border/40 px-2 py-0.5 text-xs text-muted-foreground/60 transition-colors hover:border-code-keyword/40 hover:text-code-keyword"
              >
                Show less
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
