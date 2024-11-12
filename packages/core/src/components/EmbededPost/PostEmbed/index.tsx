import {
  EmbedContentType,
  type EmbedType,
  type PostType,
} from "../../../api/types";
import type { PostComponents } from "../../../types";
import { AvatarImage } from "../../AvatarImage";
import { MediaImage } from "../../MediaImage";
import { PostLink } from "../../PostLink";
import s from "./post-embed.module.css";

export type PostEmbed = {
  content: PostType;
  components?: PostComponents;
};

export function PostEmbed(props: PostEmbed) {
  const content = props.content.embed;

  if (content) return <EmbedRender content={content} post={props.content} />;
}

type EmbedRender = {
  content: EmbedType;
  post: PostType;
  components?: PostComponents;
};

function EmbedRender({ content, post, components }: EmbedRender) {
  const Img = components?.MediaImage ?? MediaImage;
  const Avatar = components?.AvatarImage ?? AvatarImage;

  if (content.$type === EmbedContentType.IMAGES) {
    if (content.images.length > 1)
      return (
        <div className={s.multiImages}>
          {content.images.map((image, index) => (
            <Img
              key={`post_embed_image_${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              src={image.thumb}
              alt={image.alt}
              className={s.multiImagesImage}
            />
          ))}
        </div>
      );
    return (
      <Img
        src={content.images[0].thumb}
        alt={content.images[0].alt}
        className={s.singleImage}
      />
    );
  }
  if (content.$type === EmbedContentType.VIDEO)
    return (
      <PostLink content={post}>
        <div className={s.videosContainer}>
          <Img
            src={content.thumbnail}
            alt={content.cid}
            className={s.videoThumbnail}
          />
          <div className={s.videoPlayIconBg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className={s.videoPlayIcon}
            >
              <title>Play Icon</title>
              <path
                fill="#fff"
                d="M9.576 2.534C7.578 1.299 5 2.737 5 5.086v13.828c0 2.35 2.578 3.787 4.576 2.552l11.194-6.914c1.899-1.172 1.899-3.932 0-5.104L9.576 2.534Z"
              />
            </svg>
          </div>
        </div>
      </PostLink>
    );

  if (content.$type === EmbedContentType.EXTERNAL) {
    const blogDomain = content.external.uri.split("/")[2];

    return (
      <a
        href={content.external.uri}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={s.externalLink}
      >
        <div className={s.externalLinkMedia}>
          <Img
            src={content.external.thumb}
            alt={content.external.title}
            className={s.externalLinkMediaTumb}
          />
          {content.external.uri.includes("https://youtu.be") && (
            <div className={s.externalVideoPlayIconBg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={s.videoPlayIcon}
              >
                <title>Play Icon</title>
                <path
                  fill="#fff"
                  d="M9.576 2.534C7.578 1.299 5 2.737 5 5.086v13.828c0 2.35 2.578 3.787 4.576 2.552l11.194-6.914c1.899-1.172 1.899-3.932 0-5.104L9.576 2.534Z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className={s.externalContent}>
          <p className={s.externalDomain}>{blogDomain}</p>
          <p className={s.externalTitle}>{content.external.title}</p>
          <p className={s.externalDescription}>
            {content.external.description}
          </p>
        </div>
      </a>
    );
  }
  if (content.$type === EmbedContentType.RECORD) {
    return (
      <a
        href={`https://bsky.app/profile/${
          content.record.author.handle
        }/post/${content.record.uri.split("/").pop()}`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={s.recordLink}
      >
        <div className={s.recordHeader}>
          <div className={s.recordAvatar}>
            <Avatar
              src={content.record.author.avatar}
              alt={content.record.author.handle}
              height={16}
              width={16}
            />
          </div>
          <p className={s.recordAuthor}>
            <span className={s.recordAuthorName}>
              {content.record.author.displayName}
            </span>{" "}
            <span className={s.recordAuthorHandle}>
              @{content.record.author.handle}
            </span>
          </p>
        </div>
        <p className={s.recordBody}>{content.record.value.text}</p>
        {content.record.embeds && (
          <EmbedRender content={content.record.embeds[0]} post={post} />
        )}
      </a>
    );
  }
}
