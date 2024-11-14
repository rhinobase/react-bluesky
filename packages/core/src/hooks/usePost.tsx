"use client";
import type { AppBskyFeedDefs } from "@atproto/api";
import swr from "swr";
import type { PostProps } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: Avoids an error when used in the pages directory where useSWR might be in `default`.
const useSWR = ((swr as any).default as typeof swr) || swr;
const host = "bsky-react-post.rhinobase.io";

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

/**
 * SWR hook for fetching a post in the browser.
 */
export const usePost = (
  props: Pick<PostProps, "uri" | "apiUrl" | "fetchOptions">,
) => {
  const { uri, apiUrl, fetchOptions } = props;

  const { isLoading, data, error } = useSWR(
    () =>
      apiUrl || uri
        ? [apiUrl || (uri && `${host}/api/post/?uri=${uri}`), fetchOptions]
        : null,
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
