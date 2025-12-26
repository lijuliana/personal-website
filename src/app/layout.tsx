import type { Metadata } from "next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Link from "next/link";
import ThemeToggle from "../components/theme-toggle";

const chirp = localFont({
  src: [
    { path: "../../public/fonts/chirp/regular.woff", weight: "400", style: "normal" },
    { path: "../../public/fonts/chirp/medium.woff", weight: "500", style: "normal" },
    { path: "../../public/fonts/chirp/bold.woff", weight: "600", style: "normal" },
    { path: "../../public/fonts/chirp/heavy.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Juliana Li | Personal Site",
  description: "CS + Math @ Harvard, building ML, data, and education tools.",
};

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Academics", href: "/academics" },
  { label: "Contact", href: "/contact" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${chirp.variable} font-sans antialiased`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="page-grid">
                <header className="site-shell glass sticky top-0 z-50">
              <div className="flex items-center justify-between gap-4">
                <Link href="/" className="text-base font-semibold tracking-tight">
                  Juliana Li
                </Link>
                <nav className="hidden items-center gap-3 text-sm text-muted md:flex">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2 transition hover:bg-muted/60"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="space-y-8 md:space-y-10 pt-6 md:pt-8">{children}</main>
            <footer className="site-shell text-xs text-neutral-400 dark:text-slate-500 text-right mt-8">
              Juliana Li © 2025
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

