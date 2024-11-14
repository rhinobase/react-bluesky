"use client";
import type { AppBskyFeedDefs } from "@atproto/api";
import swr from "swr";
import type { PostHandleWithApiUrlProps, PostProps } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: Avoids an error when used in the pages directory where useSWR might be in `default`.
const useSWR = ((swr as any).default as typeof swr) || swr;
const host = "http://localhost:3000"; // "https://bsky-react-post.rhinobase.io";

async function fetcher([url, fetchOptions]: [
  string,
  RequestInit,
]): Promise<AppBskyFeedDefs.ThreadViewPost> {
  const res = await fetch(url, fetchOptions);
  const json = await res.json();

  if (res.ok) return json.data;

  throw new Error(
    json.error ?? `Failed to fetch post at "${url}" with "${res.status}".`,
  );
}

export type usePost = PostHandleWithApiUrlProps &
  Pick<PostProps, "fetchOptions">;

/**
 * SWR hook for fetching a post in the browser.
 */
export const usePost = (props: usePost) => {
  const { fetchOptions, ...config } = props;

  let endpoint: string | null = null;

  if ("apiUrl" in config && config.apiUrl) {
    endpoint = config.apiUrl;
  } else if ("handle" in config && config.handle) {
    endpoint = `${host}/api/post?handle=${config.handle}&id=${config.id}`;
  } else if ("did" in config && config.did) {
    endpoint = `${host}/api/post?did=${config.did}&id=${config.id}`;
  }

  const { isLoading, data, error } = useSWR(
    () => [endpoint, fetchOptions],
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    },
  );

  return {
    // If data is `undefined` then it might be the first render where SWR hasn't started doing
    // any work, so we set `isLoading` to `true`.
    isLoading: Boolean(isLoading || (data === undefined && !error)),
    data,
    error,
  };
};
