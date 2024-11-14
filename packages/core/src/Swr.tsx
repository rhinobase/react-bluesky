"use client";
import { Post as EmbededPost } from "./components/Post";
import { PostLoading } from "./components/PostLoading";
import { PostNotFound } from "./components/PostNotFound";
import { usePost } from "./hooks";
import type { PostProps } from "./types";

export function Post({
  fallback = <PostLoading />,
  components,
  onError,
  ...props
}: PostProps) {
  const { data, error, isLoading } = usePost(props);

  if (isLoading) return fallback;

  if (error || !data) {
    const NotFound = components?.PostNotFound || PostNotFound;
    return <NotFound error={onError ? onError(error) : error} />;
  }

  return <EmbededPost thread={data} />;
}
