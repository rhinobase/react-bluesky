import type { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import {
  CONTENT_LABELS,
  classNames,
  getRkey,
  hasProp,
  isObj,
  niceDate,
  prettyNumber,
} from "../utils";
import { Container } from "./Container";
import { Embed } from "./Embed";
import { Link } from "./Link";
import { PostContent } from "./PostContent";
import s from "./post.module.css";

export type Post = {
  thread: AppBskyFeedDefs.ThreadViewPost;
};

export function Post({ thread }: Post) {
  const post = thread.post;

  let record: AppBskyFeedPost.Record | null = null;
  if (isRecord(post.record)) {
    record = post.record;
  }

  const href = `/profile/${post.author.did}/post/${getRkey(post)}`;

  return (
    <Container href={href}>
      <div className={s.post} lang={record?.langs?.[0]} dir="auto">
        <Header author={post.author} href={href} />
        <PostContent record={record} />
        <Embed content={post.embed} labels={post.labels} />
        <CreatedAt href={href} indexedAt={post.indexedAt} />
        <Actions
          likeCount={post.likeCount}
          replyCount={post.replyCount}
          repostCount={post.repostCount}
        />
      </div>
    </Container>
  );
}

export function isRecord(v: unknown): v is AppBskyFeedPost.Record {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    (v.$type === "app.bsky.feed.post#main" || v.$type === "app.bsky.feed.post")
  );
}

type Header = {
  author: AppBskyFeedDefs.PostView["author"];
  href: string;
};

function Header({ author, href }: Header) {
  const isAuthorLabeled = author.labels?.some((label) =>
    CONTENT_LABELS.includes(label.val),
  );

  return (
    <div className={s.header}>
      <Link href={`/profile/${author.did}`} className={s.avatarLink}>
        <div className={s.avatar}>
          <img
            alt={author.displayName}
            src={author.avatar}
            className={classNames(isAuthorLabeled && s.avatarImg)}
          />
        </div>
      </Link>
      <div>
        <Link href={`/profile/${author.did}`} className={s.displayName}>
          <p>{author.displayName}</p>
        </Link>
        <Link href={`/profile/${author.did}`} className={s.handle}>
          <p>@{author.handle}</p>
        </Link>
      </div>
      <div className={s.spacer} />
      <Link href={href} className={s.logoLink}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 320 286"
          className={s.logo}
        >
          <title>Bluesky Logo</title>
          <path
            fill="rgb(10,122,255)"
            d="M69.364 19.146c36.687 27.806 76.147 84.186 90.636 114.439 14.489-30.253 53.948-86.633 90.636-114.439C277.107-.917 320-16.44 320 32.957c0 9.865-5.603 82.875-8.889 94.729-11.423 41.208-53.045 51.719-90.071 45.357 64.719 11.12 81.182 47.953 45.627 84.785-80 82.874-106.667-44.333-106.667-44.333s-26.667 127.207-106.667 44.333c-35.555-36.832-19.092-73.665 45.627-84.785-37.026 6.362-78.648-4.149-90.071-45.357C5.603 115.832 0 42.822 0 32.957 0-16.44 42.893-.917 69.364 19.147Z"
          />
        </svg>
      </Link>
    </div>
  );
}

type CreatedAt = {
  indexedAt: string;
  href: string;
};

function CreatedAt({ indexedAt, href }: CreatedAt) {
  return (
    <Link href={href}>
      <time
        dateTime={new Date(indexedAt).toISOString()}
        className={s.createdAt}
      >
        {niceDate(indexedAt)}
      </time>
    </Link>
  );
}

type Actions = {
  likeCount: number | undefined;
  repostCount: number | undefined;
  replyCount: number | undefined;
};

function Actions({ likeCount, replyCount, repostCount }: Actions) {
  return (
    <div className={s.actions}>
      {!!likeCount && (
        <div className={s.action}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={s.actionIcon}
          >
            <title>Like icon</title>
            <path
              fill="#ec4899"
              d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"
            />
          </svg>
          <p className={s.actionText}>{prettyNumber(likeCount)}</p>
        </div>
      )}
      {!!repostCount && (
        <div className={s.action}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={s.actionIcon}
          >
            <title>Repost icon</title>
            <path
              fill="#20bc07"
              d="M17.957 2.293a1 1 0 1 0-1.414 1.414L17.836 5H6a3 3 0 0 0-3 3v3a1 1 0 1 0 2 0V8a1 1 0 0 1 1-1h11.836l-1.293 1.293a1 1 0 0 0 1.414 1.414l2.47-2.47a1.75 1.75 0 0 0 0-2.474l-2.47-2.47ZM20 12a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3H6.164l1.293 1.293a1 1 0 1 1-1.414 1.414l-2.47-2.47a1.75 1.75 0 0 1 0-2.474l2.47-2.47a1 1 0 0 1 1.414 1.414L6.164 17H18a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1Z"
            />
          </svg>
          <p className={s.actionText}>{prettyNumber(repostCount)}</p>
        </div>
      )}
      <div className={s.action}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className={s.actionIcon}
        >
          <title>Reply icon</title>
          <path
            fill="rgb(10,122,255)"
            d="M19.002 3a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H12.28l-4.762 2.858A1 1 0 0 1 6.002 21v-2h-1a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h14Z"
          />
        </svg>
        <p className={s.actionText}>Reply</p>
      </div>
      <div className={s.spacer} />
      <p className={classNames(s.replies, s.repliesCount)}>
        {replyCount
          ? `Read ${prettyNumber(replyCount)} ${
              replyCount > 1 ? "replies" : "reply"
            } on Bluesky`
          : "View on Bluesky"}
      </p>
      <p className={classNames(s.replies, s.viewOnBluesky)}>
        <span className={s.viewOnBlueskyText}>View on </span>Bluesky
      </p>
    </div>
  );
}
