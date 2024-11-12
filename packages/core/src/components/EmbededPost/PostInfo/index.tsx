import type { PostType } from "../../../api";
import { formatDate, formatNumber } from "../../../utils";
import { PostLink } from "../../PostLink";
import s from "./post-info.module.css";

export type PostInfo = {
  content: PostType;
};

export function PostInfo({ content }: PostInfo) {
  const createdAt = new Date(content.indexedAt);
  const formattedCreatedAtDate = formatDate(createdAt);

  return (
    <>
      <div className={s.createdAt}>
        <PostLink
          content={content}
          className={s.createdAtLink}
          aria-label={formattedCreatedAtDate}
        >
          <time dateTime={createdAt.toISOString()} className={s.createdAtTime}>
            {formattedCreatedAtDate}
          </time>
        </PostLink>
      </div>
      <div className={s.actions}>
        <PostLink content={content} className={s.actionLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className={s.actionIcon}
          >
            <title>Likes icon</title>
            <path
              fill="#ec4899"
              d="M12.489 21.372c8.528-4.78 10.626-10.47 9.022-14.47-.779-1.941-2.414-3.333-4.342-3.763-1.697-.378-3.552.003-5.169 1.287-1.617-1.284-3.472-1.665-5.17-1.287-1.927.43-3.562 1.822-4.34 3.764-1.605 4 .493 9.69 9.021 14.47a1 1 0 0 0 .978 0Z"
            />
          </svg>
          <p className={s.actionText}>{formatNumber(content.likeCount)}</p>
        </PostLink>
        <PostLink content={content} className={s.actionLink}>
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
          <p className={s.actionText}>{content.repostCount}</p>
        </PostLink>
        <PostLink content={content} className={s.actionLink}>
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
        </PostLink>
        <div className={s.actionSpacer} />
        <PostLink content={content} className={s.actionReadmore}>
          Read{" "}
          {content.replyCount > 1
            ? `${content.replyCount} replies`
            : `${content.replyCount} reply`}{" "}
          on Bluesky
        </PostLink>
      </div>
    </>
  );
}
