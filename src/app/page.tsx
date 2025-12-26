"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { personalInfo } from "@/data/personal";

const IconLink = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/80 px-3 py-2 text-sm transition hover:-translate-y-0.5 hover:shadow dark:bg-slate-900/70"
  >
    <span aria-hidden className="text-indigo-500">
      {icon}
    </span>
    <span className="font-medium text-neutral-900 dark:text-slate-100">{label}</span>
  </Link>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M6 9h3v9H6z" />
    <circle cx="7.5" cy="6.5" r="1.5" />
    <path d="M11 9h3v1.4a3 3 0 0 1 2.7-1.4c1.8 0 2.3 1 2.3 2.7V18h-3v-5c0-.9-.2-1.5-1.1-1.5-.9 0-1.2.7-1.2 1.5V18h-3z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 5v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 4h16v16H4z" />
    <path d="m4 4 8 8 8-8" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="4" width="16" height="16" rx="5" ry="5" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="17" cy="7" r="1" />
  </svg>
);

const ScholarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

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

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

export default function HomePage() {
  const { name, title, oneLiner, contact, socials, experience } = personalInfo;
  const socialLinks = [
    { label: "LinkedIn", href: contact.linkedin, icon: <LinkedinIcon /> },
    { label: "GitHub", href: socials.github, icon: <GithubIcon /> },
    { label: "Email", href: `mailto:${contact.email}`, icon: <MailIcon /> },
    socials.scholar ? { label: "Google Scholar", href: socials.scholar, icon: <ScholarIcon /> } : null,
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[];

  // Get Amazon AGI and AI Safety Team for highlights
  const amazonAGI = experience.find((e) => e.company === "Amazon AGI");
  const aiSafety = experience.find((e) => e.company === "AI Safety Team");

  return (
    <main className="space-y-8 md:space-y-10">
      <div className="grid gap-6 md:grid-cols-[1.4fr,0.8fr]">
        <section className="glass site-shell p-6 md:p-8">
          <div className="space-y-5 flex flex-col h-full">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{"Hi, I'm Juliana!"}</h1>
              <p className="text-sm text-neutral-500 dark:text-slate-400 leading-snug">
                {title.includes("Harvard University") ? (
                  <>
                    {title.split("Harvard University")[0]}
                    <span className="text-[#A51C30] dark:text-[#A51C30]">Harvard University</span>
                    {title.split("Harvard University")[1]}
                  </>
                ) : (
                  title
                )}
              </p>
              <p className="text-neutral-700 leading-relaxed dark:text-slate-200">{oneLiner}</p>
            </div>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 rounded-full bg-slate-200/90 px-7 py-3 text-sm font-semibold text-slate-800 uppercase tracking-wide transition hover:bg-slate-300/90 hover:shadow-sm dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                More about me
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
        <section className="glass site-shell p-5 md:p-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Links</h2>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <IconLink key={link.label} href={link.href} label={link.label} icon={link.icon} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-5">
        <h2 className="text-2xl font-semibold tracking-tight">Highlights</h2>
        <div className="space-y-5">
          {amazonAGI && (
            <article className="rounded-xl border border-[var(--border)] bg-white/80 p-4 shadow-sm dark:bg-slate-900/60">
              <div className="flex items-stretch gap-5">
                <LogoImage company={amazonAGI.company} link={amazonAGI.link} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {amazonAGI.link ? (
                        <Link
                          href={amazonAGI.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold hover:underline transition"
                        >
                          {amazonAGI.company}
                        </Link>
                      ) : (
                        <h3 className="text-lg font-semibold">{amazonAGI.company}</h3>
                      )}
                      <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-slate-400">{amazonAGI.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-slate-300">{amazonAGI.summary}</p>
                    </div>
                    <Link
                      href="/experience"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-200/90 px-4 py-2 text-xs font-semibold text-slate-800 uppercase tracking-wide transition hover:bg-slate-300/90 hover:shadow-sm dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-800 shrink-0"
                    >
                      View all experiences
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}
          {aiSafety && (
            <article className="rounded-xl border border-[var(--border)] bg-white/80 p-4 shadow-sm dark:bg-slate-900/60">
              <div className="flex items-stretch gap-5">
                <LogoImage company={aiSafety.company} link={aiSafety.link} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      {aiSafety.link ? (
                        <Link
                          href={aiSafety.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold hover:underline transition"
                        >
                          {aiSafety.company}
                        </Link>
                      ) : (
                        <h3 className="text-lg font-semibold">{aiSafety.company}</h3>
                      )}
                      <p className="mt-1 text-sm font-medium text-neutral-600 dark:text-slate-400">{aiSafety.role}</p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-slate-300">{aiSafety.summary}</p>
                    </div>
                    <Link
                      href="/academics"
                      className="inline-flex items-center gap-2 rounded-full bg-slate-200/90 px-4 py-2 text-xs font-semibold text-slate-800 uppercase tracking-wide transition hover:bg-slate-300/90 hover:shadow-sm dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-800 shrink-0"
                    >
                      View all orgs
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </main>
  );
}

