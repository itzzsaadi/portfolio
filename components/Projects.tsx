"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Clock,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { projects } from "@/data/portfolioData";
import Image from "next/image";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill pill-accent mb-4 inline-block">Projects</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured{" "}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Production systems, AI tools, and database engineering
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass-card group flex flex-col overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Project Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-transparent to-transparent" />

                {/* Grade Badge */}
                {project.grade && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[var(--color-emerald-glow)] px-2.5 py-1 text-xs font-semibold text-[var(--color-emerald)] border border-[rgba(16,185,129,0.2)]">
                    <Award className="h-3 w-3" />
                    {project.grade}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-1 text-lg font-bold text-[var(--color-text-primary)]">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-[var(--color-accent-hover)]">
                  {project.tagline}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-[var(--color-card)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="mb-4 space-y-1.5">
                  {project.highlights.slice(0, 2).map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
                    >
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                      {h}
                    </div>
                  ))}
                </div>

                {/* Architecture Toggle */}
                <button
                  id={`arch-toggle-${project.id}`}
                  onClick={() =>
                    setExpandedId(expandedId === project.id ? null : project.id)
                  }
                  className="mb-4 flex w-full items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                >
                  <Layers className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                  <span className="flex-1 text-left">Architecture & Data Flow</span>
                  {expandedId === project.id ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </button>

                {/* Architecture Drawer */}
                <AnimatePresence>
                  {expandedId === project.id && (
                    <motion.div
                      className="mb-4 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                        {project.architecture}
                      </p>
                      {/* Extra highlights */}
                      <div className="mt-3 space-y-1">
                        {project.highlights.slice(2).map((h, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
                          >
                            <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-emerald)]" />
                            {h}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  {/* Live Demo Button */}
                  {project.liveDemoUrl ? (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent-glow)]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  ) : (
                    <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-muted)]">
                      <Clock className="h-4 w-4" />
                      Architecture Only
                    </div>
                  )}

                  {/* GitHub Button */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-lg border border-[var(--color-border)] p-2.5 text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
