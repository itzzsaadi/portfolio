"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  Star,
  GitFork,
  ExternalLink,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { GithubIcon } from "./Icons";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

const GITHUB_USERNAME = "itzzsaadi";

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Go: "#00ADD8",
};

export default function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
          ),
        ]);

        if (userRes.status === 403 || reposRes.status === 403) {
          setError("GitHub API rate limit reached. Stats will refresh shortly.");
          setLoading(false);
          return;
        }

        if (!userRes.ok || !reposRes.ok) {
          setError("Unable to fetch GitHub data.");
          setLoading(false);
          return;
        }

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        setUser(userData);
        setRepos(reposData);
        setLoading(false);
      } catch {
        setError("Unable to connect to GitHub.");
        setLoading(false);
      }
    };

    fetchGitHub();
  }, []);

  // Fallback data for rate-limited state
  const fallbackStats = {
    repos: 15,
    followers: 5,
    following: 10,
  };

  const displayUser = user || null;

  return (
    <section id="github" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="pill pill-accent mb-4 inline-block">Open Source</span>
          <h2 className="text-3xl font-bold sm:text-4xl">
            GitHub{" "}
            <span className="gradient-text">Activity</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Live statistics from{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-hover)] hover:underline"
            >
              @{GITHUB_USERNAME}
            </a>
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[var(--color-accent)]" />
          </div>
        ) : (
          <>
            {/* Error Notice */}
            {error && (
              <motion.div
                className="mx-auto mb-8 flex max-w-lg items-center gap-3 rounded-xl border border-[rgba(245,158,11,0.2)] bg-[rgba(245,158,11,0.1)] px-4 py-3 text-sm text-[var(--color-amber)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Stats Cards */}
            <motion.div
              className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {[
                {
                  icon: BookOpen,
                  label: "Public Repos",
                  value: displayUser?.public_repos ?? fallbackStats.repos,
                  color: "text-[var(--color-accent)]",
                  bg: "bg-[var(--color-accent-glow)]",
                },
                {
                  icon: Users,
                  label: "Followers",
                  value: displayUser?.followers ?? fallbackStats.followers,
                  color: "text-[var(--color-emerald)]",
                  bg: "bg-[var(--color-emerald-glow)]",
                },
                {
                  icon: Users,
                  label: "Following",
                  value: displayUser?.following ?? fallbackStats.following,
                  color: "text-[var(--color-accent-secondary)]",
                  bg: "bg-[rgba(139,92,246,0.15)]",
                },
                {
                  icon: Star,
                  label: "Total Stars",
                  value: repos.reduce((acc, r) => acc + r.stargazers_count, 0),
                  color: "text-[var(--color-amber)]",
                  bg: "bg-[rgba(245,158,11,0.15)]",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card flex flex-col items-center rounded-2xl p-6 text-center"
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Recent Repos */}
            {repos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="mb-6 text-center text-lg font-semibold text-[var(--color-text-secondary)]">
                  Recently Updated Repositories
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {repos.map((repo, index) => (
                    <motion.a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card group flex flex-col rounded-xl p-5 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-hover)]">
                          <GithubIcon className="h-4 w-4" />
                          <span className="truncate">{repo.name}</span>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>

                      <p className="mb-3 flex-1 text-xs leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
                        {repo.description || "No description"}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                        {repo.language && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  langColors[repo.language] || "#8b949e",
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            {repo.forks_count}
                          </span>
                        )}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
              >
                <GithubIcon className="h-4 w-4" />
                View Full Profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
