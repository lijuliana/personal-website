"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Utility function to convert a name/title to a URL-friendly path
 * Example: "Margaret" -> "margaret", "Harvard Asian American Dance Troupe" -> "harvard-asian-american-dance-troupe"
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/["""''`]/g, "") // Remove all types of quotes
    .replace(/[()]/g, "") // Remove parentheses
    .replace(/[^\w\s-]/g, "") // Remove other special characters
    .trim()
    .replace(/\s+/g, "-");
};

/**
 * Song cover image component for the "Currently listening to" section
 * 
 * Place your song cover images at:
 * public/music/{song-title-slug}/cover.png
 * 
 * Example:
 * - "Margaret" -> public/music/margaret/cover.png
 * - "Toronto 2014" -> public/music/toronto-2014/cover.png
 */
export const SongImage = ({ title }: { title: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imagePath = `/music/${slugify(title)}/cover.png`;

  return (
    <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700">
      {!imageError && (
        <Image
          src={imagePath}
          alt={`${title} cover`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      {(!imageLoaded || imageError) && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700" />
      )}
    </div>
  );
};

/**
 * Organization logo component for dance organizations
 * 
 * Place your organization logos at:
 * public/organizations/{organization-name-slug}/logo.png
 * 
 * Example:
 * - "Harvard Asian American Dance Troupe" -> public/organizations/harvard-asian-american-dance-troupe/logo.png
 * - "Jun Lu Performing Arts" -> public/organizations/jun-lu-performing-arts/logo.png
 */
export const OrganizationIcon = ({ name, href }: { name: string; href: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imagePath = `/organizations/${slugify(name)}/logo.png`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700 transition hover:scale-105"
    >
      {!imageError && (
        <Image
          src={imagePath}
          alt={`${name} logo`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      <div
        className={`absolute inset-0 ${
          !imageLoaded || imageError
            ? "bg-slate-200 dark:bg-slate-700"
            : "bg-transparent"
        }`}
      />
    </Link>
  );
};

/**
 * Book cover image component for the "Favorite Reads" section
 * 
 * Place your book cover images at:
 * public/books/{book-title-slug}/cover.png
 * 
 * Example:
 * - "Cities and Ambition" -> public/books/cities-and-ambition/cover.png
 */
export const BookImage = ({ title }: { title: string }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imagePath = `/books/${slugify(title)}/cover.png`;

  return (
    <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700 shadow-sm">
      {!imageError && (
        <Image
          src={imagePath}
          alt={`${title} cover`}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      {(!imageLoaded || imageError) && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700" />
      )}
    </div>
  );
};

