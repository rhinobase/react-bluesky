import type { JSX } from "solid-js/jsx-runtime";
import { classNames } from "../../utils";
import s from "./link.module.css";

export type Link = {
  href: string;
  disableTracking?: boolean;
} & Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Link({
  href,
  class: className,
  disableTracking,
  onClick,
  onKeyDown,
  ...props
}: Link) {
  let ref_url: string | null = null;

  if (typeof window !== "undefined") {
    const searchParam = new URLSearchParams(window.location.search);
    ref_url = searchParam.get("ref_url");
  }

  const newSearchParam = new URLSearchParams();
  newSearchParam.set("ref_src", "embed");
  if (ref_url) {
    newSearchParam.set("ref_url", ref_url);
  }

  return (
    <a
      {...props}
      href={`${href.startsWith("http") ? href : `https://bsky.app${href}`}${
        disableTracking ? "" : `?${newSearchParam.toString()}`
      }`}
      target="_blank"
      rel="noopener noreferrer nofollow"
      onClick={(event) => {
        event.stopPropagation();
        if (typeof onClick === "function") onClick?.(event);
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (typeof onKeyDown === "function") onKeyDown?.(event);
      }}
      class={classNames(s.link, className)}
    />
  );
}
