

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { personalInfo } from "@/data/personal";

const LogoImage = ({ company, link }: { company: string; link?: string }) => {
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

  const imageContent = (
    <div className="relative h-[80px] w-[80px] shrink-0 overflow-hidden rounded-lg bg-white/80 dark:bg-slate-900/60">
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

  if (link) {
    return (
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="transition hover:opacity-80"
      >
        {imageContent}
      </Link>
    );
  }

  return imageContent;
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
              <LogoImage company={role.company} link={role.link} />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {role.link ? (
                      <Link
                        href={role.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold hover:underline transition"
                      >
                        {role.company}
                      </Link>
                    ) : (
                      <h2 className="text-lg font-semibold">{role.company}</h2>
                    )}
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
                    // Map paper titles to their links
                    const paperLinks: Record<string, string> = {
                      "Deep Learning Modeling and Increasing Interpretability of Lung Nodule Classification": "https://ieeexplore.ieee.org/abstract/document/10607434/",
                      "AI-Based Detection of Autism Spectrum Disorder Using Linguistic Features": "https://ieeexplore.ieee.org/abstract/document/10585946",
                    };
                    
                    const parts: (string | React.ReactElement)[] = [];
                    let remaining = line;
                    let linkKeyCounter = 0;
                    
                    // Keep processing until no more titles are found
                    let foundAny = true;
                    while (foundAny && remaining) {
                      foundAny = false;
                      let earliestMatch: { title: string; url: string; index: number } | null = null;
                      
                      // Find the earliest matching title
                      for (const [title, url] of Object.entries(paperLinks)) {
                        const titleIndex = remaining.indexOf(title);
                        if (titleIndex !== -1 && (!earliestMatch || titleIndex < earliestMatch.index)) {
                          earliestMatch = { title, url, index: titleIndex };
                          foundAny = true;
                        }
                      }
                      
                      if (earliestMatch) {
                        // Add text before the title
                        if (earliestMatch.index > 0) {
                          parts.push(remaining.substring(0, earliestMatch.index));
                        }
                        
                        // Add the linked title
                        parts.push(
                          <Link
                            key={`link-${idx}-${linkKeyCounter++}`}
                            href={earliestMatch.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline transition"
                          >
                            {earliestMatch.title}
                          </Link>
                        );
                        
                        // Update remaining text
                        remaining = remaining.substring(earliestMatch.index + earliestMatch.title.length);
                      }
                    }
                    
                    // Add any remaining text
                    if (remaining) {
                      parts.push(remaining);
                    }
                    
                    // If no parts were created (no titles found), just use the original line
                    if (parts.length === 0) {
                      parts.push(line);
                    }
                    
                    return (
                      <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                        {parts}
                      </p>
                    );
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

