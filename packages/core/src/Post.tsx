import { Suspense } from "react";
import { Post as EmbededPost } from "./component/Post";
import { PostLoading } from "./components/PostLoading";
import { PostNotFound } from "./components/PostNotFound";
import { usePost } from "./hooks";
import type { PostProps } from "./types";

export function Post(props: PostProps) {
  const { data, isLoading } = usePost(props);

  if (data)
    return (
      <Suspense fallback={props.fallback}>
        <EmbededPost thread={data} />
      </Suspense>
    );
  if (isLoading) return <PostLoading />;
  return <PostNotFound />;
}
