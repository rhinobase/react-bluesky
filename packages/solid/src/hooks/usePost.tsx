import { createResource } from "solid-js";
import type { PostHandleWithApiUrlProps, PostProps } from "../types";

const host = "https://bsky-react-post.rhinobase.io";

async function fetcher(url: string, options: RequestInit = {}) {
  const res = await fetch(url, options);
  const json = await res.json();

  if (res.ok) return json.data;

  throw new Error(
    json.error ?? `Failed to fetch post at "${url}" with "${res.status}".`,
  );
}

export type usePost = PostHandleWithApiUrlProps &
  Pick<PostProps, "fetchOptions">;

export function usePost(props: usePost) {
  const { fetchOptions, ...config } = props;

  let endpoint: string | null = "";

  if ("apiUrl" in config && config.apiUrl) {
    endpoint = config.apiUrl;
  } else if ("handle" in config && config.handle) {
    endpoint = `${host}/api/post?handle=${config.handle}&id=${config.id}`;
  } else if ("did" in config && config.did) {
    endpoint = `${host}/api/post?did=${config.did}&id=${config.id}`;
  }

  return createResource(() => fetcher(endpoint, fetchOptions));
}
