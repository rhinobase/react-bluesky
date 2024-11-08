import type { PostBaseType } from "./base";
import type { ExternalBaseType } from "./external";
import type { ImageBaseType } from "./image";
import type { RecordType } from "./record";
import type { VideoBaseType } from "./video";

export enum EmbedContentType {
  IMAGES = "app.bsky.embed.images#view",
  VIDEO = "app.bsky.embed.video#view",
  EXTERNAL = "app.bsky.embed.external#view",
  RECORD = "app.bsky.embed.record#view",
}

interface ImageEmbed {
  $type: EmbedContentType.IMAGES;
  images: (ImageBaseType & {
    thumb: string;
    fullsize: string;
  })[];
}

interface VideoEmbed extends VideoBaseType {
  $type: EmbedContentType.VIDEO;
  cid: string;
  playlist: string;
  thumbnail: string;
}

interface ExternalEmbed {
  $type: EmbedContentType.EXTERNAL;
  external: ExternalBaseType & {
    thumb: string;
  };
}

interface RecordEmbed {
  $type: EmbedContentType.RECORD;
  record: PostBaseType & {
    $type: string;
    value: RecordType;
    embeds: EmbedType[]; // Recursive reference to EmbedType
  };
}

export type EmbedType = ImageEmbed | VideoEmbed | ExternalEmbed | RecordEmbed;
