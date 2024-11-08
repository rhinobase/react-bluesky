import { EmbedContentType, type EmbedType } from "../api/types";
import { classNames } from "../utils";

export type PostEmbed = {
  content: EmbedType;
};

export function PostEmbed({ content }: PostEmbed) {
  if (content.$type === EmbedContentType.IMAGES) {
    if (content.images.length > 1)
      return (
        <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden">
          {content.images.map((image, index) => (
            <img
              key={`post_embed_image_${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              src={image.thumb}
              alt={image.alt}
              className="aspect-square w-full object-cover rounded-sm"
            />
          ))}
        </div>
      );
    return (
      <img
        src={content.images[0].thumb}
        alt={content.images[0].alt}
        className="w-full rounded-lg overflow-hidden object-cover h-auto max-h-[1000px]"
      />
    );
  }
  if (content.$type === EmbedContentType.VIDEO) {
    const aspectRatio = content.aspectRatio
      ? content.aspectRatio.width / content.aspectRatio.height
      : 1 / 1;

    return (
      <div
        className="w-full overflow-hidden rounded-lg aspect-square relative"
        style={{ aspectRatio }}
      >
        <img
          src={content.thumbnail}
          alt={content.cid}
          className="object-cover size-full"
        />
        <div className="size-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 flex items-center justify-center">
          <img
            src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='%23fff'%20d='M9.576%202.534C7.578%201.299%205%202.737%205%205.086v13.828c0%202.35%202.578%203.787%204.576%202.552l11.194-6.914c1.899-1.172%201.899-3.932%200-5.104L9.576%202.534Z'/%3e%3c/svg%3e"
            alt="play_icon"
            className="object-cover size-3/5"
          />
        </div>
      </div>
    );
  }
  if (content.$type === EmbedContentType.EXTERNAL) {
    const blogDomain = content.external.uri.split("/")[2];

    return (
      <a
        href={content.external.uri}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={classNames(
          "cursor-pointer w-full rounded-lg overflow-hidden flex flex-col items-stretch",
          "border border-[rgb(207,217,222)] group-data-[theme=light]/post:border-[rgb(207,217,222)] dark:border-[rgb(66,83,100)] group-data-[theme=dark]/post:border-[rgb(66,83,100)]",
        )}
      >
        <img
          src={content.external.thumb}
          alt={content.external.title}
          className="aspect-[1.91/1] object-cover"
        />
        <div className="py-3 px-4">
          <p
            className={classNames(
              "text-sm line-clamp-1",
              "text-[rgb(83,100,113)] group-data-[theme=light]/post:text-[rgb(83,100,113)] dark:text-[rgb(139,152,165)] group-data-[theme=dark]/post:text-[rgb(139,152,165)]",
            )}
          >
            {blogDomain}
          </p>
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
