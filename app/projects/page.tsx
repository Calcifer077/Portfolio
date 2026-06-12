// app/projects/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { projects, type Project } from "@/app/_lib/data";

import Image from "next/image";

// ─── Types ───────────────────────────────────────────────
type Category = "all" | "backend" | "fullstack" | "ml";

// ─── Filter config ────────────────────────────────────────
const FILTERS: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Backend", value: "backend" },
  { label: "Full Stack", value: "fullstack" },
  { label: "ML / AI", value: "ml" },
];

// ─── Image Carousel ───────────────────────────────────────
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Modulous is done so that we don't go out of bounds
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      next(); // swipe left
    } else if (distance < -minSwipeDistance) {
      prev(); // swipe right
    }

    setTouchStart(null);
  };

  return (
    <div
      className="relative w-full h-full min-h-70 md:min-h-0 overflow-hidden rounded-l-none md:rounded-tl-xl rounded-t-xl md:rounded-t-none bg-bg-deep group"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} screenshot ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent pointer-events-none" />

      {/* Controls — only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-bg-deep/70 border border-border-subtle text-text-muted hover:text-primary hover:border-primary/50 transition-all md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-bg-deep/70 border border-border-subtle text-text-muted hover:text-primary hover:border-primary/50 transition-all md:opacity-0 md:group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === current
                    ? "bg-primary w-4"
                    : "bg-text-muted/40 hover:bg-text-muted"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Accordion item ───────────────────────────────────────
function AccordionItem({
  feature,
  index,
}: {
  feature: Project["features"][0];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-b border-border-subtle last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-left group"
        aria-expanded={open}
      >
        <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors">
          <span className="text-primary mr-2 text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          {feature.title}
        </span>
        <ChevronDown
          size={14}
          className={`text-text-muted shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-text-muted leading-relaxed font-sans">
              {feature.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Featured Project Card ────────────────────────────────
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full border border-border-subtle rounded-xl overflow-hidden bg-bg-surface"
    >
      {/* ── Top: Image + Description side by side ── */}
      <div className="flex flex-col md:flex-row">
        {/* Left: Carousel */}
        <div className="w-full md:w-[45%] md:min-h-80 shrink-0">
          <ImageCarousel images={project.images} title={project.title} />
        </div>

        {/* Right: Meta */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-5 min-w-0">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                Featured
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                {project.category}
              </span>
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl text-text-primary tracking-tight">
              {project.title}
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-primary/5 text-primary/80 border border-primary/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mt-auto pt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded border border-border-subtle bg-bg-elevated text-text-secondary font-mono text-xs hover:border-primary/50 hover:text-primary transition-all duration-200"
            >
              <Github size={14} /> GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded bg-brand-primary text-brand-on-primary font-mono text-xs font-bold hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={14} /> Live Site
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom: Features Accordion (full width) ── */}
      {project.features.length > 0 && (
        <div className="border-t border-border-subtle px-6 md:px-8 py-5 bg-bg-deep/40">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-3">
            Key Features
          </p>
          <div className="grid grid-cols-1 gap-x-12">
            {project.features.map((feature, i) => (
              <AccordionItem key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}

// ─── Grid Card ────────────────────────────────────────────
function GridCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border border-border-subtle rounded-xl overflow-hidden bg-bg-surface hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(173,198,255,0.12)] flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-bg-deep">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill={true}
          className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between">
          <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight
            size={16}
            className="text-text-muted group-hover:text-primary transition-colors shrink-0 mt-0.5"
          />
        </div>

        <p className="text-text-muted text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-primary/5 text-primary/70 border border-primary/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border-subtle">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub for ${project.title}`}
            className="flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-primary transition-colors"
          >
            <Github size={13} /> Code
          </a>
          {project.live && (
            <>
              <span className="text-border-subtle">·</span>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live site for ${project.title}`}
                className="flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-primary transition-colors"
              >
                <ExternalLink size={13} /> Live
              </a>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const filteredOthers =
    activeFilter === "all"
      ? otherProjects
      : otherProjects.filter((p) => p.category === activeFilter);

  const filteredFeatured =
    activeFilter === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 pb-24 space-y-16">
      {/* ── Page Header ── */}
      <header className="space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs text-primary uppercase tracking-widest"
        >
          Selected Works
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="font-display font-black text-4xl md:text-6xl text-text-primary tracking-tighter leading-none"
        >
          Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-text-muted max-w-xl text-sm leading-relaxed"
        >
          A curated collection of systems software, developer tooling, and
          engineering experiments focused on performance and clean architecture.
        </motion.p>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 pt-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded font-mono text-xs transition-all duration-200 ${
                activeFilter === f.value
                  ? "bg-brand-primary text-brand-on-primary font-bold"
                  : "border border-border-subtle text-text-muted hover:border-primary/40 hover:text-text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </header>

      {/* ── Featured Projects ── */}
      <AnimatePresence mode="wait">
        {filteredFeatured.length > 0 && (
          <motion.section
            key="featured"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Featured — {filteredFeatured.length} project
              {filteredFeatured.length !== 1 ? "s" : ""}
            </p>
            <div className="space-y-6">
              {filteredFeatured.map((project, i) => (
                <FeaturedCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Divider ── */}
      {filteredFeatured.length > 0 && filteredOthers.length > 0 && (
        <>
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-border-subtle" />
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest shrink-0">
              More Projects
            </span>
            <div className="flex-1 border-t border-border-subtle" />
          </div>
          <div className="text-right text-xs text-text-muted">
            Projects images does&apos;t actually represent the project.
          </div>
        </>
      )}

      {/* ── Grid Projects ── */}
      <AnimatePresence mode="wait">
        {filteredOthers.length > 0 && (
          <motion.section
            key={`grid-${activeFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredOthers.map((project, i) => (
                <GridCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Empty state ── */}
      {filteredFeatured.length === 0 && filteredOthers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 space-y-3"
        >
          <p className="font-mono text-sm text-text-muted">
            No projects in this category yet.
          </p>
          <button
            onClick={() => setActiveFilter("all")}
            className="font-mono text-xs text-primary hover:underline"
          >
            View all projects
          </button>
        </motion.div>
      )}
    </div>
  );
}
