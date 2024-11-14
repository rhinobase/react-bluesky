import type { AppBskyFeedPost } from "@atproto/api";
import { hasProp, isObj } from "../../utils";

export function isRecord(v: unknown): v is AppBskyFeedPost.Record {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    (v.$type === "app.bsky.feed.post#main" || v.$type === "app.bsky.feed.post")
  );
}
