/* Wrapper around next-themes to enable SSR-safe theme toggling */
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function ThemeProvider({
  children,
  ...props
}: {
  children: ReactNode;
  attribute?: "class" | "data-theme";
  defaultTheme?: string;
  enableSystem?: boolean;
}) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}

