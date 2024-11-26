import type { AppBskyFeedPost } from "@atproto/api";
import { Link } from "../Link";
import s from "./post-content.module.css";
import { rtSegments } from "./utils";

export type PostContent = {
  record: AppBskyFeedPost.Record | null;
};

export function PostContent({ record }: PostContent) {
  if (!record) return null;

  const richText = [];

  let counter = 0;
  for (const segment of rtSegments({
    text: record.text,
    facets: record.facets,
  })) {
    if (segment.link) {
      richText.push(
        <Link
          href={segment.link.uri}
          class={s.richText}
          disableTracking={
            !segment.link.uri.startsWith("https://bsky.app") &&
            !segment.link.uri.startsWith("https://go.bsky.app")
          }
        >
          {segment.text}
        </Link>,
      );
    } else if (segment.mention) {
      richText.push(
        <Link href={`/profile/${segment.mention.did}`} class={s.richText}>
          {segment.text}
        </Link>,
      );
    } else if (segment.tag) {
      richText.push(
        <Link href={`/tag/${segment.tag.tag}`} class={s.richText}>
          {segment.text}
        </Link>,
      );
    } else {
      richText.push(segment.text);
    }

    counter++;
  }

  return <p class={s.content}>{richText}</p>;
}
