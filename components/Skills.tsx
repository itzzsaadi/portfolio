"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories } from "@/data/portfolioData";

const categoryColors: Record<string, string> = {
  frontend: "from-blue-500/20 to-indigo-500/20 border-blue-500/20 text-blue-400",
  backend: "from-emerald-500/20 to-green-500/20 border-emerald-500/20 text-emerald-400",
  database: "from-amber-500/20 to-orange-500/20 border-amber-500/20 text-amber-400",
  ai: "from-violet-500/20 to-purple-500/20 border-violet-500/20 text-violet-400",
  devops: "from-rose-500/20 to-pink-500/20 border-rose-500/20 text-rose-400",
  tools: "from-cyan-500/20 to-teal-500/20 border-cyan-500/20 text-cyan-400",
};

const categoryIcons: Record<string, string> = {
  frontend: "🎨",
  backend: "⚙️",
  database: "🗄️",
  ai: "🤖",
  devops: "🧪",
  tools: "🛠️",
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Object.keys(skillCategories);
  const filteredSkills = activeCategory
    ? skills.filter((s) => s.category === activeCategory)
    : skills;

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill pill-accent mb-4 inline-block">Skills</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Technologies I{" "}
            <span className="gradient-text">Work With</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            From frontend frameworks to fine-tuned AI models
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === null
                ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent-glow)]"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent-glow)]"
                  : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <span className="mr-1.5">{categoryIcons[cat]}</span>
              {skillCategories[cat]}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          layout
        >
          {filteredSkills.map((skill, index) => {
            const colorClass = categoryColors[skill.category] || "";
            return (
              <motion.div
                key={skill.name}
                className={`group relative overflow-hidden rounded-xl border bg-gradient-to-br p-4 text-center transition-all hover:scale-[1.03] ${colorClass}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                layout
              >
                <span className="text-sm font-medium">{skill.name}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
