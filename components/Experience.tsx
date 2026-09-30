"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronRight } from "lucide-react";
import { experiences } from "@/data/portfolioData";

const typeColors: Record<string, string> = {
  internship: "pill-accent",
  freelance: "pill-emerald",
  fulltime: "pill-accent",
};

const typeLabels: Record<string, string> = {
  internship: "Internship",
  freelance: "Freelance",
  fulltime: "Full-time",
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill pill-accent mb-4 inline-block">Experience</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Professional{" "}
            <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-transparent md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative mb-12 flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 top-8 z-10 -translate-x-1/2 md:left-1/2">
                <div className="relative">
                  <div className="absolute -inset-2 animate-pulse-ring rounded-full bg-[var(--color-accent)] opacity-20" />
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-background)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div
                className={`ml-16 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <div className="glass-card rounded-2xl p-6">
                  {/* Header */}
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-accent-hover)]">
                        <Briefcase className="h-3.5 w-3.5" />
                        {exp.company}
                      </div>
                    </div>
                    <span className={`pill ${typeColors[exp.type]}`}>
                      {typeLabels[exp.type]}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="mb-4 flex flex-wrap gap-4 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="mb-4 space-y-2">
                    {exp.responsibilities.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
                      >
                        <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-[var(--color-accent)]" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Used */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techUsed.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-[var(--color-card)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
