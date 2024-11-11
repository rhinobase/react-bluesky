import { fetchPost } from "./api";
import { EmbededPost } from "./components/EmbededPost";
import type { PostProps } from "./types";

export type Post = Partial<PostProps>;

export async function Post({
  id,
  apiUrl,
  fallback,
  components,
  fetchOptions,
  handle,
  onError,
}: Post) {
  const content = await fetchPost("pfrazee.com", "3lafvzlbncc2r");

  return <EmbededPost content={content} components={components} />;
}
