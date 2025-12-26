"use client";

import Image from "next/image";
import { useState } from "react";
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

const SmallLogoImage = ({ organization }: { organization: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  // Remove all quotes (regular, curly, single), parentheses, and special chars, then slugify
  const slug = organization
    .toLowerCase()
    .replace(/["""''`]/g, "")
    .replace(/[()]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const imagePath = `/works/${slug}/logo.png`;

  return (
    <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-lg bg-white/80 dark:bg-slate-900/60">
      {!imageError && (
        <Image
          src={imagePath}
          alt={`${organization} logo`}
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

export default function SchoolPage() {
  const harvardRoles = personalInfo.experience.filter((e) => e.type === "harvard");
  const classes = personalInfo.classes;
  const organizations = personalInfo.organizations;

  // Map roles for scrollable list
  const roleItems = harvardRoles.map((role) => ({
    type: "role" as const,
    company: role.company,
    role: role.role,
    summary: role.summary,
    status: role.status,
  }));

  // Map organizations for grid display
  const organizationItems = (organizations || []).map((org) => ({
    type: "organization" as const,
    company: org,
    role: "Member",
    status: "current" as const,
  }));

  // Combine all items
  const allItems = [...roleItems, ...organizationItems];

  // Categorize classes
  const csTechClasses = [
    "Data Structures & Algorithms (COMPSCI 1200)",
    "Neural Networks",
    "Compilers & Interpreters",
    "Computer Architecture",
    "Expert Systems",
    "History of Technology Seminar (FYS 58D)",
  ];
  const mathClasses = [
    "Probability (STAT 110)",
    "Vector Calculus (MATH 22A)",
    "Linear Algebra",
    "Multivariate Calculus",
    "Differential Equations",
    "Discrete Mathematics"
  ];

  const csTechFiltered = classes.filter((c) => csTechClasses.includes(c));
  const mathFiltered = classes.filter((c) => mathClasses.includes(c));

  return (
    <div className="space-y-5 -mt-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Academic</h1>
      </div>

      <div className="card max-h-[70vh] overflow-y-auto space-y-3 p-4">
        {allItems.map((item, idx) => {
          const isOrganization = item.type === "organization";
          const isFirstOrganization = isOrganization && idx > 0 && allItems[idx - 1].type === "role";
          
          // Check if we need to start a grid for organizations
          const shouldStartGrid = isFirstOrganization;
          const isLastOrganization = isOrganization && (idx === allItems.length - 1 || allItems[idx + 1].type === "role");
          
          if (shouldStartGrid) {
            // Find all consecutive organizations
            const orgGroup: typeof allItems = [];
            let i = idx;
            while (i < allItems.length && allItems[i].type === "organization") {
              orgGroup.push(allItems[i]);
              i++;
            }
            
            return (
              <div key={`org-group-${idx}`} className="grid gap-3 sm:grid-cols-2">
                {orgGroup.map((orgItem) => (
                  <article
                    key={orgItem.company}
                    className="rounded-xl border border-[var(--border)] bg-white/80 p-3 shadow-sm dark:bg-slate-900/60"
                  >
                    <div className="flex items-stretch gap-3">
                      <SmallLogoImage organization={orgItem.company} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h2 className="text-sm font-semibold">{orgItem.company}</h2>
                            <p className="mt-1 text-xs font-medium text-neutral-600 dark:text-slate-400">{orgItem.role}</p>
                          </div>
                          {orgItem.status && (
                            <span className={`pill text-xs font-medium ${
                              orgItem.status === "current"
                                ? "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                                : "bg-slate-100 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                            }`}>
                              {orgItem.status === "current" ? "Current" : "Upcoming"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            );
          }
          
          // Skip organizations that are part of a grid (they're already rendered)
          if (isOrganization && idx > 0 && allItems[idx - 1].type === "organization") {
            return null;
          }
          
          // Render main role
          return (
            <article
              key={`${item.company}-${item.role}`}
              className="rounded-xl border border-[var(--border)] bg-white/80 p-4 shadow-sm dark:bg-slate-900/60"
            >
              <div className="flex items-stretch gap-5">
                <LogoImage company={item.company} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{item.company}</h2>
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
        <h2 className="text-lg font-semibold">Classes</h2>
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
        <h2 className="text-lg font-semibold">Awards</h2>
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

