"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Download } from "lucide-react";
import { navLinks, profile } from "@/data/portfolioData";
import CommandPalette from "./CommandPalette";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Command palette shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-[var(--color-accent)]">&lt;</span>
            SN
            <span className="text-[var(--color-accent)]"> /&gt;</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === link.href
                    ? "text-[var(--color-accent-hover)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {activeSection === link.href && (
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-[var(--color-accent-glow)]"
                    layoutId="nav-active"
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              id="command-trigger"
              onClick={() => setIsCommandOpen(true)}
              className="hidden items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-secondary)] md:flex"
            >
              <Command className="h-3 w-3" />
              <span>Ctrl K</span>
            </button>

            {/* Resume Download */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--color-accent-hover)] hover:shadow-lg hover:shadow-[var(--color-accent-glow)] md:flex"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              className="rounded-lg p-2 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] md:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              className="glass border-t border-[var(--color-border)] md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-card)] hover:text-[var(--color-text-primary)]"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-sm font-medium text-white"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Command Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
}
