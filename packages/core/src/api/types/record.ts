import type { ExternalBaseType } from "./external";
import type { ImageBaseType } from "./image";
import type { VideoBaseType } from "./video";

interface ImageEmbed {
  $type: "app.bsky.embed.images";
  images: (ImageBaseType & {
    image: {
      $type: string;
      ref: {
        $link: string;
      };
      mimeType: string;
      size: number;
    };
  })[];
}

interface VideoEmbed extends VideoBaseType {
  $type: "app.bsky.embed.video";
  video: {
    $type: string;
    ref: {
      $link: string;
    };
    mimeType: string;
    size: number;
  };
}

interface ExternalEmbed {
  $type: "app.bsky.embed.external";
  external: ExternalBaseType & {
    thumb: {
      $type: string;
      ref: {
        $link: string;
      };
      mimeType: string;
      size: number;
    };
  };
}

interface RecordEmbed {
  $type: "app.bsky.embed.record";
  record: {
    cid: string;
    uri: string;
  };
}

export interface RecordType {
  $type: string;
  createdAt: string;
  embed?: ImageEmbed | VideoEmbed | ExternalEmbed | RecordEmbed;
  facets?: {
    features: {
      $type: string;
      tag: string;
    }[];
    index: {
      byteEnd: number;
      byteStart: number;
    };
  }[];
  langs: string[];
  text: string;
}
