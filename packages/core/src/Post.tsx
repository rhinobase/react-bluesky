import { fetchPost } from "./api";
import { EmbededPost } from "./components/EmbededPost";
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
  const content = usePost(handle, id);

  if (content.data)
    return <EmbededPost content={content.data} components={components} />;
}
