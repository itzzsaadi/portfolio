"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, Code2 } from "lucide-react";
import { profile } from "@/data/portfolioData";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill pill-accent mb-4 inline-block">About Me</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Building at the intersection of{" "}
            <span className="gradient-text">Web & AI</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Bio Card */}
          <motion.div
            className="glass-card rounded-2xl p-8 lg:col-span-2"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-glow)]">
                <Code2 className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-semibold">Who I Am</h3>
            </div>
            <p className="mb-4 leading-relaxed text-[var(--color-text-secondary)]">
              I&apos;m a Computer Science student at UCP who doesn&apos;t just study software 
              engineering — I ship it. From enterprise ERP systems at Quaid Soft to AI-powered 
              vulnerability scanners for my capstone, I thrive at turning complex requirements 
              into elegant, production-ready solutions.
            </p>
            <p className="leading-relaxed text-[var(--color-text-secondary)]">
              My sweet spot is the full stack: I architect scalable backends with 
              Next.js/TypeScript and PostgreSQL, build intelligent features with fine-tuned 
              LLMs and ML pipelines, and craft polished frontends that users actually enjoy. 
              Currently freelancing while completing my final year, with a focus on 
              financial platforms and applied AI tools.
            </p>
          </motion.div>

          {/* Education Card */}
          <motion.div
            className="glass-card rounded-2xl p-8"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-emerald-glow)]">
                <GraduationCap className="h-5 w-5 text-[var(--color-emerald)]" />
              </div>
              <h3 className="text-lg font-semibold">Education</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[var(--color-text-primary)]">
                  {profile.education.degree}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {profile.education.institution}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <Calendar className="h-4 w-4" />
                <span>{profile.education.period}</span>
              </div>

              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[var(--color-amber)]" />
                <span className="text-sm font-medium">
                  CGPA: <span className="text-[var(--color-amber)]">{profile.education.cgpa}</span>
                </span>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-[var(--color-card)] p-3 text-center">
                  <div className="text-2xl font-bold text-[var(--color-accent)]">5+</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Projects Shipped</div>
                </div>
                <div className="rounded-lg bg-[var(--color-card)] p-3 text-center">
                  <div className="text-2xl font-bold text-[var(--color-emerald)]">A</div>
                  <div className="text-xs text-[var(--color-text-muted)]">FYP Grade</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
