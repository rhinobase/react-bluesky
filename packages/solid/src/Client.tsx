import { Match, Show, Switch } from "solid-js";
import { EmbeddedPost, PostNotFound, PostSkeleton } from "./components";
import { usePost } from "./hooks";
import type { PostProps } from "./types";

export function Post({
  fallback = <PostSkeleton />,
  components,
  onError,
  ...props
}: PostProps) {
  const [post] = usePost(props);
  const NotFound = components?.PostNotFound || PostNotFound;

  return (
    <>
      <Show when={post.loading}>{fallback}</Show>
      <Switch>
        <Match when={post.error}>
          <NotFound error={onError ? onError(post.error) : post.error} />
        </Match>
        <Match when={post()}>
          <EmbeddedPost thread={post()} />
        </Match>
      </Switch>
    </>
  );
}
