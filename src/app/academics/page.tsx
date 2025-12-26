

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

export default function SchoolPage() {
  const harvardRoles = personalInfo.experience.filter((e) => e.type === "harvard");
  const classes = personalInfo.classes;
  const organizations = personalInfo.organizations;

  // Map roles for scrollable list - first three get a star
  const roleItems = harvardRoles.map((role, idx) => ({
    type: "role" as const,
    company: role.company,
    role: role.role,
    summary: role.summary,
    status: role.status,
    link: role.link,
    isStarred: idx < 3, // First three roles get a star
  }));

  // Map organizations
  const organizationItems = (organizations || []).map((org) => {
    const orgName = typeof org === "string" ? org : org.name;
    const orgLink = typeof org === "string" ? undefined : org.link;
    return {
      type: "organization" as const,
      company: orgName,
      role: "Member",
      status: "current" as const,
      link: orgLink,
    };
  });

  // Combine all items
  const allItems = [...roleItems, ...organizationItems];

  // Categorize classes
  const csTechClasses = [
    "Data Structures & Algorithms",
    "Neural Networks",
    "Compilers & Interpreters",
    "Computer Architecture",
    "Expert Systems",
    "History of Technology Seminar",
  ];
  const mathClasses = [
    "Probability",
    "Vector Calculus",
    "Linear Algebra",
    "Multivariate Calculus",
    "Differential Equations",
    "Discrete Mathematics"
  ];

  const csTechFiltered = classes.filter((c) => csTechClasses.includes(c));
  const mathFiltered = classes.filter((c) => mathClasses.includes(c));

  return (
    <div className="space-y-8 -mt-4">
      <div className="card max-h-[70vh] overflow-y-auto space-y-3 p-4">
        {allItems.map((item, idx) => {
          const isStarred = item.type === "role" && (item as typeof roleItems[0]).isStarred;
          
          return (
            <article
              key={`${item.company}-${item.role}`}
              className="rounded-xl border border-[var(--border)] bg-white/80 p-4 shadow-sm dark:bg-slate-900/60"
            >
              <div className="flex items-stretch gap-5">
                <LogoImage company={item.company} link={item.link} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {item.link ? (
                        <Link
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold hover:underline transition"
                        >
                          {isStarred && <span className="text-neutral-700 dark:text-white mr-1.5">★</span>}
                          {item.company}
                        </Link>
                      ) : (
                        <h2 className="text-lg font-semibold">
                          {isStarred && <span className="text-neutral-700 dark:text-white mr-1.5">★</span>}
                          {item.company}
                        </h2>
                      )}
                      <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-slate-400">{item.role}</p>
                    </div>
                    {item.status && (
                      <span className={`pill text-xs font-medium ${
                        item.status === "current"
                          ? "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                      }`}>
                        {item.status === "current" ? "Current" : "Upcoming"}
                      </span>
                    )}
                  </div>
                  {item.type === "role" && item.summary && (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-slate-300">{item.summary}</p>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="card space-y-4 !pt-4 !px-8 !pb-8">
        <h2 className="text-lg font-semibold pt-2">Classes</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-slate-400 mb-2">CS / Tech</h3>
            <ul className="space-y-1.5 text-sm text-neutral-800 dark:text-slate-200">
              {csTechFiltered.map((c) => (
                <li key={c} className="flex gap-2 items-start">
                  <span aria-hidden className="text-indigo-500 mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-slate-400 mb-2">Math</h3>
            <ul className="space-y-1.5 text-sm text-neutral-800 dark:text-slate-200">
              {mathFiltered.map((c) => (
                <li key={c} className="flex gap-2 items-start">
                  <span aria-hidden className="text-indigo-500 mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="card space-y-4 !pt-4 !px-8 !pb-8">
        <h2 className="text-lg font-semibold pt-2">Awards</h2>
        <ul className="space-y-1.5 text-sm text-neutral-800 dark:text-slate-200">
          <li className="flex gap-2 items-start">
            <span aria-hidden className="text-indigo-500 mt-0.5">•</span>
            <span>4x American Invitational Mathematics Examination (AIME) Qualifier</span>
          </li>
          <li className="flex gap-2 items-start">
            <span aria-hidden className="text-indigo-500 mt-0.5">•</span>
            <span>USA Computing Olympiad (USACO) Gold Qualifier</span>
          </li>
          <li className="flex gap-2 items-start">
            <span aria-hidden className="text-indigo-500 mt-0.5">•</span>
            <span>3x North American Computational Linguistics Olympiad (NACLO) Invitational Qualifier</span>
          </li>
          <li className="flex gap-2 items-start">
            <span aria-hidden className="text-indigo-500 mt-0.5">•</span>
            <span>USA Biology Olympiad Honorable Mention</span>
          </li>
          <li className="flex gap-2 items-start">
            <span aria-hidden className="text-indigo-500 mt-0.5">•</span>
            <span>1st Place & Grand Prize Alternate for ISEF at Synopsys</span>
          </li>
          <li className="flex gap-2 items-start">
            <span aria-hidden className="text-indigo-500 mt-0.5">•</span>
            <span>1st Place at California Science Fair (CSEF)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

