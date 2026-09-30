"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X, Search } from "lucide-react";
import { navLinks } from "@/data/portfolioData";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const commandItems = [
  ...navLinks.map((link) => ({
    id: link.href,
    label: `Go to ${link.label}`,
    action: () => {
      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
    },
    section: "Navigation",
  })),
  {
    id: "resume",
    label: "Download Resume",
    action: () => window.open("/Saad_Naseer_CV_Latest.pdf", "_blank"),
    section: "Actions",
  },
  {
    id: "github",
    label: "Open GitHub Profile",
    action: () => window.open("https://github.com/itzzsaadi", "_blank"),
    section: "Actions",
  },
  {
    id: "linkedin",
    label: "Open LinkedIn Profile",
    action: () =>
      window.open(
        "https://www.linkedin.com/in/saad-naseer-b66ba617b/",
        "_blank"
      ),
    section: "Actions",
  },
  {
    id: "email",
    label: "Send Email",
    action: () => window.open("mailto:saadnaseer146@gmail.com", "_blank"),
    section: "Actions",
  },
];

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = commandItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback(
    (index: number) => {
      const item = filtered[index];
      if (item) {
        item.action();
        onClose();
      }
    },
    [filtered, onClose]
  );

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSelect(selectedIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered.length, selectedIndex, handleSelect]);

  // Group filtered items by section
  const sections = filtered.reduce<Record<string, typeof filtered>>((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  let globalIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg mx-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-black/40"
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
                <Search className="h-5 w-5 text-[var(--color-text-muted)]" />
                <input
                  id="command-palette-input"
                  type="text"
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="flex items-center gap-1 rounded-md border border-[var(--color-border)] px-2 py-0.5 text-xs text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-secondary)]"
                >
                  <span>ESC</span>
                </button>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
                    No results found.
                  </div>
                ) : (
                  Object.entries(sections).map(([section, items]) => (
                    <div key={section}>
                      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        {section}
                      </div>
                      {items.map((item) => {
                        globalIndex++;
                        const idx = globalIndex;
                        return (
                          <button
                            key={item.id}
                            id={`command-item-${item.id}`}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                              idx === selectedIndex
                                ? "bg-[var(--color-accent-glow)] text-[var(--color-accent-hover)]"
                                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-card)]"
                            }`}
                            onClick={() => handleSelect(idx)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                          >
                            <Command className="h-4 w-4 opacity-50" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2 text-xs text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-card)] px-1.5 py-0.5 font-mono text-[10px]">↑↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-card)] px-1.5 py-0.5 font-mono text-[10px]">↵</kbd>
                  <span>Select</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
