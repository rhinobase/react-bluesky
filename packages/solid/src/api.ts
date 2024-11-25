"use server";
import type {
  AppBskyFeedDefs,
  AppBskyFeedGetPostThread,
  ComAtprotoIdentityResolveHandle,
} from "@atproto/api";
import type { PostHandleProps } from "./types";

const BASE_PATH = "https://public.api.bsky.app/xrpc";

export async function fetchPost(
  config: PostHandleProps,
  fetchOptions?: RequestInit,
) {
  let atUri: string;

  if ("handle" in config && config.handle) {
    try {
      const resolution = await fetch(
        `${BASE_PATH}/com.atproto.identity.resolveHandle?handle=${config.handle}`,
        fetchOptions,
      ).then(
        (res) =>
          res.json() as Promise<ComAtprotoIdentityResolveHandle.OutputSchema>,
      );

      if (!resolution.did) {
        throw new Error("No DID found");
      }

      atUri = `at://${resolution.did}/app.bsky.feed.post/${config.id}`;
    } catch (err) {
      console.error(err);
      throw new Error("Invalid Bluesky URL");
    }
  } else if ("did" in config && config.did) {
    atUri = `at://${config.did}/app.bsky.feed.post/${config.id}`;
  } else {
    throw new Error("Invalid Bluesky Embed Config");
  }

  const { thread } = await fetch(
    `${BASE_PATH}/app.bsky.feed.getPostThread?uri=${atUri}&depth=0&parentHeight=0`,
    fetchOptions,
  ).then((res) => res.json() as Promise<AppBskyFeedGetPostThread.OutputSchema>);

  if (!isThreadViewPost(thread)) {
    throw new Error("Post not found");
  }

  return thread;
}

function isThreadViewPost(v: unknown): v is AppBskyFeedDefs.ThreadViewPost {
  return (
    v != null &&
    typeof v === "object" &&
    "$type" in v &&
    v.$type === "app.bsky.feed.defs#threadViewPost"
  );
}
