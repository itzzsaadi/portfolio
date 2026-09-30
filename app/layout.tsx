import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saad Naseer — Full Stack Developer & Applied AI Integrator",
  description:
    "Portfolio of Saad Naseer — a Full Stack Developer and Applied AI Integrator based in Lahore, Pakistan. Building production-grade web applications and AI-powered tools with Next.js, TypeScript, React, Python, and fine-tuned LLMs.",
  keywords: [
    "Saad Naseer",
    "Full Stack Developer",
    "AI Integrator",
    "Next.js",
    "TypeScript",
    "React",
    "Python",
    "Portfolio",
    "Lahore",
    "Pakistan",
  ],
  openGraph: {
    title: "Saad Naseer — Full Stack Developer & Applied AI Integrator",
    description:
      "Building production-grade web applications and AI-powered tools.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-inter)]">
        <div className="ambient-grid" aria-hidden="true" />
        <div className="dot-grid" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
