"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolioData";
import Image from "next/image";

const roles = [
  "Full Stack Developer",
  "Applied AI Integrator",
  "Next.js Engineer",
  "Python & ML Builder",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.slice(0, displayText.length - 1)
          : currentRole.slice(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left: Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Status Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-emerald)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-emerald)]" />
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          {/* Typing Role */}
          <motion.div
            className="mb-6 h-10 text-xl font-medium text-[var(--color-text-secondary)] sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span>{displayText}</span>
            <span className="ml-0.5 inline-block w-0.5 h-6 bg-[var(--color-accent)] animate-pulse" />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="mb-8 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] lg:text-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {profile.bio}
          </motion.p>

          {/* Location & Education */}
          <motion.div
            className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--color-text-muted)] lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
              {profile.location}
            </span>
            <span className="hidden sm:inline text-[var(--color-border)]">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[var(--color-accent-secondary)]" />
              {profile.education.degree} · {profile.education.cgpa}
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="#projects"
              id="cta-projects"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-xl hover:shadow-[var(--color-accent-glow)]"
            >
              View My Work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              id="cta-contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition-all hover:border-[var(--color-border-hover)] hover:bg-[var(--color-card)]"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Avatar */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Glow ring */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[var(--color-accent)] via-[var(--color-accent-secondary)] to-[var(--color-emerald)] opacity-20 blur-2xl animate-pulse" />

          {/* Avatar container */}
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-[var(--color-border)] sm:h-80 sm:w-80">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 256px, 320px"
            />
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs font-medium shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[var(--color-emerald)]">●</span>
            <span className="text-[var(--color-text-secondary)]">{profile.education.institution.split("(")[1]?.replace(")", "") || "UCP"}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="h-5 w-5 text-[var(--color-text-muted)]" />
      </motion.div>
    </section>
  );
}
