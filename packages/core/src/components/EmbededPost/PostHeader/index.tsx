import type { PostType } from "../../../api";
import type { PostComponents } from "../../../types";
import { AvatarImage } from "../../AvatarImage";
import s from "./post-header.module.css";

export type PostHeader = {
  content: PostType;
  components?: PostComponents;
};

export function PostHeader({ content, components }: PostHeader) {
  const Img = components?.AvatarImage ?? AvatarImage;

  const profileLink = `https://bsky.app/profile/${content.author.did}?ref_src=embed`;

  return (
    <div className={s.header}>
      <a
        href={profileLink}
        className={s.avatar}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={s.avatarOverflow}>
          <Img
            src={content.author.avatar}
            alt={content.author.did}
            width={48}
            height={48}
          />
        </div>
        <div className={s.avatarOverflow}>
          <div className={s.avatarShadow} />
        </div>
      </a>
      <div className={s.author}>
        <a
          href={profileLink}
          className={s.authorLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={s.authorLinkText}>
            <span title={content.author.displayName}>
              {content.author.displayName}
            </span>
          </div>
        </a>
        <div className={s.authorMeta}>
          <a
            href={profileLink}
            className={s.username}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span title={`@${content.author.handle}`}>
              @{content.author.handle}
            </span>
          </a>
        </div>
      </div>
      <div className={s.spacer} />
      <a
        href={profileLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View on Twitter"
        className={s.brand}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 320 286"
          className={s.blueskyIcon}
        >
          <title>Bluesky Icon</title>
          <path
            fill="rgb(10,122,255)"
            d="M69.364 19.146c36.687 27.806 76.147 84.186 90.636 114.439 14.489-30.253 53.948-86.633 90.636-114.439C277.107-.917 320-16.44 320 32.957c0 9.865-5.603 82.875-8.889 94.729-11.423 41.208-53.045 51.719-90.071 45.357 64.719 11.12 81.182 47.953 45.627 84.785-80 82.874-106.667-44.333-106.667-44.333s-26.667 127.207-106.667 44.333c-35.555-36.832-19.092-73.665 45.627-84.785-37.026 6.362-78.648-4.149-90.071-45.357C5.603 115.832 0 42.822 0 32.957 0-16.44 42.893-.917 69.364 19.147Z"
          />
        </svg>
      </a>
    </div>
  );
}
