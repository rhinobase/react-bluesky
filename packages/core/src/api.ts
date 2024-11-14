import type {
  AppBskyFeedDefs,
  AppBskyFeedGetPostThread,
  ComAtprotoIdentityResolveHandle,
} from "@atproto/api";

const BASE_PATH = "https://public.api.bsky.app/xrpc";

export async function fetchPost(uri: string, fetchOptions?: RequestInit) {
  let atUri = uri;

  if (!atUri.startsWith("at://")) {
    try {
      const urlp = new URL(uri);
      if (!urlp.hostname.endsWith("bsky.app")) {
        throw new Error("Invalid hostname");
      }
      const split = urlp.pathname.slice(1).split("/");
      if (split.length < 4) {
        throw new Error("Invalid pathname");
      }
      const [profile, didOrHandle, type, rkey] = split;
      if (profile !== "profile" || type !== "post") {
        throw new Error("Invalid profile or type");
      }

      let did = didOrHandle;
      if (!didOrHandle.startsWith("did:")) {
        const resolution = await fetch(
          `${BASE_PATH}/com.atproto.identity.resolveHandle?handle=${didOrHandle}`,
          fetchOptions,
        ).then(
          (res) =>
            res.json() as Promise<ComAtprotoIdentityResolveHandle.OutputSchema>,
        );

        if (!resolution.did) {
          throw new Error("No DID found");
        }

        did = resolution.did;
      }

      atUri = `at://${did}/app.bsky.feed.post/${rkey}`;
    } catch (err) {
      console.error(err);
      throw new Error("Invalid Bluesky URL");
    }
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
