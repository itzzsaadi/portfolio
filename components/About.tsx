"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Award,
  Code2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { profile } from "@/data/portfolioData";
import DetailModal from "./DetailModal";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [eduIndex, setEduIndex] = useState(0);

  const educations = profile.educations || [profile.education];
  const currentEdu = educations[eduIndex];

  const nextEdu = () => setEduIndex((prev) => (prev + 1) % educations.length);
  const prevEdu = () =>
    setEduIndex((prev) => (prev - 1 + educations.length) % educations.length);

  return (
    <section id="about" className="relative py-12 sm:py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-8 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill pill-accent mb-3 inline-block">About Me</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Building at the intersection of{" "}
            <span className="gradient-text">Web & AI</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Bio Card - Concise on page */}
          <motion.div
            className="glass-card flex flex-col justify-between rounded-2xl p-6 sm:p-7 lg:col-span-2"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-glow)]">
                    <Code2 className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-lg font-semibold">Who I Am</h3>
                </div>
                <span className="pill pill-emerald text-xs">Available for Work</span>
              </div>

              <p className="leading-relaxed text-[var(--color-text-secondary)] text-sm sm:text-base">
                I&apos;m a Full Stack Developer, instinctive problem solver, and dedicated business solution provider. My core skills are rooted in enterprise backends with C# and .NET, paired with modern TypeScript and applied AI architectures. I don’t just write code I deliver with perfection, transforming complex operational bottlenecks into reliable, secure digital systems. Every application I engineer is purpose-built to handle real users, strict data constraints, and business-critical workloads without compromise.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Problem Solver", "Business Solution Provider", "Detail Oriented", "Perfectionist"].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-2.5 py-1 text-xs text-[var(--color-text-secondary)]"
                  >
                    <CheckCircle2 className="h-3 w-3 text-[var(--color-accent)]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs text-[var(--color-text-muted)]">
                Deep dive into background, philosophy & evaluation
              </span>
              <button
                onClick={() => setIsBioModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--color-accent-hover)] transition-all hover:text-white group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Education Card - Interactive Horizontal Slider */}
          <motion.div
            className="glass-card flex flex-col justify-between rounded-2xl p-6 sm:p-7"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              {/* Header with Navigation Chevrons */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-emerald-glow)]">
                    <GraduationCap className="h-5 w-5 text-[var(--color-emerald)]" />
                  </div>
                  <h3 className="text-lg font-semibold">Education</h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevEdu}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-white hover:bg-[var(--color-card)] cursor-pointer"
                    aria-label="Previous education"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)] px-1 select-none">
                    {eduIndex + 1}/{educations.length}
                  </span>
                  <button
                    onClick={nextEdu}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-white hover:bg-[var(--color-card)] cursor-pointer"
                    aria-label="Next education"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Animated Sliding Education Content */}
              <div className="min-h-[135px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEdu.degree}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2.5"
                  >
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-[var(--color-text-primary)] leading-snug line-clamp-2">
                        {currentEdu.degree}
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                        {currentEdu.institution}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{currentEdu.period}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-[var(--color-amber)]" />
                      <span className="text-xs font-medium">
                        {currentEdu.cgpa && (
                          <>
                            CGPA: <span className="text-[var(--color-amber)] font-bold">{currentEdu.cgpa}</span>
                          </>
                        )}
                        {currentEdu.marks && (
                          <>
                            Marks: <span className="text-[var(--color-amber)] font-bold">{currentEdu.marks}</span>
                          </>
                        )}
                        {currentEdu.grade && (
                          <>
                            {" "}· Grade: <span className="text-[var(--color-emerald)] font-bold">{currentEdu.grade}</span>
                          </>
                        )}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {educations.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setEduIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === eduIndex
                      ? "w-5 bg-[var(--color-accent)]"
                      : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                      }`}
                    aria-label={`Go to education slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-[var(--color-border)]">
              <div className="rounded-xl bg-[var(--color-card)] p-2.5 text-center">
                <div className="text-xl font-bold text-[var(--color-accent)]">5+</div>
                <div className="text-[11px] text-[var(--color-text-muted)]">Shipped Projects</div>
              </div>
              <div className="rounded-xl bg-[var(--color-card)] p-2.5 text-center">
                <div className="text-xl font-bold text-[var(--color-emerald)]">A Grade</div>
                <div className="text-[11px] text-[var(--color-text-muted)]">FYP Phase 1 & 2</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Modal: Full Bio & Story */}
      <DetailModal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        title="Who I Am"
        subtitle="Saad Naseer — Full Stack Developer & Applied AI Integrator"
        badge={{ text: "Lahore, Pakistan", variant: "accent" }}
      >
        <div className="space-y-5">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Background & Philosophy
            </h4>
            <p className="leading-relaxed text-sm text-[var(--color-text-secondary)]">
              Software lives and dies by its structural integrity. Grounded in C#, ASP.NET,
              and robust relational schemas, my philosophy treats clean
              architecture, data consistency, and fail-safe logic as
              baseline standards not afterthoughts. I engineer resilient systems
              built to scale seamlessly under heavy production pressure.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2">
              Engineering Sweet Spot
            </h4>
            <p className="leading-relaxed text-sm text-[var(--color-text-secondary)]">
              My technical sweet spot bridges enterprise stability with
              modern agility. I architect performant backends using .NET and SQL,
              deliver responsive full-stack interfaces in Next.js and TypeScript, and
              weave in applied AI pipelines to automate complex workflows with
              high precision and zero fluff.
            </p>
          </div>

          {/* All Academic Credentials in Modal */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-hover)] mb-2 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" /> Academic History
            </h4>
            <div className="space-y-2.5">
              {educations.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-semibold text-[var(--color-text-primary)]">{edu.degree}</span>
                    <span className="text-[var(--color-accent-hover)] font-mono text-[11px]">{edu.period}</span>
                  </div>
                  <div className="text-[var(--color-text-muted)] mt-0.5">{edu.institution}</div>
                  <div className="mt-1 text-[var(--color-text-secondary)] font-medium">
                    {edu.cgpa && (
                      <span className="text-[var(--color-amber)]">CGPA: {edu.cgpa}</span>
                    )}
                    {edu.marks && (
                      <span className="text-[var(--color-amber)]">Marks: {edu.marks}</span>
                    )}
                    {edu.grade && (
                      <span className="text-[var(--color-emerald)] ml-2">Grade: {edu.grade}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4 space-y-2">
            <h5 className="font-semibold text-xs text-[var(--color-text-primary)]">Key Highlights</h5>
            <ul className="space-y-1.5 text-xs text-[var(--color-text-muted)]">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span><b>Enterprise Software Engineering:</b> Completed a 6-month developer internship at Quaid Soft, engineering scalable enterprise features and database optimizations using ASP.NET and SQL Server.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-emerald)]" />
                <span><b>Production Multi-Branch Platform:</b> Architected and deployed a centralized financial, income, and asset management platform for CDC Diagnostic Laboratories to streamline multi-branch operations.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-emerald)]" />
                <span><b>AI Security System:</b> Engineered SecureGuard Pro an end-to-end vulnerability scanner integrating ML pipelines with full-stack web architecture earning consecutive &apos;A&apos; grades across both capstone phases.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--color-emerald)]" />
                <span><b>Technical Mentorship:</b> Guided emerging developers through core programming logic, relational design, and debugging strategies as a university Teaching Assistant for Introduction to Computing.</span>
              </li>
            </ul>
          </div>
        </div>
      </DetailModal>
    </section>
  );
}
