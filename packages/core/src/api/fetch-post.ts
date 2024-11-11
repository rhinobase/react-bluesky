import type { PostType } from "./types";

type ResolveHandleResponse = {
  did: string;
};

type PostResponse = {
  thread: {
    $type: string;
    post: PostType;
  };
};

export async function fetchPost(handle: string, id: string) {
  const resolvedHandle = await fetch(
    `https://public.api.bsky.app/xrpc/com.atproto.identity.resolveHandle?handle=${handle}`,
  )
    .then((res) => res.json() as Promise<ResolveHandleResponse>)
    .then((data) => data.did);

  const response = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=at://${resolvedHandle}/app.bsky.feed.post/${id}&depth=0&parentHeight=0`,
  ).then((res) => res.json() as Promise<PostResponse>);

  return response.thread.post;
}

export class PostApiError extends Error {
  status: number;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any;

  constructor({
    message,
    status,
    data,
  }: {
    message: string;
    status: number;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    data: any;
  }) {
    super(message);
    this.name = "TwitterApiError";
    this.status = status;
    this.data = data;
  }
}
