import type {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedVideo,
  AppBskyFeedDefs,
  AppBskyGraphDefs,
} from "@atproto/api";
import { For, type ParentProps, createMemo } from "solid-js";
import { CONTENT_LABELS, classNames, getRkey, labelsToInfo } from "../../utils";
import { Link } from "../Link";
import { isRecord } from "../Post/utils";
import s from "./embed.module.css";
import {
  isEmbedExternalView,
  isEmbedRecordView,
  isEmbedRecordWithMediaView,
  isEmbedViewBlocked,
  isEmbedViewDetached,
  isEmbedViewNotFound,
  isEmbedViewRecord,
  isFeedGeneratorView,
  isGraphListView,
  isImageView,
  isLabelerView,
  isStarterPackViewBasic,
  isStarterpackRecord,
  isVideoView,
} from "./utils";

export function Embed({
  content,
  labels,
  hideRecord,
}: {
  content: AppBskyFeedDefs.PostView["embed"];
  labels: AppBskyFeedDefs.PostView["labels"];
  hideRecord?: boolean;
}) {
  const labelInfo = createMemo(() => labelsToInfo(labels), [labels]);

  if (!content) return null;

  try {
    // Case 1: Image
    if (isImageView(content)) {
      return <ImageEmbed content={content} labelInfo={labelInfo()} />;
    }

    // Case 2: External link
    if (isEmbedExternalView(content)) {
      return <ExternalEmbed content={content} labelInfo={labelInfo()} />;
    }

    // Case 3: Record (quote or linked post)
    if (isEmbedRecordView(content)) {
      if (hideRecord) {
        return null;
      }

      const record = content.record;

      // Case 3.1: Post
      if (isEmbedViewRecord(record)) {
        const pwiOptOut = !!record.author.labels?.find(
          (label) => label.val === "!no-unauthenticated",
        );
        if (pwiOptOut) {
          return (
            <Info>
              The author of the quoted post has requested their posts not be
              displayed on external sites.
            </Info>
          );
        }

        let text: string | undefined;
        if (isRecord(record.value)) {
          text = record.value.text;
        }

        const isAuthorLabeled = record.author.labels?.some((label) =>
          CONTENT_LABELS.includes(label.val),
        );

        return (
          <Link
            href={`/profile/${record.author.did}/post/${getRkey(record)}`}
            class={s.record}
          >
            <div class={s.recordHeader}>
              <div class={s.recordAvatar}>
                <img
                  alt={record.author.displayName}
                  src={record.author.avatar}
                  class={classNames(isAuthorLabeled && s.recordAvatarImg)}
                />
              </div>
              <p class={s.recordAuthor}>
                <span class={s.recordAuthorDisplayName}>
                  {record.author.displayName}
                </span>
                <span class={s.recordAuthorHandle}>
                  @{record.author.handle}
                </span>
              </p>
            </div>
            {text && <p class={s.recordText}>{text}</p>}
            <For each={record.embeds}>
              {(embed) => (
                <Embed content={embed} labels={record.labels} hideRecord />
              )}
            </For>
          </Link>
        );
      }

      // Case 3.2: List
      if (isGraphListView(record)) {
        return (
          <GenericWithImageEmbed
            image={record.avatar}
            title={record.name}
            href={`/profile/${record.creator.did}/lists/${getRkey(record)}`}
            subtitle={
              record.purpose === "app.bsky.graph.defs#modlist"
                ? `Moderation list by @${record.creator.handle}`
                : `User list by @${record.creator.handle}`
            }
            description={record.description}
          />
        );
      }

      // Case 3.3: Feed
      if (isFeedGeneratorView(record)) {
        return (
          <GenericWithImageEmbed
            image={record.avatar}
            title={record.displayName}
            href={`/profile/${record.creator.did}/feed/${getRkey(record)}`}
            subtitle={`Feed by @${record.creator.handle}`}
            description={`Liked by ${record.likeCount ?? 0} users`}
          />
        );
      }

      // Case 3.4: Labeler
      if (isLabelerView(record)) {
        // Embed type does not exist in the app, so show nothing
        return null;
      }

      // Case 3.5: Starter pack
      if (isStarterPackViewBasic(record)) {
        return <StarterPackEmbed content={record} />;
      }

      // Case 3.6: Post not found
      if (isEmbedViewNotFound(record)) {
        return <Info>Quoted post not found, it may have been deleted.</Info>;
      }

      // Case 3.7: Post blocked
      if (isEmbedViewBlocked(record)) {
        return <Info>The quoted post is blocked.</Info>;
      }

      // Case 3.8: Detached quote post
      if (isEmbedViewDetached(record)) {
        // Just don't show anything
        return null;
      }

      // Unknown embed type
      return null;
    }

    // Case 4: Video
    if (isVideoView(content)) {
      return <VideoEmbed content={content} />;
    }

    // Case 5: Record with media
    if (
      isEmbedRecordWithMediaView(content) &&
      isEmbedViewRecord(content.record.record)
    ) {
      return (
        <div class={s.recordMedia}>
          <Embed
            content={content.media}
            labels={labels}
            hideRecord={hideRecord}
          />
          <Embed
            content={{
              $type: "app.bsky.embed.record#view",
              record: content.record.record,
            }}
            labels={content.record.record.labels}
            hideRecord={hideRecord}
          />
        </div>
      );
    }

    // Unknown embed type
    return null;
  } catch (err) {
    return (
      <Info>{err instanceof Error ? err.message : "An error occurred"}</Info>
    );
  }
}

