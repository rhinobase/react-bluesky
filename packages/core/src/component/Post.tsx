import {
  type AppBskyFeedDefs,
  type AppBskyFeedPost,
  AppBskyRichtextFacet,
  RichText,
} from "@atproto/api";
import { CONTENT_LABELS, getRkey, niceDate, prettyNumber } from "../utils";
import { Container } from "./Container";
import { Link } from "./Link";

interface Props {
  thread: AppBskyFeedDefs.ThreadViewPost;
}

export function Post({ thread }: Props) {
  const post = thread.post;

  const isAuthorLabeled = post.author.labels?.some((label) =>
    CONTENT_LABELS.includes(label.val),
  );

  let record: AppBskyFeedPost.Record | null = null;
  if (isRecord(post.record)) {
    record = post.record;
  }

  const href = `/profile/${post.author.did}/post/${getRkey(post)}`;

  return (
    <Container href={href}>
      <div
        className="flex-1 flex-col flex gap-2"
        lang={record?.langs?.[0]}
        dir="auto"
      >
        <div className="flex gap-2.5 items-center cursor-pointer">
          <Link href={`/profile/${post.author.did}`} className="rounded-full">
            <div className="w-10 h-10 overflow-hidden rounded-full bg-neutral-300 shrink-0">
              <img
                alt={post.author.displayName}
                src={post.author.avatar}
                style={isAuthorLabeled ? { filter: "blur(2.5px)" } : undefined}
              />
            </div>
          </Link>
          <div>
            <Link
              href={`/profile/${post.author.did}`}
              className="font-bold text-[17px] leading-5 line-clamp-1 hover:underline underline-offset-2 decoration-2"
            >
              <p>{post.author.displayName}</p>
            </Link>
            <Link
              href={`/profile/${post.author.did}`}
              className="text-[15px] text-textLight hover:underline line-clamp-1"
            >
              <p>@{post.author.handle}</p>
            </Link>
          </div>
          <div className="flex-1" />
          <Link
            href={href}
            className="transition-transform hover:scale-110 shrink-0 self-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 320 286"
              className="h-8"
            >
              <title>Bluesky Logo</title>
              <path
                fill="rgb(10,122,255)"
                d="M69.364 19.146c36.687 27.806 76.147 84.186 90.636 114.439 14.489-30.253 53.948-86.633 90.636-114.439C277.107-.917 320-16.44 320 32.957c0 9.865-5.603 82.875-8.889 94.729-11.423 41.208-53.045 51.719-90.071 45.357 64.719 11.12 81.182 47.953 45.627 84.785-80 82.874-106.667-44.333-106.667-44.333s-26.667 127.207-106.667 44.333c-35.555-36.832-19.092-73.665 45.627-84.785-37.026 6.362-78.648-4.149-90.071-45.357C5.603 115.832 0 42.822 0 32.957 0-16.44 42.893-.917 69.364 19.147Z"
              />
            </svg>
          </Link>
        </div>
        <PostContent record={record} />
        {/* <Embed content={post.embed} labels={post.labels} /> */}
        <Link href={href}>
          <time
            dateTime={new Date(post.indexedAt).toISOString()}
            className="text-textLight mt-1 text-sm hover:underline"
          >
            {niceDate(post.indexedAt)}
          </time>
        </Link>
        <div className="border-t w-full pt-2.5 flex items-center gap-5 text-sm cursor-pointer">
          {!!post.likeCount && (
            <div className="flex items-center gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <title>Like icon</title>
                <path
                  fill="#ec4899"
                  d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"
                />
              </svg>
              <p className="font-bold text-[var(--post-font-color-secondary)] mb-px">
                {prettyNumber(post.likeCount)}
              </p>
            </div>
          )}
          {!!post.repostCount && (
            <div className="flex items-center gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <title>Repost icon</title>
                <path
                  fill="#20bc07"
                  d="M17.957 2.293a1 1 0 1 0-1.414 1.414L17.836 5H6a3 3 0 0 0-3 3v3a1 1 0 1 0 2 0V8a1 1 0 0 1 1-1h11.836l-1.293 1.293a1 1 0 0 0 1.414 1.414l2.47-2.47a1.75 1.75 0 0 0 0-2.474l-2.47-2.47ZM20 12a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3H6.164l1.293 1.293a1 1 0 1 1-1.414 1.414l-2.47-2.47a1.75 1.75 0 0 1 0-2.474l2.47-2.47a1 1 0 0 1 1.414 1.414L6.164 17H18a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1Z"
                />
              </svg>
              <p className="font-bold text-[var(--post-font-color-secondary)] mb-px">
                {prettyNumber(post.repostCount)}
              </p>
            </div>
          )}
          <div className="flex items-center gap-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <title>Reply icon</title>
              <path
                fill="rgb(10,122,255)"
                d="M19.002 3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H12.28l-4.762 2.858A1 1 0 0 1 6.002 21v-2h-1a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h14Z"
              />
            </svg>
            <p className="font-bold text-[var(--post-font-color-secondary)] mb-px">
              Reply
            </p>
          </div>
          <div className="flex-1" />
          <p className="cursor-pointer text-[var(--post-color-blue-primary)] font-bold hover:underline hidden min-[450px]:inline">
            {post.replyCount
              ? `Read ${prettyNumber(post.replyCount)} ${
                  post.replyCount > 1 ? "replies" : "reply"
                } on Bluesky`
              : "View on Bluesky"}
          </p>
          <p className="cursor-pointer text-[var(--post-color-blue-primary)] font-bold hover:underline min-[450px]:hidden">
            <span className="hidden min-[380px]:inline">View on </span>Bluesky
          </p>
        </div>
      </div>
    </Container>
  );
}

function PostContent({ record }: { record: AppBskyFeedPost.Record | null }) {
  if (!record) return null;

  const rt = new RichText({
    text: record.text,
    facets: record.facets,
  });

  const richText = [];

  let counter = 0;
  for (const segment of rt.segments()) {
    if (
      segment.link &&
      AppBskyRichtextFacet.validateLink(segment.link).success
    ) {
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
    } else if (
      segment.mention &&
      AppBskyRichtextFacet.validateMention(segment.mention).success
    ) {
      richText.push(
        <Link
          key={counter}
          href={`/profile/${segment.mention.did}`}
          className="text-blue-500 hover:underline"
        >
          {segment.text}
        </Link>,
      );
    } else if (
      segment.tag &&
      AppBskyRichtextFacet.validateTag(segment.tag).success
    ) {
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

function isRecord(v: unknown): v is AppBskyFeedPost.Record {
  return (
    v != null &&
    typeof v === "object" &&
    "$type" in v &&
    (v.$type === "app.bsky.feed.post#main" || v.$type === "app.bsky.feed.post")
  );
}
