import { Suspense } from "react";
import { fetchPost } from "./api";
import { Post as EmbededPost } from "./component/Post";
import { PostLoading } from "./components/PostLoading";
import { PostNotFound } from "./components/PostNotFound";
import type { PostProps } from "./types";

async function SuspensedPost({
  uri,
  components,
  fetchOptions,
  onError,
}: Omit<PostProps, "fallback">) {
  let error: unknown;
  const data = uri
    ? await fetchPost(uri, fetchOptions).catch((err) => {
        if (onError) {
          error = onError(err);
        } else {
          console.error(err);
          error = err;
        }
      })
    : undefined;

  if (!data) {
    const NotFound = components?.PostNotFound || PostNotFound;
    return <NotFound error={error} />;
  }

  return <EmbededPost thread={data} />;
}

export function Post({ fallback = <PostLoading />, ...props }: PostProps) {
  return (
    <Suspense fallback={fallback}>
      {/* @ts-expect-error: Async components are valid in the app directory */}
      <SuspensedPost {...props} />
    </Suspense>
  );
}
