"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { testimonials } from "@/data/portfolioData";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (prevIdx) => (prevIdx - 1 + testimonials.length) % testimonials.length
    );

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill pill-accent mb-4 inline-block">Testimonials</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            What People{" "}
            <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-glow)]">
            <Quote className="h-6 w-6 text-[var(--color-accent)]" />
          </div>

          {/* Quote Content */}
          <div className="min-h-[280px] sm:min-h-[220px] pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="mb-8 text-lg leading-relaxed text-[var(--color-text-secondary)] italic sm:text-xl">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] text-lg font-bold text-white">
                    {current.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <div className="font-semibold text-[var(--color-text-primary)]">
                      {current.author}
                    </div>
                    <div className="text-sm text-[var(--color-text-muted)]">
                      {current.role}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-accent-hover)]">
                      <Building2 className="h-3 w-3" />
                      {current.organization}
                    </div>
                  </div>
                </div>

                {/* Context Badge */}
                <div className="mt-4">
                  <span className="pill pill-emerald text-xs">
                    {current.context}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 bg-[var(--color-accent)]"
                      : "w-2 bg-[var(--color-elevated)] hover:bg-[var(--color-text-muted)]"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                id="testimonial-prev"
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                id="testimonial-next"
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
