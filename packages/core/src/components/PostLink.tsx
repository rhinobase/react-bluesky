import type { AnchorHTMLAttributes } from "react";
import type { PostType } from "../api";

export type PostLink = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "target" | "rel" | "content"
> & {
  content: PostType;
};

export function PostLink({ content, ...props }: PostLink) {
  const link = `https://bsky.app/profile/${
    content.author.handle
  }/post/${content.uri.split("/").pop()}?ref_src=embed`;

  return (
    <a
      {...props}
      href={link}
      target="_blank"
      rel="noopener noreferrer nofollow"
    />
  );
}
