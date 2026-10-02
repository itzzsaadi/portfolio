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
    <section id="testimonials" className="relative py-12 sm:py-16 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill pill-accent mb-3 inline-block">Testimonials</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            What People <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="glass-card relative overflow-hidden rounded-2xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Quote Icon */}
          <div className="absolute top-5 left-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-glow)]">
            <Quote className="h-5 w-5 text-[var(--color-accent)]" />
          </div>

          {/* Quote Content */}
          <div className="min-h-[160px] sm:min-h-[140px] pt-6 sm:pt-4 sm:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="mb-5 text-base leading-relaxed text-[var(--color-text-secondary)] italic sm:text-lg">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] text-sm font-bold text-white">
                      {current.author
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <div className="font-semibold text-sm text-[var(--color-text-primary)]">
                        {current.author}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">
                        {current.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="pill pill-emerald text-[11px]">
                      {current.context}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between pt-2">
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-6 bg-[var(--color-accent)]"
                      : "w-1.5 bg-[var(--color-elevated)] hover:bg-[var(--color-text-muted)]"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                id="testimonial-prev"
                onClick={prev}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                id="testimonial-next"
                onClick={next}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
