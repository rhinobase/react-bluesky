import type { AppBskyFeedPost } from "@atproto/api";
import { Link } from "../Link";
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
          key={counter}
          href={segment.link.uri}
          className="text-blue-400 hover:underline"
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
        <Link
          key={counter}
          href={`/profile/${segment.mention.did}`}
          className="text-blue-500 hover:underline"
        >
          {segment.text}
        </Link>,
      );
    } else if (segment.tag) {
      richText.push(
        <Link
          key={counter}
          href={`/tag/${segment.tag.tag}`}
          className="text-blue-500 hover:underline"
        >
          {segment.text}
        </Link>,
      );
    } else {
      richText.push(segment.text);
    }

    counter++;
  }

  return (
    <p className="min-[300px]:text-lg leading-6 break-word break-words whitespace-pre-wrap">
      {richText}
    </p>
  );
}
