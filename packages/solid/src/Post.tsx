"use server";
import type { AppBskyFeedDefs } from "@atproto/api";
import { Match, Suspense, Switch, createResource } from "solid-js";
import { fetchPost } from "./api";
import { EmbeddedPost, PostNotFound, PostSkeleton } from "./components";
import type { PostProps } from "./types";

function SuspensedPost({
  components,
  fetchOptions,
  onError,
  ...config
}: PostProps) {
  const NotFound = components?.PostNotFound || PostNotFound;

  const fetchData = async () => {
    try {
      if ("apiUrl" in config) return undefined;
      return await fetchPost(config, fetchOptions);
    } catch (err) {
      if (onError) {
        return onError(err);
      }
      console.error(err);
      throw err;
    }
  };

  const [data] = createResource(fetchData);

  return (
    <Switch>
      <Match when={data()}>
        <EmbeddedPost thread={data() as AppBskyFeedDefs.ThreadViewPost} />
      </Match>
      <Match when={!data()}>
        <NotFound />
      </Match>
    </Switch>
  );
}

export function Post({ fallback = <PostSkeleton />, ...props }: PostProps) {
  return (
    <Suspense fallback={fallback}>
      <SuspensedPost {...props} />
    </Suspense>
  );
}
