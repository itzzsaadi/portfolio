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
  Clock,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./Icons";
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
    <section id="contact" className="relative py-12 sm:py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="pill pill-accent mb-3 inline-block">Contact</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Have a project, role, or question? Send a message and I&apos;ll get back to you promptly.
          </p>
        </motion.div>

        {/* Aligned Cards Grid */}
        <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch">
          {/* Left: Contact Info Card (5 cols) */}
          <motion.div
            className="lg:col-span-5 h-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card flex h-full flex-col justify-between rounded-2xl p-4 sm:p-5">
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                      Get in Touch
                    </h3>
                    <span className="pill pill-emerald text-[10px] px-2 py-0.5">
                      Available
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    Always open to new opportunities, contracts & challenges.
                  </p>
                </div>

                {/* Compact Contact Items */}
                <div className="space-y-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)]/50 px-3 py-2 text-xs transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-card)]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent-glow)] text-[var(--color-accent)] transition-all group-hover:bg-[var(--color-accent)] group-hover:text-white">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-[var(--color-text-muted)]">Email</div>
                      <div className="truncate font-medium text-[var(--color-text-primary)]">{profile.email}</div>
                    </div>
                  </a>

                  <a
                    href={profile.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)]/50 px-3 py-2 text-xs transition-all hover:border-[#25D366] hover:bg-[var(--color-card)]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(37,211,102,0.15)] text-[#25D366] transition-all group-hover:bg-[#25D366] group-hover:text-white">
                      <WhatsappIcon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-[var(--color-text-muted)]">WhatsApp</div>
                      <div className="truncate font-medium text-[var(--color-text-primary)]">{profile.whatsapp}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${profile.phone}`}
                    className="group flex items-center gap-3 rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)]/50 px-3 py-2 text-xs transition-all hover:border-[var(--color-emerald)] hover:bg-[var(--color-card)]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-emerald-glow)] text-[var(--color-emerald)] transition-all group-hover:bg-[var(--color-emerald)] group-hover:text-white">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-[var(--color-text-muted)]">Phone</div>
                      <div className="truncate font-medium text-[var(--color-text-primary)]">{profile.phone}</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-surface)]/50 px-3 py-2 text-xs">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(139,92,246,0.15)] text-[var(--color-accent-secondary)]">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] text-[var(--color-text-muted)]">Location</div>
                      <div className="truncate font-medium text-[var(--color-text-primary)]">{profile.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom: Fast Response pill & Social Icons */}
              <div className="mt-4 pt-3.5 border-t border-[var(--color-border)] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-text-muted)]">
                  <Clock className="h-3 w-3 text-[var(--color-emerald)] shrink-0" />
                  <span>Replies within 24h</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <a
                    href="https://github.com/itzzsaadi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-white hover:bg-[var(--color-card)]"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/saad-naseer-b66ba617b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-white hover:bg-[var(--color-card)]"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form Card (7 cols) */}
          <motion.div
            className="lg:col-span-7 h-full"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card flex h-full flex-col justify-between rounded-2xl p-4 sm:p-5"
            >
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1 block text-[11px] font-medium text-[var(--color-text-secondary)]"
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
                      className="w-full rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-card)] px-3 py-2 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1 block text-[11px] font-medium text-[var(--color-text-secondary)]"
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
                      className="w-full rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-card)] px-3 py-2 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-1 block text-[11px] font-medium text-[var(--color-text-secondary)]"
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
                    placeholder="Project Inquiry, Opportunity, etc."
                    className="w-full rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-card)] px-3 py-2 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1 block text-[11px] font-medium text-[var(--color-text-secondary)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full resize-none rounded-xl border border-[var(--color-border)]/60 bg-[var(--color-card)] px-3 py-2 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>

                {/* Feedback notifications */}
                {status === "success" && (
                  <motion.div
                    className="flex items-center gap-2 rounded-xl bg-[var(--color-emerald-glow)] border border-[rgba(16,185,129,0.3)] px-3 py-2 text-xs text-[var(--color-emerald)]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    className="flex items-center gap-2 rounded-xl bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.3)] px-3 py-2 text-xs text-[var(--color-rose)]"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>Something went wrong. Please try again or email directly.</span>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="contact-submit"
                type="submit"
                disabled={status === "loading"}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent-glow)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-12 sm:mt-14 border-t border-[var(--color-border)] pt-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-xs text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Saad Naseer
        </p>
      </motion.footer>
    </section>
  );
}
