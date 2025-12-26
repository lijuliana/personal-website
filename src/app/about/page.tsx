

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { personalInfo } from "@/data/personal";
import { SongImage, OrganizationIcon, BookImage } from "@/components/image-components";

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

const SpotifyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const HobbyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const skillTabs = Object.keys(personalInfo.skillsByCategory);

export default function AboutPage() {
  const { name, location, skillsByCategory, socials, listening, interests, contact } = personalInfo;
  const [active, setActive] = useState<string>("All");

  const allSkills = useMemo(
    () => Array.from(new Set(Object.values(skillsByCategory).flat())),
    [skillsByCategory]
  );

  const categories = ["All", ...skillTabs];
  const skillsToShow = active === "All" ? allSkills : skillsByCategory[active as keyof typeof skillsByCategory];

  return (
    <div className="space-y-6 -mt-4">
      <div className="card grid gap-6 !p-8 md:grid-cols-[1.4fr,0.9fr] md:items-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Hi, I&apos;m Juliana!</h1>
          <p className="text-lg font-medium">I'm currently interested in safely building toward AGI, human-centered AI/ML tool development, and quantitative research.</p>
          <p className="text-sm text-muted leading-relaxed">
            Based in the SF Bay Area and Cambridge.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative h-56 w-56 overflow-hidden rounded-full ring-2 ring-indigo-200 dark:ring-indigo-500/60">
            <Image
              src="/me/avatar.png"
              alt={`${name} portrait`}
              fill
              className="object-cover"
              sizes="224px"
              priority
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr,0.6fr]">
        <div className="card space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-lg font-semibold">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {categories.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`pill text-[11px] px-1.5 py-0.5 transition ${
                    active === tab
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100"
                      : "bg-white/70 text-neutral-800 dark:bg-slate-800/70 dark:text-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-white/80 p-4 dark:bg-slate-900/70">
            <ul className="flex flex-wrap gap-2 text-sm text-neutral-800 dark:text-slate-200">
              {skillsToShow.map((skill) => (
                <li key={skill} className="pill bg-slate-100 text-neutral-800 dark:bg-slate-800/70 dark:text-slate-100">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card space-y-3 p-4">
          <h2 className="text-lg font-semibold">Links</h2>
          <div className="space-y-2">
            <IconLink href={contact.linkedin} label="LinkedIn" icon={<LinkedinIcon />} />
            <IconLink href={socials.github} label="GitHub" icon={<GithubIcon />} />
            {socials.scholar && (
              <IconLink href={socials.scholar} label="Google Scholar" icon={<ScholarIcon />} />
            )}
            <IconLink href={`mailto:${contact.email}`} label="Email" icon={<MailIcon />} />
            {socials.instagram && (
              <IconLink href={socials.instagram} label="Instagram" icon={<InstagramIcon />} />
            )}
            <IconLink href={socials.spotify} label="Spotify" icon={<SpotifyIcon />} />
          </div>
        </div>
      </div>

      <div className="card space-y-4 p-6">
        <h2 className="text-lg font-semibold">Favorite Reads</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
          <Link
            href="https://paulgraham.com/cities.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-white/80 py-4 px-6 w-[240px] shrink-0 transition hover:-translate-y-0.5 hover:shadow dark:bg-slate-900/70"
          >
            <BookImage title="Cities and Ambition" />
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-900 dark:text-slate-100">Cities and Ambition</p>
              <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">Paul Graham</p>
            </div>
          </Link>
          <Link
            href="https://www.columbia.edu/~col8/lobsterarticle.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-white/80 py-4 px-6 w-[240px] shrink-0 transition hover:-translate-y-0.5 hover:shadow dark:bg-slate-900/70"
          >
            <BookImage title="Consider the Lobster" />
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-900 dark:text-slate-100">Consider the Lobster</p>
              <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">David Foster Wallace</p>
            </div>
          </Link>
          <Link
            href="https://static1.squarespace.com/static/5838a24729687f08e0321a15/t/5bf2bdfa562fa782871c6252/1542635003373/The-Paper-Menagerie+by+Ken+Liu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-white/80 py-4 px-6 w-[240px] shrink-0 transition hover:-translate-y-0.5 hover:shadow dark:bg-slate-900/70"
          >
            <BookImage title="The Paper Menagerie" />
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-900 dark:text-slate-100">The Paper Menagerie</p>
              <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">Ken Liu</p>
            </div>
          </Link>
          <Link
            href="https://transformer-circuits.pub/2023/monosemantic-features/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-white/80 py-4 px-6 w-[240px] shrink-0 transition hover:-translate-y-0.5 hover:shadow dark:bg-slate-900/70"
          >
            <BookImage title="Towards Monosemanticity: Decomposing Language Models With Dictionary Learning" />
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-900 dark:text-slate-100">Towards Monosemanticity</p>
              <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">Trenton Bricken et al.</p>
            </div>
          </Link>
          <Link
            href="https://adamjones.me/blog/ai-regulator-toolbox/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-white/80 py-4 px-6 w-[240px] shrink-0 transition hover:-translate-y-0.5 hover:shadow dark:bg-slate-900/70"
          >
            <BookImage title="The AI Regulator's Toolbox" />
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-900 dark:text-slate-100">The AI Regulator&apos;s Toolbox</p>
              <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">Adam Jones</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-4 p-6">
          <h2 className="text-lg font-semibold">Hobbies</h2>
          <div className="space-y-3">
            {interests.map((interest) => {
              if (interest.name === "Dance" && interest.details?.organizations) {
                return (
                  <div key={interest.name} className="space-y-1.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-500 shrink-0">
                            <HobbyIcon />
                          </span>
                          <h3 className="text-base font-semibold text-neutral-900 dark:text-slate-100">{interest.name}</h3>
                        </div>
                        {interest.details && (
                          <ul className="list-none space-y-1 text-sm text-neutral-700 dark:text-slate-300 pl-4">
                            {interest.details.styles && (
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-500">•</span>
                                <span>
                                  <span className="font-medium text-neutral-900 dark:text-slate-100">Styles: </span>
                                  {interest.details.styles.join(", ")}
                                </span>
                              </li>
                            )}
                            {interest.details.awards && (
                              <li className="flex items-start gap-2">
                                <span className="text-indigo-500">•</span>
                                <span>
                                  <span className="font-medium text-neutral-900 dark:text-slate-100">Awards: </span>
                                  {interest.details.awards.join(", ")}
                                </span>
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                      <div className="flex flex-col gap-3 shrink-0 mt-3">
                        {interest.details.organizations.map((org) => {
                          // Support both string (legacy) and object (with url) formats
                          const orgName = typeof org === "string" ? org : org.name;
                          const orgUrl = typeof org === "string" 
                            ? `#${(org as string).toLowerCase().replace(/\s+/g, "-")}` 
                            : org.url;
                          return (
                            <OrganizationIcon
                              key={orgName}
                              name={orgName}
                              href={orgUrl}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
            <div className="grid grid-cols-2 gap-3">
              {interests
                .filter((interest) => interest.name !== "Dance")
                .map((interest) => {
                  const getIcon = () => <HobbyIcon />;
                  return (
                    <div key={interest.name} className="flex items-center gap-2">
                      <span className="text-indigo-500 shrink-0">{getIcon()}</span>
                      <h3 className="text-base font-semibold text-neutral-900 dark:text-slate-100">
                        {interest.name}
                      </h3>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="card space-y-3 p-6">
          <h2 className="text-lg font-semibold">Currently listening to</h2>
          <div className="space-y-3">
            {listening.songs.slice(0, 3).map((s) => (
              <Link
                key={s.title}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-white/80 p-3 transition hover:-translate-y-0.5 hover:shadow dark:bg-slate-900/70"
              >
                <SongImage title={s.title} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-base text-neutral-900 dark:text-slate-100">{s.title}</p>
                  <p className="text-xs text-muted mt-0.5">{s.artist}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition" aria-label="Previous">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-slate-400">
                      <polygon points="19 20 9 12 19 4 19 20" />
                      <line x1="5" y1="19" x2="5" y2="5" />
                    </svg>
                  </button>
                  <button className="p-1.5 rounded-full bg-slate-200/80 hover:bg-slate-300/80 dark:bg-white/20 dark:hover:bg-white/30 transition flex items-center justify-center" aria-label="Play">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900 dark:text-white">
                      <path d="M7.5 4.5v15l12-7.5z" stroke="currentColor" strokeWidth="0.5" fill="currentColor" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition" aria-label="Next">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600 dark:text-slate-400">
                      <polygon points="5 4 15 12 5 20 5 4" />
                      <line x1="19" y1="5" x2="19" y2="19" />
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