function Info({ children }: ParentProps) {
  return (
    <div class={s.info}>
      <svg viewBox="0 0 24 24" aria-hidden="true" class={s.infoIcon}>
        <title>Information Icon</title>
        <g>
          <path d="M13.5 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S11.17 7 12 7s1.5.67 1.5 1.5zM13 17v-5h-2v5h2zm-1 5.25c5.66 0 10.25-4.59 10.25-10.25S17.66 1.75 12 1.75 1.75 6.34 1.75 12 6.34 22.25 12 22.25zM20.25 12c0 4.56-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12 7.44 3.75 12 3.75s8.25 3.69 8.25 8.25z" />
        </g>
      </svg>
      <p class={s.infoText}>{children}</p>
    </div>
  );
}

function ImageEmbed({
  content,
  labelInfo,
}: {
  content: AppBskyEmbedImages.View;
  labelInfo?: string;
}) {
  if (labelInfo) {
    return <Info>{labelInfo}</Info>;
  }

  switch (content.images.length) {
    case 1:
      return (
        <img
          src={content.images[0].thumb}
          alt={content.images[0].alt}
          class={s.singleImage}
        />
      );
    case 2:
      return (
        <div class={s.imagesContainer}>
          <For each={content.images}>
            {(image) => (
              <img
                src={image.thumb}
                alt={image.alt}
                class={s.doubleImagesImg}
              />
            )}
          </For>
        </div>
      );
    case 3:
      return (
        <div class={s.imagesContainer}>
          <img
            src={content.images[0].thumb}
            alt={content.images[0].alt}
            class={s.threeImagesLargeImg}
          />
          <div class={s.threeImagesRemainingImagesContainer}>
            <For each={content.images.slice(1)}>
              {(image) => (
                <img
                  src={image.thumb}
                  alt={image.alt}
                  class={s.threeImagesRemainingImages}
                />
              )}
            </For>
          </div>
        </div>
      );
    case 4:
      return (
        <div class={s.fourImagesContainer}>
          <For each={content.images}>
            {(image) => (
              <img src={image.thumb} alt={image.alt} class={s.fourImagesImg} />
            )}
          </For>
        </div>
      );
    default:
      return null;
  }
}

function ExternalEmbed({
  content,
  labelInfo,
}: {
  content: AppBskyEmbedExternal.View;
  labelInfo?: string;
}) {
  function toNiceDomain(url: string): string {
    try {
      const urlp = new URL(url);
      return urlp.host ? urlp.host : url;
    } catch (e) {
      return url;
    }
  }

  if (labelInfo) {
    return <Info>{labelInfo}</Info>;
  }

  return (
    <Link href={content.external.uri} class={s.external} disableTracking>
      {content.external.thumb && (
        <img
          alt={content.external.title}
          src={content.external.thumb}
          class={s.externalThumbnail}
        />
      )}
      <div class={s.externalContent}>
        <p class={s.externalDomain}>{toNiceDomain(content.external.uri)}</p>
        <p class={s.externalTitle}>{content.external.title}</p>
        <p class={s.externalDescription}>{content.external.description}</p>
      </div>
    </Link>
  );
}

function GenericWithImageEmbed({
  title,
  subtitle,
  href,
  image,
  description,
}: {
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  description?: string;
}) {
  return (
    <Link href={href} class={s.generic}>
      <div class={s.genericHeader}>
        {image ? (
          <img
            src={image}
            alt={title}
            class={classNames(s.genericImage, s.genericImageImg)}
          />
        ) : (
          <div class={classNames(s.genericImage, s.genericImagePlaceholder)} />
        )}
        <div class={s.genericTitleAndDescription}>
          <p class={s.genericTitle}>{title}</p>
          <p class={s.genericDescription}>{subtitle}</p>
        </div>
      </div>
      {description && <p class={s.genericText}>{description}</p>}
    </Link>
  );
}

