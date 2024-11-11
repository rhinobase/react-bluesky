import { EmbedContentType, type EmbedType } from "../../../api/types";
import { classNames } from "../../../utils";
import s from "./post-embed.module.css";

export type PostEmbed = {
  content: EmbedType;
  link?: string;
};

export function PostEmbed({ content, link }: PostEmbed) {
  if (content.$type === EmbedContentType.IMAGES) {
    if (content.images.length > 1)
      return (
        <div className={s.multiImages}>
          {content.images.map((image, index) => (
            <img
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
      <img
        src={content.images[0].thumb}
        alt={content.images[0].alt}
        className={s.singleImage}
      />
    );
  }
  if (content.$type === EmbedContentType.VIDEO)
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className={s.videosContainer}>
          <img
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
      </a>
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
          <img
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
          <p className="font-semibold line-clamp-3">{content.external.title}</p>
          <p
            className={classNames(
              "text-sm line-clamp-2 mt-0.5",
              "text-[rgb(83,100,113)] group-data-[theme=light]/post:text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] group-data-[theme=dark]/post:text-[rgb(139,152,165)]",
            )}
          >
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
        className={classNames(
          "cursor-pointer transition-colors border rounded-lg p-2 gap-1.5 w-full flex flex-col",
          "bg-white group-data-[theme=light]/post:bg-white dark:bg-[rgb(21,32,43)] group-data-[theme=dark]/post:bg-[rgb(21,32,43)]",
          "hover:bg-[rgb(247,249,249)] group-data-[theme=light]/post:hover:bg-[rgb(247,249,249)] dark:hover:bg-[rgb(30,39,50)] group-data-[theme=dark]/post:hover:bg-[rgb(30,39,50)]",
        )}
      >
        <div className="flex gap-1.5 items-center">
          <div className="size-4 min-w-4 min-h-4 overflow-hidden rounded-full bg-neutral-300 shrink-0">
            <img
              src={content.record.author.avatar}
              alt={content.record.author.handle}
            />
          </div>
          <p className="line-clamp-1 text-sm">
            <span className="font-bold">
              {content.record.author.displayName}
            </span>{" "}
            <span className="text-[rgb(83,100,113)] group-data-[theme=light]/post:text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] group-data-[theme=dark]/post:text-[rgb(139,152,165)]">
              @{content.record.author.handle}
            </span>
          </p>
        </div>
        <p className="text-sm">{content.record.value.text}</p>
        <PostEmbed content={content.record.embeds[0]} />
      </a>
    );
  }
}
