"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Award,
  Layers,
  Clock,
  Sparkles,
  CheckCircle2,
  Maximize2,
} from "lucide-react";
import { GithubIcon } from "./Icons";
import { projects, Project } from "@/data/portfolioData";
import Image from "next/image";
import DetailModal from "./DetailModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-12 sm:py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill pill-accent mb-3 inline-block">Projects</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Production systems, applied AI integrations, and full-stack platforms
          </p>
        </motion.div>

        {/* Compact Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="glass-card group flex flex-col overflow-hidden rounded-2xl transition-all hover:border-[var(--color-border-hover)] hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              {/* Project Image */}
              <div
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)]/90 via-transparent to-transparent" />

                {/* Grade Badge */}
                {project.grade && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-[var(--color-emerald-glow)] px-2.5 py-1 text-xs font-semibold text-[var(--color-emerald)] border border-[rgba(16,185,129,0.2)]">
                    <Award className="h-3 w-3" />
                    {project.grade}
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                    <Maximize2 className="h-3.5 w-3.5" />
                    View Details
                  </span>
                </div>
              </div>

              {/* Compact Card Content */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2">
                  <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-hover)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-[var(--color-accent-hover)] truncate">
                    {project.tagline}
                  </p>
                </div>

                <p className="mb-3 text-xs leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
                  {project.description}
                </p>

                {/* Top Tech Pills */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-[var(--color-card)] px-2 py-0.5 text-[11px] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="rounded bg-[var(--color-card)] px-1.5 py-0.5 text-[11px] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex-1" />

                {/* Action Row */}
                <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border)]">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] py-2 text-xs font-medium text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    Details & Architecture
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:text-white hover:border-[var(--color-border-hover)]"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Modal: Full Project Details & Architecture */}
      <DetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ""}
        subtitle={selectedProject?.tagline}
        badge={
          selectedProject?.grade
            ? { text: `Grade: ${selectedProject.grade}`, variant: "emerald" }
            : { text: "Full Stack", variant: "accent" }
        }
      >
        {selectedProject && (
          <div className="space-y-5">
            {/* Modal Image Header */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[var(--color-border)]">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Overview */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Project Overview
              </h4>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {selectedProject.description}
              </p>
            </div>

            {/* Architecture Section */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-emerald)] mb-2 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> Architecture & Data Flow
              </h4>
              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {selectedProject.architecture}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2">
                Engineering Highlights
              </h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--color-accent)]" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Complete Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[var(--color-border)] flex items-center gap-3">
              {selectedProject.liveDemoUrl ? (
                <a
                  href={selectedProject.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[var(--color-accent-hover)]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Launch Live Demo
                </a>
              ) : (
                <div className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-xs font-medium text-[var(--color-text-muted)]">
                  <Clock className="h-3.5 w-3.5" />
                  Architecture & Code Review Only
                </div>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2.5 text-xs font-medium text-[var(--color-text-secondary)] transition-all hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        )}
      </DetailModal>
    </section>
  );
}
