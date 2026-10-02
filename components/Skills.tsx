"use client";

import { motion } from "framer-motion";
import { skills, Skill } from "@/data/portfolioData";

function MarqueeRow({
  items,
  reverse = false,
  duration = "55s",
}: {
  items: Skill[];
  reverse?: boolean;
  duration?: string;
}) {
  const animationClass = reverse
    ? "animate-marquee-reverse"
    : "animate-marquee";

  return (
    <div
      className="group relative flex overflow-hidden py-2.5 sm:py-3.5 [--gap:2.5rem] sm:[--gap:4.5rem] [gap:var(--gap)] select-none"
      style={{ ["--duration" as string]: duration }}
    >
      <div
        className={`flex shrink-0 items-center justify-around [gap:var(--gap)] ${animationClass} flex-row group-hover:[animation-play-state:paused]`}
      >
        {items.map((skill, idx) => (
          <span
            key={`${skill.name}-1-${idx}`}
            className="text-base sm:text-xl font-medium tracking-tight text-zinc-400 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-default"
          >
            {skill.name}
          </span>
        ))}
      </div>
      <div
        className={`flex shrink-0 items-center justify-around [gap:var(--gap)] ${animationClass} flex-row group-hover:[animation-play-state:paused]`}
        aria-hidden="true"
      >
        {items.map((skill, idx) => (
          <span
            key={`${skill.name}-2-${idx}`}
            className="text-base sm:text-xl font-medium tracking-tight text-zinc-400 hover:text-white transition-colors duration-200 whitespace-nowrap cursor-default"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  // Partition all skills into 3 balanced, rich 10-skill text rows
  const row1 = [
    ...skills.filter((s) => s.category === "frontend"),
    ...skills.filter((s) => s.name === "Node.js" || s.name === "REST APIs"),
  ];

  const row2 = [
    ...skills.filter(
      (s) =>
        s.category === "backend" &&
        s.name !== "Node.js" &&
        s.name !== "REST APIs"
    ),
    ...skills.filter((s) => s.category === "database"),
  ];

  const row3 = [
    ...skills.filter((s) => s.category === "ai"),
    ...skills.filter((s) => s.category === "devops" || s.category === "tools"),
  ];

  return (
    <section id="skills" className="relative py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8 sm:mb-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill pill-accent mb-3 inline-block">
            Technologies
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-xl mx-auto">
            Full-stack architectures, applied machine learning, enterprise databases, and modern developer tooling.
          </p>
        </motion.div>
      </div>

      {/* 3-Row Minimalist Horizontal Text Scroll */}
      <div className="relative flex w-full flex-col gap-2 sm:gap-3 overflow-hidden">
        {/* Soft edge blur gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 sm:w-48 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 sm:w-48 bg-gradient-to-l from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent" />

        {/* Row 1: Slow leftward marquee (55s) */}
        <MarqueeRow items={row1} reverse={false} duration="55s" />

        {/* Row 2: Slow rightward reverse marquee (65s) */}
        <MarqueeRow items={row2} reverse={true} duration="65s" />

        {/* Row 3: Slow leftward marquee (50s) */}
        <MarqueeRow items={row3} reverse={false} duration="50s" />
      </div>
    </section>
  );
}
