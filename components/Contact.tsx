"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { profile, FORMSPREE_ENDPOINT } from "@/data/portfolioData";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill pill-accent mb-4 inline-block">Contact</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Let&apos;s Work{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <motion.div
            className="space-y-6 lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="mb-6 text-lg font-semibold">Get in Touch</h3>

              <div className="space-y-5">
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center gap-4 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-glow)] transition-all group-hover:bg-[var(--color-accent)] group-hover:text-white">
                    <Mail className="h-5 w-5 text-[var(--color-accent)] group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-text-muted)]">Email</div>
                    <div>{profile.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="group flex items-center gap-4 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-emerald-glow)] transition-all group-hover:bg-[var(--color-emerald)] group-hover:text-white">
                    <Phone className="h-5 w-5 text-[var(--color-emerald)] group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-text-muted)]">Phone</div>
                    <div>{profile.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(139,92,246,0.15)]">
                    <MapPin className="h-5 w-5 text-[var(--color-accent-secondary)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-text-muted)]">Location</div>
                    <div>{profile.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex items-center gap-3">
                <a
                  href="https://github.com/itzzsaadi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/saad-naseer-b66ba617b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  className="mt-4 flex items-center gap-2 rounded-lg bg-[var(--color-emerald-glow)] px-4 py-3 text-sm text-[var(--color-emerald)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  className="mt-4 flex items-center gap-2 rounded-lg bg-[rgba(244,63,94,0.1)] px-4 py-3 text-sm text-[var(--color-rose)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-5 w-5" />
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}

              <button
                id="contact-submit"
                type="submit"
                disabled={status === "loading"}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-xl hover:shadow-[var(--color-accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-24 border-t border-[var(--color-border)] pt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Saad Naseer. Built with Next.js, TypeScript
          & Framer Motion.
        </p>
      </motion.footer>
    </section>
  );
}
