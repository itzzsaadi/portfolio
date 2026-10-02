"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant?: "accent" | "emerald" | "amber";
  };
  children: React.ReactNode;
}

export default function DetailModal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
}: DetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const badgeClass =
    badge?.variant === "emerald"
      ? "pill-emerald"
      : badge?.variant === "amber"
      ? "pill-amber"
      : "pill-accent";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-black/60 flex flex-col"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-6 py-5 bg-[var(--color-card)]/50">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] truncate">
                    {title}
                  </h3>
                  {badge && (
                    <span className={`pill ${badgeClass} text-xs`}>
                      {badge.text}
                    </span>
                  )}
                </div>
                {subtitle && (
                  <p className="text-sm text-[var(--color-accent-hover)]">
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-elevated)]"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-[var(--color-text-secondary)]">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
