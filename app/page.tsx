// app/page.tsx
"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { TextAnimate } from "@/components/ui/text-animate";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { skills, projects, socials } from "@/app/_lib/data";
import { SiLeetcode, SiCodeforces } from "react-icons/si";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const socialIcons: Record<string, ReactNode> = {
  GitHub: <FaGithub size={18} />,
  LinkedIn: <FaLinkedin size={18} />,
  Twitter: <FaTwitter size={18} />,
  Email: <Mail size={18} />,
  LeetCode: <SiLeetcode size={18} />,
  Codeforces: <SiCodeforces size={18} />,
};

const stickerRotations = [-2, 1, 2, -1, 3, -3];

const stickerInks = [
  "hover:border-violet-500 hover:text-violet-500 hover:bg-violet-500/10 hover:shadow-[3px_3px_0_var(--color-orange)]",
  "hover:border-orange-500 hover:text-orange-500 hover:bg-orange-500/10 hover:shadow-[3px_3px_0_var(--color-violet)]",
  "hover:border-primary hover:text-primary hover:bg-primary/10 hover:shadow-[3px_3px_0_var(--color-orange)]",
];

export default function Home() {
  return (
    <div className="max-w-container mx-auto px-6 pb-24 space-y-28">
      {/* ── Hero ── */}
      <section className="max-w-2xl space-y-6">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-mono text-xs text-primary uppercase tracking-widest"
        >
          Available for work
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-display font-black text-5xl md:text-7xl text-text-primary tracking-tighter leading-none"
        >
          Mahesh
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-mono text-sm text-text-muted uppercase tracking-widest"
        >
          Full Stack Developer — JavaScript, React, Node.js
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-text-secondary leading-relaxed text-lg max-w-xl"
        >
          <TextAnimate animation="blurInUp" by="word">
            I like building things. Currently learning Python and exploring the
            world of machine learning. Always open to new opportunities and
            collaborations.
          </TextAnimate>
        </motion.div>

        {/* Social Links */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center gap-3 pt-2"
        >
          {socials.map((s, i) => (
            <Tooltip key={s.label}>
              <TooltipTrigger>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  initial="hidden"
                  animate="show"
                  variants={fadeUp}
                  custom={4 + i * 0.05}
                  className="flex items-center justify-center w-10 h-10 rounded border border-border-subtle bg-bg-surface text-text-muted
                     transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
                     hover:text-primary hover:border-primary/50"
                >
                  {socialIcons[s.label] ?? <Mail size={18} />}
                </motion.a>
              </TooltipTrigger>
              <TooltipContent side="top">{s.label}</TooltipContent>
            </Tooltip>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-3 pt-2"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-5 py-2.5 rounded bg-brand-primary text-brand-on-primary font-mono text-sm font-bold hover:opacity-90 transition-opacity"
          >
            View Work
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:-rotate-45"
            />
          </Link>

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-5 py-2.5 rounded border border-border-subtle text-text-secondary font-mono text-sm hover:border-primary/50 hover:text-text-primary transition-all duration-200"
          >
            Resume <Download size={15} />
          </a>
        </motion.div>
      </section>

      {/* ── Skills ── */}
      <section className="space-y-5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs text-text-muted uppercase tracking-widest"
        >
          Tech Arsenal
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            const rotation = stickerRotations[i % stickerRotations.length];
            const ink = stickerInks[i % stickerInks.length];

            return (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                whileHover={{ rotate: rotation, scale: 1.05 }}
              >
                <Badge
                  variant="outline"
                  className={`font-mono text-xs px-3 py-3 border-border-subtle bg-bg-surface text-text-secondary transition-all duration-150 ${ink}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {skill.label}
                </Badge>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-text-muted uppercase tracking-widest"
          >
            Selected Works
          </motion.div>

          <Link
            href="/projects"
            className="group font-mono text-xs text-primary flex items-center gap-1"
          >
            All projects
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:-rotate-45"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group block p-5 rounded border border-border-subtle bg-bg-surface card-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-text-primary group-hover:text-primary transition-colors group-hover:underline underline-offset-2">
                  {project.title}
                </h3>

                <ArrowRight
                  size={16}
                  className="text-text-muted group-hover:text-primary group-hover:-rotate-45 duration-300 transition shrink-0 mt-0.5"
                />
              </div>

              <p className="text-text-muted text-sm leading-relaxed mb-4">
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
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded border border-border-subtle bg-bg-surface p-10 text-center space-y-5"
        >
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest">
            Open to opportunities
          </p>

          <h2 className="font-display font-black text-3xl md:text-4xl text-text-primary tracking-tighter">
            Let&apos;s build something together.
          </h2>

          <p className="text-text-muted max-w-md mx-auto text-sm leading-relaxed">
            Currently available for full-time roles, freelance contracts, and
            open-source collaboration.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-brand-primary text-brand-on-primary font-mono text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Get in touch <Mail size={15} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
