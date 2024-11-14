import type { AnchorHTMLAttributes } from "react";
import { classNames } from "../../utils";
import s from "./link.module.css";

export type Link = {
  href: string;
  disableTracking?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function Link({
  href,
  className,
  disableTracking,
  onClick,
  onKeyDown,
  ...props
}: Link) {
  const searchParam = new URLSearchParams(window?.location.search);
  const ref_url = searchParam.get("ref_url");

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
        onClick?.(event);
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        onKeyDown?.(event);
      }}
      className={classNames(s.link, className)}
    />
  );
}
