"use client";
import { Skeleton } from "@rafty/ui";
import { useTheme } from "next-themes";
import { useShiki } from "../../providers";

export type CodeHighlighter = { content: string; language: string };

export function CodeHighlighter({ content, language }: CodeHighlighter) {
  const highlighter = useShiki();
  const { resolvedTheme } = useTheme();

  if (!highlighter) return <Skeleton className="h-5 w-1/4 rounded" />;

  const html = highlighter.codeToHtml(content, {
    lang: language,
    theme:
      resolvedTheme === "light"
        ? "github-light-default"
        : "github-dark-default",
  });

  return (
    <div
      className="h-max min-h-full w-max min-w-full"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Need this to show the highlighting
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
