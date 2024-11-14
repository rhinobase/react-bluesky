"use client";
import { EmbeddedPost, PostNotFound, PostSkeleton } from "./components";
import { usePost } from "./hooks";
import type { PostProps } from "./types";

export function Post({
  fallback = <PostSkeleton />,
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

  return <EmbeddedPost thread={data} />;
}
