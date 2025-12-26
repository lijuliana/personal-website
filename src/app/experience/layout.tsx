import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juliana Li | Experience",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

