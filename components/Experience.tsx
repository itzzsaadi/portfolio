"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { experiences, Experience as ExperienceType } from "@/data/portfolioData";
import DetailModal from "./DetailModal";

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
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);

  return (
    <section id="experience" className="relative py-12 sm:py-16 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill pill-accent mb-3 inline-block">Experience</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Roles, client delivery, and enterprise workflows
          </p>
        </motion.div>

        {/* Compact Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-transparent md:left-1/2 md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`relative mb-8 flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 top-6 z-10 -translate-x-1/2 md:left-1/2">
                <div className="relative">
                  <div className="absolute -inset-1.5 animate-pulse-ring rounded-full bg-[var(--color-accent)] opacity-20" />
                  <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-background)]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  </div>
                </div>
              </div>

              {/* Compact Content Card */}
              <div
                className={`ml-12 w-full md:ml-0 md:w-[calc(50%-1.75rem)] ${
                  index % 2 === 0 ? "md:pr-6" : "md:pl-6"
                }`}
              >
                <div className="glass-card rounded-2xl p-5 hover:border-[var(--color-border-hover)] transition-all">
                  {/* Header */}
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-accent-hover)] font-medium">
                        <Briefcase className="h-3 w-3" />
                        {exp.company}
                      </div>
                    </div>
                    <span className={`pill ${typeColors[exp.type]} text-[11px]`}>
                      {typeLabels[exp.type]}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="mb-3 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Short 1-sentence Description */}
                  <p className="mb-3 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                    {exp.description}
                  </p>

                  {/* Tech Used Pills */}
                  <div className="mb-4 flex flex-wrap gap-1">
                    {exp.techUsed.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-[var(--color-card)] px-2 py-0.5 text-[11px] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.techUsed.length > 4 && (
                      <span className="rounded bg-[var(--color-card)] px-1.5 py-0.5 text-[11px] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                        +{exp.techUsed.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Open Job Details Button */}
                  <button
                    onClick={() => setSelectedExp(exp)}
                    className="inline-flex w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-white group"
                  >
                    <span>View Role Details & Deliverables</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated Modal: Full Job Details */}
      <DetailModal
        isOpen={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        title={selectedExp?.role || ""}
        subtitle={`${selectedExp?.company} • ${selectedExp?.period}`}
        badge={{
          text: selectedExp ? typeLabels[selectedExp.type] : "",
          variant: selectedExp?.type === "freelance" ? "emerald" : "accent",
        }}
      >
        {selectedExp && (
          <div className="space-y-5">
            {/* Meta info bar */}
            <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-[var(--color-accent)]" />
                <span className="text-[var(--color-text-primary)] font-medium">{selectedExp.company}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[var(--color-accent)]" />
                {selectedExp.period}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                {selectedExp.location}
              </span>
            </div>

            {/* Role Overview */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2">
                Overview & Context
              </h4>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {selectedExp.description}
              </p>
            </div>

            {/* Key Deliverables & Responsibilities */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2">
                Key Responsibilities & Deliverables
              </h4>
              <ul className="space-y-2">
                {selectedExp.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-text-secondary)]">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[var(--color-emerald)]" />
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies & Tools */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2">
                Technologies & Tools Applied
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedExp.techUsed.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </DetailModal>
    </section>
  );
}
