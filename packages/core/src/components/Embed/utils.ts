import type {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyEmbedVideo,
  AppBskyFeedDefs,
  AppBskyGraphDefs,
  AppBskyGraphStarterpack,
  AppBskyLabelerDefs,
} from "@atproto/api";
import { hasProp, isObj } from "../../utils";

export function isImageView(v: unknown): v is AppBskyEmbedImages.View {
  return (
    isObj(v) && hasProp(v, "$type") && v.$type === "app.bsky.embed.images#view"
  );
}

export function isEmbedExternalView(
  v: unknown,
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
  v: unknown,
): v is AppBskyEmbedRecord.ViewRecord {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.embed.record#viewRecord"
  );
}

export function isGraphListView(v: unknown): v is AppBskyGraphDefs.ListView {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.graph.defs#listView"
  );
}

export function isFeedGeneratorView(
  v: unknown,
): v is AppBskyFeedDefs.GeneratorView {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.feed.defs#generatorView"
  );
}

export function isLabelerView(v: unknown): v is AppBskyLabelerDefs.LabelerView {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.labeler.defs#labelerView"
  );
}

export function isStarterPackViewBasic(
  v: unknown,
): v is AppBskyGraphDefs.StarterPackViewBasic {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.graph.defs#starterPackViewBasic"
  );
}

export function isEmbedViewNotFound(
  v: unknown,
): v is AppBskyEmbedRecord.ViewNotFound {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.embed.record#viewNotFound"
  );
}

export function isEmbedViewBlocked(
  v: unknown,
): v is AppBskyEmbedRecord.ViewBlocked {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.embed.record#viewBlocked"
  );
}

export function isEmbedViewDetached(
  v: unknown,
): v is AppBskyEmbedRecord.ViewDetached {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.embed.record#viewDetached"
  );
}

export function isVideoView(v: unknown): v is AppBskyEmbedVideo.View {
  return (
    isObj(v) && hasProp(v, "$type") && v.$type === "app.bsky.embed.video#view"
  );
}

export function isEmbedRecordWithMediaView(
  v: unknown,
): v is AppBskyEmbedRecordWithMedia.View {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    v.$type === "app.bsky.embed.recordWithMedia#view"
  );
}

export function isStarterpackRecord(
  v: unknown,
): v is AppBskyGraphStarterpack.Record {
  return (
    isObj(v) &&
    hasProp(v, "$type") &&
    (v.$type === "app.bsky.graph.starterpack#main" ||
      v.$type === "app.bsky.graph.starterpack")
  );
}
