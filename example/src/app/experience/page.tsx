"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { personalInfo } from "@/data/personal";

const LogoImage = ({ company }: { company: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  // Remove all quotes (regular, curly, single), parentheses, and special chars, then slugify
  const slug = company
    .toLowerCase()
    .replace(/["""''`]/g, "")
    .replace(/[()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const imagePath = `/works/${slug}/logo.png`;

  return (
    <div className="relative h-full min-h-[80px] w-[80px] shrink-0 overflow-hidden rounded-lg bg-white/80 dark:bg-slate-900/60">
      {!imageError && (
        <Image
          src={imagePath}
          alt={`${company} logo`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      {(!imageLoaded || imageError) && (
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/60" />
      )}
    </div>
  );
};

const filters = [
  { key: "all", label: "All" },
  { key: "industry", label: "Industry" },
  { key: "research", label: "Research" },
  { key: "other", label: "Other" },
] as const;

export default function ExperiencePage() {
  const { experience } = personalInfo;
  const [active, setActive] = useState<(typeof filters)[number]["key"]>("all");

  const filtered = useMemo(
    () =>
      experience
        .filter((e) => e.type !== "harvard")
        .filter((e) => (active === "all" ? true : e.type === active)),
    [active, experience]
  );

  return (
    <div className="space-y-5 -mt-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`pill text-sm transition ${
              active === f.key
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100"
                : "bg-white/70 text-neutral-800 dark:bg-slate-800/60 dark:text-slate-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="card max-h-[70vh] overflow-y-auto space-y-3 p-4">
        {filtered.map((role) => (
          <article
            key={`${role.company}-${role.role}`}
            className="rounded-xl border border-[var(--border)] bg-white/80 p-4 shadow-sm dark:bg-slate-900/60"
          >
            <div className="flex items-stretch gap-5">
              <LogoImage company={role.company} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{role.company}</h2>
                    <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-slate-400">{role.role}</p>
                  </div>
                  {role.status && (
                    <span className={`pill text-xs font-medium ${
                      role.status === "current"
                        ? "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                    }`}>
                      {role.status === "current" ? "Current" : "Upcoming"}
                    </span>
                  )}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-slate-300">
                  {role.summary.split('\n').map((line, idx) => {
                    // Check if line contains a paper title (starts with quote)
                    if (line.trim().startsWith('"')) {
                      const parts = line.split('"');
                      if (parts.length >= 3) {
                        const paperTitle = parts[1];
                        const rest = parts.slice(2).join('"');
                        return (
                          <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                            <em>{paperTitle}</em>
                            {rest}
                          </p>
                        );
                      }
                    }
                    return <p key={idx} className={idx > 0 ? "mt-2" : ""}>{line}</p>;
                  })}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

