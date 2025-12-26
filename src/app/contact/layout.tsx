import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juliana Li | Contact",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

