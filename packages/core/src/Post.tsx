import { fetchPost } from "./api";
import { EmbededPost } from "./components/EmbededPost";
import { PostLoading } from "./components/PostLoading";
import { PostNotFound } from "./components/PostNotFound";
import { usePost } from "./hooks";
import type { PostProps } from "./types";

export type Post = PostProps;

export function Post({
  id,
  apiUrl,
  fallback,
  components,
  fetchOptions,
  handle,
  onError,
}: Post) {
  const { data, isLoading } = usePost(handle, id);

  const NotFound = components?.PostNotFound ?? PostNotFound;

  if (data) return <EmbededPost content={data} components={components} />;
  if (isLoading) return <PostLoading />;
  return <NotFound />;
}
