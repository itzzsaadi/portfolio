"use client";

import { useEffect, useRef } from "react";

export interface TubesColorPreset {
  name: string;
  tubes: string[];
  lights: [string, string, string, string];
}

// Curated palettes harmonized with the website's dark aesthetic (#09090b + neon accents) with softened tones
export const THEME_PALETTES: TubesColorPreset[] = [
  // 1. Primary Website Theme (Indigo -> Violet -> Rose) - softened
  {
    name: "Cyber Indigo & Rose",
    tubes: ["#4f46e5", "#7c3aed", "#e11d48"],
    lights: ["#4338ca", "#6d28d9", "#be123c", "#2563eb"],
  },
  // 2. AI Tech Cyan & Sky Blue - softened
  {
    name: "Electric Cyan & Blue",
    tubes: ["#0891b2", "#0284c7", "#4f46e5"],
    lights: ["#0e7490", "#0369a1", "#4338ca", "#6366f1"],
  },
  // 3. Matrix & Terminal Cyber Emerald - softened
  {
    name: "Matrix Emerald",
    tubes: ["#059669", "#10b981", "#0891b2"],
    lights: ["#047857", "#059669", "#0f766e", "#0284c7"],
  },
  // 4. Vibrant Neon Sunset & Amber - softened
  {
    name: "Neon Sunset",
    tubes: ["#e11d48", "#d97706", "#7c3aed"],
    lights: ["#be123c", "#b45309", "#9333ea", "#4f46e5"],
  },
  // 5. Deep Ultraviolet & Fuchsia Dream - softened
  {
    name: "Ultraviolet Dream",
    tubes: ["#7c3aed", "#c026d3", "#0284c7"],
    lights: ["#6d28d9", "#a21caf", "#0369a1", "#4f46e5"],
  },
];

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<any>(null);
  const paletteIndexRef = useRef(0);

  useEffect(() => {
    let isMounted = true;
    let cleanupClick: (() => void) | null = null;

    async function initTubes() {
      if (!canvasRef.current || typeof window === "undefined") return;

      try {
        let TubesCursorModule: any = null;

        // Try local bundled script first
        try {
          const mod = await new Function("url", "return import(url)")(
            "/scripts/tubes1.min.js"
          );
          TubesCursorModule = mod.default || mod;
        } catch {
          // Fallback to CDN if needed
          const mod = await new Function("url", "return import(url)")(
            "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
          );
          TubesCursorModule = mod.default || mod;
        }

        if (!isMounted || !canvasRef.current || !TubesCursorModule) return;

        const isMobile = window.innerWidth < 768;
        const initialPalette = THEME_PALETTES[paletteIndexRef.current];

        const app = TubesCursorModule(canvasRef.current, {
          bloom: {
            threshold: 0,
            strength: isMobile ? 1.2 : 1.6,
            radius: 0.5,
          },
          tubes: {
            count: isMobile ? 10 : 16,
            colors: initialPalette.tubes,
            minRadius: 0.006,
            maxRadius: isMobile ? 0.035 : 0.048,
            minTubularSegments: isMobile ? 24 : 36,
            maxTubularSegments: isMobile ? 64 : 128,
            material: {
              metalness: 0.9,
              roughness: 0.35,
            },
            lights: {
              intensity: 220,
              colors: initialPalette.lights,
            },
            lerp: 0.48,
            noise: 0.04,
          },
          sleepRadiusX: isMobile ? 140 : 260,
          sleepRadiusY: isMobile ? 80 : 130,
          sleepTimeScale1: 0.8,
          sleepTimeScale2: 1.5,
        });

        if (!isMounted) {
          app?.dispose?.();
          return;
        }

        appRef.current = app;

        // Click to cycle color palettes across the entire website
        const handleClick = (e: MouseEvent) => {
          if (!appRef.current?.tubes) return;

          // Don't cycle when typing in input/textarea/editable fields
          const target = e.target as HTMLElement | null;
          if (
            target &&
            (target.tagName === "INPUT" ||
              target.tagName === "TEXTAREA" ||
              target.isContentEditable)
          ) {
            return;
          }

          paletteIndexRef.current =
            (paletteIndexRef.current + 1) % THEME_PALETTES.length;
          const next = THEME_PALETTES[paletteIndexRef.current];

          try {
            appRef.current.tubes.setColors(next.tubes);
            appRef.current.tubes.setLightsColors(next.lights);
          } catch (err) {
            console.error("Failed to update tubes colors:", err);
          }
        };

        window.addEventListener("click", handleClick);
        cleanupClick = () => window.removeEventListener("click", handleClick);
      } catch (err) {
        console.warn("Tubes cursor initialization failed or unsupported:", err);
      }
    }

    initTubes();

    return () => {
      isMounted = false;
      cleanupClick?.();
      try {
        appRef.current?.dispose?.();
      } catch {
        // Safe disposal
      }
      appRef.current = null;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 h-screen w-screen overflow-hidden opacity-100"
      style={{ pointerEvents: "none", mixBlendMode: "screen" }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none block h-full w-full"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
