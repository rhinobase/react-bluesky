"use client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      defaultTheme="system"
      attribute="class"
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