// just the thumbnail and a play button
function VideoEmbed({ content }: { content: AppBskyEmbedVideo.View }) {
  let aspectRatio = 1;

  if (content.aspectRatio) {
    const { width, height } = content.aspectRatio;
    aspectRatio = clamp(width / height, 1 / 1, 3 / 1);
  }

  return (
    <div class={s.videoEmbed} style={{ "aspect-ratio": `${aspectRatio} / 1` }}>
      <img
        src={content.thumbnail}
        alt={content.alt}
        class={s.videoEmbedThumbnail}
      />
      <div class={s.videoEmbedIconBg}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class={s.videoEmbedIcon}
        >
          <title>Play Icon</title>
          <path
            fill="#fff"
            d="M9.576 2.534C7.578 1.299 5 2.737 5 5.086v13.828c0 2.35 2.578 3.787 4.576 2.552l11.194-6.914c1.899-1.172 1.899-3.932 0-5.104L9.576 2.534Z"
          />
        </svg>
      </div>
    </div>
  );
}

function StarterPackEmbed({
  content,
}: {
  content: AppBskyGraphDefs.StarterPackViewBasic;
}) {
  if (!isStarterpackRecord(content.record)) {
    return null;
  }

  const starterPackHref = getStarterPackHref(content);
  const imageUri = getStarterPackImage(content);

  return (
    <Link href={starterPackHref} class={s.starterPack}>
      <img
        src={imageUri}
        alt={content.record.name}
        class={s.starterPackImage}
      />
      <div class={s.starterPackContent}>
        <div class={s.starterPackContentHeader}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class={s.starterPackIcon}
          >
            <title>Starter pack icon</title>
            <defs>
              <linearGradient
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                gradientTransform="rotate(45)"
                id="sky_V5w1FF_xb91wVQ_1euhBX"
              >
                <stop offset="0" stop-color="#0A7AFF" />
                <stop offset="1" stop-color="#59B9FF" />
              </linearGradient>
            </defs>
            <path
              fill="url(#sky_V5w1FF_xb91wVQ_1euhBX)"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.26 5.227 5.02 6.899c-.734.197-1.17.95-.973 1.685l1.672 6.24c.197.734.951 1.17 1.685.973l6.24-1.672c.734-.197 1.17-.951.973-1.685L12.945 6.2a1.375 1.375 0 0 0-1.685-.973Zm-6.566.459a2.632 2.632 0 0 0-1.86 3.223l1.672 6.24a2.632 2.632 0 0 0 3.223 1.861l6.24-1.672a2.631 2.631 0 0 0 1.861-3.223l-1.672-6.24a2.632 2.632 0 0 0-3.223-1.861l-6.24 1.672Z"
            />
            <path
              fill="url(#sky_V5w1FF_xb91wVQ_1euhBX)"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.138 18.411a4.606 4.606 0 1 0 0-9.211 4.606 4.606 0 0 0 0 9.211Zm0 1.257a5.862 5.862 0 1 0 0-11.724 5.862 5.862 0 0 0 0 11.724Z"
            />
          </svg>
          <div>
            <p class={s.starterPackName}>{content.record.name}</p>
            <p class={s.starterPackAuthor}>
              Starter pack by{" "}
              {content.creator.displayName || `@${content.creator.handle}`}
            </p>
          </div>
        </div>
        {content.record.description && (
          <p class={s.starterPackDescription}>{content.record.description}</p>
        )}
        {!!content.joinedAllTimeCount && content.joinedAllTimeCount > 50 && (
          <p class={s.starterPackJoined}>
            {content.joinedAllTimeCount} users have joined!
          </p>
        )}
      </div>
    </Link>
  );
}

// from #/lib/strings/starter-pack.ts
function getStarterPackImage(starterPack: AppBskyGraphDefs.StarterPackView) {
  const rkey = getRkey(starterPack);
  return `https://ogcard.cdn.bsky.app/start/${starterPack.creator.did}/${rkey}`;
}

function getStarterPackHref(
  starterPack: AppBskyGraphDefs.StarterPackViewBasic,
) {
  const rkey = getRkey(starterPack);
  const handleOrDid = starterPack.creator.handle || starterPack.creator.did;
  return `/starter-pack/${handleOrDid}/${rkey}`;
}

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(num, max));
}
