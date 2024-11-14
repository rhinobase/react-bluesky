import type {
  AppBskyEmbedImages,
  AppBskyEmbedExternal,
  AppBskyEmbedRecord,
} from "@atproto/api";
import { isObj, hasProp } from "../../utils";

export function isImageView(v: unknown): v is AppBskyEmbedImages.View {
  return (
    isObj(v) && hasProp(v, "$type") && v.$type === "app.bsky.embed.images#view"
  );
}

export function isEmbedExternalView(
  v: unknown
): v is AppBskyEmbedExternal.View {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.embed.external#view"
  );
}

export function isEmbedRecordView(v: unknown): v is AppBskyEmbedRecord.View {
  return (
    isObj(v) && hasProp(v, "$type") && v.$type === "app.bsky.embed.record#view"
  );
}

export function isEmbedViewRecord(
  v: unknown
): v is AppBskyEmbedRecord.ViewRecord {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.embed.record#viewRecord"
  );
}
