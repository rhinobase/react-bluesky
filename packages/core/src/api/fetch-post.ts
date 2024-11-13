import type {
  AppBskyFeedDefs,
  AppBskyFeedGetPostThread,
  ComAtprotoIdentityResolveHandle,
} from "@atproto/api";

export async function fetchPost(uri: string) {
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
          `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${didOrHandle}`,
        ).then(
          (res) =>
            res.json() as Promise<ComAtprotoIdentityResolveHandle.Response>,
        );

        if (!resolution.data.did) {
          throw new Error("No DID found");
        }
        did = resolution.data.did;
      }

      atUri = `at://${did}/app.bsky.feed.post/${rkey}`;
    } catch (err) {
      console.log(err);
      throw new Error("Invalid Bluesky URL");
    }
  }

  const { data } = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=${atUri}&depth=0&parentHeight=0`,
  ).then((res) => res.json() as Promise<AppBskyFeedGetPostThread.Response>);

  if (!isThreadViewPost(data.thread)) {
    throw new Error("Post not found");
  }

  return data.thread;
}

function isThreadViewPost(v: unknown): v is AppBskyFeedDefs.ThreadViewPost {
  return (
    v != null &&
    typeof v === "object" &&
    "$type" in v &&
    v.$type === "app.bsky.feed.defs#threadViewPost"
  );
}
