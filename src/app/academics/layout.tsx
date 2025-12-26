import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juliana Li | Academics",
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

